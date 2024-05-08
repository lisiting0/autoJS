var APP = null;
var ENV = null;
var DateWidth = 0;

const DATEAPI = require('./date-api.js');
const swipeheight = 1260; // 选取可滑动的高度
const barHeight = 90; // 日期一格高度
const DATE_HEIGHT = 124;
const TOP_HEIGHT = 231;
const RMB = '¥';
const orderMessage = {
    notFoundFlight: "没找到航班",
    foundFlight: '找到航班',
    inconsistentTime: "起飞到达时间不一致",
    finished: "已经点击预定",
    foundCabinClass: "找到舱等",
    foundCardType: "找到证件类型",
    foundNationality: "找到国籍",
    insufficientSeats: "余位不足",
    ageMisMatch: "乘机人年龄不符合您预订的产品要求",
    failure: "订单下单失败",
    priceChange: "您所预订的航班票价发生变动"
};
const systemDateVal = new Date();
const systemDateYearVal = systemDateVal.getFullYear();
const systemDateMonthVal = systemDateVal.getMonth() + 1;
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
    if (!APP.waitForId('selectDate', 100, 1000)) {
        back();
    }
}
// 获取当前选中的日期
function getYMD(systemDateMonthVal, systemDateYearVal, index) {
    let mon = systemDateMonthVal + index;
    let year = systemDateYearVal;
    if (mon > 12) {
        year = systemDateYearVal + 1;
        mon = mon - 12;
    }
    if (mon < 10) {
        mon = '0' + mon;
    }
    const ymd = year + '-' + mon + '-01';
    log('日期：' + ymd);
    return ymd
}
// 检测日期
function checkDate(monthDiffer, targetDate) {
    if (monthDiffer > 0) {
        for (let index = 0; index <= monthDiffer; index++) {
            if (index == 0) {
                _muOrder.selectDate(new Date());
            } else if (index != monthDiffer) {
                const ymd = getYMD(systemDateMonthVal, systemDateYearVal, index);
                _muOrder.selectDate(new Date(ymd))
            } else if (index == monthDiffer) {
                // 跨月份，先选择目标月份的1号
                const ymd2 = getYMD(systemDateMonthVal, systemDateYearVal, index);
                _muOrder.selectDate(new Date(ymd2));

                log('准备选择目标日期：' + targetDate);
                _muOrder.selectDate(targetDate)
            }
        }
    } else {
        _muOrder.selectDate(targetDate);
    }
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
        // 当前航程是否为往返、或者多程，目标是单程，应删除
        let rootPanels = id('rootPanel').find().toArray();
        if (rootPanels.length > 1) {
            for (let index = 0; index < rootPanels.length; index++) {
                const element = rootPanels[index];
                if (index > 0) {
                    let delBtn = element.findOne(id('deleteBtnType2'));
                    if (delBtn) {
                        delBtn.click();
                    }
                }
            }

        }
        //  输入起飞到达
        this.inputDepartureAndArrive(input.flights[0].originAirport, input.flights[0].destinationAirport);

        // 获取APP日期元素
        let selectDateView = APP.getById('selectDate', 100, 5000);
        // 获取APP日期文本
        let currentSelectedDateText = selectDateView.findOne(id('date')).text();
        // 需要选择的目标日期
        let targetDate = new Date(input.flights[0].departureDateTime);
        let targetYearVal = targetDate.getFullYear();
        let targetMonthVal = targetDate.getMonth() + 1;
        let targeDateVal = targetDate.getDate();
        // 得到当前APP选中的年月
        const currentSelectedMon = currentSelectedDateText.split('-')[0];
        let date1 = parseInt(systemDateYearVal) * 12 + parseInt(currentSelectedMon);
        // 当前选中的月份与目标月份不一致，默认选择当天
        if (parseInt(currentSelectedMon) != parseInt(targetMonthVal)) {
            this.selectDate(new Date());
        }
        // 系统日期
        date1 = parseInt(systemDateYearVal) * 12 + parseInt(systemDateMonthVal);
        // 得到目标年月
        let date2 = parseInt(targetYearVal) * 12 + parseInt(targetMonthVal);
        let monthDiffer = Math.abs(date1 - date2);
        log('第一次获取到的月份差：' + monthDiffer);

        // 选择日期
        checkDate(monthDiffer, targetDate);

        const m = targetMonthVal >= 10 ? targetMonthVal : '0' + targetMonthVal;
        const d = targeDateVal >= 10 ? targeDateVal : '0' + targeDateVal;
        const md = m + '' + d;
        selectDateView = APP.getById('selectDate', 100, 5000);
        currentSelectedDateText = selectDateView.findOne(id('date')).text();
        let currendMDSpilt = currentSelectedDateText.split('-');
        let currendMD = currendMDSpilt[0] + '' + currendMDSpilt[1];
        log(md + '==' + currendMD);
        // 判断选中的日期是否和目标一致，不一致重新选
        while (md != currendMD) {
            checkDate(monthDiffer, targetDate);
            selectDateView = APP.getById('selectDate', 100, 5000);
            currentSelectedDateText = selectDateView.findOne(id('date')).text();
            currendMDSpilt = currentSelectedDateText.split('-');
            currendMD = currendMDSpilt[0] + '' + currendMDSpilt[1];
            log(md + '===' + currendMD);
        }

        // 点击预定搜索
        APP.clickById('searchBtn', 100, 5000);

        // 查找航班
        let fCard = this.findFlight(input.flights[0].fullFlightNo, input.flights);
        if (!fCard) {
            throw '找不到航班: ' + input.flights[0].fullFlightNo;
        }

        // 点击订购
        this.booking(input);

        // 编辑联系人
        this.editContactInfo(input.contactInfo);

        // 新增乘机人
        this.addPassengers(input.passengers);

        let adultNum = 0; // 明细里的成人数量
        let childNum = 0; // 明细里的儿童数量
        let infantNum = 0; // 明细里的儿童数量 
        let countUiObject = APP.waitForId('tv_result_choose_passenger', 100, 3000);
        log(countUiObject);
        let nums = countUiObject.text().match(/\d+(.\d+)?/g);
        log('获取到的成人儿童婴儿数量' + JSON.stringify(nums));
        if (nums.length > 0) {
            adultNum = nums[0];
            // 儿童
            childNum = nums[1];
            // 婴儿 
            infantNum = nums[nums.length - 1];
            if (_env.debugMode) {
                log("APP已选成人人数：" + adultNum);
                log("APP已选儿童人数：" + childNum);
                log("APP已选婴儿人数：" + infantNum);
            }
        }
        const adultCount = input.passengers.filter(p => p.type == 0).length;
        const childCount = input.passengers.filter(p => p.type == 1).length;
        const infantCount = input.passengers.filter(p => p.type == 2).length;
        log('成人目标数量%s，实际下单人数%s', adultCount, adultNum);
        log('儿童目标数量%s，实际下单人数%s', childCount, childNum);
        log('婴儿目标数量%s，实际下单人数%s', infantCount, infantNum);
        if ((adultCount != adultNum) || (childCount != childNum) || (infantCount != infantNum)) {
            throw 'APP下单人数与目标人数不一致，请重新下单。成人：' + adultNum + '，儿童：' + childNum + '，婴儿：' + infantNum;
        }

        return this.orderDetail(input);
    },
    // 输入起飞到达城市
    inputDepartureAndArrive(departure, arrive) {
        function input(city) {
            // 点击城市输入框
            let serchInput = APP.waitForId('edt_chose_search_style', 100, 4000);
            if (serchInput) {
                serchInput.click();
                sleep(300);
                serchInput.setText(city);
                sleep(1000);
            }
            sleep(2000);
            // 等待城市列表出现
            let cityResult = APP.waitForId('lin_searchResultView', 100, 2000);
            let count = 0;
            while (!cityResult && count < 5) {
                count++;
                cityResult = APP.waitForId('lin_searchResultView', 100, 2000);
            }
            if (!cityResult) {
                throw '城市列表加载有误';
            }
            const cityCodes = id('txt_city_code').find().toArray();
            if (ENV.debugMode) {
                log(cityCodes)
            }
            const airCodes = id('txt_airport_code').find().toArray();
            // 城市不一定是第一个，查询所有，一个个排除
            let checked = false;
            try {
                if (cityCodes) {
                    cityCodes.forEach(ele => {
                        if (ele && ele.text() == city) {
                            if (ENV.debugMode) {
                                log(ele.text());
                            }
                            APP.clickArea(ele);
                            sleep(500);
                            checked = true;
                            throw '已选中目标城市';
                        }
                    })
                }
                if (!checked) {
                    airCodes.forEach(airCodeEle => {
                        if (airCodeEle && airCodeEle.text() == city) {
                            if (ENV.debugMode) {
                                log(airCodeEle.text());
                            }
                            APP.clickArea(airCodeEle);
                            sleep(500);
                            throw '已选中目标城市';
                        }
                    })
                }
            } catch (error) {

            }
        }
        // 点击出发城市
        APP.clickById('clickSend', 100, 2000);
        input(departure);

        sleep(2000);

        // 点击到达城市
        APP.clickById('clickArrive', 100, 2000);
        input(arrive);

        sleep(2000);
    },
    // 选择日期
    selectDate: function (date) {
        const systemDate = new Date();
        const systemDateYear = systemDate.getFullYear();
        const systemDateMonth = systemDate.getMonth() + 1;
        const systemDateDay = systemDate.getDate();
        const targetMonth = date.getMonth() + 1;
        const targetYear = date.getFullYear();
        const targetDay = date.getDate();
        // log(new Date(targetYear, targetMonth, targetDay) + '当天日期===系统当前日期' + new Date(systemDateYear, systemDateMonth, systemDateDay))
        if (systemDateYear + '-' + systemDateMonth + '-' + systemDateDay != targetYear + '-' + targetMonth + '-' + targetDay) {
            if (date.getTime() > systemDate.getTime()) { } else {
                log('日期必须大于当天日期，目标日期：%s，当前日期：%s', date, systemDate);
                throw '日期必须大于当天日期,目标日期为：' + date + ' , 今天日期为：' + systemDate;
            }
        }

        const targetTotalMonth = (targetYear - 1) * 12 + targetMonth;
        const targetWeekCount = DATEAPI.getWeekNumInCurrentMonth(date) + 1;
        const now = new Date();
        const nowMonth = now.getMonth() + 1;
        const nowYear = now.getFullYear();
        const x = DateWidth * 0.5 + date.getDay() * DateWidth;

        let dateInputView = null;
        if (
            numberEqual(nowYear, targetYear) &&
            numberEqual(nowMonth, targetMonth)
        ) {
            if (ENV.debugMode) {
                log('目标月是今天所在的月 特殊处理');
                log('准备开始选择日期，目标日期 %s, %s',
                    targetMonth,
                    targetDay)

            }
            sleep(2000);
            dateInputView = APP.getById('selectDate');
            dateInputView.click(); // 打开日期选择页面

            sleep(3000); // 等待动画结束

            // 滚动到顶部，偶尔会失灵
            let scrollView = APP.waitForId('dpv_calendar', 100, 3000);
            let count = 0;
            while (!scrollView && count < 5) {
                count++;
                scrollView = APP.waitForId('dpv_calendar', 100, 3000);
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
            dateInputView = APP.getById('selectDate', 100, 5000);
            let currentSelectedDateText = dateInputView.findOne(id('date')).text();
            currentSelectedDateText = currentSelectedDateText.replace('-', '月');
            currentSelectedDateText = currentSelectedDateText + '日';
            currentSelectedDate = this.parseDate(currentSelectedDateText);
            currentSelectedDate.year = currentSelectedDate.month < systemDateMonth ? systemDateYear + 1 : systemDateYear;
            console.log(currentSelectedDate);
            if (
                numberEqual(currentSelectedDate.month, targetMonth) &&
                numberEqual(currentSelectedDate.day, targetDay)
            ) {
                return;
            }

            if (ENV.debugMode) {
                log(
                    '准备开始选择日期，目标日期 %s, %s 当前选中日期 %s, %s',
                    targetMonth,
                    targetDay,
                    currentSelectedDate.month,
                    currentSelectedDate.day
                );
            }

            dateInputView.click(); // 打开日期选择页面
            sleep(1000); // 等待动画结束
            if (ENV.debugMode) {
                log('打开日期选择页面');
            }

            let calendarView = APP.getById('dpv_calendar');
            let calendarPageHeight = calendarView.bounds().height();
            if (ENV.debugMode) {
                log('已获取日历控件' + calendarPageHeight);
            }

            if (ENV.debugMode) {
                log(
                    '已获取选中日期 %s, %s-%s',
                    currentSelectedDate.year,
                    currentSelectedDate.month,
                    currentSelectedDate.day
                );
            }

            // 当前选中月份下边沿
            let currentMonthViewBottom = 377;

            // 计算目标月份位置
            let monthDelta =
                parseInt(targetTotalMonth) -
                (parseInt((currentSelectedDate.year - 1) * 12) +
                    parseInt(currentSelectedDate.month));

            if (monthDelta < 0) {
                // 目标月小于当前月，需要向上
                let m = {
                    year: currentSelectedDate.year,
                    month: currentSelectedDate.month,
                    day: currentSelectedDate.day,
                };

                let y = currentMonthViewBottom - DATE_HEIGHT; // 目标日期所在的坐标

                while (true) {
                    // 向前一个月
                    m.month--;
                    if (m.month < 1) {
                        m.month = 12;
                        m.year--;
                    }

                    let mWeekCount =
                        DATEAPI.getWeekNumInCurrentMonth(new Date(m.year, m.month, 0)) + 1;

                    if (ENV.debugMode) {
                        log('已向前一个月 %s年%s月 总周数 %s', m.year, m.month, mWeekCount);
                    }

                    if (
                        numberEqual(m.year, targetYear) &&
                        numberEqual(m.month, targetMonth)
                    ) {
                        // 找到需要的月份

                        let r = mWeekCount - targetWeekCount;
                        if (ENV.debugMode) {
                            log('剩余周数 ' + r);
                        }

                        y -= r * DATE_HEIGHT + DATE_HEIGHT * 0.5;
                        break;
                    } else {
                        // 这个月不是 直接跳过整月
                        let monthSize = DATE_HEIGHT + mWeekCount * DATE_HEIGHT;
                        y -= monthSize;
                    }
                }

                if (ENV.debugMode) {
                    log('找到y轴偏移量 %s 开始翻页', y);
                }

                while (!(y > TOP_HEIGHT && y < ENV.screenHeight)) {
                    if (ENV.debugMode) {
                        log('当前y坐标 %s 不在屏幕内，上翻一页', y);
                    }
                    calendarView.scrollBackward();
                    sleep(700); // 等待翻页动画
                    y += calendarPageHeight;
                }

                clickDateButton(x, y);
            } else if (monthDelta > 0 && monthDelta < 7) {
                // 需要向下
                let m = {
                    year: currentSelectedDate.year,
                    month: currentSelectedDate.month,
                    day: currentSelectedDate.day,
                };

                let mWeekCount =
                    DATEAPI.getWeekNumInCurrentMonth(new Date(m.year, m.month, 0)) + 1;

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

                    mWeekCount =
                        DATEAPI.getWeekNumInCurrentMonth(new Date(m.year, m.month, 0)) + 1;

                    if (ENV.debugMode) {
                        log('已向后一个月 %s年%s月 总周数 %s', m.year, m.month, mWeekCount);
                    }

                    if (
                        numberEqual(m.year, targetYear) &&
                        numberEqual(m.month, targetMonth)
                    ) {
                        // 找到需要的月份

                        y += targetWeekCount * DATE_HEIGHT + DATE_HEIGHT * 0.5;
                        break;
                    } else {
                        // 这个月不是 直接跳过整月
                        let monthSize = DATE_HEIGHT + mWeekCount * DATE_HEIGHT;
                        y += monthSize;
                    }
                }

                if (ENV.debugMode) {
                    log('找到y轴偏移量 %s 开始翻页', y);
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
            } else if (monthDelta >= 7) {
                log('targetTotalMonth ' + targetTotalMonth);
                log('currentSelectedDate.year ' + currentSelectedDate.year);
                log('currentSelectedDate.month ' + currentSelectedDate.month);
                let a =
                    parseInt((currentSelectedDate.year - 1) * 12) +
                    parseInt(currentSelectedDate.month);
                log('x ' + a);
                throw '暂不支持 超过当前6个月的日期输入 当前月份差值' + monthDelta;
            } else {
                // 当前月 不需要滑动
                // 获取目标日期所在周数
                if (ENV.debugMode) {
                    log('月份不变');
                    log('目标日期当月周数 %s', targetWeekCount);
                }
                let y =
                    currentMonthViewBottom +
                    targetWeekCount * DATE_HEIGHT -
                    DATE_HEIGHT * 0.5;
                clickDateButton(x, y);
            }
        }
    },
    // 日期转换
    parseDate: function (dateStr) {
        const dateRegex = /((\d{4})年)?(\d{1,2})月((\d{1,2})日)?/;
        const result = dateRegex.exec(dateStr);
        return {
            year: result[2],
            month: result[3],
            day: result[5],
        };
    },
    // 查找航班
    findFlight: function (fullFlightNo, flights) {
        sleep(5000);

        // 关闭提示框
        APP.closeDialog();

        sleep(2000);

        // 查找航班
        let flightListContainer = APP.waitForId('flightlist_rv', 100, 10000);
        if (!flightListContainer) {
            throw '您选择的航线暂无航班计划，请您更换行程重新查询';
        }

        let lastFlightNo = '';
        let currentFlightNo;

        let f = findFlightInCurrentPage(fullFlightNo, flights);
        if (f) {
            if (ENV.debugMode) {
                console.log('找到' + fullFlightNo);
            }
            return f;
        }

        function nextPage(flightListContainer) {
            APP.scrollForward(flightListContainer);
            flightListContainer = APP.getById('flightlist_rv');
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

        function findFlightInCurrentPage(fullFlightNo, flights) {
            let findFullFlightNo = null;
            try {
                let flightContainer = APP.waitForId('flightlist_rv', 100, 10000);
                if (!flightContainer) {
                    throw orderMessage.notFoundFlight;
                }
                let flightItems = flightContainer.children().toArray();
                if (ENV.debugMode) {
                    log(flightItems.length);
                    log('准备查找航班' + fullFlightNo);
                }
                flightItems.forEach(element => {
                    let flightNos = element.find(id('flightlist_multiple_item_name_tv'));
                    if (flightNos.size() == 0) {
                        return;
                    }
                    let flightNo = flightNos.get(0).text().trim();
                    currentFlightNo = flightNo;
                    if (ENV.debugMode) {
                        log('航班号：' + flightNo);
                    }
                    // 中转的不要
                    if (flightNos.length > 2) {
                        log('中转的不要');
                        return;
                    }
                    if (fullFlightNo == flightNo) {
                        let departureTimeUiObject = element.findOne(id('item_flightlist_tv_starttime'));
                        let departureTime = departureTimeUiObject.text();
                        log("找到的起飞时间：" + departureTime);
                        let arriveTimeUiObject = element.findOne(id('item_flightlist_tv_arraivetime'));
                        let arriveTime = arriveTimeUiObject.text();
                        log("找到的到达时间：" + arriveTime);
                        let departureDate = getHourAndMin(flights[0].departureDateTime);
                        let arrivalDate = getHourAndMin(flights[0].arrivalDateTime);
                        log('目标起飞时间%s，目标到达时间', departureDate, arrivalDate);
                        if (departureTime != departureDate && arriveTime != arrivalDate) {
                            throw orderMessage.inconsistentTime;
                        }
                        APP.clickArea(element);
                        findFullFlightNo = flightNo;
                        throw orderMessage.foundFlight;
                    }
                });
            } catch (error) {
                log(error);
                if (error == orderMessage.foundFlight) {
                    findFullFlightNo = fullFlightNo;
                } else if (error == orderMessage.notFoundFlight) {
                    findFullFlightNo = null;
                } else if (error == orderMessage.inconsistentTime) {
                    throw orderMessage.inconsistentTime;
                }
            }
            return findFullFlightNo;
        }

        while (lastFlightNo != currentFlightNo) {
            lastFlightNo = currentFlightNo;
            let flightListContainer = APP.waitForId('flightlist_rv', 100, 10000);
            nextPage(flightListContainer);
            f = findFlightInCurrentPage(fullFlightNo);
            if (f) {
                if (ENV.debugMode) {
                    log('找到' + fullFlightNo);
                }
                break;
            }
        }
        return f;
    },
    // 点击订购或选购
    booking: function (input) {
        sleep(2000);

        // 关闭提示框
        APP.closeDialog();

        let scrollView = APP.waitForId('scroll_view', 100, 8000);
        let pre = 0;
        let current = scrollView.boundsInParent().bottom;

        function nextPage(scrollView) {
            APP.scrollForward(scrollView);
            scrollView = APP.getById('scroll_view');
            let c = scrollView.boundsInParent().bottom;
            return c;
        }

        // 每次进来先滑动一页
        pre = current;
        current = nextPage(scrollView);

        // 找到符合的价格和产品类型，并按低价拍排序
        let tempCabinTypeAndPrice = [];
        let allCabinTypeAndPrice = [];

        function findClassAndPrice() {
            APP.waitForId('recyclerView', 100, 2500);
            let classCollection = id('view_item_class').find().toArray();
            // 有筛选学生特惠、青年特惠、长者特惠、多人特惠...，多个里面挑选最低价
            let productCodes = [];
            if (input.productCodes && input.productCodes != null && input.productCodes != '') {
                if (ENV.debugMode) {
                    log("产品类型：" + input.productCodes);
                }
                productCodes = input.productCodes.split("|");
            }

            classCollection.forEach((ele) => {
                let cornerUiObject = ele.findOne(id('view_corner_marker')); // 校园行/首程特惠
                if (ENV.debugMode) {
                    log(cornerUiObject);
                }
                let cabinTypeNameUiObject = ele.find(id('tv_className'));
                let cabinTypeNameText = cabinTypeNameUiObject.get(0).text(); // 比如 学生特惠 特价经济舱
                let cabinTypeNameSplit = cabinTypeNameText.split(' ');
                let cabinTypeName = cabinTypeNameSplit[0];
                // 排序前程万里
                if (cabinTypeName.indexOf('前程万里') > -1 || (cornerUiObject && cornerUiObject.child(0).text() == '新客专享') || (cornerUiObject && cornerUiObject.child(0).text() == '首乘特惠')) {
                    return;
                }
                // 如果当前类型为经济舱，当左上角出现青老年特惠，则当成是青老年特惠
                if (cornerUiObject && cornerUiObject.child(0).text() == '青老年特惠') {
                    cabinTypeName = '青老年特惠';
                }
                let cabinPriceText = ele.findOne(id('tv_price')).text();
                let cabinPrice = cabinPriceText.split(RMB)[1];
                if (cabinPrice.indexOf('起') > -1) {
                    cabinPrice = cabinPrice.split('起')[0];
                }
                let cabin = cabinTypeNameSplit[1].substring(1, 2);
                log('产品名称：' + cabinTypeName + '，价格：' + cabinPrice + '，舱位' + cabin);

                // 获取所有产品类型和价格
                allCabinTypeAndPrice.push({
                    "": cabinTypeName + '-' + cabinPrice + '-' + cabin
                })

                // 查看当前舱位类型是否符合后台给的舱位类型，有则临时保存
                if (input.productCodes && input.productCodes != null && input.productCodes != '') {
                    // 查看当前舱位类型是否符合后台给的舱位类型，有则临时保存
                    let hasTypeName = productCodes.filter(t => t == cabinTypeName);
                    let hasTypeNameTemp = tempCabinTypeAndPrice.filter(t => t.cabinTypeName == cabinTypeName);
                    if (hasTypeName.length > 0 && hasTypeNameTemp.length == 0) {
                        if (input.createOrderRuleInfo.fixCabin) {
                            if (cabin == input.cabinPriceInfos[0].cabin.toUpperCase()) {
                                tempCabinTypeAndPrice.push({
                                    cabinTypeName: cabinTypeName,
                                    cabinPrice: cabinPrice,
                                    cabin: cabin,
                                })
                            }
                        } else {
                            tempCabinTypeAndPrice.push({
                                cabinTypeName: cabinTypeName,
                                cabinPrice: cabinPrice,
                                cabin: cabin,
                            })
                        }
                    }
                } else {
                    if (cabinTypeName.indexOf("学生惠") == -1 && cabinTypeName.indexOf("多人特惠") == -1) {
                        if (input.createOrderRuleInfo.fixCabin) {
                            if (cabin == input.cabinPriceInfos[0].cabin.toUpperCase()) {
                                tempCabinTypeAndPrice.push({
                                    cabinTypeName: cabinTypeName,
                                    cabinPrice: cabinPrice,
                                    cabin: cabin,
                                })
                            }
                        } else {
                            tempCabinTypeAndPrice.push({
                                cabinTypeName: cabinTypeName,
                                cabinPrice: cabinPrice,
                                cabin: cabin,
                            })
                        }
                    }
                }
            });
            // 排序
            tempCabinTypeAndPrice.sort((firstItem, secondItem) => firstItem.cabinPrice - secondItem.cabinPrice);

            if (ENV.debugMode) {
                console.log('排序后的价格 %s', JSON.stringify(tempCabinTypeAndPrice));
            }
            return tempCabinTypeAndPrice;
        }

        let tempPrices = [];

        try {
            tempPrices = findClassAndPrice();
        } catch (error) {
            throw error;
        } finally {
            pre = current;
            current = nextPage(scrollView);
        }

        // 恢复原始
        if (tempPrices.length > 0) {
            scrollView.scrollBackward();
            sleep(800);
            pre = 0;
        }


        let scrollView2 = APP.getById('scroll_view');
        console.log('scroll_view' + scrollView2);
        let xg = clickBooking(input);
        if (xg) {
            return;
        }

        while (pre != current) {
            pre = current;
            current = nextPage(scrollView2);
            xg = clickBooking(input);
            if (xg) {
                break;
            }
        }

        if (pre == current && !xg) {
            scrollView.scrollBackward();
            sleep(800);
            pre = 0;
            scrollView2 = APP.getById('scroll_view');
            this.clickCabinClass();
            xg = clickBooking(input);
        }

        // 点击公务/头等舱
        while (pre != current) {
            pre = current;
            current = nextPage(scrollView2);
            xg = clickBooking(input);
            if (xg) {
                break;
            }
        }

        if (!xg) {
            throw '产品类型、价格或舱位不符，实际查到的产品类型、舱位和价格：' + JSON.stringify(allCabinTypeAndPrice);
        }

        // 点击订购
        function clickBooking(input) {
            console.log('enter booking');
            let recyclerView = APP.waitForId('recyclerView', 100, 2000);
            let count = 0;
            while (!recyclerView && count > 5) {
                count++;
                recyclerView = APP.waitForId('recyclerView', 100, 2000);
            }
            if (!recyclerView) {
                throw '点击订购有误';
            }
            let classCollection = recyclerView.find(id('view_item_class'));
            let selecet = false;
            // 找到对应的低价点击选购
            try {
                classCollection.toArray().forEach(ele => {
                    let cornerUiObject = ele.findOne(id('view_corner_marker')); // 校园行/首程特惠
                    let cabinTypeNameText = ele.findOne(id('tv_className')).text(); // 比如 学生特惠 特价经济舱
                    let cabinTypeNameSplit = cabinTypeNameText.split(' ');
                    let cabinTypeName = cabinTypeNameSplit[0];
                    // 排序前程万里
                    if (cabinTypeName.indexOf('前程万里') > -1 || (cornerUiObject && cornerUiObject.child(0).text() == '新客专享') || (cornerUiObject && cornerUiObject.child(0).text() == '首乘特惠')) {
                        return;
                    }
                    // 如果当前类型为经济舱，当左上角出现青老年特惠，则当成是青老年特惠
                    if (cornerUiObject && cornerUiObject.child(0).text() == '青老年特惠') {
                        cabinTypeName = '青老年特惠';
                    }
                    let cabinPriceText = ele.findOne(id('tv_price')).text();
                    let cabinPrice = cabinPriceText.split(RMB)[1];
                    if (cabinPrice.indexOf('起') > -1) {
                        cabinPrice = cabinPrice.split('起')[0];
                    }
                    let cabinName = cabinTypeNameSplit[1].substring(1, 2);
                    if (ENV.debugMode) {
                        log('产品名称：' + cabinTypeName + '，价格：' + cabinPrice + '，舱位' + cabinName);
                    }
                    if (!input.productCodes && cabinTypeName.indexOf('多人特惠') == -1 && cabinTypeName.indexOf('学生惠') == -1) {
                        if (ENV.debugMode) {
                            log('多人特惠、学生惠跳过');
                            log(cabinName + ' == ' + input.cabinPriceInfos[0].cabin);
                        }
                        if (input.createOrderRuleInfo.fixCabin) {
                            if (cabinName == input.cabinPriceInfos[0].cabin.toUpperCase() && input.cabinPriceInfos[0].ticketPrice <= cabinPrice) {
                                clickCabinIntoOrder(ele);
                            }
                        } else {
                            if (input.cabinPriceInfos[0].ticketPrice <= cabinPrice) {
                                clickCabinIntoOrder(ele);
                            }
                        }

                    } else if (input.productCodes && input.productCodes != null && input.productCodes != '') {
                        if (tempPrices.length > 0) {
                            if (input.createOrderRuleInfo.fixCabin) {
                                if (cabinName == input.cabinPriceInfos[0].cabin.toUpperCase() && cabinTypeName == tempPrices[0].cabinTypeName) {
                                    clickCabinIntoOrder(ele);
                                }
                            } else {
                                if (cabinTypeName == tempPrices[0].cabinTypeName) {
                                    clickCabinIntoOrder(ele);
                                }
                            }
                        } else {
                            return;
                        }
                    }
                })
            } catch (error) {
                if (ENV.debugMode) {
                    log('捕获异常' + error)
                }
                if (error == orderMessage.finished) {
                    selecet = true;
                } else if (error == orderMessage.insufficientSeats) {
                    selecet = false;
                    throw '您所预订的产品余位数不足，请您重新查询';
                }
            }
            if (ENV.debugMode) {
                log(selecet)
            }
            return selecet;
        }

        function clickCabinIntoOrder(ele) {
            let book = ele.findOne(id('tv_buy'));
            if (book.text() == '订购') {
                book.parent().parent().click();
                sleep(1000);
                const tip1 = APP.waitForContainsText('您所预订的产品余位数不足', 100, 2000);
                if (tip1) {
                    let btnRight = APP.waitForId('btn_right', 100, 1000);
                    if (btnRight) {
                        btnRight.click();
                    }
                    throw orderMessage.insufficientSeats;
                }
                const tip2 = APP.waitForContainsText('您所预订的航班票价发生变动', 100, 2000);
                if (tip2) {
                    let btnLeft = APP.waitForContainsText('重新查询', 100, 1000);
                    if (btnLeft) {
                        btnLeft.click();
                    }
                    throw orderMessage.priceChange;
                }
                throw orderMessage.finished;
            } else {
                // 选购
                book.parent().parent().click();
                sleep(1000);
                if (book.bounds().bottom > 1470) {
                    const scrollView = APP.getById('scroll_view', 100, 5000);
                    APP.scrollForward(scrollView);
                }
                // 订购
                let subBtns = id('rel_sub').find();
                subBtns.get(0).click();
                sleep(1000);
                const tip3 = APP.waitForContainsText('您所预订的产品余位数不足', 100, 2000);
                if (tip3) {
                    let btnRight = APP.waitForId('btn_right', 100, 1000);
                    if (btnRight) {
                        btnRight.click();
                    }
                    throw orderMessage.insufficientSeats;
                }
                const tip4 = APP.waitForContainsText('您所预订的航班票价发生变动', 100, 2000);
                if (tip4) {
                    let btnLeft = APP.waitForContainsText('重新查询', 100, 1000);
                    if (btnLeft) {
                        btnLeft.click();
                    }
                    throw orderMessage.priceChange;
                }
                throw orderMessage.finished;
            }

        }
    },
    // 点击公务/头等舱
    clickCabinClass: function () {
        let cabinClasses = id('tv').find();
        try {
            cabinClasses.forEach(element => {
                let tvText = element.text();
                if (tvText === '经济舱') {
                    return;
                } else {
                    if (element.parent().selected() == false) {
                        element.parent().parent().click();
                        throw orderMessage.foundCabinClass;
                    }
                }
            });
        } catch (error) {
            if (error == orderMessage.foundCabinClass) {
                return true;
            }
        }
    },
    // 新增乘机人
    addPassengers: function (passengers) {
        if (ENV.debugMode) {
            log('进入资料填写界面');
        }

        // 关闭往返推荐
        let closeFCBg = APP.waitForId('flightlist_topwidget_goback_re_bg', 100, 5000);
        if (closeFCBg) {
            log("关闭往返推荐")
            APP.clickById('flightlist_topwidget_goback_re_close');
        }

        let inputPage = APP.waitForContainsText('资料填写', 100, 1000);
        while (!inputPage) {
            inputPage = APP.waitForContainsText('资料填写', 100, 1000);
        }

        // 新增乘机人
        let addPassengerBtn = APP.getById('tv_add_passenger');
        addPassengerBtn.parent().click();
        sleep(2000);

        // 等待选择乘机人出现
        APP.waitForContainsText('选择乘机人', 100, 2000);

        // 目标集合
        let targetIdCardNos = []; // 目标用户
        passengers.forEach(p => targetIdCardNos.push(p.identityInfo.cardNo));

        // 获取所有已存在的用户
        let existPassengers = [];

        let passengerlistScrollView = APP.getById('choosepass_passengerlist_rv');
        // 无滚动，获取当前页的所有乘机人
        if (!passengerlistScrollView.scrollable()) {
            let passengerList = passengerlistScrollView.find(id('item_choospass_cardone_info')).toArray();
            if (passengerList.length > 0) {
                passengerList.forEach((p) => {
                    let idCardNoText = p.text();
                    let idCardNo = '';
                    if (idCardNoText.indexOf('身份证') > -1) {
                        idCardNo = idCardNoText.substring(5);
                    } else if (idCardNoText.indexOf('护照') > -1 || idCardNoText.indexOf('其他') > -1) {
                        idCardNo = idCardNoText.substring(4);
                    }
                    // 不存在该乘客才追加
                    let existPsg = existPassengers.filter(e => e == idCardNo);
                    if (existPsg.length == 0) {
                        existPassengers.push(idCardNo);
                    }
                });
            }
        } else {
            // 存在乘机人滚动块
            let lastCardNo = '';
            let currentCardNo;

            // 分页
            function nextPage(scrollView) {
                APP.scrollForward(scrollView);
            }

            while (lastCardNo != currentCardNo) {
                lastCardNo = currentCardNo;
                let existPassengerScrollView = APP.getById('choosepass_passengerlist_rv'); // 滑动块
                var passengerList = existPassengerScrollView.find(id('item_choospass_cardone_info')).toArray(); // 乘机人块
                if (passengerList.length > 0) {
                    passengerList.forEach((p) => {
                        let idCardNoText = p.text();
                        let idCardNo = '';
                        if (idCardNoText.indexOf('身份证') > -1) {
                            idCardNo = idCardNoText.substring(5);
                        } else if (idCardNoText.indexOf('护照') > -1 || idCardNoText.indexOf('其他') > -1) {
                            idCardNo = idCardNoText.substring(4);
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

            if (currentCardNo == lastCardNo) {
                // 滚动回顶部
                let scrollTop = APP.getById('choosepass_passengerlist_rv'); // 滑动块;
                while (scrollTop.scrollBackward()) {
                    scrollTop.scrollBackward();
                    sleep(200);
                }
            }
        }
        log('已存在的乘机人' + JSON.stringify(existPassengers))

        let needCheckedPassengers = []; //需要选择的用户
        // 不存在則新增，存在則等待勾選
        passengers.forEach(p => {
            if (indexOf(existPassengers, p.identityInfo.cardNo) < 0) {
                // 点击新增乘机人
                APP.clickById('choosepass_passengerlist_add');
                // 新增乘机人
                this.addPassenger(p);
                // 新增完毕后需要勾选
                needCheckedPassengers.push(p.identityInfo.cardNo);
            } else {
                needCheckedPassengers.push(p.identityInfo.cardNo);
            }
        });

        // 等待选择乘机人出现
        let selectPassenger = APP.waitForContainsText('选择乘机人', 100, 2000);
        while (!selectPassenger) {
            sleep(100);
            selectPassenger = APP.waitForContainsText('选择乘机人', 100, 2000);
        }

        // 选择已存在的乘机人
        this.checkedExistPassengerFn(needCheckedPassengers, targetIdCardNos);

        // 点击完成
        APP.clickById('choosepass_finish_ll', 100, 3000);
        sleep(2000);
    },
    // 输入单个乘机人信息
    addPassenger: function (passenger) {
        APP.waitForContainsText('新增乘机人', 100, 5000);

        sleep(2000);

        let targetCertificateType = passenger.identityInfo.type;
        log('乘机人证件类型：' + targetCertificateType);

        // 如果当前类型是护照类型，判断是否有英文名，如果没有，则改为其他证件类型
        if (targetCertificateType == 1 && !passenger.name.secondary) {
            targetCertificateType = 9;
        }

        // 身份证
        if (targetCertificateType == 0) {
            // 姓名
            let chineseNameUiObject = APP.getById('add_new_passenger_chinesename', 100, 1000);
            if (chineseNameUiObject) {
                let userNameInput = chineseNameUiObject.findOne(id('ed_input'));
                userNameInput.click();
                sleep(200);
                userNameInput.setText(passenger.name.primary);
            }
        } else if (targetCertificateType == 1) {
            APP.clickById('add_new_passenger_cardtype');
            sleep(800);
            APP.waitForContainsText('选择证件', 100, 3000);

            let cardtpeUiObject = APP.getById('cardtpe_list_rv');
            let cardTypeNameCollection = cardtpeUiObject.find(id('item_add_passenger_cardtype_name')).toArray();
            if (cardTypeNameCollection.length > 0) {
                try {
                    cardTypeNameCollection.forEach(element => {
                        log(element.text());
                        if (element.text() == '护照') {
                            element.parent().parent().click();
                            throw orderMessage.foundCardType;
                        }
                    });
                } catch (error) { }
            }
            sleep(2000);

            // 姓 
            let subNameUiObject = APP.getById('add_new_passenger_englishsurename', 100, 1000);
            log('输入姓氏' + subNameUiObject)
            if (subNameUiObject) {
                let subNameInput = subNameUiObject.findOne(id('ed_input'));
                subNameInput.click();
                sleep(200);
                subNameInput.setText(passenger.name.primary);
            }

            // 名
            let givenNameUiObject = APP.getById('add_new_passenger_englishname', 100, 1000);
            if (givenNameUiObject) {
                let givenNameInput = givenNameUiObject.findOne(id('ed_input'));
                givenNameInput.click();
                sleep(200);
                givenNameInput.setText(passenger.name.secondary);
            }
        } else if (targetCertificateType == 9) {
            APP.clickById('add_new_passenger_cardtype');
            sleep(800);
            APP.waitForContainsText('选择证件', 100, 3000);

            let cardtpeUiObject = APP.getById('cardtpe_list_rv');
            let cardTypeNameCollection = cardtpeUiObject.find(id('item_add_passenger_cardtype_name')).toArray();
            if (cardTypeNameCollection.length > 0) {
                try {
                    cardTypeNameCollection.forEach(element => {
                        log(element.text());
                        if (element.text() == '其他') {
                            element.parent().parent().click();
                            throw orderMessage.foundCardType;
                        }
                    });
                } catch (error) { }
            }
            sleep(2000);

            // 姓名
            let chineseNameUiObject = APP.getById('add_new_passenger_chinesename', 100, 1000);
            if (chineseNameUiObject) {
                let userNameInput = chineseNameUiObject.findOne(id('ed_input'));
                userNameInput.click();
                sleep(200);
                userNameInput.setText(passenger.name.primary);
            }
        }

        // 证件号
        let cardNoUiObject = APP.getById('add_new_passenger_cardid', 100, 1000);
        if (cardNoUiObject) {
            let cardNoInput = cardNoUiObject.findOne(id('ed_input'));
            cardNoInput.click();
            sleep(200);
            cardNoInput.setText(passenger.identityInfo.cardNo);
        }

        // 手机号
        if (passenger.phone) {
            let phoneUiObject = APP.getById('add_new_passenger_phone', 100, 1000);
            if (phoneUiObject) {
                let phoneInput = phoneUiObject.findOne(id('ed_input'));
                phoneInput.click();
                sleep(200);
                phoneInput.setText(passenger.phone);
            }

        }

        // 证件类型为护照
        if (targetCertificateType == 1) {
            // 选择出生年月
            selectBirth(passenger.birthDate);

            // 选择国籍
            APP.clickById('add_new_passenger_nationality');
            sleep(500);
            // 选择中国
            let nationalityCodes = id('tv_three_code').find().toArray();
            try {
                nationalityCodes.forEach(element => {
                    if (element.text() == 'CN') {
                        element.parent().parent().click();
                        throw orderMessage.foundNationality;
                    }
                });
            } catch (error) { }

            sleep(2000);

            // 有效期
            APP.clickById('add_new_passenger_alidityperiod');
            sleep(500);
            // 点击确定
            APP.clickById('tv_select')

            // 签发地
            APP.clickById('add_new_passenger_countryofissue');
            sleep(500);
            // 选择中国
            let countryCodes = id('tv_three_code').find().toArray();
            try {
                countryCodes.forEach(element => {
                    if (element.text() == 'CN') {
                        element.parent().parent().click();
                        throw orderMessage.foundNationality;
                    }
                });
            } catch (error) { }
            sleep(2000);

            // 性别
            if (passenger.gender == 0) {
                let boyGender = APP.waitForContainsText('男');
                APP.clickArea(boyGender.parent());
            } else {
                let girlGender = APP.waitForContainsText('女');
                APP.clickArea(girlGender.parent());
            }
        } else if (targetCertificateType == 9) {
            // 选择出生年月
            selectBirth(passenger.birthDate);
        }

        // 点击保存
        APP.clickById('add_new_passenger_finish_btn');
        sleep(2000);

        // let tip1 = APP.waitForContainsText('乘机人的姓名与历史订单不一致', 200, 500);
        // if (tip1) {
        //     APP.clickById('atom_flight_btn_negative');
        //     sleep(500);
        // }
    },
    // 选择已存在的乘机人
    checkedExistPassengerFn: function (needCheckedPassengers, targetIdCardNos) {
        function findDady(cardNo) {
            let c = 0;
            while (c < 3) {
                let e = textContains(cardNo).findOne(3000);
                if (e && e.parent() && e.parent().parent() && e.parent().parent().parent()) {
                    return e;
                }
                c++;
            }
            return null;
        }
        log('准备选择已存在的乘机人')
        let checkedPassenger = [];
        let checkedPassengerScrollView = APP.getById('choosepass_passengerlist_rv'); // 滑动块
        if (!checkedPassengerScrollView.scrollable()) {
            let passengerList = checkedPassengerScrollView.find(id('item_choospass_cardone_info')).toArray();
            if (passengerList.length > 0) {
                passengerList.forEach((p) => {
                    sleep(1000);
                    let idCardNoText = p.text();
                    let idCardNo = '';
                    if (idCardNoText.indexOf('身份证') > -1) {
                        idCardNo = idCardNoText.substring(5);
                    } else if (idCardNoText.indexOf('护照') > -1 || idCardNoText.indexOf('其他') > -1) {
                        idCardNo = idCardNoText.substring(4);
                    }
                    if (indexOf(targetIdCardNos, idCardNo) > -1) {
                        if (indexOf(needCheckedPassengers, idCardNo) > -1) {
                            let leftCheck = findDady(idCardNoText);
                            while (leftCheck == null) {
                                sleep(500);
                                leftCheck = findDady(idCardNoText);
                            }
                            APP.clickArea(leftCheck);
                            sleep(1000);
                            checkedPassenger.push(idCardNo);
                            const cabinTip = APP.waitForContainsText('该产品仅余', 100, 1000);
                            if (cabinTip) {
                                let btnRight = APP.waitForId('btn_right', 100, 1000);
                                if (btnRight) {
                                    btnRight.click();
                                }
                                throw orderMessage.insufficientSeats;
                            }
                        }
                    }
                });
            }
        } else {
            let prePage = 0;
            let currentPage = checkedPassengerScrollView.bounds().bottom;
            // 分页
            function nextPage(scrollView) {
                APP.scrollForward(scrollView);
                checkedPassengerScrollView = APP.getById('choosepass_passengerlist_rv');
                let c = checkedPassengerScrollView.boundsInParent().bottom;
                return c;
            }


            while (prePage != currentPage && checkedPassenger.length != needCheckedPassengers.length) {
                needCheckedPassengers.forEach(element => {
                    sleep(1000);
                    let leftCheck = findDady(element);
                    while (leftCheck == null) {
                        prePage = currentPage;
                        currentPage = nextPage(checkedPassengerScrollView);
                        sleep(500);
                        leftCheck = findDady(element);
                    }
                    if (leftCheck.bounds().bottom > 1452) {
                        prePage = currentPage;
                        currentPage = nextPage(checkedPassengerScrollView);
                        sleep(500);
                        leftCheck = findDady(element);
                    }
                    APP.clickArea(leftCheck);
                    sleep(1000);
                    checkedPassenger.push(element);
                    const cabinTip = APP.waitForContainsText('该产品仅余', 100, 1000);
                    if (cabinTip) {
                        let btnRight = APP.waitForId('btn_right', 100, 1000);
                        if (btnRight) {
                            btnRight.click();
                        }
                        throw orderMessage.insufficientSeats;
                    }
                });
            }

            if (prePage == currentPage) {
                // 滚动回顶部
                let selectPassengerScroll = APP.getById('choosepass_passengerlist_rv'); // 滑动块;
                while (selectPassengerScroll.scrollBackward()) {
                    selectPassengerScroll.scrollBackward();
                    sleep(200);
                }
            }
        }
    },
    // 编辑联系人信息
    editContactInfo: function (contactInfo) {
        let scrollBottom = APP.getById('scrollview', 100, 10000);
        APP.scrollForward(scrollBottom);
        sleep(1000);

        // 联系方式
        let contactInput = APP.waitForId('edit_contact_phone', 100, 1000);
        contactInput.click();
        sleep(300);
        contactInput.setText(contactInfo.phone);
        sleep(1000);

        // 关闭键盘
        let topBar = APP.waitForContainsText('资料填写');
        APP.clickArea(topBar);

        APP.scrollForward(scrollBottom);
        sleep(1000);

        // 同意
        APP.checkedById('checkbox_read', 100, 15000);
    },
    // 订单详情
    orderDetail: function (order) {
        sleep(2000);

        // 点击明细
        APP.clickById('checkbox_detail');
        sleep(800);

        let actualPrices = [];
        let totalPriceText = 0;

        auto.setWindowFilter(function (window) {
            // 对于应用窗口，他的title属性就是应用的名称，因此可以通过title属性来判断一个应用
            return window.title == "弹出式窗口";
        });

        let linearLayoutUiCollection = APP.waitForId('recycler_view', 100, 4000).children().toArray();
        linearLayoutUiCollection.forEach(element => {
            let passengerTypeText = element.findOne(id('tv_type_passenger')).text();
            let ticketPriceText = element.findOne(id('tv_def_price_num')).text();
            let airportTaxText = element.findOne(id('tv_tax_price_num')).text();
            let oilFeeText = element.findOne(id('tv_service_price_num')).text();
            if (ENV.debugMode) {
                log('票面价：' + ticketPriceText + '，基建：' + airportTaxText + '，燃油：' + oilFeeText);
            }
            if (passengerTypeText == '成人') {
                actualPrices.push({
                    type: 0, //成人
                    ticketPrice: parseFloat(ticketPriceText.substring(1)), // 票面价
                    settlementPrice: parseFloat(ticketPriceText.substring(1)), // 结算价
                    airportTax: parseFloat(airportTaxText.substring(1)), // 基建
                    oilFee: parseFloat(oilFeeText.substring(1)), // 燃油
                    totalTax: (parseFloat(airportTaxText.substring(1)) + parseFloat(oilFeeText.substring(1))) // 总税费
                })
            } else if (passengerTypeText == '儿童') {
                actualPrices.push({
                    type: 1, //成人
                    ticketPrice: parseFloat(ticketPriceText.substring(1)), //票面价
                    settlementPrice: parseFloat(ticketPriceText.substring(1)), // 结算价
                    airportTax: parseFloat(airportTaxText.substring(1)), // 基建
                    oilFee: parseFloat(oilFeeText.substring(1)), //燃油
                    totalTax: (parseFloat(airportTaxText.substring(1)) + parseFloat(oilFeeText.substring(1))) // 总税费
                })
            } else {
                actualPrices.push({
                    type: 2, //成人
                    ticketPrice: parseFloat(ticketPriceText.substring(1)), //票面价
                    settlementPrice: parseFloat(ticketPriceText.substring(1)), // 结算价
                    airportTax: parseFloat(airportTaxText.substring(1)), // 基建
                    oilFee: parseFloat(oilFeeText.substring(1)), //燃油
                    totalTax: (parseFloat(airportTaxText.substring(1)) + parseFloat(oilFeeText.substring(1))) // 总税费
                })
            }
        });

        // 按类型排序
        actualPrices.sort((firstItem, secondItem) => firstItem.type - secondItem.type);

        auto.setWindowFilter(function (window) {
            // 对于应用窗口，他的title属性就是应用的名称，因此可以通过title属性来判断一个应用
            return true;
        });

        // 关闭明细
        APP.clickById('checkbox_detail');
        sleep(800);

        // 总支付价格
        totalPriceText = APP.getById('tv_money').text();
        if (ENV.debugMode) {
            console.log('总支付价格' + totalPriceText);
        }

        // 乘机人价格比较
        order.passengers.forEach((element) => {
            this.priceCompare(element, actualPrices, order);
        });

        // 点击下一步
        if (ENV.debugMode) {
            console.log('点击下一步');
        }
        APP.clickById('tv_next', 100, 3000);
        sleep(1000);

        let t = 3000;
        let m = new Date().getTime() + t;
        while (m >= new Date().getTime()) {
            const cabinTip = APP.waitForContainsText('您所预订的产品余位数不足', 50, 500);
            if (cabinTip) {
                let cabinTipBtn = APP.waitForContainsText('确定', 100, 1000);
                if (cabinTipBtn) {
                    cabinTipBtn.click();
                }
                throw orderMessage.insufficientSeats;
            }

            const ageTip = APP.waitForContainsText('乘机人年龄不符合您预订的产品要求', 50, 500);
            if (ageTip) {
                let btnRight = APP.waitForId('btn_right', 100, 1000);
                if (btnRight) {
                    btnRight.click();
                }
                throw orderMessage.ageMisMatch;
            }

            const errorTip = APP.waitForContainsText('该产品乘机人限2周岁', 50, 500);
            if (errorTip) {
                let btnRight = APP.waitForId('btn_right', 100, 1000);
                if (btnRight) {
                    btnRight.click();
                }
                throw '该产品乘机人限2周岁（含）至15周岁（含）及55周岁（含）以上的旅客';
            }

            const errorTip1 = APP.waitForContainsText('该产品仅支持身份证购买', 50, 500);
            if (errorTip1) {
                let btnRight = APP.waitForId('btn_right', 100, 1000);
                if (btnRight) {
                    btnRight.click();
                }
                throw '该产品仅支持身份证购买';
            }

            const commonTip = APP.waitForContainsText('温馨提示', 50, 500);
            if (commonTip) {
                let btnRight = APP.waitForId('btn_right', 100, 1000);
                if (btnRight) {
                    btnRight.click();
                }
                throw orderMessage.failure;
            }
        }

        // 检测是否选座页面
        const selectSeat = APP.waitForContainsText('选座', 100, 1000);
        if (selectSeat) {
            // 选择同意
            APP.checkedById('cb_agreement', true);

            // 已选择过的座位号
            let selectedSeatNo = [];
            while (true) {
                const seatABCJKL = {
                    A: 1,
                    B: 2,
                    C: 3,
                    J: 6,
                    K: 7,
                    L: 8
                };
                try {
                    // 回滚到顶部
                    let seatView = APP.waitForId('seat_view', 100, 1000);
                    // 座位排数
                    let lineSeat = seatView.find(id('lin_seat')).toArray();
                    let count = 0;
                    while (!lineSeat && count < 5) {
                        count++;
                        lineSeat = seatView.find(id('lin_seat')).toArray();
                    }
                    if (!lineSeat) {
                        throw '获取座位数失败';
                    }
                    let seatScrollViewUiObject = APP.waitForId('sl_view', 100, 1000);
                    while (seatScrollViewUiObject.scrollBackward()) {
                        seatScrollViewUiObject.scrollBackward();
                        sleep(500);
                        log('回滚到顶部');
                    }

                    // 第N排座位
                    lineSeat.forEach((lineSeatEle, lineSeatIndex) => {
                        // 点支付会出现的文字
                        let layerMsg = APP.waitForContainsText('航班信息确认', 100, 2000);
                        if (layerMsg) {
                            throw '已选座完毕';
                        }
                        log('第%s排座位', (lineSeatIndex + 1));
                        if (lineSeatEle.children().get(0) == null) {
                            throw '退出循环，重新开始'
                        }

                        // 某排下的座位
                        lineSeatEle.children().toArray().forEach(function (child, childIndex) {
                            // 点支付会出现的文字
                            layerMsg = APP.waitForContainsText('航班信息确认', 100, 2000);
                            if (layerMsg) {
                                throw '已选座完毕';
                            }
                            // 一排有6个座位
                            if (child == null) {
                                throw '退出循环，重新开始'
                            }
                            // 找到每一排的座位号数字
                            if (childIndex == 0) {
                                let seatXTextUiObject = child.text();
                                log(seatXTextUiObject + '排');
                                // 有乘客选择了座位 
                                log('已选择座位的总数：' + selectedSeatNo.length);
                                if (seatXTextUiObject && selectedSeatNo.length > 0) {
                                    // 最新的座位号
                                    let latestSeatNo = selectedSeatNo[selectedSeatNo.length - 1];
                                    log('最新的完整座位号：' + latestSeatNo);
                                    let seatX = latestSeatNo.substring(0, 2); // 将座位号32A分割32
                                    let seatLetter = latestSeatNo.substring(2); // 将座位号32A分割A
                                    log(seatX + '排,字母' + seatLetter);
                                    log('字母的索引：' + seatABCJKL[seatLetter]);
                                    if (seatX < seatXTextUiObject.text() && seatABCJKL[seatLetter] <= childIndex) {
                                        return;
                                    }
                                }
                            }

                            // 找到座位并点击
                            if (child.findOne(className('android.widget.ImageView'))) {
                                if (child == null) {
                                    throw '退出循环，重新开始'
                                }
                                // 捕获抢登录的提示
                                let loginTip = APP.waitForContainsText('您的会员账号', 100, 1000);
                                if (loginTip) {
                                    const knownBtn = APP.waitForContainsText("我知道了", 100, 1000);
                                    if (knownBtn) {
                                        knownBtn.click();
                                        throw '您的会员账号在另一台设备登录';
                                    }
                                }
                                log('选座中...')
                                APP.clickArea(child);
                                sleep(500);
                                let seatNos = id('tv_seat_no_left').find().toArray();
                                seatNos.forEach(seatNoEle => {
                                    if (seatNos == null || seatNoEle == null) {
                                        throw '退出循环，重新开始';
                                    }
                                    if (seatNoEle && seatNoEle.text() != '未选座') {
                                        let notExistSeatNo = selectedSeatNo.filter(s => s == seatNoEle.text());
                                        log('该座位号%s存在与否,（%s）：0代表不存在，1代表存在', seatNoEle.text(), notExistSeatNo.length);
                                        if (notExistSeatNo.length == 0) {
                                            selectedSeatNo.push(seatNoEle.text());
                                            log('已选择过的座位号：' + JSON.stringify(selectedSeatNo));
                                        }
                                    }
                                });
                                // 点击支付
                                let payBtn = APP.waitForId('txt_go_pay', 100, 1000);
                                if (payBtn) {
                                    payBtn.click();
                                    sleep(500);
                                }
                            }
                        });

                        // 每7排滑动一页
                        if (lineSeatIndex > 0 && (lineSeatIndex % 6) == 0) {
                            swipe(_env.screenWidth / 2, 700, _env.screenWidth / 2, 700 / 9, 500);
                            sleep(300);
                        }
                    });
                } catch (error) {
                    log(error);
                    if (error == '已选座完毕' || error == '您的会员账号在另一台设备登录') {
                        break;
                    }
                }
            }
        }

        // 订单详情页获取订单号
        if (ENV.debugMode) {
            console.log('订单详情页获取订单号');
        }
        let orderNoText = APP.waitForId('tv_order_num', 100, 10000);
        let count = 0;
        while (!orderNoText && count < 5) {
            count++;
            orderNoText = APP.waitForId('tv_order_num', 100, 1000);
        }
        if (!orderNoText) {
            throw '获取订单号有误';
        }
        if (ENV.debugMode) {
            log(actualPrices);
            log('订单号： %s', orderNoText.text().substring(4));
            log('总价： %s', parseFloat(totalPriceText.substring(1)));
        }

        // 下单成功后回到首页
        APP.clickById('top_bar_left_img_btn');
        sleep(800);

        // 点击“回到首页” 
        APP.clickById('btn_right');
        sleep(800);

        return {
            orderNo: orderNoText.text().substring(4),
            actualPrices: actualPrices,
            totalPrice: parseFloat(totalPriceText.substring(1))
        }
    },
    // 价格比较
    priceCompare: function (passenger, actualPrices, order) {
        log(order.cabinPriceInfos)
        log('进行价格比较');
        const adultCabinPriceInfo = order.cabinPriceInfos.filter(p => p.type == 0);
        log('成人信息' + JSON.stringify(adultCabinPriceInfo));
        const childCabinPriceInfo = order.cabinPriceInfos.filter(p => p.type == 1);
        log('儿童信息' + JSON.stringify(childCabinPriceInfo));
        const infantCabinPriceInfo = order.cabinPriceInfos.filter(p => p.type == 2);
        log('婴儿信息' + JSON.stringify(infantCabinPriceInfo));
        const adultPrice = actualPrices.filter(p => p.type === 0); //成人
        log('成人价格' + JSON.stringify(adultPrice));
        const childPrice = actualPrices.filter(p => p.type === 1); //儿童
        log('儿童价格' + JSON.stringify(childPrice));
        const infantPrice = actualPrices.filter(p => p.type === 2); //婴儿
        log('婴儿价格' + JSON.stringify(infantPrice));
        if (passenger.type == 0) {
            // 只会比较单个成人票面价
            if (order.createOrderRuleInfo.ticketPriceFloatRange != null) {
                const ticketPriceUpper = order.createOrderRuleInfo.ticketPriceFloatRange.upperLimit + adultCabinPriceInfo[0].ticketPrice;
                const ticketPriceLower = order.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit + adultCabinPriceInfo[0].ticketPrice;
                // 票面价比较
                const adultTicketPrice = adultPrice[0].ticketPrice;
                if (adultTicketPrice >= ticketPriceLower && adultTicketPrice <= ticketPriceUpper) { } else {
                    throw '票面价比较不符合，无法进行下一步。APP票面价：' + adultTicketPrice + ',后台票面价上限：' + ticketPriceUpper + ',后台票面价下限：' + ticketPriceLower;
                }
            }
            // 只会比较单个成人结算价
            if (order.createOrderRuleInfo.settlementPriceFloatRange != null) {
                const settlementPriceUpper = order.createOrderRuleInfo.settlementPriceFloatRange.upperLimit + adultCabinPriceInfo[0].settlementPrice;
                const settlementPriceLower = order.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit + adultCabinPriceInfo[0].settlementPrice;
                // 票面价比较
                const getSettlementPrice = adultPrice[0].ticketPrice;
                if (getSettlementPrice >= settlementPriceLower && getSettlementPrice <= settlementPriceUpper) { } else {
                    throw "结算价比较不符合，无法进行下一步。APP结算价：" + getSettlementPrice + ",结算价上限：" + settlementPriceUpper + ",票面价下限：" + settlementPriceLower;
                }
            }
            // 只会比较单个成人买入价
            if (order.createOrderRuleInfo.sellPriceFloatRange != null) {
                const sellPriceUpper = order.createOrderRuleInfo.sellPriceFloatRange.upperLimit;
                const sellPriceLower = order.createOrderRuleInfo.sellPriceFloatRange.lowerLimit;
                const getSellPrice = adultPrice[0].ticketPrice - adultCabinPriceInfo[0].settlementPrice;
                if (getSellPrice >= sellPriceLower && getSellPrice <= sellPriceUpper) { } else {
                    throw "买入价比较不符合，无法进行下一步。APP买入价：" + getSellPrice + ",买入价上限：" + sellPriceUpper + ",买入价下限：" + sellPriceLower;
                }
            }
        } else if (passenger.type == 1) {
            let childTicketPrice = childPrice[0].ticketPrice;
            if (childTicketPrice != childCabinPriceInfo[0].ticketPrice) {
                throw '下单失败，儿童票面价不符合'
            }
        } else if (passenger.type == 2) {
            let infantTicketPrice = infantPrice[0].ticketPrice;
            if (infantTicketPrice != infantCabinPriceInfo[0].ticketPrice) {
                throw '下单失败，婴儿票面价不符合'
            }
        }
    },
    // 找到下单成功的订单，支付
    getOrderByOrderNo: function (orderNo, totalPrice, creditCardPayInfo) {
        // 点击我
        APP.me();
        sleep(1000);

        // 点击全部订单
        let allOrderUiObject = APP.waitForId('lin_my_home_order_search_all', 100, 1000);
        while (!allOrderUiObject) {
            allOrderUiObject = APP.waitForId('lin_my_home_order_search_all', 100, 1000);
        }
        if (ENV.debugMode) {
            log('点击“全部订单”');
        }
        allOrderUiObject.click();
        sleep(2000);

        // 等待我的订单出现
        let myOrderUiObject = APP.waitForContainsText('我的订单', 100, 1000);
        while (!myOrderUiObject) {
            myOrderUiObject = APP.waitForContainsText('我的订单', 100, 1000);
        }
        if (ENV.debugMode) {
            log('等待“我的订单”出现');
        }

        // 点击待支付
        let waitForPayTextUiObject = APP.waitForContainsText('待支付', 100, 1000);
        while (!waitForPayTextUiObject) {
            waitForPayTextUiObject = APP.waitForContainsText('待支付', 100, 1000);
        }
        APP.clickArea(waitForPayTextUiObject);
        sleep(1000);
        if (ENV.debugMode) {
            log('点击“待支付”');
        }

        let scrollView = APP.waitForId('recycler_view', 100, 3000);
        let pre = 0;
        let current = scrollView.boundsInParent().bottom;

        let clickPayment = false;

        function nextPage(scrollView) {
            APP.scrollForward(scrollView);
            scrollView = APP.getById('recycler_view');
            let c = scrollView.boundsInParent().bottom;
            return c;
        }

        // 获取所有订单组 
        while (pre != current) {
            try {
                let airportTicketOrderViewCollection = scrollView.find(id('AirPortTicketOrderView')).toArray();
                airportTicketOrderViewCollection.forEach(airportTicketOrderEle => {
                    // 获取支付总价
                    let orderPriceUiObject = airportTicketOrderEle.findOne(id('tv_money'));
                    let orderPrice = orderPriceUiObject.text().substring(1);
                    // 查找对应的订单号并点击支付
                    let orderNoTextUiObject = airportTicketOrderEle.findOne(id('tv_order_num'));
                    let existOrderNo = orderNoTextUiObject.text().substring(4);
                    if (ENV.debugMode) {
                        log('获取到的订单号：' + existOrderNo);
                    }
                    let orderStatus = airportTicketOrderEle.findOne(id('tv_order_status'));
                    if (ENV.debugMode) {
                        log('获取到的订单状态：' + orderStatus.text());
                    }
                    if (orderStatus.text() == '等待支付' && existOrderNo == orderNo && orderPrice == totalPrice) {
                        if (ENV.debugMode) {
                            log('准备点击支付');
                        }
                        // 找到支付按钮，并点击
                        let paymentBtnUiObject = airportTicketOrderEle.findOne(id('tv_pay_now'));
                        paymentBtnUiObject.click();
                        sleep(1000);
                        clickPayment = true;
                        throw '点击支付'
                    }
                });
                pre = current;
                current = nextPage(scrollView);
            } catch (error) {
                if (error == '点击支付') {
                    break;
                }
            }
        }

        if (clickPayment == false) {
            if (pre == current) {
                APP.clickById('iv_back');
                sleep(800);
                APP.home();
                throw '该订单可能已取消';
            }
        } else {
            let res = this.payment(creditCardPayInfo);
            return res;
        }

    },
    // 关闭支付页面输入信息后的键盘
    closePaymentPageKeyBoard() {
        const cardInfoBarUiObject = APP.waitForContainsText('卡面信息')
        APP.clickArea(cardInfoBarUiObject);
        sleep(800);
    },
    // 支付
    payment: function (creditCardPayInfo) {
        sleep(2000);

        // 点击快捷支付
        let kjzfUiobject = APP.waitForContainsText('快捷支付', 100, 5000);
        if (kjzfUiobject) {
            log('找到“快捷支付”，并点击');
            kjzfUiobject.parent().click();
        }
        sleep(10000);

        const paymentTimeout = APP.waitForContainsText('支付时限已过', 100, 1000);
        if (paymentTimeout) {
            let btnRight = APP.waitForId('btn_right', 100, 1000);
            if (btnRight) {
                btnRight.click();
            }
            throw '支付时限已过，建议您重新下单购买';
        }

        if (!creditCardPayInfo) {
            throw '没有任何银行卡信息，支付失败';
        }

        // 不存在卡类型，即可填写支付信息
        let cardTypeExist = APP.waitForContainsText('卡类型', 100, 1000);
        while (cardTypeExist) {
            cardTypeExist = APP.waitForContainsText('卡类型', 100, 1000);
            sleep(800);
        }
        log('等待支付信息内容出现');

        try {
            // 输入卡号
            let cardNoUiObject = APP.waitForContainsText('卡号', 100, 3000);
            while (!cardNoUiObject) {
                cardNoUiObject = APP.waitForContainsText('卡号', 100, 3000);
            }
            if (cardNoUiObject) {
                let cardNoParent = cardNoUiObject.parent();
                while (!cardNoParent) {
                    cardNoUiObject = APP.waitForContainsText('卡号', 100, 3000);
                    cardNoParent = cardNoUiObject.parent();
                }
                let cardNoParentChildren = cardNoParent.children();
                while (!cardNoParentChildren) {
                    cardNoUiObject = APP.waitForContainsText('卡号', 100, 3000);
                    cardNoParent = cardNoUiObject.parent();
                    cardNoParentChildren = cardNoParent.children();
                }
                if (cardNoParentChildren) {
                    let editTextUiObject = cardNoParentChildren.findOne(className('android.widget.EditText'));
                    if (editTextUiObject) {
                        editTextUiObject.setText(creditCardPayInfo.cardNo);
                        sleep(500);
                        editTextUiObject.click();
                        sleep(500);
                        this.closePaymentPageKeyBoard();
                    }
                }
            }

            // 选择有效期
            let validDateUiObject = APP.waitForContainsText('有效期', 100, 3000);
            while (!validDateUiObject) {
                validDateUiObject = APP.waitForContainsText('有效期', 100, 3000);
            }
            if (validDateUiObject) {
                let validDateParent = validDateUiObject.parent();
                while (!validDateParent) {
                    validDateUiObject = APP.waitForContainsText('有效期', 100, 3000);
                    validDateParent = validDateUiObject.parent();
                }
                let validDateParentChildren = validDateParent.children();
                while (!validDateParentChildren) {
                    validDateUiObject = APP.waitForContainsText('有效期', 100, 3000);
                    validDateParent = validDateUiObject.parent();
                    validDateParentChildren = validDateParent.children();
                }
                let validDateEditTextUiObject = validDateParentChildren.findOne(className('android.widget.EditText'));
                if (validDateEditTextUiObject) {
                    APP.clickArea(validDateEditTextUiObject);
                    sleep(1000);
                    const validDate = creditCardPayInfo.validDate.split('-');
                    const validDateYear = APP.waitForContainsText(validDate[0] + '年');
                    if (validDateYear) {
                        validDateYear.click();
                        sleep(500);
                    }
                    const validDateMonth = APP.waitForContainsText(validDate[1] + '月');
                    if (validDateMonth) {
                        validDateMonth.click();
                        sleep(500);
                    }
                    APP.clickByText('确认')
                    sleep(500);
                }
            }

            // CVV码
            let CVVUiObject = APP.waitForContainsText('CVV码', 100, 3000);
            while (!CVVUiObject) {
                CVVUiObject = APP.waitForContainsText('CVV码', 100, 3000);
            }
            if (CVVUiObject) {
                let CVVParent = CVVUiObject.parent();
                while (!CVVParent) {
                    CVVUiObject = APP.waitForContainsText('CVV码', 100, 3000);
                    CVVParent = CVVUiObject.parent();
                }
                let CVVParentChildren = CVVParent.children();
                while (!CVVParentChildren) {
                    CVVUiObject = APP.waitForContainsText('CVV码', 100, 3000);
                    CVVParent = CVVUiObject.parent();
                    CVVParentChildren = CVVParent.children();
                }
                const CVVEditTextUiObject = CVVParentChildren.findOne(className('android.widget.EditText'));
                if (CVVEditTextUiObject) {
                    CVVEditTextUiObject.setText(creditCardPayInfo.cvv);
                    sleep(500);
                    this.closePaymentPageKeyBoard();
                }
            }

            // 姓名
            const userNameUiObject = APP.waitForContainsText('姓名', 100, 3000);
            if (userNameUiObject) {
                const userNameEditTextUiObject = userNameUiObject.parent().children().findOne(className('android.widget.EditText'));
                if (userNameEditTextUiObject) {
                    userNameEditTextUiObject.setText(creditCardPayInfo.ownerName);
                    sleep(500);
                    this.closePaymentPageKeyBoard();
                    sleep(500);
                }
            }

            // 证件类型 
            let identityUiObject = APP.waitForContainsText('证件', 100, 3000);
            while (!identityUiObject) {
                identityUiObject = APP.waitForContainsText('证件', 100, 3000);
            }
            if (identityUiObject) {
                let identityParent = identityUiObject.parent();
                while (!identityParent) {
                    identityUiObject = APP.waitForContainsText('证件', 100, 3000);
                    identityParent = identityUiObject.parent();
                }
                let identityEditTextUiObject = identityParent.findOne(className('android.widget.EditText'));
                while (!identityEditTextUiObject) {
                    identityEditTextUiObject = identityParent.findOne(className('android.widget.EditText'));
                }
                log('证件类型是否选择身份证：' + (identityEditTextUiObject.text() == '身份证')); // 无文本
                while (identityEditTextUiObject.text() != '身份证') {
                    APP.clickArea(identityEditTextUiObject);
                    sleep(1000);
                    APP.clickByText('确认');
                    sleep(500);
                    identityUiObject = APP.waitForContainsText('证件', 100, 3000);
                    identityParent = identityUiObject.parent();
                    identityEditTextUiObject = identityParent.findOne(className('android.widget.EditText'));
                    log('证件类型选择身份证：' + (identityEditTextUiObject.text() == '身份证'));
                    log('证件类型文本：' + identityEditTextUiObject.text());
                }
            }

            // 证件号
            const identityCardNoUiObject = APP.waitForContainsText('证件号', 100, 3000);
            if (identityCardNoUiObject) {
                const identityCardNoEditTextUiObject = identityCardNoUiObject.parent().children().findOne(className('android.widget.EditText'));
                if (identityCardNoEditTextUiObject) {
                    identityCardNoEditTextUiObject.setText(creditCardPayInfo.ownerIdentityCardNo);
                    sleep(500);
                    this.closePaymentPageKeyBoard();
                }
            }

            // 手机号
            const phoneUiObject = APP.waitForContainsText('手机号', 100, 3000);
            if (phoneUiObject) {
                const phoneEditTextUiObject = phoneUiObject.parent().children().find(className('android.widget.EditText').depth(13));
                if (phoneEditTextUiObject) {
                    phoneEditTextUiObject.setText(creditCardPayInfo.phone);
                    sleep(500);
                    this.closePaymentPageKeyBoard();
                }
            }
        } catch (error) {
            log(error);
            // 点击返回
            APP.clickById('top_bar_left_img_btn');
            sleep(1000);
            this.payment(creditCardPayInfo);
        }

        // 确认支付
        let confirmPayment = APP.waitForContainsText('确认支付', 100, 3000);
        if (confirmPayment) {
            sleep(1000);
            APP.clickArea(confirmPayment);
            sleep(2000);
        }
        sleep(13000);

        // 支付完成页
        let paymentFinish = APP.waitForContainsText('支付完成', 100, 5000);
        if (paymentFinish) {
            const balanceTip = APP.waitForContainsText('可用余额不足', 100, 1000);
            if (balanceTip) {
                const confirmBtn = APP.waitForContainsText('确认');
                if (confirmBtn) {
                    APP.clickArea(confirmBtn);
                }
                throw '余额不足';
            } else {
                log('订单支付成功');
                let payFinish = className('android.view.View').text('支付完成').findOne();
                log(payFinish);
                if (payFinish.parent()) {
                    let homeBtn = payFinish.parent().children().findOne(className('android.widget.Image'));
                    let homePageObject = APP.waitForContainsText('预订搜索', 100, 1000);
                    while (homePageObject == null) {
                        APP.clickArea(homeBtn);
                        homePageObject = APP.waitForContainsText('预订搜索', 100, 1000);
                    }
                    return true;
                }
            }
        } else {
            throw '订单可能支付失败，请验证！！！';
        }
    }
}

function indexOf(array, element) {
    let index = -1;
    if (array.length > 0) {
        for (index = 0; index < array.length; index++) {
            // if (ENV.debugMode) {
            //     log('%s == %s => %s', element, array[index], element == array[index]);
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
// 滑动
function slide(x1, x2, swipeCount) {
    swipe(x1, swipeheight, x2, (swipeheight + swipeCount * barHeight), 800);
}
// 名单信息中录入年月日
function selectBirth(birth) {
    // 点击出生日期 
    APP.clickById('add_new_passenger_birthday');

    // 目标年月日
    let births = birth.split('-');
    let year, month, day = '';
    if (births.length > 2) {
        let date = new Date('1980-01-01');
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
    APP.clickById('tv_select');
    sleep(500);
}
// 滑动某天：curDay页面的天或者当天，targetDay目标天
function scrollDay(curDay, targetDay) {
    //滑动选月
    if (ENV.debugMode) {
        log('正在自动找日：%s', targetDay);
    }
    let dayOfDifference = parseInt(curDay - parseInt(targetDay.replace(/\b(0+)/gi, '')));
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
    let monthOfDifference = parseInt(curMonth - parseInt(targetMonth.replace(/\b(0+)/gi, '')));
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