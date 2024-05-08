var APP = null;
var ENV = null;
var DateWidth = 0;
const DATEAPI = require('./date-api.js');
const TOP_HEIGHT = 161; // 距离顶部高度 = 周标题高度+关闭高度
const DATE_HEIGHT = 124;
const systemDate = new Date();
const systemDateYear = systemDate.getFullYear();
const systemDateMonth = systemDate.getMonth() + 1;
const systemDateDay = systemDate.getDate();
const swipeheight = 1260; //选取可滑动的高度
const barHeight = 70; //日期一格高度 

const message = {
    inconsistentTime: "航班起飞到达时间不一致",
    foundFlight: "找到航班",
    notFoundFlight: "没找到航班",
    clickFinished: "已点击预订",
    foundCabinClass: "找到舱等",
};
const SCROLL_VIEW = "android.widget.ScrollView";
const WEB_VIEW = 'android.webkit.WebView';
const VIEW = 'android.view.View';
const LIST_VIEW = 'android.widget.ListView';
const TEXT_VIEW = 'android.widget.TextView';

// 判断是否相等的方法
function numberEqual(n1, n2) {
    return (n1 | 0) === (n2 | 0);
}

// 点击日期坐标
function clickDateButton(x, y) {
    if (ENV.debugMode) {
        log('已获取坐标 %s, %s', x, y);
    }
    while (!click(x, y)) {
        sleep(10);
    }
    sleep(1000); // 等待动画 
    if (ENV.debugMode) {
        log('已点击坐标 %s, %s', x, y);
    }
}

// 获取当前选中的日期
function getYMD(systemDateMonth, systemDateYear, index) {
    let mon = systemDateMonth + index;
    let year = systemDateYear;
    if (mon > 12) {
        year = systemDateYear + 1;
        mon = mon - 12;
    }
    if (mon < 10) {
        mon = '0' + mon;
    }
    const ymd = year + '-' + mon + '-01';
    log('日期：' + ymd);
    return ymd
}

// 返回时分
function getHourAndMin(date) {
    const d = new Date(date);
    let h = d.getHours();
    if (h < 10) {
        h = '0' + h;
    }
    let m = d.getMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    return h + ':' + m;
}

// 找订之前，先滑动一定距离
function scroll300() {
    swipe(ENV.screenWidth / 2, 1260, ENV.screenWidth / 2, ENV.screenHeight / 2, 500);
    sleep(800);
}

// 重构一下所有价格的结果，目的是让出票员看的懂和简洁
function allPriceResult(allPrice) {
    let result = [];
    allPrice.forEach(element => {
        result.push(element.ticketPrice);
    });
    return result;
}

// 选价格页面下一页
function pricePageNextPage(scrollView) {
    APP.scrollForward(scrollView);
    scrollView = className(VIEW).scrollable().findOne();
    let c = scrollView.boundsInParent().bottom;
    return c;
}

module.exports = {
    setEnv: function (env) {
        ENV = env;
        DateWidth = ENV.screenWidth / 7;
    },
    init: function (a) {
        APP = a;
    },
    /**
     * 下单
     * @param {object} input 下单参数
     */
    order: function (input) {
        // //  点击订机票
        // var flightBtn = APP.waitForContainsText('订机票');
        // if (flightBtn) {
        //     flightBtn.parent().click();
        //     sleep(2000);
        // }

        // //  输入起飞到达
        // this.inputDepartureAndArrive(input.departure, input.arrive);

        // 需要选择的目标日期
        // let targetDate = new Date(input.departureDateTime);
        // let targetYearVal = targetDate.getFullYear();
        // let targetMonthVal = targetDate.getMonth() + 1;
        // let targetDateVal = targetDate.getDate();
        // const targetMDText = (targetMonthVal < 10 ? ('0' + targetMonthVal) : targetMonthVal) + '月' + (targetDateVal < 10 ? ('0' + targetDateVal) : targetDateVal) + '日'
        // // 系统日期
        // let date1 = parseInt(systemDateYear) * 12 + parseInt(systemDateMonth);
        // // 得到目标年月
        // let date2 = parseInt(targetYearVal) * 12 + parseInt(targetMonthVal);
        // let monthDiffer = Math.abs(date1 - date2);
        // log('获取到的月份差：' + monthDiffer);
        // this.selectDate(monthDiffer, targetDate);
        // 点击搜索
        // APP.clickById('search');
        // 航班列表页面获取当前选中的日期是否和目标日期一致
        // let checkedDateUiObject = APP.waitForContainsText('月');
        // let checkDateText = checkedDateUiObject.text();
        // log('目标日期：' + targetMDText);
        // log('当前选中的日期：' + checkDateText);
        // log('日期是否一致：' + (checkDateText == targetMDText))
        // if (checkDateText != targetMDText) {
        //     throw '日期选择有误，请重新下单';
        // }

        // 查找起飞时间为xx:xx的航班 
        // const departureDateTime = getHourAndMin(input.departureDateTime);
        // const arrivalDateTime = getHourAndMin(input.arrivalDateTime);
        // console.log('起飞时间%s - 到达时间%s', departureDateTime, arrivalDateTime);
        // this.findFlight(input.fullFlightNo, departureDateTime, arrivalDateTime);

        this.findPrice(input.cabinPriceInfos, input.createOrderRuleInfo);
        return;
        addPassengers(input.passengers, input.contactInfo);
        return orderDetail(input);
    },
    /**
     * 输入出发到达城市
     * @param {出发城市} departure 
     * @param {到达城市} arrive 
     */
    inputDepartureAndArrive: function (departure, arrive) {
        function input(text) {
            let city = APP.getById('search_text', 100, 5000);
            city.click();
            city.setText(text);
            sleep(1000);
            let suggest = APP.waitForId('suggest', 100, 5000);
            while (!suggest) {
                suggest = APP.waitForId('suggest', 100, 5000);
            }
            let airportList = suggest.find(className('android.widget.RelativeLayout')).toArray();
            if (airportList.length > 0) {
                try {
                    airportList.forEach(element => {
                        let airportUiObject = element.findOne(id('icon'));
                        if (airportUiObject.text() != '机场') {
                            return;
                        }
                        let titleUiObject = element.findOne(id('title'));
                        let cityCode = titleUiObject.text().substring(titleUiObject.text().length - 3);
                        log(cityCode)
                        if (cityCode == text) {
                            APP.clickArea(element);
                            sleep(1000);
                            console.log('click 目标城市');
                            throw '选中目标城市';
                        }
                    });
                } catch (error) {
                    log('捕获到的异常' + error);
                    if (error == '选中目标城市') {

                    }
                }
            }
        }

        // 点击出发城市
        APP.clickById('depart_city');
        input(departure);
        sleep(1000);

        APP.clickById('dest_city');
        input(arrive);
        sleep(1000);
    },
    /**
     * 选择出发日期
     * 选择了日期后，只能到航班列表页面才能判断当前选中的日期是否是目标日期
     * @param {strubg} date 
     */
    selectDate: function (monthDiffer, date) {
        const targetYear = date.getFullYear();
        const targetMonth = date.getMonth() + 1;
        const targetDay = date.getDate();
        if (systemDateYear + '-' + systemDateMonth + '-' + systemDateDay != targetYear + '-' + targetMonth + '-' + targetDay) {
            if (date.getTime() > systemDate.getTime()) { } else {
                log('日期必须大于当天日期，目标日期：%s，当前日期：%s', date, systemDate);
                throw '日期必须大于当天日期,目标日期为：' + date + ' , 今天日期为：' + systemDate;
            }
        }

        const targetWeekCount = DATEAPI.getWeekNumInCurrentMonth(date) + 1;
        const now = new Date();
        const nowMonth = now.getMonth() + 1;
        const nowYear = now.getFullYear();
        const x = DateWidth * 0.5 + date.getDay() * DateWidth;

        let dateInputView = null;
        // 属于当前月
        if (numberEqual(nowYear, targetYear) && numberEqual(nowMonth, targetMonth)) {
            if (ENV.debugMode) {
                log('目标月是今天所在的月 特殊处理');
                log('准备开始选择日期，目标日期 %s, %s', targetMonth, targetDay);
            }
            sleep(2000);
            dateInputView = APP.getById('depart_date');
            dateInputView.click(); // 打开日期选择页面 
            sleep(3000); // 等待动画结束

            // 滚动到顶部，偶尔会失灵
            let viewPager = APP.waitForId('viewPager', 100, 3000);
            let scrollView = viewPager.findOne(className(SCROLL_VIEW));
            let count = 0;
            while (!scrollView && count < 5) {
                count++;
                scrollView = viewPager.findOne(className(SCROLL_VIEW));
            }
            if (!scrollView) { } else {
                APP.swipeToTop();
            }

            let y = TOP_HEIGHT + targetWeekCount * DATE_HEIGHT + DATE_HEIGHT * 0.5;
            clickDateButton(x, y);
            return;
        }

        while (true) {
            sleep(2000);
            dateInputView = APP.getById('depart_date');
            dateInputView.click(); // 打开日期选择页面   
            sleep(3000); // 等待动画结束 
            if (ENV.debugMode) {
                log('打开日期选择页面');
            }

            // 滚动到顶部，偶尔会失灵
            let viewPager = APP.waitForId('viewPager', 100, 3000);
            let calendarView = viewPager.findOne(className(SCROLL_VIEW));
            let count = 0;
            while (!calendarView && count < 5) {
                count++;
                calendarView = viewPager.findOne(className(SCROLL_VIEW));
            }
            if (!calendarView) { } else {
                APP.swipeToTop();
            }

            let calendarPageHeight = calendarView.bounds().height();
            if (ENV.debugMode) {
                log('已获取日历控件' + calendarPageHeight);
            }

            // 不支持目标日期超过两个月
            if (monthDiffer > 2) {
                back();
                throw '暂不支持超过当前2个月的日期选择,当前月份差值' + monthDiffer;
            }

            // 当前选中月份下边沿
            let currentMonthViewBottom = 265;

            // 需要向下
            let m = {
                year: systemDateYear,
                month: systemDateMonth,
                day: systemDateDay,
            };

            let mWeekCount = DATEAPI.getWeekNumInCurrentMonth(new Date(m.year, m.month, 0)) + 1;

            let y = currentMonthViewBottom + DATE_HEIGHT * mWeekCount; // 目标日期所在的坐标
            if (ENV.debugMode) {
                log('当前周数 %s 日期下边沿为 %s', mWeekCount, y);
            }

            while (true) {
                // 向后一个月
                m.month++;
                if (m.month > 12) {
                    m.month = 1;
                    m.year++;
                }

                mWeekCount = DATEAPI.getWeekNumInCurrentMonth(new Date(m.year, m.month, 0)) + 1;

                if (ENV.debugMode) {
                    log('已向后一个月 %s年%s月 总周数 %s', m.year, m.month, mWeekCount);
                }

                if (numberEqual(m.year, targetYear) && numberEqual(m.month, targetMonth)) {
                    // 找到需要的月份
                    y += targetWeekCount * DATE_HEIGHT + DATE_HEIGHT * 0.5;
                    break;
                } else {
                    // 这个月不是 直接跳过整月
                    let monthSize = DATE_HEIGHT + mWeekCount * DATE_HEIGHT;
                    y += monthSize;
                }

                if (ENV.debugMode) {
                    log('找到y轴偏移量 %s 开始翻页', y);
                }
            }

            while (!(y > TOP_HEIGHT && y < ENV.screenHeight)) {
                if (ENV.debugMode) {
                    log('当前y坐标 %s 不在屏幕内，下翻一页', y);
                }
                calendarView.scrollForward();
                sleep(5000); // 等待翻页动画
                y -= calendarPageHeight;
            }

            clickDateButton(x, y);
            break;
        }
    },
    /**
     * 查找目标航班
     * @param {航班号} fullFlightNo 
     * @returns 
     */
    findFlight: function (fullFlightNo, departureDateTime, arrivalDateTime) {
        sleep(2000);

        let noFlightsData = APP.waitForContainsText('暂无航班数据', 100, 3000);
        if (noFlightsData) {
            throw '暂无航班数据';
        }

        // 找到可滚动块
        let lastFlightNo = '';
        let currentFlightNo;
        while (lastFlightNo != currentFlightNo) {
            try {
                lastFlightNo = currentFlightNo;
                let flightsContainer = className(WEB_VIEW).scrollable().findOne();
                //  view第一块是日期，第二块是航班块
                let viewArr = flightsContainer.find(className(VIEW).depth(10));
                flightsContainer.scrollForward();
                sleep(1000);
                // 找到航班内容的listView
                let listView = viewArr.get(1).findOne(className(LIST_VIEW));
                // 找到所有航班块
                let flightItems = listView.find(className(VIEW).clickable(true)).toArray();
                flightItems.forEach((element, elementIndex) => {
                    sleep(2000);
                    if (elementIndex != 0 && elementIndex % 7 == 0) {
                        log('滑动一页')
                        // 170 * 8：一页8个航班,各170高度
                        // 94 + 100：顶部标题高度,日期高度
                        swipe(device.width / 2, 170 * 8, device.width / 2, 94 + 100, 1000);
                        sleep(1000)
                    }
                    let sharedFlight = element.findOne(textContains('共享'));
                    if (sharedFlight) {
                        log('排除共享航班');
                        return;
                    }
                    // 获取航班号
                    let flightNoTextView = element.findOne(className(TEXT_VIEW));
                    let flightNo = '';
                    if (flightNoTextView) {
                        let flightNoText = flightNoTextView.text();
                        log('获取到的航班信息：' + flightNoText)
                        flightNo = flightNoText.substring(flightNoText.length - 6, flightNoText.length);
                        log('获取到的航班号：' + flightNo);
                        currentFlightNo = flightNo;
                        if (flightNo == fullFlightNo) {
                            // 获取起飞时间点范围
                            let deptTimeView = element.findOne(className(VIEW).depth(16));
                            let deptTime = deptTimeView.child(0).text();
                            log('获取到的起飞时间点：' + deptTime);
                            // 获取到达时间点范围 
                            let arriveTime = deptTimeView.child(3).child(0).child(0).text();
                            log('获取到的到达时间点：' + arriveTime);
                            if (departureDateTime != deptTime || arrivalDateTime != arriveTime) {
                                throw message.inconsistentTime;
                            }
                            log(flightNoTextView.bounds().bottom);
                            if (flightNoTextView.bounds().bottom > 1530) {
                                // 移动一点点，避免点击到底下筛选栏
                                swipe(_env.screenWidth / 2, 1260, _env.screenWidth / 2, 1200, 500);
                                sleep(800);
                            }
                            sleep(2000);
                            // 选择该航班 
                            APP.clickArea(flightNoTextView);
                            throw '找到航班';
                        }
                    }
                });
            } catch (error) {
                log(error)
                if (error == message.inconsistentTime) {
                    throw error;
                } else if (error == message.foundFlight) {
                    break;
                }
            }
        }

        if (lastFlightNo == currentFlightNo) {
            throw '找不到航班' + fullFlightNo;
        }
    },
    /**
     * 获取所有价格
     * @param {object} adultCabinPriceInfo 成人价格信息
     * @returns 
     */
    getAllPrice: function (adultCabinPriceInfo) {
        let scrollView = className(VIEW).scrollable().findOne();
        let pre = 0;
        let current = scrollView.boundsInParent().bottom;

        // 获取所有价格
        let allPrice = [];

        while (pre != current) {
            try {
                scrollView = className(VIEW).depth(10).scrollable().findOne();
                let priceItem = scrollView.find(className(VIEW).depth(11).clickable(false)).toArray();
                log('价格的数量：' + priceItem.length);
                priceItem.forEach((element, elementIndex) => {
                    // 排除第一、二块，第一块是航班信息，第二个是选择舱等及价格
                    if (elementIndex < 2) {
                        log(elementIndex);
                        return;
                    }
                    // 排除存在超值券包、超值礼包的价格块 
                    if (element.findOne(textContains('超值券包'))) {
                        log('排除包含“超值券包”价格块');
                        return;
                    }
                    let ticketPriceText = element.child(0).text();
                    let ticketPrice = parseFloat(ticketPriceText.substring(1));
                    log('获取到的价格' + ticketPrice);
                    let allPriceNotExist = allPrice.filter(p => p.ticketPrice == ticketPrice).length;
                    if (allPriceNotExist == 0) {
                        allPrice.push({
                            ticketPrice: ticketPrice, // APP价格 
                            settlementPrice: ticketPrice, // app结算价 = app票面价 - 立减，
                            sellPrice: parseFloat(ticketPrice - adultCabinPriceInfo.settlementPrice).toFixed(1), // 销售价=app票面价-ota结算价
                        })
                    }
                });
            } catch (error) {
                throw error;
            } finally {
                pre = current;
                current = pricePageNextPage(scrollView);
            }
        }
        // 排序
        allPrice.sort((a, b) => a.ticketPrice - b.ticketPrice);

        if (ENV.debugMode) {
            log("所有价格排序： %s", JSON.stringify(allPrice))
        }

        if (pre == current) {
            // 回到顶部 
            while (scrollView.scrollBackward()) {
                scrollView.scrollBackward();
            }
            pre = 0;
            sleep(800);
            scroll300();
        }
        return allPrice;
    },
    /**
    * 成人价格比较
    * @param {object} curPrice // 比较票面价符合的数据
    * @param {object} createOrderRuleInfo 
    */
    adultPriceCompare: function (curPrice, adultCabinPriceInfo, createOrderRuleInfo) {
        log('成人价格信息：' + JSON.stringify(adultCabinPriceInfo));
        // 票面价比较 
        if (createOrderRuleInfo.ticketPriceFloatRange != null) {
            let ticketPriceUpper = createOrderRuleInfo.ticketPriceFloatRange.upperLimit + adultCabinPriceInfo.ticketPrice;
            let ticketPriceLower = createOrderRuleInfo.ticketPriceFloatRange.lowerLimit + adultCabinPriceInfo.ticketPrice;
            log('票面价上限%s，票面价下限%s', ticketPriceUpper, ticketPriceLower);
            log('航司票面价%s', curPrice.ticketPrice);
            if (curPrice.ticketPrice >= ticketPriceLower && curPrice.ticketPrice <= ticketPriceUpper) { } else {
                let ticketPriceValue = Math.abs(parseFloat(curPrice.ticketPrice - adultCabinPriceInfo.ticketPrice).toFixed(1));
                // 票面价低于票面价浮动幅度范围下限，则报错：票面价比ota票面价低"航司票面价-ota票面价的绝对值"，过低，请检查降舱降价规则。
                if (curPrice.ticketPrice < ticketPriceLower) {
                    throw "票面价比ota票面价低" + ticketPriceValue + "，过低，请检查降舱降价规则。实际查询到的票面" + curPrice.ticketPrice;
                }
                // 票面价高于票面价浮动幅度范围上限，则报错：票面价比ota票面价高"航司票面价-ota票面价的绝对值"，过高，请检查降舱降价规则。
                if (curPrice.ticketPrice > ticketPriceUpper) {
                    throw "票面价比ota票面价高" + ticketPriceValue + "，过高，请检查降舱降价规则。实际查询到的票面" + curPrice.ticketPrice;
                }
            }
        }

        // 比较成人结算价 
        if (createOrderRuleInfo.settlementPriceFloatRange != null) {
            let settlementPriceUpper = createOrderRuleInfo.settlementPriceFloatRange.upperLimit + adultCabinPriceInfo.settlementPrice;
            let settlementPriceLower = createOrderRuleInfo.settlementPriceFloatRange.lowerLimit + adultCabinPriceInfo.settlementPrice;
            if (ENV.debugMode) {
                log('结算价上限%s，票面价下限%s', settlementPriceUpper, settlementPriceLower);
                log('航司结算价%s', curPrice.settlementPrice);
            }
            // 符合结算价<=下限 结算价>=上限
            if (curPrice.settlementPrice >= settlementPriceLower && curPrice.settlementPrice <= settlementPriceUpper) { } else {
                let settlementPriceValue = Math.abs(parseFloat(curPrice.settlementPrice - adultCabinPriceInfo.settlementPrice).toFixed(1));
                // 结算价低于结算价浮动幅度范围下限，则报错：结算金额赚"航司结算价-ota结算价的绝对值"，过高，请检查出票规则。
                if (curPrice.settlementPrice < settlementPriceLower) {
                    throw "结算金额赚" + settlementPriceValue + "，过低，请检查出票规则。实际查询到的产品类型、票面和舱位" + curPrice.settlementPrice;
                }
                // 结算价高于结算价浮动幅度范围上限，则报错：结算金额亏"航司结算价-ota结算价的绝对值"过高，请检查出票规则。
                if (curPrice.settlementPrice > settlementPriceUpper) {
                    throw "结算金额亏" + settlementPriceValue + "，过高，请检查出票规则。实际查询到的产品类型、票面和舱位" + curPrice.settlementPrice;
                }
            }
        }

        // 比较成人销售价：销售价=APP票面价-OTA结算价
        if (createOrderRuleInfo.sellPriceFloatRange != null) {
            let sellPriceUpper = createOrderRuleInfo.sellPriceFloatRange.upperLimit;
            let sellPriceLower = createOrderRuleInfo.sellPriceFloatRange.lowerLimit;
            if (ENV.debugMode) {
                log('销售价上限%s，销售价下限%s', sellPriceUpper, sellPriceLower);
                log('销售价%s', curPrice.sellPrice);
            }
            // 符合结算价<=下限 结算价>=上限
            if (curPrice.sellPrice >= sellPriceLower && curPrice.sellPrice <= sellPriceUpper) { } else {
                let sellPriceValue = Math.abs(parseFloat(curPrice.ticketPrice - adultCabinPriceInfo.settlementPrice).toFixed(1));
                log("销售价" + sellPriceValue)
                // 票面价低于销售价浮动范围下限，则报错：票面价比ota优惠价低"航司票面价-ota结算价的绝对值"，过低，请检查降舱降价规则。
                if (curPrice.sellPrice < sellPriceLower) {
                    throw "结算金额赚" + sellPriceValue + "，过低，请检查降舱降价规则。实际查询到的票面" + curPrice.ticketPrice;
                }
                // 票面价高于销售价浮动范围上限，则报错：票面价比ota优惠价高"航司票面价-ota优惠价的绝对值"，过高，请检查降舱降价规则。
                if (curPrice.sellPrice > sellPriceUpper) {
                    throw "结算金额亏" + sellPriceValue + "，过高，请检查降舱降价规则。实际查询到的票面" + curPrice.ticketPrice;
                }
            }
        }
    },
    /**
     * 点击预订
     * @param {*} eligiblePrices 符合的价格
     */
    clickXG: function (eligiblePrices) {
        let booking = null;
        let scrollView = className(VIEW).scrollable().findOne();
        while (!scrollView) {
            scrollView = className(VIEW).scrollable().findOne();
        }

        let pre = 0;
        let current = scrollView.boundsInParent().bottom;

        while (pre != current) {
            try {
                scrollView = className(VIEW).scrollable().findOne();
                let priceItem = scrollView.find(className(VIEW).depth(11).clickable(false)).toArray();
                log('价格的数量：' + priceItem.length);
                let bookBtnItem = scrollView.find(text('订'));
                log('订的数量：' + bookBtnItem.size());
                // 找到对应的低价点击选购  
                priceItem.forEach((element, elementIndex) => {
                    // 排除第一、二块，第一块是航班信息，第二个是选择舱等及价格
                    if (elementIndex < 2) {
                        log(elementIndex);
                        return;
                    }
                    // 排除存在超值券包、超值礼包的价格块 
                    if (element.findOne(textContains('超值券包'))) {
                        log('排除包含“超值券包”价格块');
                        return;
                    }
                    let ticketPriceText = element.child(0).text();
                    let ticketPrice = parseFloat(ticketPriceText.substring(1));
                    log('获取到的价格：' + ticketPrice);
                    // 符合价格
                    if (ticketPrice == eligiblePrices[0].ticketPrice) {
                        log(bookBtnItem.get(elementIndex).bounds().bottom)
                        if (bookBtnItem.get(elementIndex).bounds().bottom > 1500) {
                            scroll300();
                            sleep(1000);
                        }
                        log('索引：' + elementIndex);
                        // 点击预订
                        bookBtnItem.get(elementIndex).parent().click()
                        booking = true;
                        sleep(2000);
                        throw '预订';
                    }
                });
            } catch (error) {
                log('捕获到的异常：' + error);
                if (error == '预订') {
                    pre = 0;
                    current = 0;
                }
            } finally {
                if (pre != current) {
                    pre = current;
                    current = pricePageNextPage(scrollView);
                }
            }
        }

        if (ENV.debugMode) {
            log('是否点击预订');
            log(booking);
        }

        if (booking == null) {
            log("未找到符合价格的航班" + JSON.stringify(allPriceResult(allPrice)));
            throw "未找到符合价格的航班" + JSON.stringify(allPriceResult(allPrice));
        }
    },
    /**
     * 点击订
     * @param {array} cabinPriceInfos 价格信息
     * @param {Object} createOrderRuleInfo  验价规则 
     */
    findPrice: function (cabinPriceInfos, createOrderRuleInfo) {
        sleep(1000);

        scroll300();

        let adultCabinPriceInfo = cabinPriceInfos.filter(c => c.type == 0)[0];// 比较成人的价格

        // 票面价上限和下限
        let ticketPriceUpper = 0;
        let ticketPriceLower = 0;
        if (createOrderRuleInfo.ticketPriceFloatRange != null) {
            ticketPriceUpper = createOrderRuleInfo.ticketPriceFloatRange.upperLimit + adultCabinPriceInfo.ticketPrice;
            ticketPriceLower = createOrderRuleInfo.ticketPriceFloatRange.lowerLimit + adultCabinPriceInfo.ticketPrice;
            log('票面价上限%s，票面价下限%s', ticketPriceUpper, ticketPriceLower);
        }

        // 获取所有价格
        let allPrice = this.getAllPrice(adultCabinPriceInfo);

        // 将符合票面价上限和下限的另外单独保存
        let eligiblePrices = [];
        for (let index = 0; index < allPrice.length; index++) {
            let element = allPrice[index];
            // 只会比较单个成人票面价
            if (element.ticketPrice >= ticketPriceLower && element.ticketPrice <= ticketPriceUpper) {
                eligiblePrices.push({
                    ticketPrice: element.ticketPrice,
                    settlementPrice: element.settlementPrice,
                    sellPrice: element.sellPrice
                });
            }
        }
        log('剩余符合的价格：' + JSON.stringify(eligiblePrices));

        if (eligiblePrices.length == 0) {
            throw '价格不符，实际查到的价格：' + JSON.stringify(allPriceResult(allPrice));
        } else {
            this.adultPriceCompare(eligiblePrices[0], adultCabinPriceInfo, createOrderRuleInfo);
        }

        // 点击订
        this.clickXG(eligiblePrices);
    }
}


function indexOf(array, element) {
    let index = -1;
    if (array.length > 0) {
        for (index = 0; index < array.length; index++) {
            // if (ENV.debugMode) {
            //     log("%s == %s => %s", element, array[index], element == array[index]);
            // }
            if (element == array[index]) {
                break;
            }
        }
    }

    if (index === array.length) {
        index = -1;
    }

    return index;
}

function slide(x1, x2, swipeCount) {
    swipe(x1, swipeheight, x2, (swipeheight + swipeCount * barHeight), 800);
}
// 滑动某天：curDay页面的天或者当天，targetDay目标天
function scrollDay(curDay, targetDay) {
    //滑动选月
    if (ENV.debugMode) {
        log('正在自动找日：%s', targetDay);
    }
    let dayOfDifference = parseInt(curDay - parseInt(targetDay.replace(/\b(0+)/gi, "")));
    if (ENV.debugMode) {
        log('与当前日相差：%s', dayOfDifference);
    }
    let round = 0;
    let mod = 0;
    if (dayOfDifference < 0) {
        round = Math.floor((-dayOfDifference) / 10); // 向下取整,丢弃小数部分
        mod = (-dayOfDifference) % 10; //取余
    } else {
        round = Math.floor(dayOfDifference / 10); // 向下取整,丢弃小数部分
        mod = dayOfDifference % 10; //取余
    }
    if (ENV.debugMode) {
        log('日取整：%s,日取余：%s', round, mod);
    }
    sleep(500); //等待日历控件出现
    let dayXPos = text('确定').findOne().bounds().centerX();
    //滑动选年
    if (round > 0) {
        for (let index = 0; index < round; index++) {
            slide(dayXPos, dayXPos, dayOfDifference > 0 ? 10 : -10);
            sleep(300);
        }
    }
    if (mod > 0) {
        slide(dayXPos, dayXPos, dayOfDifference > 0 ? mod : -mod);
        sleep(300);
    }
}
// 滑动某月：curMonth页面的月或者当月，targetMonth目标月
function scrollMonth(curMonth, targetMonth) {
    //滑动选月
    if (ENV.debugMode) {
        log('正在自动找月份：%s', targetMonth);
    }
    let monthOfDifference = parseInt(curMonth - parseInt(targetMonth.replace(/\b(0+)/gi, "")));
    if (ENV.debugMode) {
        log('与当前月相差：%s', monthOfDifference);
    }
    let round = 0;
    let mod = 0;
    if (monthOfDifference < 0) {
        round = Math.floor((-monthOfDifference) / 10); // 向下取整,丢弃小数部分
        mod = (-monthOfDifference) % 10; //取余
    } else {
        round = Math.floor(monthOfDifference / 10); // 向下取整,丢弃小数部分
        mod = monthOfDifference % 10; //取余
    }
    if (ENV.debugMode) {
        log('月份取整：%s,月份取余：%s', round, mod);
    }
    sleep(500); //等待日历控件出现
    //滑动选月份
    if (round > 0) {
        for (let index = 0; index < round; index++) {
            slide(_env.screenWidth / 2, _env.screenWidth / 2, monthOfDifference > 0 ? 10 : -10);
            sleep(300);
        }
    }
    if (mod > 0) {
        slide(_env.screenWidth / 2, _env.screenWidth / 2, monthOfDifference > 0 ? mod : -mod);
        sleep(300);
    }
}
// 滑动某年：curYear页面的年或者当年，targetYear目标年
function scrollYear(curYear, targetYear) {
    //滑动选年
    if (ENV.debugMode) {
        log('正在自动找年份%s', targetYear);
    }
    let yearOfDifference = parseInt(curYear - parseInt(targetYear));
    if (ENV.debugMode) {
        log('年份差：%s', yearOfDifference);
    }
    let round = 0;
    let mod = 0;
    if (yearOfDifference < 0) {
        // 上滑
        round = Math.floor((-yearOfDifference) / 10); // 向下取整,丢弃小数部分
        mod = (-yearOfDifference) % 10; //取余
    } else {
        // 下滑
        round = Math.floor(yearOfDifference / 10); // 向下取整,丢弃小数部分
        mod = yearOfDifference % 10; //取余
    }
    if (ENV.debugMode) {
        log('月份取整：%s,月份取余：%s', round, mod);
    }
    sleep(500); //等待日历控件出现
    //滑动选年
    if (round > 0) {
        for (let index = 0; index < round; index++) {
            slide(_env.screenWidth / 3 / 2, _env.screenWidth / 3 / 2, yearOfDifference > 0 ? 10 : -10);
            sleep(300);
        }
    }
    if (mod > 0) {
        slide(_env.screenWidth / 3 / 2, _env.screenWidth / 3 / 2, yearOfDifference > 0 ? mod : -mod);
        sleep(300);
    }
}
// 名单信息中录入年月日
function selectBirth(birth) {
    let birthdayInput = APP.waitForDesc("f_major_bundle|passengerEdit|birthdayInput_textValue");
    // 点击出生日期
    APP.clickArea(birthdayInput);
    sleep(800);

    // 目标年月日
    let births = birth.split('-');
    let year, month, day = '';
    if (births.length > 2) {
        let date = new Date("1990-01-01");
        year = date.getFullYear(); //获取完整的年份(4位)19870728
        month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        day = date.getDate(); //获取当前日(1-31) 
    }
    log('开始选择年月日 ' + birth);
    scrollYear(year, births[0]);
    scrollMonth(month, births[1]);
    scrollDay(day, births[2]);
    // 点击确定
    sleep(300);
    let confirmBtn = APP.waitForContainsText("确定");
    APP.clickArea(confirmBtn);
    sleep(500);
}
// 新增乘机人
function addPassengers(passengers, contactInfo) {
    sleep(5000);

    let error = APP.waitForContainsText("该价格的机票已经售完", 100, 3000);
    if (error) {
        APP.clickByTextContains("确定");
        throw "抱歉，该价格的机票已经售完，请重新搜索";
    }

    let error1 = APP.waitForContainsText("您预订的航班已经售完", 100, 3000);
    if (error1) {
        APP.clickByTextContains("确定");
        throw "您预订的航班已经售完";
    }
    log('点击更多乘机人 / 新增乘机人');
    let addPassengerBtn = APP.getByDesc("f_major_bundle_rn|QunarBooking|PassengerAddButton");
    APP.clickArea(addPassengerBtn);
    sleep(2000);

    // 等待选择乘机人出现
    APP.waitForContainsText("选择乘机人", 100, 4000);

    let targetIdCardNos = []; // 目标用户
    passengers.forEach(p => targetIdCardNos.push(p.identityInfo.cardNo));

    let needCheckedPassengers = []; //需要选择的用户

    // 取消选择已选择的乘机人
    cancleChecked();
    sleep(3000);

    // 获取所有已存在的乘机人
    let existPassengers = existPassengersFn();
    sleep(3000);
    log('已存在的乘机人' + JSON.stringify(existPassengers));

    // 不存在則新增，存在則等待勾選
    passengers.forEach(p => {
        if (indexOf(existPassengers, p.identityInfo.cardNo) < 0) {
            // 2人以上点击新增乘机人会出现先选择乘机人页面，如果是1人，则直接新增乘机人
            const barTitle = APP.waitForDesc('qdNavBar#title');
            if (barTitle.child(0).text().indexOf('选择乘机人') > -1) {
                // 点击手动输入新增
                let addBtn = APP.getByTextContains("手动输入新增");
                APP.clickArea(addBtn.parent());
            }
            sleep(5000);
            // 新增乘机人
            addOrEditPassenger(p);
        } else {
            needCheckedPassengers.push(p.identityInfo.cardNo);
        }
    });
    log('需要选择的乘机人' + JSON.stringify(needCheckedPassengers));
    sleep(5000);

    // 选择已存在的乘机人
    let checkedPassenger = checkedExistPassengerFn(needCheckedPassengers, targetIdCardNos);
    if (checkedPassenger.length != needCheckedPassengers.length) {
        throw '添加乘机人有误';
    }
    sleep(5000);

    // 点击确定
    let confirmBtn = APP.waitForDesc("f_major_bundle_rn|PassengerList|save", 100, 1000);
    if (confirmBtn) {
        APP.clickArea(confirmBtn);
    }

    sleep(2000);
    let adultNum = 0; // 明细里的成人数量
    let childNum = 0; // 明细里的儿童数量
    let infantNum = 0; // 明细里的儿童数量
    let countUiObject = APP.waitForContainsText('已选');
    log(countUiObject);
    let nums = countUiObject.text().match(/\d+(.\d+)?/g);
    log('获取到的已选人数：' + JSON.stringify(nums))
    if (nums.length > 0) {
        adultNum = nums[0];
        if (ENV.debugMode) {
            log("APP成人人数：" + adultNum);
        }
        // 是否含有儿童文字,第二组数字都是儿童
        if (countUiObject.text().indexOf('儿童') > -1) {
            childNum = nums.length > 1 ? nums[1] : 0;
            if (ENV.debugMode) {
                log("APP儿童人数：" + childNum);
            }
        }
        // 是否含有婴儿文字
        if (countUiObject.text().indexOf('婴儿') > -1) {
            infantNum = nums.length > 1 ? nums[nums.length - 1] : 0;
            if (ENV.debugMode) {
                log("APP婴儿人数：" + infantNum);
            }
        }
    }
    const adultCount = passengers.filter(p => p.type == 0).length;
    const childCount = passengers.filter(p => p.type == 1).length;
    const infantCount = passengers.filter(p => p.type == 2).length;
    log('成人目标数量%s，实际下单人数%s', adultCount, adultNum);
    log('儿童目标数量%s，实际下单人数%s', childCount, childNum);
    log('婴儿目标数量%s，实际下单人数%s', infantCount, infantNum);
    if ((adultCount != adultNum) || (childCount != childNum) || (infantCount != infantNum)) {
        throw 'APP下单人数与目标人数不一致，请重新下单。成人：' + adultNum + '，儿童：' + childNum + '，婴儿：' + infantNum;
    }

    // 联系方式 
    let contactInput = APP.waitForDesc("f_major_bundle_rn|QunarBooking|ContactPhoneInput_TextInput");
    contactInput.click();
    sleep(300);
    contactInput.setText(contactInfo.phone);

    // 点击其他地方把键盘隐藏
    sleep(300);
    click(device.width - 1, 500);

    let scrollBottom = APP.waitForDesc("f_major_bundle_rn|QunarBooking|ScrollView");
    APP.scrollForward(scrollBottom);
}
// 取消默认勾选的乘机人
function cancleChecked() {
    // 取消默认选中的乘机人// 乘机人滚动块
    const existPassengerScrollView = className(SCROLL_VIEW).findOne(); // 滑动块 
    const cancleCheckedPassenger = existPassengerScrollView.find(desc("f_major_bundle_rn|PassengerList|passengerItem")).toArray(); // 乘机人块
    cancleCheckedPassenger.forEach(element => {
        let checkedItem = element.findOne(descEndsWith("qdCheckBox#true#false"));
        if (checkedItem) {
            APP.clickArea(checkedItem);
        }
        sleep(1000);
    });
}
// 获取所有已存在的乘机人
function existPassengersFn() {
    let lastCardNo = '';
    let currentCardNo;
    // 分页
    function nextPage(scrollView) {
        APP.scrollForward(scrollView);
    }
    // 获取所有已存在的用户
    let existPassengers = [];
    while (lastCardNo != currentCardNo) {
        lastCardNo = currentCardNo;
        let existPassengerScrollView = className(SCROLL_VIEW).findOne(); // 滑动块
        let passengerList = existPassengerScrollView.find(desc("f_major_bundle_rn|PassengerList|passengerItem")).toArray(); // 乘机人块
        if (passengerList.length > 0) {
            passengerList.forEach((p) => {
                let idCardNoText = "";
                let idCardNo = "";
                let idCardNoUiObject = p.findOne(desc("f_major_bundle_rn|PassengerList|cardDesc_身份证"));
                if (idCardNoUiObject != null) {
                    idCardNoText = idCardNoUiObject.text();
                }
                let hzUiObject = p.findOne(desc("f_major_bundle_rn|PassengerList|cardDesc_护照"));
                if (hzUiObject != null) {
                    idCardNoText = hzUiObject.text();
                }
                if (idCardNoText.indexOf("身份证") > -1) {
                    idCardNo = idCardNoText.substring(4).replaceAll(" ", "");
                } else if (idCardNoText.indexOf("护照") > -1) {
                    idCardNo = idCardNoText.substring(3).replaceAll(" ", "");
                }
                currentCardNo = idCardNo;
                // 不存在该乘客才追加
                let existPsg = existPassengers.filter(e => e == idCardNo);
                if (existPsg.length == 0) {
                    existPassengers.push(idCardNo);
                }
            });
        }
        nextPage(existPassengerScrollView);
    }
    if (lastCardNo == currentCardNo) {
        // 滚动回顶部
        const selectPassengerScroll = className(SCROLL_VIEW).findOne(); // 滑动块;
        while (selectPassengerScroll.scrollBackward()) {
            selectPassengerScroll.scrollBackward();
            sleep(200);
        }
    }
    return existPassengers;
}
// 选择已存在的乘机人
function checkedExistPassengerFn(needCheckedPassengers, targetIdCardNos) {
    // 滚动回顶部
    log('回滚到顶部')
    APP.swipeToTop();

    log('开始选择已存在的乘机人')
    let checkedPassenger = [];
    let lastCardNoText = '';
    let currentCardNoText;

    function nextPage(scrollView) {
        APP.scrollForward(scrollView);
    }

    while (checkedPassenger.length != needCheckedPassengers.length) {
        lastCardNoText = currentCardNoText;
        log(lastCardNoText + '===' + currentCardNoText);
        let checkedPassengerScrollView = className(SCROLL_VIEW).findOne(); // 滑动块
        let passengerList = checkedPassengerScrollView.find(desc("f_major_bundle_rn|PassengerList|passengerItem")).toArray(); // 乘机人块
        if (passengerList.length > 0) {
            passengerList.forEach((p, i) => {
                let idCardNoText = "";
                let idCardNo = "";
                if (!p) {
                    return;
                }
                let idCardNoUiObject = p.findOne(desc("f_major_bundle_rn|PassengerList|cardDesc_身份证"));
                if (idCardNoUiObject != null) {
                    idCardNoText = idCardNoUiObject.text();
                }
                let hzUiObject = p.findOne(desc("f_major_bundle_rn|PassengerList|cardDesc_护照"));
                if (hzUiObject != null) {
                    idCardNoText = hzUiObject.text();
                }
                if (idCardNoText.indexOf("身份证") > -1) {
                    idCardNo = idCardNoText.substring(4).replaceAll(" ", "");
                } else if (idCardNoText.indexOf("护照") > -1) {
                    idCardNo = idCardNoText.substring(3).replaceAll(" ", "");
                }
                currentCardNoText = idCardNo;
                if (indexOf(targetIdCardNos, idCardNo) > -1) {
                    if (indexOf(needCheckedPassengers, idCardNo) > -1) {
                        // 一页可以获取11个左右的用户，超过7个之后无法选中乘机人，需要滑动一页
                        if (i > 5) {
                            nextPage(checkedPassengerScrollView);
                            sleep(1000);
                        }
                        let checkedItem = p.findOne(descEndsWith("qdCheckBox#false#false"));
                        log(checkedItem);
                        if (checkedItem) {
                            APP.clickArea(checkedItem);
                            checkedPassenger.push(idCardNo);
                            if (ENV.debugMode) {
                                log("已选中乘机人 %s", idCardNo)
                            }
                        }
                    }
                }
            });
        }
        log('滑动下一页');
        nextPage(checkedPassengerScrollView);
    }
    if (lastCardNoText == currentCardNoText) {
        // 滚动回顶部
        const selectPassengerScroll = className(SCROLL_VIEW).findOne(); // 滑动块;
        while (selectPassengerScroll.scrollBackward()) {
            selectPassengerScroll.scrollBackward();
            sleep(200);
        }
    }
    return checkedPassenger;
}
// 添加乘机人
function addOrEditPassenger(passenger) {
    APP.waitForContainsText('新增乘机人', 100, 3000);
    let targetCertificateType = passenger.identityInfo.type;
    if (targetCertificateType == 0) {
        // 姓名
        let userNameInput = APP.waitForDesc("f_major_bundle_rn|QunarBooking|PassengerAddNameInput_TextInput");
        if (userNameInput) {
            APP.clickArea(userNameInput);
            sleep(200);
            userNameInput.setText(passenger.name.primary);

        }
    } else if (targetCertificateType == 1) {
        let cardTypeUiObject = APP.waitForDesc("f_major_bundle|passengerEdit|cardTypeInput_textValue");
        APP.clickArea(cardTypeUiObject.parent());
        sleep(800);
        slide(ENV.screenWidth / 2, ENV.screenWidth / 2, -1);
        sleep(300);

        let confirmBtn = APP.waitForDesc("f_major_bundle_rn|PassengerEdit|certPickerConfirm");
        APP.clickArea(confirmBtn)
        sleep(500);

        // 姓
        let subNameInput = APP.waitForDesc("f_major_bundle_rn|editPassenger|lastName_");
        subNameInput.click();
        sleep(200);
        subNameInput.setText(passenger.name.primary);
        // 名
        let givenNameInput = APP.waitForDesc("f_major_bundle_rn|editPassenger|firstName_");
        givenNameInput.click();
        sleep(200);
        givenNameInput.setText(passenger.name.secondary);
    }

    // 证件号
    let cardNoInput = APP.waitForDesc("f_major_bundle_rn|QunarBooking|PassengerAddCardNoInput_TextInput");
    cardNoInput.click();
    sleep(200);
    cardNoInput.setText(passenger.identityInfo.cardNo);

    // 手机号
    let phoneInput = APP.waitForDesc("f_major_bundle_rn|QunarBooking|PassengerAddPhoneNumInput_TextInput");
    phoneInput.click();
    if (passenger.phone) {
        sleep(200);
        phoneInput.setText(passenger.phone);
    }

    if (targetCertificateType == 1) {
        // 性别
        if (passenger.gender == 0) {
            let boyGender = APP.waitForContainsText("男");
            APP.clickArea(boyGender.parent());
        } else {
            let boyGender = APP.waitForContainsText("女");
            APP.clickArea(boyGender.parent());
        }
        // 选择出生年月
        selectBirth(passenger.birthDate);
    }

    // 点击确定按钮
    let save = APP.waitForDesc("f_major_bundle_rn|PassengerList|save", 100, 1000);
    if (save) {
        APP.clickArea(save);
        sleep(800);
    }

    // 点击保存
    let saveBtn = APP.waitForDesc("f_major_bundle_rn|QunarBooking|PassengerSaveButton", 100, 1000);
    if (saveBtn) {
        saveBtn.click();
        sleep(800);
    }

    let tip1 = APP.waitForContainsText("乘机人的姓名与历史订单不一致", 200, 500);
    if (tip1) {
        APP.clickById("atom_flight_btn_negative");
        sleep(500);
    }

    let tip2 = APP.waitForContainsText("该舱位不支持售卖婴儿票", 200, 500);
    if (tip2) {
        throw '该舱位不支持售卖婴儿票';
    }

    let tip3 = APP.waitForContainsText("该舱位不支持售卖儿童票", 200, 500);
    if (tip3) {
        throw '该舱位不支持售卖儿童票';
    }
}
// 价格比较（儿童、婴儿）
function priceCompare(passenger, actualPrices, order) {
    let childCabinPriceInfo = order.cabinPriceInfos.filter(p => p.type == 1);
    let infantCabinPriceInfo = order.cabinPriceInfos.filter(p => p.type == 2);
    let childPrice = actualPrices.filter(p => p.type === 1); //儿童
    let infantPrice = actualPrices.filter(p => p.type === 2); //婴儿
    if (passenger.type == 0) { } else if (passenger.type == 1) {
        let childTicketPrice = childPrice[0].ticketPrice;
        if (childTicketPrice != childCabinPriceInfo[0].ticketPrice) {
            throw "下单失败，儿童票面价不符合"
        }
    } else if (passenger.type == 2) {
        let infantTicketPrice = infantPrice[0].ticketPrice;
        if (infantTicketPrice != infantCabinPriceInfo[0].ticketPrice) {
            throw "下单失败，婴儿票面价不符合"
        }
    }
}
// 订单详情
function orderDetail(order) {
    // 点击明细
    let detail = APP.waitForDesc("f_major_bundle_rn|bottom_order_price|details");
    APP.clickArea(detail);
    sleep(800);

    let actualPrices = [];
    let totalPriceText = 0;
    let priceItem = desc("priceItem").find().toArray();
    let passengerTypeText = priceItem[0].findOne(desc("f_major_bundle_rn|priceItem|ageDesc")).text();
    log(passengerTypeText);
    if (passengerTypeText == "成人") {
        let ticketPriceText = priceItem[0].findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices")).text();
        let airportTaxText = priceItem[1].findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices")).text();
        let oilFeeText = priceItem[2].findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices")).text();
        if (ENV.debugMode) {
            log('票面价：' + ticketPriceText + '，基建：' + airportTaxText + '，燃油：' + oilFeeText);
        }
        order.passengers.forEach(element => {
            if (element.type == 0) {
                actualPrices.push({
                    type: element.type, //成人
                    ticketPrice: parseFloat(ticketPriceText.substring(1)), //票面价
                    settlementPrice: parseFloat(ticketPriceText.substring(1)), //票面价=票面价-直减（去哪儿没有直减）
                    airportTax: parseFloat(airportTaxText.substring(1)), // 基建
                    oilFee: parseFloat(oilFeeText.substring(1)), //燃油
                })
            }
        });
    }

    for (let index = 0; index < priceItem.length; index++) {
        let element = priceItem[index];
        if (index > 2) {
            let passengerType1UiObject = element.findOne(desc("f_major_bundle_rn|priceItem|ageDesc"));
            if (passengerType1UiObject != null && passengerType1UiObject.text() == "儿童") {
                let ticketPriceText = element.findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices")).text();
                let airportTaxText = priceItem[index + 1].findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices")).text();
                let oilFeeText = priceItem[index + 2].findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices")).text();
                if (ENV.debugMode) {
                    log('儿童票面价：' + ticketPriceText + '，基建：' + airportTaxText + '，燃油：' + oilFeeText);
                }
                order.passengers.forEach(element => {
                    if (element.type == 1) {
                        actualPrices.push({
                            type: element.type, //儿童
                            ticketPrice: parseFloat(ticketPriceText.substring(1)), //票面价
                            airportTax: parseFloat(airportTaxText.substring(1)), // 基建
                            oilFee: parseFloat(oilFeeText.substring(1)), //燃油
                        })
                    }
                });
            }
            let passengerType2UiObject = element.findOne(desc("f_major_bundle_rn|priceItem|ageDesc"));
            if (passengerType2UiObject != null && passengerType2UiObject.text() == "婴儿") {
                let ticketPriceText = element.findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices")).text();
                if (ENV.debugMode) {
                    log('婴儿票面价：' + ticketPriceText);
                }
                order.passengers.forEach(element => {
                    if (element.type == 2) {
                        actualPrices.push({
                            type: element.type, //婴儿
                            ticketPrice: parseFloat(ticketPriceText.substring(1)), //票面价
                            airportTax: 0, // 基建
                            oilFee: 0, //燃油
                        })
                    }
                });
            }
        }
    }

    // 总支付价格
    totalPriceText = APP.waitForDesc("f_major_bundle_rn|booking|Price").text();

    // 乘机人价格比较
    order.passengers.forEach((element) => {
        priceCompare(element, actualPrices, order);
    });

    // 已阅读并同意一下协议
    let aggree = APP.waitForDesc("f_major_bundle_rn|booking|ProtocolCheckBoxqdCheckBox#false#false", 100, 2000);
    if (aggree) {
        let scrollBottom = APP.waitForDesc("f_major_bundle_rn|QunarBooking|ScrollView");
        APP.scrollForward(scrollBottom);
        sleep(500);
        log('勾选已阅读并同意')
        aggree.click();
        sleep(1000);
    }

    // 点击下一步(偶尔获取不到下一步的desc值)
    let next = APP.waitForDesc("OrderFillView|OrderFillPage_OrderPriceqdButton#下一步", 100, 2000);
    if (next) {
        APP.clickArea(next);
        sleep(800);
    }

    // 点击下一步
    let next2 = APP.waitForDesc("f_major_bundle_rn|booking|submitBtn", 100, 2000);
    if (next2) {
        APP.clickArea(next2);
        sleep(800);
    }

    let t = 3000;
    let m = new Date().getTime() + t;
    while (m >= new Date().getTime()) {
        let error = APP.waitForContainsText("该价格的机票已经售完", 20, 500);
        if (error) {
            APP.clickByTextContains("确定");
            throw "该价格的机票已经售完，请重新下单";
        }
        let error1 = APP.waitForContainsText("您预订的航班已经售完", 20, 500);
        if (error1) {
            APP.clickByTextContains("确定");
            throw "您预订的航班已经售完";
        }
        let error2 = APP.waitForContainsText("票价升高", 20, 500);
        if (error2) {
            APP.clickByTextContains("重新选择");
            throw "票价升高了";
        }
        let error3 = APP.waitForContainsText("本产品购买要求至少", 20, 500);
        if (error3) {
            APP.clickByTextContains("确定");
            throw "抱歉，本产品购买要求不满足，请重新选择乘机人或其他产品";
        }
        let error4 = APP.waitForContainsText("至少包含一位", 20, 500);
        if (error4) {
            APP.clickByTextContains("确定");
            throw "至少包含一位17-25周岁（含）的旅客购买";
        }
    }

    // 点击提示框 "否"
    let cancelBtn = APP.waitForDesc("f_major_bundle_rn|booking|procuctDetainCustom|btnCancel", 100, 3000);
    if (cancelBtn) {
        log('点击提示框 "否"')
        cancelBtn.click();
    }
    sleep(5000);

    // 检测是否重复预定
    let repeatBtn = APP.waitForContainsText("继续重复预订", 100, 5000);
    if (repeatBtn) {
        if (ENV.debugMode) {
            log("点击继续重复预订")
        }
        repeatBtn.parent().click()
        sleep(1000);
    }

    // 检测是否继续预定
    let repeatBtn2 = APP.waitForContainsText("继续预订", 100, 5000);
    if (repeatBtn2) {
        if (ENV.debugMode) {
            log("点击继续预订")
        }
        repeatBtn2.parent().click();
        sleep(1000);
    }

    let thinkAgainBtn = APP.waitForContainsText("再想想", 100, 3000);
    if (thinkAgainBtn) {
        if (ENV.debugMode) {
            log("点击再想想")
        }
        thinkAgainBtn.parent().click();
        throw "乘机人已购买过相同行程航班，无法重复预定";
    }
    sleep(1000);

    // 点击去支付 
    let submitBtn = APP.waitForDesc("f_major_bundle_rn|booking|submitBtn", 100, 5000);
    if (submitBtn) {
        if (ENV.debugMode) {
            log("点击去支付")
        }
        submitBtn.parent().parent().click();
    }
    sleep(1000);

    // 关闭支付窗口
    let payBack = APP.waitForId("pub_pay_payframe_back", 100, 5000);
    log(payBack)
    if (!payBack) {
        back();
        payBack = APP.waitForId("pub_pay_payframe_back", 100, 5000);
    }
    if (payBack) {
        if (ENV.debugMode) {
            log("点击关闭支付")
        }
        payBack.click();
    }
    sleep(1000);

    // 放弃支付
    let cancelPay = APP.waitForId("pub_pay_left_button", 100, 5000);
    if (cancelPay) {
        if (ENV.debugMode) {
            log("点击放弃支付")
        }
        cancelPay.click();
    }
    sleep(5000);
    // 订单详情页获取订单号
    let orderNoText = APP.waitForContainsText("订单号", 100, 5000);
    while (!orderNoText) {
        orderNoText = APP.waitForContainsText("订单号", 100, 1000);
    }
    if (orderNoText) {
        if (ENV.debugMode) {
            log(actualPrices);
            log("订单号： %s", orderNoText.text().substring(4));
            log("总价： %s", parseFloat(totalPriceText));
        }
    }
    return {
        orderNo: orderNoText.text().substring(4),
        actualPrices: actualPrices,
        totalPrice: parseFloat(totalPriceText)
    }
}