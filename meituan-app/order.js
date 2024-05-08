var APP = null;
var ENV = null;
var DateWidth = 0;

const DATEAPI = require('./date-api.js');
const DATE_HEIGHT = 125; // 日历控件高度
const TOP_HEIGHT = 231; // 日历顶部高度
const RMB = '¥';
const swipeheight = 1260; // 出生日期可滑动的高度
const barHeight = 146; // 乘机人添加出生日期一格高度 
const orderMessage = {
    inconsistentTime: "航班起飞到达时间不一致",
    foundFlight: "找到航班",
    notFoundFlight: "没找到航班",
    clickFinished: "已点击预订",
    foundCabinClass: "找到舱等",
};
const SCROLL_VIEW = 'android.widget.ScrollView';
const VIEW_GROUP = 'android.view.ViewGroup';
const IMAGE_VIEW = 'android.widget.ImageView';
const TEXT_VIEW = 'android.widget.TextView';
const EDIT_TEXT = 'android.widget.EditText';
let allCabinTypeAndPrice = [];

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
// 数组值相等比较
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
// 名单信息中录入年月日
function selectBirth(birth) {
    // 点击请选择乘机人出生日期
    let birthdayUiObject = APP.waitForContainsText('请选择乘机人出生日期', 100, 1000);
    log(birthdayUiObject);
    if (birthdayUiObject) {
        APP.clickArea(birthdayUiObject);
        sleep(2000);
    }
    // 目标年月日
    let births = birth.split('-');
    let year, month, day = '';
    if (births.length > 2) {
        let date = new Date();
        year = date.getFullYear(); //获取完整的年份(4位)19870728
        month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        day = date.getDate(); //获取当前日(1-31)
    }
    log('开始选择年月日 ' + birth);
    scrollYear(year, births[0]);
    scrollMonth(month, births[1]);
    scrollDay(day, births[2]);
    // 点击完成 
    sleep(1000);
    let finishText = APP.waitForContainsText('完成', 100, 1000);
    while (!finishText) {
        finishText = APP.waitForContainsText('完成', 100, 1000);
        sleep(300);
    }
    APP.clickArea(finishText);
    sleep(1000);
}
// 滑动
function slide(x1, x2, swipeCount, duration) {
    swipe(x1, swipeheight, x2, (swipeheight + swipeCount * barHeight), duration);
}
// 滑动某天：curDay页面的天或者当天，targetDay目标天
function scrollDay(curDay, targetDay) {
    //滑动选日
    if (ENV.debugMode) {
        log('正在自动找日：%s', targetDay);
    }
    let dayOfDifference = parseInt(curDay - parseInt(targetDay));
    if (ENV.debugMode) {
        log('与当前日相差：%s', dayOfDifference);
    }
    let round = 0;
    let mod = 0;
    if (dayOfDifference < 0) {
        round = Math.floor((-dayOfDifference) / 1); // 向下取整,丢弃小数部分
        mod = (-dayOfDifference) % 1; //取余
    } else {
        round = Math.floor(dayOfDifference / 1); // 向下取整,丢弃小数部分
        mod = dayOfDifference % 1; //取余
    }
    if (ENV.debugMode) {
        log('日取整：%s,日取余：%s', round, mod);
    }
    sleep(500); //等待日历控件出现
    let dayXPos = text('完成').findOne().bounds().centerX();
    //滑动选日
    if (round > 0) {
        for (let index = 0; index < round; index++) {
            slide(dayXPos, dayXPos, dayOfDifference > 0 ? 1 : -1, 200);
            sleep(1000);
        }
    }
    if (mod > 0) {
        slide(dayXPos, dayXPos, dayOfDifference > 0 ? mod : -mod, 200);
        sleep(1000);
    }
}
// 滑动某月：curMonth页面的月或者当月，targetMonth目标月
function scrollMonth(curMonth, targetMonth) {
    //滑动选月
    if (ENV.debugMode) {
        log('正在自动找月份：%s', targetMonth);
    }
    let monthOfDifference = parseInt(curMonth - parseInt(targetMonth));
    if (ENV.debugMode) {
        log('与当前月相差：%s', monthOfDifference);
    }
    let round = 0;
    let mod = 0;
    if (monthOfDifference < 0) {
        round = Math.floor((-monthOfDifference) / 1); // 向下取整,丢弃小数部分
        mod = (-monthOfDifference) % 1; //取余
    } else {
        round = Math.floor(monthOfDifference / 1); // 向下取整,丢弃小数部分
        mod = monthOfDifference % 1; //取余
    }
    if (ENV.debugMode) {
        log('月份取整：%s,月份取余：%s', round, mod);
    }
    sleep(500); //等待日历控件出现
    //滑动选月份
    if (round > 0) {
        for (let index = 0; index < round; index++) {
            slide(_env.screenWidth / 2, _env.screenWidth / 2, monthOfDifference > 0 ? 1 : -1, 200);
            sleep(1000);
        }
    }
    if (mod > 0) {
        slide(_env.screenWidth / 2, _env.screenWidth / 2, monthOfDifference > 0 ? mod : -mod, 200);
        sleep(1000);
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
        round = Math.floor((-yearOfDifference) / 1); // 向下取整,丢弃小数部分
        mod = (-yearOfDifference) % 1; //取余
    } else {
        // 下滑
        round = Math.floor(yearOfDifference / 1); // 向下取整,丢弃小数部分
        mod = yearOfDifference % 1; //取余
    }
    if (ENV.debugMode) {
        log('年份取整：%s,年份取余：%s', round, mod);
    }
    sleep(500); //等待日历控件出现 
    let finishText = APP.waitForContainsText('完成', 100, 1000);
    while (!finishText) {
        finishText = APP.waitForContainsText('完成', 100, 1000);
        sleep(300);
    }
    // 滑动选年
    if (round > 0) {
        for (let index = 0; index < round; index++) {
            slide(_env.screenWidth / 3 / 2, _env.screenWidth / 3 / 2, yearOfDifference > 0 ? 1 : -1, 300);
            sleep(1000);
        }
    }
    if (mod > 0) {
        slide(_env.screenWidth / 3 / 2, _env.screenWidth / 3 / 2, yearOfDifference > 0 ? mod : -mod, 300);
        sleep(1000);
    }
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
// 重构一下所有价格的结果，目的是让出票员看的懂和简洁
function allPriceResult(allPrice) {
    let result = [];
    allPrice.forEach(element => {
        result.push(element.ticketPrice);
    });
    return result;
}
/**
 * 成人价格比较
 * @param {object} curPrice 
 * @param {object} input 
 */
function adultPriceCompare(curPrice, input) {
    let adultCabinPriceInfo = input.cabinPriceInfos.filter(p => p.type == 0)[0];
    log('成人价格信息：' + JSON.stringify(adultCabinPriceInfo));
    // 票面价比较 
    if (input.createOrderRuleInfo.ticketPriceFloatRange != null) {
        let ticketPriceUpper = input.createOrderRuleInfo.ticketPriceFloatRange.upperLimit + adultCabinPriceInfo.ticketPrice;
        let ticketPriceLower = input.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit + adultCabinPriceInfo.ticketPrice;
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
    if (input.createOrderRuleInfo.settlementPriceFloatRange != null) {
        let settlementPriceUpper = input.createOrderRuleInfo.settlementPriceFloatRange.upperLimit + adultCabinPriceInfo.settlementPrice;
        let settlementPriceLower = input.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit + adultCabinPriceInfo.settlementPrice;
        if (ENV.debugMode) {
            log('结算价上限%s，票面价下限%s', settlementPriceUpper, settlementPriceLower);
            log('航司结算价%s', curPrice.settlementPrice);
        }
        // 符合结算价<=下限 结算价>=上限
        if (curPrice.settlementPrice >= settlementPriceLower && curPrice.settlementPrice <= settlementPriceUpper) {
        } else {
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
    if (input.createOrderRuleInfo.sellPriceFloatRange != null) {
        let sellPriceUpper = input.createOrderRuleInfo.sellPriceFloatRange.upperLimit;
        let sellPriceLower = input.createOrderRuleInfo.sellPriceFloatRange.lowerLimit;
        if (ENV.debugMode) {
            log('销售价上限%s，销售价下限%s', sellPriceUpper, sellPriceLower);
            log('销售价%s', curPrice.sellPrice);
        }
        // 符合结算价<=下限 结算价>=上限
        if (curPrice.sellPrice >= sellPriceLower && curPrice.sellPrice <= sellPriceUpper) {
        } else {
            let sellPriceValue = Math.abs(parseFloat(curPrice.ticketPrice - adultCabinPriceInfo.settlementPrice).toFixed(1));
            // 票面价低于销售价浮动范围下限，则报错：票面价比ota优惠价低"航司票面价-ota结算价的绝对值"，过低，请检查降舱降价规则。
            if (curPrice.sellPrice < sellPriceLower) {
                throw "票面价比ota优惠价低" + sellPriceValue + "，过低，请检查降舱降价规则。实际查询到的票面" + curPrice.ticketPrice;
            }
            // 票面价高于销售价浮动范围上限，则报错：票面价比ota优惠价高"航司票面价-ota优惠价的绝对值"，过高，请检查降舱降价规则。
            if (curPrice.sellPrice > sellPriceUpper) {
                throw "票面价比ota优惠价高" + sellPriceValue + "，过高，请检查降舱降价规则。实际查询到的票面" + curPrice.ticketPrice;
            }
        }
    }
}
/**
 * 下单
 */
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
    createOrder: function (input) {
        sleep(2000);

        // 点击首页火车票机票
        let mainFunUiObject = APP.waitForContainsText('火车票机票', 100, 5000);
        if (mainFunUiObject) {
            APP.clickArea(mainFunUiObject);
            sleep(5000);
        }

        let jump = APP.waitForContainsText('跳过', 100, 2000);
        if (jump) {
            APP.clickArea(jump);
        }

        // 等待搜索页面加载完毕
        let serachTextUiObject = APP.waitForContainsText('搜索', 100, 1000);
        while (!serachTextUiObject) {
            serachTextUiObject = APP.waitForContainsText('搜索', 100, 1000);
        }

        //  输入起飞到达
        this.inputDepartureAndArrive(input.flights[0].originAirport, input.flights[0].destinationAirport);

        // 选择起飞日期
        this.selectDepartureDate(new Date(input.flights[0].departureDateTime));

        // 检测选中的日期是否和目标日期一致
        this.checkCorrectDepartureDate(new Date(input.flights[0].departureDateTime));

        // 点击清除历史
        let clearHistoryBtn = APP.waitForContainsText('清除历史', 100, 1000);
        if (clearHistoryBtn) {
            if (ENV.debugMode) {
                log('点击清除历史');
            }
            APP.clickArea(clearHistoryBtn);
            sleep(500);
        }

        // 点击搜索
        let scrollableUiObject = className(SCROLL_VIEW).findOne();
        while (!scrollableUiObject) {
            scrollableUiObject = className(SCROLL_VIEW).findOne();
        }
        // 找到城市区日期块域块
        let cityBlockUiObject = scrollableUiObject.findOne(className(VIEW_GROUP).depth(14));
        log(cityBlockUiObject);
        // 搜索按钮
        if (cityBlockUiObject && cityBlockUiObject.child(3) && cityBlockUiObject.child(3).child(0) && cityBlockUiObject.child(3).child(0).child(0) && cityBlockUiObject.child(3).child(0).child(0).child(0).child(6)) {
            let searchBtn = cityBlockUiObject.child(3).child(0).child(0).child(0).child(6);
            searchBtn.click();
            sleep(5000);
            if (ENV.debugMode) {
                log('点击搜索')
            }
        }

        // 查找航班
        let fCard = this.findFlight(input.flights[0].fullFlightNo, input.flights[0].departureDateTime, input.flights[0].arrivalDateTime);
        if (!fCard) {
            throw '找不到航班: ' + input.flights[0].fullFlightNo;
        }

        // 获取符合条件的价格
        const adultSettlementPrice = input.cabinPriceInfos.filter(c => c.type == 0)[0].settlementPrice; // OTA结算价
        let allPrices = this.getEligiblePrice(input.passengers.length, adultSettlementPrice);

        // 点击预定
        this.clickBooking(input, allPrices);

        // 新增乘机人
        this.addPassengers(input.passengers);

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
        const adultCount = input.passengers.filter(p => p.type == 0).length;
        const childCount = input.passengers.filter(p => p.type == 1).length;
        const infantCount = input.passengers.filter(p => p.type == 2).length;
        log('成人目标数量%s，实际下单人数%s', adultCount, adultNum);
        log('儿童目标数量%s，实际下单人数%s', childCount, childNum);
        log('婴儿目标数量%s，实际下单人数%s', infantCount, infantNum);
        if ((adultCount != adultNum) || (childCount != childNum) || (infantCount != infantNum)) {
            throw 'APP下单人数与目标人数不一致，请重新下单。成人：' + adultNum + '，儿童：' + childNum + '，婴儿：' + infantNum;
        }

        // 编辑联系人
        this.editContactInfo(input.contactInfo);

        return this.orderDetail(input);
    },
    /**
     * 输入起飞、到达城市
     * @param {string} departure 起飞城市
     * @param {string} arrive 到达城市
     */
    inputDepartureAndArrive(departure, arrive) {
        function input(city, type) {
            // 找到唯一的滚动块
            let scrollableUiObject = className(SCROLL_VIEW).findOne();
            // 找到城市区域块
            let cityBlockUiObject = scrollableUiObject.findOne(className(VIEW_GROUP).depth(14));
            log(cityBlockUiObject);
            // 出发到达城市块
            if (cityBlockUiObject && cityBlockUiObject.child(3) && cityBlockUiObject.child(3).child(0) && cityBlockUiObject.child(3).child(0).child(0) && cityBlockUiObject.child(3).child(0).child(0).child(0).child(1)) {
                let departureAndArriveCityBlockUiObject = cityBlockUiObject.child(3).child(0).child(0).child(0).child(1).find(className('android.view.ViewGroup').depth(20).clickable(true));
                log(departureAndArriveCityBlockUiObject.size());
                if (departureAndArriveCityBlockUiObject) {
                    if (type == 'departureCity') {
                        // 第一个是出发城市
                        departureAndArriveCityBlockUiObject.get(0).click();
                        sleep(500);
                    } else {
                        // 第三个是到达城市
                        departureAndArriveCityBlockUiObject.get(2).click();
                        sleep(500);
                    }
                }
            }

            // 点击城市输入框
            let serchInput = className('android.widget.EditText').findOne();
            if (serchInput) {
                serchInput.click();
                sleep(500);
                serchInput.setText(city);
                sleep(1000);
            }
            sleep(3000);

            // 等待城市列表出现
            let cityScrollUiObject = className(SCROLL_VIEW).findOne();
            while (!cityScrollUiObject) {
                cityScrollUiObject = className(SCROLL_VIEW).findOne();
            }
            let cityResult = cityScrollUiObject.find(className(VIEW_GROUP).depth(12)).toArray();
            cityResult.forEach(cityEle => {
                let cityTextUiObject = cityEle.findOne(text(city));
                if (cityTextUiObject) {
                    APP.clickArea(cityTextUiObject);
                    sleep(1000);
                }
            });
        }
        // 点击出发城市
        log('点击出发城市');
        input(departure, 'departureCity');
        sleep(3000);

        // 点击到达城市
        log('点击到达城市');
        input(arrive, 'arriveCity');
        sleep(3000);
    },
    /**
   * 选择日期
   * @param {string} date 时间2021-01-01T08:00:00Z
   */
    selectDepartureDate: function (date) {
        sleep(5000);

        // 找到唯一的滚动块
        let scrollableUiObject = className(SCROLL_VIEW).findOne();
        while (!scrollableUiObject) {
            scrollableUiObject = className(SCROLL_VIEW).findOne();
        }

        // 当前系统时间
        const systemDate = new Date();
        const systemDateYear = systemDate.getFullYear();
        const systemDateMonth = systemDate.getMonth() + 1;
        const systemDateDate = systemDate.getDate();

        // 目标时间
        const targetYear = date.getFullYear();
        const targetMonth = date.getMonth() + 1;
        const targetDay = date.getDate();

        // 当天可以选择
        if (systemDateYear + '-' + systemDateMonth + '-' + systemDateDate != targetYear + '-' + targetMonth + '-' + targetDay) {
            if (date.getTime() > systemDate.getTime()) { } else {
                log('日期必须大于当天日期，目标日期：%s，当天日期：%s', date, systemDate);
                throw "日期必须大于当天日期,目标日期：" + date + " , 当天日期为：" + systemDate;
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
                log("目标月是今天所在的月 特殊处理");
            }
            // 找到城市区日期块域块（超出范围，注意depth是否正确）
            let cityBlockUiObject = scrollableUiObject.findOne(className(VIEW_GROUP).depth(14));
            log(cityBlockUiObject);
            // 出发到达城市块
            if (cityBlockUiObject && cityBlockUiObject.child(3) && cityBlockUiObject.child(3).child(0) && cityBlockUiObject.child(3).child(0).child(0) && cityBlockUiObject.child(3).child(0).child(0).child(0).child(2)) {
                dateInputView = cityBlockUiObject.child(3).child(0).child(0).child(0).child(2);
                APP.clickArea(dateInputView); // 打开日期选择页面
                sleep(5000); // 等待动画结束
            }

            if (ENV.debugMode) {
                log("回滚到顶部");
            }
            let scrollableUiObject2 = className(SCROLL_VIEW).findOne();
            while (scrollableUiObject2.scrollBackward()) {
                scrollableUiObject2.scrollBackward()
                sleep(500);
            }
            sleep(2000);

            let y = TOP_HEIGHT + targetWeekCount * DATE_HEIGHT + DATE_HEIGHT * 0.5;
            clickDateButton(x, y);
            return;
        }

        while (true) {
            sleep(4000);
            // 找到唯一的滚动块
            let scrollableUiObject = className(SCROLL_VIEW).findOne();
            while (!scrollableUiObject) {
                scrollableUiObject = className(SCROLL_VIEW).findOne();
            }
            // 找到城市区日期块域块（超出范围，注意depth是否正确）
            let cityBlockUiObject = scrollableUiObject.findOne(className(VIEW_GROUP).depth(14));
            log(cityBlockUiObject);
            // 日期块
            if (cityBlockUiObject && cityBlockUiObject.child(3) && cityBlockUiObject.child(3).child(0) && cityBlockUiObject.child(3).child(0).child(0) && cityBlockUiObject.child(3).child(0).child(0).child(0).child(2)) {
                dateInputView = cityBlockUiObject.child(3).child(0).child(0).child(0).child(2);
            }
            let dateInputViewMonUiObject = dateInputView.child(0);
            while (!dateInputViewMonUiObject) {
                dateInputViewMonUiObject = dateInputView.child(0);
            }

            let dateInputViewDayUiObject = dateInputView.child(2);
            while (!dateInputViewDayUiObject) {
                dateInputViewDayUiObject = dateInputView.child(2);
            }
            let dateInputViewText = dateInputViewMonUiObject.text() + dateInputView.child(1).text() + dateInputViewDayUiObject.text() + dateInputView.child(3).text();
            log('当前选中的日期：' + dateInputViewText)
            currentSelectedDate = this.parseDate(dateInputViewText);
            if (numberEqual(currentSelectedDate.month, targetMonth) && numberEqual(currentSelectedDate.day, targetDay)) {
                return;
            }

            if (ENV.debugMode) {
                log(
                    "准备开始选择日期，目标日期 %s, %s 当前选中日期 %s, %s",
                    targetMonth,
                    targetDay,
                    currentSelectedDate.month,
                    currentSelectedDate.day
                );
            }

            APP.clickArea(dateInputView); // 打开日期选择页面
            sleep(5000); // 等待动画结束
            if (ENV.debugMode) {
                log("打开日期选择页面");
            }

            // 找到唯一的滚动块
            let calendarView = className(SCROLL_VIEW).findOne();
            let calendarPageHeight = calendarView.bounds().height();
            if (ENV.debugMode) {
                log("已获取日历控件");
            }

            //获取当前选中年份
            currentSelectedDate.year = this.parseDate(
                APP.getByTextContains("月").text()
            ).year;

            if (ENV.debugMode) {
                log(
                    "已获取选中日期 %s, %s-%s",
                    currentSelectedDate.year,
                    currentSelectedDate.month,
                    currentSelectedDate.day
                );
            }

            // 当前选中月份下边沿
            // let currentMonthViewBottom = APP.getByTextContains(
            //     currentSelectedDate.month + "月"
            // ).bounds().bottom;
            let currentMonthViewBottom = 377;

            if (ENV.debugMode) {
                log("已获取当前选中月份，下边沿 %s", currentMonthViewBottom);
            }

            // 计算目标月份位置
            let monthDelta = parseInt(targetTotalMonth) - (parseInt((currentSelectedDate.year - 1) * 12) + parseInt(currentSelectedDate.month));

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

                    let mWeekCount = DATEAPI.getWeekNumInCurrentMonth(new Date(m.year, m.month, 0)) + 1;

                    if (ENV.debugMode) {
                        log("已向前一个月 %s年%s月 总周数 %s", m.year, m.month, mWeekCount);
                    }

                    if (numberEqual(m.year, targetYear) && numberEqual(m.month, targetMonth)) {
                        // 找到需要的月份

                        let r = mWeekCount - targetWeekCount;
                        if (ENV.debugMode) {
                            log("剩余周数 " + r);
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
                    log("找到y轴偏移量 %s 开始翻页", y);
                }

                while (!(y > TOP_HEIGHT && y < ENV.screenHeight)) {
                    if (ENV.debugMode) {
                        log("当前y坐标 %s 不在屏幕内，上翻一页", y);
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

                let mWeekCount = DATEAPI.getWeekNumInCurrentMonth(new Date(m.year, m.month, 0)) + 1;

                let y = currentMonthViewBottom + DATE_HEIGHT * mWeekCount; // 目标日期所在的坐标
                if (ENV.debugMode) {
                    log("当前周数 %s 日期下边沿为 %s", mWeekCount, y);
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
                        log("已向后一个月 %s年%s月 总周数 %s", m.year, m.month, mWeekCount);
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
                }

                if (ENV.debugMode) {
                    log("找到y轴偏移量 %s 开始翻页", y);
                }

                while (!(y > TOP_HEIGHT && y < ENV.screenHeight)) {
                    if (ENV.debugMode) {
                        log("当前y坐标 %s 不在屏幕内，下翻一页", y);
                    }
                    calendarView.scrollForward();
                    sleep(700); // 等待翻页动画
                    y -= calendarPageHeight;
                }

                clickDateButton(x, y);
            } else if (monthDelta >= 7) {
                log("targetTotalMonth " + targetTotalMonth);
                log("currentSelectedDate.year " + currentSelectedDate.year);
                log("currentSelectedDate.month " + currentSelectedDate.month);
                let a = parseInt((currentSelectedDate.year - 1) * 12) + parseInt(currentSelectedDate.month);
                log("x " + a);
                throw "暂不支持 超过当前6个月的日期输入 当前月份差值" + monthDelta;
            } else {
                // 当前月 不需要滑动
                // 获取目标日期所在周数
                if (ENV.debugMode) {
                    log("月份不变");
                }
                if (ENV.debugMode) {
                    log("目标日期当月周数 %s", targetWeekCount);
                }
                let y = currentMonthViewBottom + targetWeekCount * DATE_HEIGHT - DATE_HEIGHT * 0.5;
                clickDateButton(x, y);
            }
        }
    },
    /**
     * 日期转换
     * @param {string} dateStr 时间xxxx年xx月xx日
     * @returns
     */
    parseDate: function (dateStr) {
        const dateRegex = /((\d{4})年)?(\d{1,2})月((\d{1,2})日)?/;
        const result = dateRegex.exec(dateStr);
        return {
            year: result[2],
            month: result[3],
            day: result[5],
        };
    },
    /**
     * 获取已选择的日期
     * @returns
     */
    getSelectedDate() {
        sleep(5000);
        let scrollableUiObject = className(SCROLL_VIEW).findOne();
        while (!scrollableUiObject) {
            scrollableUiObject = className(SCROLL_VIEW).findOne();
        }
        // 找到城市区日期块域块（超出范围，注意depth是否正确）
        let cityBlockUiObject = scrollableUiObject.findOne(className(VIEW_GROUP).depth(14));
        log(cityBlockUiObject);
        let dateInputView = null;
        // 日期块
        if (cityBlockUiObject && cityBlockUiObject.child(3) && cityBlockUiObject.child(3).child(0) && cityBlockUiObject.child(3).child(0).child(0) && cityBlockUiObject.child(3).child(0).child(0).child(0).child(2)) {
            dateInputView = cityBlockUiObject.child(3).child(0).child(0).child(0).child(2);
        }
        let dateInputViewMonUiObject = dateInputView.child(0);
        while (!dateInputViewMonUiObject) {
            dateInputViewMonUiObject = dateInputView.child(0);
        }
        let dateInputViewDayUiObject = dateInputView.child(2);
        while (!dateInputViewDayUiObject) {
            dateInputViewDayUiObject = dateInputView.child(2);
        }
        let bookingDateText = dateInputViewMonUiObject.text() + dateInputView.child(1).text() + dateInputViewDayUiObject.text() + dateInputView.child(3).text();
        return bookingDateText;
    },
    /**
    * 点击搜索前判断选择的日期是否正确
    * @param {string} date 时间2021-01-01T08:00:00Z
    */
    checkCorrectDepartureDate: function (date) {
        const targetMonth = date.getMonth() + 1;
        const targetDay = date.getDate();
        let targetDateText = (targetMonth < 10 ? '0' + targetMonth : targetMonth) + '月' + (targetDay < 10 ? '0' + targetDay : targetDay) + '日';
        let bookingDateText = this.getSelectedDate();
        let checkCount = 0;
        log(bookingDateText + '==' + targetDateText)
        while (checkCount < 4 && bookingDateText != targetDateText) {
            this.selectDepartureDate(new Date(date));
            checkCount++;
            bookingDateText = this.getSelectedDate();
        }
        bookingDateText = this.getSelectedDate();
        if (bookingDateText != targetDateText) {
            throw '日期选择有误，请重新下单，当前选中日期 ' + bookingDateText + '，目标日期 ' + targetDateText;
        }
    },
    /**
     * 查找航班
     * @param {string} fullFlightNo
     * @returns
     */
    findFlight: function (fullFlightNo, departureDateTime, arrivalDateTime) {
        // 关闭提示框
        APP.closeDialog();
        sleep(2000);

        // 查找航班
        let flightContainer = className(SCROLL_VIEW).findOne();
        let findCount = 0;
        while (!flightContainer && findCount < 4) {
            findCount++;
            flightContainer = className(SCROLL_VIEW).findOne();
        }
        if (!flightContainer) {
            throw '您选择的航线暂无航班计划，请您更换行程重新查询';
        }

        let findFullFlightNo = null;
        let lastFullFlightNo = '';
        while (true) {
            lastFullFlightNo = findFullFlightNo; // 最后一个航班号
            try {
                flightContainer = className(SCROLL_VIEW).findOne();
                let flights = flightContainer.find(className(VIEW_GROUP).depth(12).clickable(true)).toArray();
                if (ENV.debugMode) {
                    log('航班数量：' + flights.length);
                    log('准备查找航班' + fullFlightNo);
                }
                flights.forEach(element => {
                    // 最后两个模块会被筛选条件挡住，需要滑动一定距离重新获取组件，再判断是否符合目标航班号的条件，点击预定 
                    if (element.bounds().bottom > 1450) {
                        throw '滑动一点点'
                    }
                    // 第4块是航班号
                    let viewGroups = element.find(className(VIEW_GROUP).depth(13));
                    if (ENV.debugMode) {
                        log('获取到的ViewGroup数量：' + viewGroups.size());
                    }
                    if (viewGroups.size() <= 2) {
                        return;
                    }
                    let flightNoTextCollection = null;
                    if (viewGroups.size() == 5 || viewGroups.size() == 6) {
                        flightNoTextCollection = viewGroups.get(3).find(className('android.widget.TextView').depth(15));
                    } else if (viewGroups.size() > 6) {
                        flightNoTextCollection = viewGroups.get(4).find(className('android.widget.TextView').depth(15));
                    }
                    if (ENV.debugMode) {
                        log('获取到的文本数量：' + flightNoTextCollection.size());
                    }
                    if (flightNoTextCollection.size() > 0) {
                        let flightNoText = flightNoTextCollection.get(0).text();
                        if (flightNoText.indexOf('共享') > -1) {
                            if (ENV.debugMode) {
                                log('排除共享航班');
                            }
                            return;
                        }
                        findFullFlightNo = flightNoText.slice(-6).replace(" ", "");
                        if (ENV.debugMode) {
                            log('找到的航班号：' + findFullFlightNo);
                        }
                        let departureTime = element.child(1).text();
                        log("找到的起飞时间：" + departureTime);
                        let arriveTime = element.child(3).text();
                        log("找到的到达时间：" + arriveTime);
                        let departureDate = getHourAndMin(departureDateTime);
                        let arrivalDate = getHourAndMin(arrivalDateTime);
                        log('目标起飞时间%s，目标到达时间', departureDate, arrivalDate);
                        if (findFullFlightNo == fullFlightNo) {
                            if (departureTime != departureDate && arriveTime != arrivalDate) {
                                throw orderMessage.inconsistentTime;
                            }
                            APP.clickArea(element);
                            throw orderMessage.foundFlight;
                        }
                    }
                });
            } catch (error) {
                if (ENV.debugMode) {
                    log('捕获到的异常：' + error);
                }
                if (error == '滑动一点点') {
                    APP.scroll300();
                } else if (error == orderMessage.foundFlight) {
                    findFullFlightNo = fullFlightNo;
                    break;
                } else if (error == orderMessage.notFoundFlight || error == orderMessage.inconsistentTime) {
                    throw error;
                }
            }
            if (lastFullFlightNo == findFullFlightNo) {
                log("航班列表已经到底了");
                findFullFlightNo = null;
                break;
            }
        }
        return findFullFlightNo;
    },
    /**
     * 获取符合条件的价格
     * @param {int} passengersCount 乘机人数量
     * @param {number} settlementPrice OTA结算价
     */
    getEligiblePrice: function (passengersCount, adultSettlementPrice) {
        sleep(10000);

        // 关闭提示框
        APP.closeDialog();

        // 滚动块包含经济舱、公务舱/头等舱舱等类型和预订块
        let scrollableUiObject = className(SCROLL_VIEW).depth(10).findOne();
        while (!scrollableUiObject) {
            scrollableUiObject = className(SCROLL_VIEW).depth(10).findOne();
        }

        let pre = 0;
        let current = scrollableUiObject.boundsInParent().bottom;

        function nextPage(scrollableUiObject) {
            APP.scrollForward(scrollableUiObject);
            scrollableUiObject = className(SCROLL_VIEW).depth(10).findOne();
            let bottomVal = scrollableUiObject.boundsInParent().bottom;
            return bottomVal;
        }

        let tempCabinTypeAndPrice = [];
        try {
            // 找到符合的价格和产品类型，并按低价拍排序
            let threeBlockCollection = scrollableUiObject.find(className(VIEW_GROUP).depth(13));
            if (ENV.debugMode) {
                // 一定会拿到3个模块，1模块是航班信息，2模块是舱等类型，3是预订块
                log('一定会拿到3个模块：' + threeBlockCollection.size());
            }
            // 预订块
            let bookingBlockCollection = threeBlockCollection.get(2).find(className(VIEW_GROUP).depth(16)).toArray();
            // 有筛选学生优享（17-23岁）、青年会员专享(18-24岁)、青春之旅（16-23岁）、长者尊享（60周岁含以上）、多人特惠，会员优享...，多个里面挑选最低价
            // let productCodes = [];
            // if (input.productCodes && input.productCodes != null && input.productCodes != '') {
            //     if (ENV.debugMode) {
            //         log("产品类型：" + input.productCodes);
            //     }
            //     productCodes = input.productCodes.split("|");
            // }
            if (ENV.debugMode) {
                log('预订块：' + bookingBlockCollection.length);
            }

            bookingBlockCollection.forEach((ele, eleIndex) => {
                // 排除提供发票的价格
                let provideInvoice = ele.findOne(textContains('提供发票'));
                if (provideInvoice) {
                    log('排除提供发票的价格')
                    return;
                }
                let blockCollection = null;
                if (ele.child(0) && ele.child(0).child(0)) {
                    // 找到多组数据，第一组价格和产品类型，第二组是预定按钮，第三组可能是延误礼包或者限制年龄
                    blockCollection = ele.child(0).child(0).find(className(VIEW_GROUP).depth(20));
                }
                log('组数：' + blockCollection.size())
                // 排除延误礼包、学生优享（17-23岁）、青年会员专享(18-24岁)、青春之旅（16-23岁）、长者尊享（60周岁含以上）、多人特惠、老年特惠（限60周岁及以上），会员优享
                if (blockCollection.size() > 0) {
                    // 第三组可能是延误礼包或者限制年龄
                    let excludeUiObject1 = blockCollection.get(blockCollection.size() - 1).findOne(textContains('延误礼包'));
                    let excludeUiObject2 = blockCollection.get(blockCollection.size() - 1).findOne(textStartsWith('限'));
                    let excludeUiObject3 = blockCollection.get(blockCollection.size() - 1).findOne(textContains('至少2位同行'));
                    let excludeUiObject4 = blockCollection.get(blockCollection.size() - 1).findOne(textContains('优享礼包'));
                    if (excludeUiObject1 || excludeUiObject2 || (passengersCount == 1 && excludeUiObject3) || excludeUiObject4) {
                        if (ENV.debugMode) {
                            log('排除延误礼包或者含‘限’字的预定模块');
                        }
                        return;
                    }
                    let ticketPrice = 0;
                    // 如果只有1组直接拿价格
                    if (blockCollection.size() == 1) {
                        // 获取票面价
                        if (blockCollection.get(0).child(0) && blockCollection.get(0).child(0).child(0) && blockCollection.get(0).child(0).child(0).child(0)) {
                            let priceTextUiObject = blockCollection.get(0).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                            ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                            log('价格：' + ticketPrice);
                        }
                    } else if (blockCollection.size() == 2) {
                        // 2组会有两种情况：
                        // 第一组可能是产品类型(左上角【优选飞、24小时客服，急速退款、赠外卖会员礼包、商旅优选、赠送1200消费积分。。。。】)，第二组是左边价格右边预定按钮
                        // 第一组可能是左边价格右边预定按钮，第二组是底下信息（延误礼包、限制年龄、提供发票。。。）
                        // 获取票面价(针对第一组是产品类型)
                        if (blockCollection.get(1).child(0) && blockCollection.get(1).child(0).child(0) && blockCollection.get(1).child(0).child(0).child(0)) {
                            let priceTextUiObject = blockCollection.get(1).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                            ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                            log('价格：' + ticketPrice);
                        }
                        // 获取票面价(针对第二组是左边价格右边预定按钮)
                        if (blockCollection.get(0).child(0) && blockCollection.get(0).child(0).child(0) && blockCollection.get(0).child(0).child(0).child(0)) {
                            let priceTextUiObject = blockCollection.get(0).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                            ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                            log('价格：' + ticketPrice);
                        }
                    } else if (blockCollection.size() == 3) {
                        // 3组会有两种情况：
                        // 第一组可能是产品类型(左上角【优选飞、24小时客服，急速退款、赠外卖会员礼包、商旅优选、赠送1200消费积分。。。。】)，第二组是左边价格右边预定按钮，第三组是底下信息（延误礼包、限制年龄、提供发票。。。）

                        // 获取票面价(针对第一组是产品类型)
                        if (blockCollection.get(1).child(0) && blockCollection.get(1).child(0).child(0) && blockCollection.get(1).child(0).child(0).child(0)) {
                            let priceTextUiObject = blockCollection.get(1).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                            ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                            log('价格：' + ticketPrice);
                        }
                        // 第一二组是产品类型(左上角【优选飞、24小时客服，急速退款、赠外卖会员礼包、商旅优选、赠送1200消费积分。。。。】)，第三组是左边价格右边预定按钮
                        // 获取票面价
                        if (blockCollection.get(2).child(0) && blockCollection.get(2).child(0).child(0) && blockCollection.get(2).child(0).child(0).child(0)) {
                            let priceTextUiObject = blockCollection.get(2).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                            ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                            log('价格：' + ticketPrice);
                        }
                    } else if (blockCollection.size() == 4) {
                        // 第一二组是产品类型(左上角【优选飞、24小时客服，急速退款、赠外卖会员礼包、商旅优选、赠送1200消费积分。。。。】)，第三组是左边价格右边预定按钮，第四组是限xxxx
                        // 获取票面价
                        if (blockCollection.get(2).child(0) && blockCollection.get(2).child(0).child(0) && blockCollection.get(2).child(0).child(0).child(0)) {
                            let priceTextUiObject = blockCollection.get(2).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                            ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                            log('价格：' + ticketPrice);
                        }
                    }
                    if (ticketPrice > 0) {
                        let allCabinTypeAndPriceNotExist = allCabinTypeAndPrice.filter(p => p.ticketPrice == ticketPrice).length;
                        // 获取所有产品类型和价格
                        if (allCabinTypeAndPriceNotExist == 0) {
                            allCabinTypeAndPrice.push({
                                ticketPrice: ticketPrice
                            })
                        }
                        let tempCabinTypeAndPriceNotExist = tempCabinTypeAndPrice.filter(p => p.ticketPrice == ticketPrice).length;
                        if (tempCabinTypeAndPriceNotExist == 0) {
                            tempCabinTypeAndPrice.push({
                                ticketPrice: ticketPrice,
                                settlementPrice: ticketPrice, // 结算价 = app票面价 - 立减
                                sellPrice: parseFloat(ticketPrice - adultSettlementPrice).toFixed(1),//销售价=app票面价-ota结算价
                            })
                        }
                    }
                    if (eleIndex % 3 == 0) {
                        pre = current;
                        current = nextPage(scrollableUiObject);
                    }
                }
            });
            // 所有价格结果排序
            allCabinTypeAndPrice.sort((firstItem, secondItem) => firstItem.ticketPrice - secondItem.ticketPrice);
            // 排序
            tempCabinTypeAndPrice.sort((firstItem, secondItem) => firstItem.ticketPrice - secondItem.ticketPrice);

            if (ENV.debugMode) {
                console.log('所有价格结果排序: %s', JSON.stringify(allCabinTypeAndPrice));
                console.log('排序后的价格 %s', JSON.stringify(tempCabinTypeAndPrice));
            }
        } catch (error) {
            throw error;
        } finally {
            // 恢复原始
            if (tempCabinTypeAndPrice.length > 0) {
                scrollableUiObject.scrollBackward();
                sleep(1000);
                pre = 0;
            }
        }
        return tempCabinTypeAndPrice;
    },
    /**
     * 点击预订或选购
     * @param {object} input
     * @param {allPrice} array
     * @returns
     */
    clickBooking(input, allPrices) {
        sleep(2000);

        // 成人信息 
        let adultCabinPriceInfo = input.cabinPriceInfos.filter(p => p.type == 0)[0];
        let ticketPriceUpper = 0;
        let ticketPriceLower = 0;
        if (input.createOrderRuleInfo.ticketPriceFloatRange != null) {
            ticketPriceUpper = input.createOrderRuleInfo.ticketPriceFloatRange.upperLimit + adultCabinPriceInfo.ticketPrice;
            ticketPriceLower = input.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit + adultCabinPriceInfo.ticketPrice;
            log('票面价上限%s，票面价下限%s', ticketPriceUpper, ticketPriceLower);
        }

        // 排除不符合的票面价  
        let complianceData = [];
        for (let index = 0; index < allPrices.length; index++) {
            let element = allPrices[index];
            // 只会比较单个成人票面价 
            if (element.ticketPrice >= ticketPriceLower && element.ticketPrice <= ticketPriceUpper) {
                complianceData.push({
                    ticketPrice: element.ticketPrice,
                    sellPrice: element.sellPrice,
                    settlementPrice: element.settlementPrice
                })
            }
        }
        log('剩余符合的价格：' + JSON.stringify(complianceData));

        if (complianceData.length == 0) {
            throw '产品类型、价格或舱位不符，实际查到的产品类型、价格和舱位：' + JSON.stringify(allPriceResult(allCabinTypeAndPrice));
        } else {
            adultPriceCompare(complianceData[0], input);
        }

        // 滚动块包含经济舱、公务舱/头等舱舱等类型和预订块
        let scrollableUiObject = className(SCROLL_VIEW).depth(10).findOne();
        while (!scrollableUiObject) {
            scrollableUiObject = className(SCROLL_VIEW).depth(10).findOne();
        }

        function nextPage(scrollableUiObject) {
            APP.scrollForward(scrollableUiObject);
            scrollableUiObject = className(SCROLL_VIEW).depth(10).findOne();
            let bottomVal = scrollableUiObject.boundsInParent().bottom;
            return bottomVal;
        }

        let xg = findBooking(input, allPrices);
        if (xg) {
            return;
        } else {
            throw '价格不符，实际查到的价格：' + JSON.stringify(allPriceResult(allCabinTypeAndPrice));
        }

        // 点击订购
        function findBooking(input, allPrices) {
            let clicked = false;
            try {
                let threeBlockCollection = scrollableUiObject.find(className(VIEW_GROUP).depth(13));
                if (ENV.debugMode) {
                    // 一定会拿到3个模块，1模块是航班信息，2模块是舱等类型，3是预订块
                    log('一定会拿到3个模块：' + threeBlockCollection.size());
                }
                // 预订块
                let bookingBlockCollection = threeBlockCollection.get(2).find(className(VIEW_GROUP).depth(16)).toArray();
                if (ENV.debugMode) {
                    log('预订块：' + bookingBlockCollection.length);
                }
                // 有筛选学生优享（17-23岁）、青年会员专享(18-24岁)、青春之旅（16-23岁）、长者尊享（60周岁含以上）、多人特惠，会员优享...，多个里面挑选最低价
                // let productCodes = [];
                // if (input.productCodes && input.productCodes != null && input.productCodes != '') {
                //     if (ENV.debugMode) {
                //         log("产品类型：" + input.productCodes);
                //     }
                //     productCodes = input.productCodes.split("|");
                // }
                bookingBlockCollection.forEach((ele, eleIndex) => {
                    log(eleIndex);
                    // 排除提供发票的价格
                    let provideInvoice = ele.findOne(textContains('提供发票'));
                    if (provideInvoice) {
                        log('排除提供发票的价格')
                        return;
                    }
                    let blockCollection = null;
                    if (ele.child(0) && ele.child(0).child(0)) {
                        // 找到多组数据，第一组价格和产品类型，第二组是预定按钮，第三组可能是延误礼包或者限制年龄
                        blockCollection = ele.child(0).child(0).find(className(VIEW_GROUP).depth(20));
                    }
                    log('组数：' + blockCollection.size())
                    // 排除延误礼包、学生优享（17-23岁）、青年会员专享(18-24岁)、青春之旅（16-23岁）、长者尊享（60周岁含以上）、多人特惠、老年特惠（限60周岁及以上），会员优享
                    if (blockCollection.size() > 0) {
                        // 第三组可能是延误礼包或者限制年龄（仅限成人购买、限12周岁（含）以上购买、限制16-23周岁青年用户预定、限60周岁（含）以上乘客购买）
                        let excludeUiObject1 = blockCollection.get(blockCollection.size() - 1).findOne(textContains('延误礼包'));
                        let excludeUiObject2 = blockCollection.get(blockCollection.size() - 1).findOne(textStartsWith('限'));
                        let excludeUiObject3 = blockCollection.get(blockCollection.size() - 1).findOne(textContains('至少2位同行'));
                        let excludeUiObject4 = blockCollection.get(blockCollection.size() - 1).findOne(textContains('优享礼包'));
                        if (excludeUiObject1 || excludeUiObject2 || (input.passengers.length == 1 && excludeUiObject3) || excludeUiObject4) {
                            if (ENV.debugMode) {
                                log('排除延误礼包或者含‘限’字的预定模块');
                            }
                            return;
                        }
                        let ticketPrice = 0;
                        // 如果只有1组直接拿价格
                        if (blockCollection.size() == 1) {
                            // 获取票面价
                            if (blockCollection.get(0).child(0) && blockCollection.get(0).child(0).child(0) && blockCollection.get(0).child(0).child(0).child(0)) {
                                let priceTextUiObject = blockCollection.get(0).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                                ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                                log('价格：' + ticketPrice);
                            }
                        } else if (blockCollection.size() == 2) {
                            // 2组会有两种情况：
                            // 第一组可能是产品类型(左上角【优选飞、24小时客服，急速退款、赠外卖会员礼包、商旅优选、赠送1200消费积分。。。。】)，第二组是左边价格右边预定按钮
                            // 第一组可能是左边价格右边预定按钮，第二组是底下信息（延误礼包、限制年龄、提供发票。。。）
                            // 获取票面价(针对第一组是产品类型)
                            if (blockCollection.get(1).child(0) && blockCollection.get(1).child(0).child(0) && blockCollection.get(1).child(0).child(0).child(0)) {
                                let priceTextUiObject = blockCollection.get(1).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                                ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                                log('价格：' + ticketPrice);
                            }
                            // 获取票面价(针对第二组是左边价格右边预定按钮)
                            if (blockCollection.get(0).child(0) && blockCollection.get(0).child(0).child(0) && blockCollection.get(0).child(0).child(0).child(0)) {
                                let priceTextUiObject = blockCollection.get(0).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                                ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                                log('价格：' + ticketPrice);
                            }
                        } else if (blockCollection.size() == 3) {
                            // 3组会有两种情况：
                            // 第一组可能是产品类型(左上角【优选飞、24小时客服，急速退款、赠外卖会员礼包、商旅优选、赠送1200消费积分。。。。】)，第二组是左边价格右边预定按钮，第三组是底下信息（延误礼包、限制年龄、提供发票。。。）

                            // 获取票面价(针对第一组是产品类型)
                            if (blockCollection.get(1).child(0) && blockCollection.get(1).child(0).child(0) && blockCollection.get(1).child(0).child(0).child(0)) {
                                let priceTextUiObject = blockCollection.get(1).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                                ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                                log('价格：' + ticketPrice);
                            }
                            // 第一二组是产品类型(左上角【优选飞、24小时客服，急速退款、赠外卖会员礼包、商旅优选、赠送1200消费积分。。。。】)，第三组是左边价格右边预定按钮
                            // 获取票面价
                            if (blockCollection.get(2).child(0) && blockCollection.get(2).child(0).child(0) && blockCollection.get(2).child(0).child(0).child(0)) {
                                let priceTextUiObject = blockCollection.get(2).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                                ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                                log('价格：' + ticketPrice);
                            }
                        } else if (blockCollection.size() == 4) {
                            // 第一二组是产品类型(左上角【优选飞、24小时客服，急速退款、赠外卖会员礼包、商旅优选、赠送1200消费积分。。。。】)，第三组是左边价格右边预定按钮，第四组是限xxxx
                            // 获取票面价
                            if (blockCollection.get(2).child(0) && blockCollection.get(2).child(0).child(0) && blockCollection.get(2).child(0).child(0).child(0)) {
                                let priceTextUiObject = blockCollection.get(2).child(0).child(0).child(0).findOne(className('android.widget.TextView'));
                                ticketPrice = priceTextUiObject.text().split(RMB)[1].replace(" ", "");
                                log('价格：' + ticketPrice);
                            }
                        }
                        if (ticketPrice == allPrices[0].ticketPrice) {
                            let bookBtn = ele.findOne(textContains('预订'));
                            log(bookBtn)
                            if (bookBtn) {
                                // 点击普通预定 
                                APP.clickArea(bookBtn.parent());
                                sleep(300);
                                throw orderMessage.clickFinished
                            }
                            let xgBtn = ele.findOne(textContains('选购'));
                            log(xgBtn)
                            if (xgBtn) {
                                // 点击选购
                                APP.clickArea(xgBtn.parent());
                                log('点击选购')
                                nextPage(scrollableUiObject);
                                sleep(800);
                                // 找到普通预订下的预订
                                let ptydBtn = ele.findOne(textContains('普通预订'));
                                log(ptydBtn)
                                if (ptydBtn) {
                                    let ydBtn = ptydBtn.parent().find(className(VIEW_GROUP).depth(21).clickable(true));
                                    // 点击选购 
                                    ydBtn.get(ydBtn.size() - 1).click();
                                    sleep(300);
                                    throw orderMessage.clickFinished
                                }
                            }
                        }

                        if (ele.bounds().bottom > 1599) {
                            nextPage(scrollableUiObject);
                        }
                    }
                });
            } catch (error) {
                if (ENV.debugMode) {
                    log('捕获异常：' + error)
                }
                if (error == orderMessage.clickFinished) {
                    clicked = true;
                }
            }
            if (ENV.debugMode) {
                log(clicked)
            }
            return clicked;
        }
    },
    /**
     * 点击公务/头等舱(有些情况不会出现，该功能暂时不用)
     */
    clickCabinClass: function () {
        // 滚动块包含经济舱、公务舱/头等舱舱等类型和预订块
        let scrollableUiObject = className(SCROLL_VIEW).depth(10).findOne();
        while (!scrollableUiObject) {
            scrollableUiObject = className(SCROLL_VIEW).depth(10).findOne();
        }
        let threeBlockCollection = scrollableUiObject.find(className(VIEW_GROUP).depth(13));
        if (ENV.debugMode) {
            // 一定会拿到3个模块，1模块是航班信息，2模块是舱等类型，3是预订块
            log('一定会拿到3个模块：' + threeBlockCollection.size());
        }
        // 找到经济舱、公务舱/头等舱舱等类型块
        let cabinClasses = threeBlockCollection.get(1).find(className(VIEW_GROUP).depth(16).clickable(true)).toArray();
        if (ENV.debugMode) {
            log('舱等类型:' + cabinClasses.length);
        }
        try {
            cabinClasses.forEach(element => {
                let cabinClassText = element.findOne(className('android.widget.TextView')).text();
                if (ENV.debugMode) {
                    log('舱等类型文本:' + cabinClassText);
                }
                if (cabinClassText.indexOf('经济舱') > -1) {
                    return;
                } else {
                    if (ENV.debugMode) {
                        log('点击公务舱/头等舱');
                    }
                    APP.clickArea(element);
                    throw orderMessage.foundCabinClass;
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
        sleep(2000);

        if (ENV.debugMode) {
            log('进入添加乘机人页面');
        }

        // 添加/编辑乘机人
        let addEditPassengerBtnUiObject = APP.waitForContainsText('添加/编辑乘机人', 100, 5000);
        while (!addEditPassengerBtnUiObject) {
            addEditPassengerBtnUiObject = APP.waitForContainsText('添加/编辑乘机人', 100, 5000);
        }

        let tip = APP.waitForContainsText('该航班距起飞时间在2小时以内', 100, 2000);
        if (tip) {
            APP.clickByTextContains('知道了');
            sleep(1000)
            // throw '该航班距起飞时间在2小时以内，请确认能正常办理值机登机后再进行预订';
        }

        // 如果存在有已选乘机人，先取消已选的乘机人 
        let checkedPassengers = addEditPassengerBtnUiObject.parent().parent().find(className(VIEW_GROUP).depth(15).clickable()).toArray();// clickable表示可以点击的控件的条件
        log('已存在的乘机人数量：' + checkedPassengers.length); // 排除：添加/编辑乘机
        checkedPassengers.forEach((checkedPassengerEle, checkedPassengerIndex) => {
            // 排除：添加/编辑乘机人
            if (checkedPassengerIndex == 0) {
                return;
            }
            let isChecked = checkedPassengerEle.findOne(className(IMAGE_VIEW));
            if (isChecked) {
                log('取消选中');
                APP.clickArea(isChecked.parent());
                sleep(1000);
            }
        });
        sleep(3000);

        // 点击“添加/编辑乘机人”
        addEditPassengerBtnUiObject = APP.waitForContainsText('添加/编辑乘机人', 100, 5000);
        APP.clickArea(addEditPassengerBtnUiObject.parent());
        sleep(1000);
        if (ENV.debugMode) {
            log('点击“添加/编辑乘机人”');
        }

        let priceIncreaseTip = APP.waitForContainsText('抱歉,票价由', 100, 2000);
        if (priceIncreaseTip) {
            APP.clickByTextContains('重新搜索');
            throw '票价涨价了，请重新下单';
        }

        // 目标集合
        let targetIdCardNos = []; // 目标用户
        passengers.forEach(p => targetIdCardNos.push(p.identityInfo.cardNo));

        // 获取所有已存在的用户
        // let existPassengers = this.getExistPassengers();

        // 获取需要选择的用户，不存在则新增(美团APP乘机人列表证件号信息显示不全，不需要用到这个方法)
        // let needCheckedPassengers = this.getNeedCheckedPassengers(passengers, existPassengers);

        // 选择已存在的乘机人
        // this.checkedExistPassengerFn(needCheckedPassengers, targetIdCardNos);

        // 新增乘机人，不用判断乘机人是否存在，会覆盖当前已存在的乘机人
        passengers.forEach(p => {
            // 等待"添加乘机人"出现
            let addPassengerBtnUiObject = APP.waitForContainsText('添加乘机人', 100, 2000);
            while (!addPassengerBtnUiObject) {
                addPassengerBtnUiObject = APP.waitForContainsText('添加乘机人', 100, 2000);
            }
            APP.clickArea(addPassengerBtnUiObject);
            sleep(1000);
            if (ENV.debugMode) {
                log('点击“添加乘机人”');
            }
            // 新增乘机人
            this.addPassenger(p);
        });

        // 只会默认选中最后添加的那个乘机人，如果两个以上乘机人，需要重新查看已存在的乘机人，再根据名字选中
        if (passengers.length > 1) {
            let slicePassengers = passengers.slice(0, passengers.length - 1); //删除最后一个乘机人信息
            log('删除最后一个乘机人，剩余：' + JSON.stringify(slicePassengers));
            let checkedPassengers = [];
            slicePassengers.forEach(element => {
                let name = '';
                if (element.name.secondary) {
                    name = element.name.primary + '/' + element.name.secondary;
                } else {
                    name = element.name.primary;
                }
                checkedPassengers.push(name);
            });
            log('需要选择的用户:' + JSON.stringify(checkedPassengers));
            // 选择已添加的乘机人，排除最后一个新增的乘机人
            this.checkedAddedPassenger(checkedPassengers);
        }

        sleep(1000);
        // 点击"确定"按钮
        let confirmBtnTextUiObject = APP.waitForContainsText('确定', 100, 1000);
        if (confirmBtnTextUiObject) {
            APP.clickArea(confirmBtnTextUiObject.parent());
            sleep(3000);
        }
    },
    // 获取存在的乘机人
    getExistPassengers: function () {
        // 获取所有已存在的用户
        let existPassengers = [];

        let lastCardNo = '';
        let currentCardNo;

        // 分页
        function nextPage(scrollView) {
            APP.scrollForward(scrollView);
        }

        while (lastCardNo != currentCardNo) {
            lastCardNo = currentCardNo;
            // 找到“拍摄身份证添加”
            let photoIDTextUiObject = APP.waitForContainsText('拍摄身份证添加', 100, 2000);
            while (!photoIDTextUiObject) {
                photoIDTextUiObject = APP.waitForContainsText('拍摄身份证添加', 100, 2000);
            }
            // 随便找到一个乘机人的证件类型“身份证”
            let IDTextUiObject = textStartsWith('身份证').find();
            while (!IDTextUiObject) {
                IDTextUiObject = textStartsWith('身份证').find();
            }
            sleep(1000);
            let existPassengerScrollView = photoIDTextUiObject.parent().parent().parent().parent().findOne(className(SCROLL_VIEW));
            let existPassengersCollection = photoIDTextUiObject.parent().parent().find(className(VIEW_GROUP).depth(18).clickable(false)).toArray(); // 已存在的乘机人块
            log('乘机人数量' + existPassengersCollection.length);
            if (existPassengersCollection.length > 0) {
                existPassengersCollection.forEach((existPassengerEle) => {
                    let textViewCollection = existPassengerEle.child(1).find(className(TEXT_VIEW));
                    log(textViewCollection.size() + '组文字信息');
                    let idCardNoText = textViewCollection.get(textViewCollection.size() - 1).text();
                    log('获取到的证件信息：' + idCardNoText);
                    let idCardNo = '';
                    if (idCardNoText.indexOf('身份证') > -1) {
                        idCardNo = idCardNoText.substring(4).replace(" ", "").replace(" ", "");
                    } else if (idCardNoText.indexOf('护照') > -1 || idCardNoText.indexOf('其它') > -1) {
                        idCardNo = idCardNoText.substring(3);
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
            this.existPassengersScrollTop();
        }
        log('已存在的乘机人' + JSON.stringify(existPassengers))
        return existPassengers;
    },
    // 获取需要勾选的乘机人
    getNeedCheckedPassengers: function (passengers, existPassengers) {
        let needCheckedPassengers = []; //需要选择的用户
        // 不存在則新增，存在則等待勾選
        passengers.forEach(p => {
            if (indexOf(existPassengers, p.identityInfo.cardNo) < 0) {
                // 等待"添加乘机人"出现
                let addPassengerBtnUiObject = APP.waitForContainsText('添加乘机人', 100, 2000);
                while (!addPassengerBtnUiObject) {
                    addPassengerBtnUiObject = APP.waitForContainsText('添加乘机人', 100, 2000);
                }
                APP.clickArea(addPassengerBtnUiObject);
                sleep(1000);
                if (ENV.debugMode) {
                    log('点击“添加乘机人”');
                }
                // 新增乘机人
                this.addPassenger(p);
            } else {
                needCheckedPassengers.push(p.identityInfo.cardNo);
            }
        });
        return needCheckedPassengers;
    },
    // 输入单个乘机人信息
    addPassenger: function (passenger) {
        APP.waitForContainsText('新增乘机人', 100, 5000);

        sleep(2000);

        let targetCertificateType = passenger.identityInfo.type;
        log('乘机人证件类型：' + targetCertificateType);

        // 身份证
        if (targetCertificateType == 0) {
            // 姓名
            let chineseNameUiObject = APP.waitForContainsText('请输入乘机人姓名', 100, 1000);
            if (chineseNameUiObject) {
                chineseNameUiObject.click();
                sleep(200);
                chineseNameUiObject.setText(passenger.name.primary);
                sleep(800);
            }

            // 证件号
            let cardNoUiObject = APP.waitForContainsText('与乘机人的证件号码一致', 100, 1000);
            if (cardNoUiObject) {
                cardNoUiObject.click();
                sleep(200);
                cardNoUiObject.setText(passenger.identityInfo.cardNo);
                sleep(800);
            }
        } else if (targetCertificateType == 1) {
            let identityUiObject = textStartsWith('证件类型').findOne();
            if (identityUiObject) {
                APP.clickArea(identityUiObject.parent());
                sleep(800);
                log('点击证件类型，选择护照' + targetCertificateType);
            }

            let huzhaoUiObject = APP.waitForContainsText('护照', 100, 1000);
            APP.clickArea(huzhaoUiObject)
            sleep(1000);

            // 姓
            let subNameUiObject = APP.waitForContainsText('Surname', 100, 1000);
            log('输入姓氏' + subNameUiObject)
            if (subNameUiObject) {
                subNameUiObject.click();
                sleep(200);
                subNameUiObject.setText(passenger.name.primary);
                sleep(1000);
            }

            // 名
            let givenNameUiObject = APP.waitForContainsText('Given name', 100, 1000);
            if (givenNameUiObject) {
                givenNameUiObject.click();
                sleep(200);
                givenNameUiObject.setText(passenger.name.secondary);
                sleep(1000);
            }
        } else if (targetCertificateType == 9) {
            let identityUiObject = textStartsWith('证件类型').findOne();
            if (identityUiObject) {
                APP.clickArea(identityUiObject.parent());
                sleep(1000);
                log('点击证件类型');
            }

            let certificateTextUiObject = APP.waitForContainsText('户口簿', 100, 2000);
            if (certificateTextUiObject) {
                // 滚动块
                let scrollableUiObject = certificateTextUiObject.parent().parent().parent().parent().findOne(className(SCROLL_VIEW));
                log('滚动块' + scrollableUiObject);
                while (!scrollableUiObject) {
                    scrollableUiObject = certificateTextUiObject.parent().parent().parent().parent().findOne(className(SCROLL_VIEW));
                }
                APP.scrollForward(scrollableUiObject);
                sleep(1000);
            }

            let otherUiObject = APP.waitForContainsText('其它', 100, 1000);
            APP.clickArea(otherUiObject)
            sleep(800);
            log('点击证件类型，选择其它' + targetCertificateType);

            // 如果存在，则是英文名
            if (passenger.name.secondary) {
                log('点击英')
                let eng = APP.waitForText('英', 100, 2000);
                while (!eng) {
                    eng = APP.waitForText('英', 100, 2000);
                }
                APP.clickArea(eng);
                sleep(800);
                // 姓
                let subNameUiObject = APP.waitForContainsText('Surname', 100, 1000);
                log('输入姓氏' + subNameUiObject)
                if (subNameUiObject) {
                    subNameUiObject.click();
                    sleep(200);
                    subNameUiObject.setText(passenger.name.primary);
                    sleep(1000);
                }

                // 名
                let givenNameUiObject = APP.waitForContainsText('Given name', 100, 1000);
                if (givenNameUiObject) {
                    givenNameUiObject.click();
                    sleep(200);
                    givenNameUiObject.setText(passenger.name.secondary);
                    sleep(1000);
                }
            } else {
                // 姓名
                let chineseNameUiObject = APP.waitForContainsText('请输入乘机人姓名', 100, 1000);
                if (chineseNameUiObject) {
                    chineseNameUiObject.click();
                    sleep(200);
                    chineseNameUiObject.setText(passenger.name.primary);
                    sleep(1000);
                }
            }
        }

        APP.closeKeyboard();

        // 证件类型为护照或者其它
        if (targetCertificateType == 1 || targetCertificateType == 9) {
            // 证件号
            let cardNoUiObject = APP.waitForContainsText('请输入乘机人证件号码', 100, 1000);
            if (cardNoUiObject) {
                cardNoUiObject.click();
                sleep(200);
                cardNoUiObject.setText(passenger.identityInfo.cardNo);
                sleep(1000);
            }

            APP.closeKeyboard();

            // 选择出生年月
            selectBirth(passenger.birthDate);

            // 乘机人性别选择 
            if (passenger.gender == 0) {
                let boyGender = APP.waitForContainsText('男');
                APP.clickArea(boyGender.parent());
            } else {
                let girlGender = APP.waitForContainsText('女');
                APP.clickArea(girlGender.parent());
            }
        }

        // 手机号（可为空）
        if (passenger.phone) {
            let phoneUiObject = APP.waitForContainsText('请输入乘机人手机号码', 100, 1000);
            if (phoneUiObject) {
                phoneUiObject.click();
                sleep(200);
                phoneUiObject.setText(passenger.phone);
                sleep(800);
            }
            APP.closeKeyboard();
        }

        // 点击保存
        let saveBtn = APP.waitForContainsText('保存', 100, 1000);
        while (!saveBtn) {
            saveBtn = APP.waitForContainsText('保存', 100, 1000);
        }
        APP.clickArea(saveBtn);
        sleep(2000);
        log('点击保存');
    },
    // 选择已存在的乘机人
    checkedExistPassengerFn: function (needCheckedPassengers, targetIdCardNos) {
        log('准备选择已存在的乘机人')
        let checkedPassenger = [];
        let lastCardNo = '';
        let currentCardNo;
        // 分页
        function nextPage(scrollView) {
            APP.scrollForward(scrollView);
        }

        while (lastCardNo != currentCardNo && checkedPassenger.length != needCheckedPassengers.length) {
            // 找到“拍摄身份证添加”
            let photoIDTextUiObject = APP.waitForContainsText('拍摄身份证添加', 100, 2000);
            while (!photoIDTextUiObject) {
                photoIDTextUiObject = APP.waitForContainsText('拍摄身份证添加', 100, 2000);
            }
            // 随便找到一个乘机人的证件类型“身份证”
            let IDTextUiObject = textStartsWith('身份证').find();
            while (!IDTextUiObject) {
                IDTextUiObject = textStartsWith('身份证').find();
            }
            sleep(1000);
            let existPassengerScrollView = photoIDTextUiObject.parent().parent().parent().parent().findOne(className(SCROLL_VIEW));
            let existPassengersCollection = photoIDTextUiObject.parent().parent().find(className(VIEW_GROUP).depth(18).clickable(false)).toArray(); // 已存在的乘机人块
            log('乘机人数量' + existPassengersCollection.length);
            lastCardNo = currentCardNo;
            existPassengersCollection.forEach(element => {
                sleep(1000);
                let textViewCollection = element.child(1).find(className(TEXT_VIEW));
                log(textViewCollection.size() + '组文字信息');
                let idCardNoText = textViewCollection.get(textViewCollection.size() - 1).text();
                log('获取到的证件信息：' + idCardNoText);
                let idCardNo = '';
                if (idCardNoText.indexOf('身份证') > -1) {
                    idCardNo = idCardNoText.substring(4).replace(" ", "").replace(" ", "");
                } else if (idCardNoText.indexOf('护照') > -1 || idCardNoText.indexOf('其它') > -1) {
                    idCardNo = idCardNoText.substring(3);
                }
                currentCardNo = idCardNo;
                if (indexOf(targetIdCardNos, idCardNo) > -1) {
                    if (indexOf(needCheckedPassengers, idCardNo) > -1) {
                        APP.clickArea(element);
                        sleep(1000);
                        checkedPassenger.push(idCardNo);
                    }
                }
            });
            nextPage(existPassengerScrollView);
            if (lastCardNo == currentCardNo && checkedPassenger.length != needCheckedPassengers.length) {
                // 滚动回顶部
                this.existPassengersScrollTop();
            }
        }
        if (lastCardNo == currentCardNo) {
            // 滚动回顶部
            this.existPassengersScrollTop();
        }
        log('已勾选人数' + JSON.stringify(checkedPassenger));
    },
    // 选择已添加的乘机人，排除最后一个新增的乘机人
    checkedAddedPassenger: function (checkedPassengers) {
        log('准备选择已存在的乘机人')
        let checkedPassenger = [];
        let lastName = '';
        let currentName;
        // 分页
        function nextPage(scrollView) {
            APP.scrollForward(scrollView);
        }

        while (lastName != currentName && checkedPassenger.length != checkedPassengers.length) {
            // 找到“拍摄身份证添加”
            let photoIDTextUiObject = APP.waitForContainsText('拍摄身份证添加', 100, 2000);
            while (!photoIDTextUiObject) {
                photoIDTextUiObject = APP.waitForContainsText('拍摄身份证添加', 100, 2000);
            }
            // 随便找到一个乘机人的证件类型“身份证”
            let IDTextUiObject = textStartsWith('身份证').find();
            while (!IDTextUiObject) {
                IDTextUiObject = textStartsWith('身份证').find();
            }
            sleep(1000);
            let existPassengerScrollView = photoIDTextUiObject.parent().parent().parent().parent().findOne(className(SCROLL_VIEW));
            let existPassengersCollection = photoIDTextUiObject.parent().parent().find(className(VIEW_GROUP).depth(18).clickable(false)).toArray(); // 已存在的乘机人块
            log('乘机人数量' + existPassengersCollection.length);
            lastName = currentName;
            existPassengersCollection.forEach(element => {
                sleep(1000);
                let textView1 = element.child(1).findOne(className(TEXT_VIEW));
                let nameText = textView1.text();
                log('获取到的乘机人姓名：' + nameText);
                let isExist = checkedPassengers.filter(p => p == nameText).length;
                currentName = nameText;
                if (isExist > 0) {
                    APP.clickArea(element);
                    sleep(1000);
                    checkedPassenger.push(nameText);
                }
            });
            nextPage(existPassengerScrollView);
            if (lastName == currentName && checkedPassenger.length != needCheckedPassengers.length) {
                // 滚动回顶部
                this.existPassengersScrollTop();
            }
        }
        if (lastName == currentName) {
            // 滚动回顶部
            this.existPassengersScrollTop();
        }
        log('已勾选人数' + JSON.stringify(checkedPassenger));
    },
    // 已存在乘机人回滚到顶部公用方法
    existPassengersScrollTop: function () {
        // 找到“拍摄身份证添加”
        let photoIDTextUiObject = APP.waitForContainsText('拍摄身份证添加', 100, 2000);
        while (!photoIDTextUiObject) {
            photoIDTextUiObject = APP.waitForContainsText('拍摄身份证添加', 100, 2000);
        }
        // 随便找到一个乘机人的证件类型“身份证”
        let IDTextUiObject = textStartsWith('身份证').find();
        while (!IDTextUiObject) {
            IDTextUiObject = textStartsWith('身份证').find();
        }
        sleep(1000);
        // 滚动回顶部
        let scrollTop = photoIDTextUiObject.parent().parent().parent().parent().findOne(className(SCROLL_VIEW));
        while (scrollTop.scrollBackward()) {
            scrollTop.scrollBackward();
            sleep(200);
        }
    },
    // 编辑联系人信息
    editContactInfo: function (contactInfo) {
        // 先滑动一段距离，方便填写联系方式
        swipe(_env.screenWidth / 2, 1260, _env.screenWidth / 2, _env.screenHeight / 2, 500);
        sleep(800);

        // 联系方式
        let contactPhoneTextUiObject = APP.waitForContainsText('联系手机', 100, 1000);
        if (contactPhoneTextUiObject) {
            let phoneEditTextUiObject = contactPhoneTextUiObject.parent().findOne(className(EDIT_TEXT));
            phoneEditTextUiObject.click();
            sleep(800);
            // 先删除已存在的联系手机
            let delPhoneUiObject = contactPhoneTextUiObject.parent().findOne(className(VIEW_GROUP).clickable(false));
            if (delPhoneUiObject) {
                APP.clickArea(delPhoneUiObject);
            }
            // 输入联系手机
            phoneEditTextUiObject.setText(contactInfo.phone);
            sleep(1000);
            if (ENV.debugMode) {
                log('联系方式');
            }
        }

        // 关闭键盘
        APP.closeKeyboard();

        // 滚动块包含经济舱、公务舱/头等舱舱等类型和预订块
        let scrollableUiObject = className(SCROLL_VIEW).depth(10).findOne();
        while (!scrollableUiObject) {
            scrollableUiObject = className(SCROLL_VIEW).depth(10).findOne();
        }

        // 滑动到底部
        for (let index = 0; index < 2; index++) {
            APP.scrollForward(scrollableUiObject);
            sleep(1000);
        }

        // 同意
        let agree = textStartsWith('我已阅读并同意').findOne();
        if (agree) {
            let clickAgree = agree.parent().findOne(className(VIEW_GROUP).depth(15).clickable());
            APP.clickArea(clickAgree);
            sleep(1000);
            if (ENV.debugMode) {
                log('勾选已阅读');
            }
        }
    },
    // 订单详情
    orderDetail: function (input) {
        // 点击展开明细
        let detail = APP.waitForContainsText('明细', 100, 2000);
        while (!detail) {
            detail = APP.waitForContainsText('明细', 100, 2000);
        }

        // 获取总价
        let totalPriceText = detail.parent().child(0).text();
        if (ENV.debugMode) {
            console.log('总支付价格' + totalPriceText);
        }

        // 展开明细
        if (detail) {
            APP.clickArea(detail);
            sleep(1000);
        }

        let actualPrices = [];

        let adultTextUiObject = APP.waitForContainsText('成人票', 100, 1000);
        let textViewList = adultTextUiObject.parent().find(className(TEXT_VIEW)).toArray();
        log('文本数量' + textViewList.length);

        // 根据目标乘机人，分成成人、儿童、婴儿组
        for (let index = 0; index < input.passengers.length; index++) {
            let ele = input.passengers[index];
            if (ele.type == 0) {
                actualPrices.push({
                    type: 0
                })
            } else if (ele.type == 1) {
                actualPrices.push({
                    type: 1
                })
            } else if (ele.type == 2) {
                actualPrices.push({
                    type: 2
                })
            }
        }

        let typeText = null; // 类型
        let typeIndex = null; // 类型索引  
        textViewList.forEach((textViewEle, textViewIndex) => {
            sleep(1000);
            let text = textViewEle.text();
            if (text.indexOf('成人票') > -1) {
                typeText = 0;
                typeIndex = textViewIndex;
            } else if ((text.indexOf('儿童特惠票') > -1) || text.indexOf('儿童票') > -1) { // 儿童会出现两种文字
                typeText = 1;
                typeIndex = textViewIndex;
            } else if (text.indexOf('婴儿票') > -1) {
                typeText = 2;
                typeIndex = textViewIndex;
            }
            if (typeText == 0) {
                let adultActualPrices = actualPrices.filter(p => p.type == 0);
                for (let j = 0; j < adultActualPrices.length; j++) {
                    if (textViewIndex == typeIndex + 1) {
                        adultActualPrices[j].ticketPrice = parseFloat(text.substring(1)); // 票面价
                        adultActualPrices[j].settlementPrice = parseFloat(text.substring(1)); // 结算价
                    } else if (textViewIndex == typeIndex + 4) {
                        adultActualPrices[j].airportTax = parseFloat(text.substring(1));// 基建
                    } else if (textViewIndex == typeIndex + 7) {
                        adultActualPrices[j].oilFee = parseFloat(text.substring(1));// 燃油
                    }
                }
            } else if (typeText == 1) {
                let childActualPrices = actualPrices.filter(p => p.type == 1);
                for (let j = 0; j < childActualPrices.length; j++) {
                    if (textViewIndex == typeIndex + 1) {
                        childActualPrices[j].ticketPrice = parseFloat(text.substring(1)); // 票面价
                        childActualPrices[j].settlementPrice = parseFloat(text.substring(1)); // 结算价
                    } else if (textViewIndex == typeIndex + 4) {
                        childActualPrices[j].airportTax = parseFloat(text.substring(1));// 基建
                    } else if (textViewIndex == typeIndex + 7) {
                        childActualPrices[j].oilFee = parseFloat(text.substring(1));// 燃油
                    }
                }
            } else if (typeText == 2) {
                let infantActualPrices = actualPrices.filter(p => p.type == 2);
                for (let j = 0; j < infantActualPrices.length; j++) {
                    if (textViewIndex == typeIndex + 1) {
                        infantActualPrices[j].ticketPrice = parseFloat(text.substring(1)); // 票面价
                        infantActualPrices[j].settlementPrice = parseFloat(text.substring(1)); // 结算价
                    } else if (textViewIndex == typeIndex + 4) {
                        infantActualPrices[j].airportTax = parseFloat(text.substring(1));// 基建
                    } else if (textViewIndex == typeIndex + 7) {
                        infantActualPrices[j].oilFee = parseFloat(text.substring(1));// 燃油
                    }
                }
            }
        });

        // 关闭明细
        if (actualPrices.length > 0) {
            detail = APP.waitForContainsText('明细', 100, 2000);
            if (detail) {
                APP.clickArea(detail);
                sleep(800);
            }
        }

        if (ENV.debugMode) {
            log('价格信息：' + JSON.stringify(actualPrices));
        }

        // 乘机人价格比较
        this.priceCompare(actualPrices, input);

        // 点击“提交订单”
        let submitUiObject = APP.waitForContainsText('提交订单', 100, 1000);
        if (submitUiObject) {
            APP.clickArea(submitUiObject.parent());
            sleep(3000);
        }

        let error1 = APP.waitForContainsText('您提交的订单过多', 100, 1000);
        if (error1) {
            let btn = APP.waitForContainsText('知道了', 100, 1000);
            if (btn) {
                APP.clickArea(btn);
            }
            throw '您提交的订单过多，请您明天尝试重新购买。'
        }

        let tip1 = APP.waitForContainsText('不需要保险', 50, 1000);
        if (tip1) {
            APP.clickArea(tip1);
        }

        // 行程冲突提示
        let tip2 = APP.waitForContainsText('行程冲突提示', 50, 1000);
        if (tip2) {
            APP.clickByTextContains('知道了');
        }

        let payPage = APP.waitForContainsText('支付订单', 50, 2000);
        while (!payPage) {
            payPage = APP.waitForContainsText('支付订单', 50, 2000);
        }

        return {
            actualPrices: actualPrices, // 乘机人票面价、机建、燃油
            totalPrice: parseFloat(totalPriceText.substring(1)), // 总金额
            orderNo: '',// 订单号
        }
    },
    // 价格比较
    priceCompare: function (actualPrices, order) {
        log(order.cabinPriceInfos)
        log('进行价格比较');
        const adultCabinPriceInfo = order.cabinPriceInfos.filter(p => p.type == 0);
        log('目标成人信息' + JSON.stringify(adultCabinPriceInfo));
        const childCabinPriceInfo = order.cabinPriceInfos.filter(p => p.type == 1);
        log('目标儿童信息' + JSON.stringify(childCabinPriceInfo));
        const infantCabinPriceInfo = order.cabinPriceInfos.filter(p => p.type == 2);
        log('目标婴儿信息' + JSON.stringify(infantCabinPriceInfo));
        const adultPrice = actualPrices.filter(p => p.type === 0); //成人
        log('APP成人价格' + JSON.stringify(adultPrice));
        const childPrice = actualPrices.filter(p => p.type === 1); //儿童
        log('APP儿童价格' + JSON.stringify(childPrice));
        const infantPrice = actualPrices.filter(p => p.type === 2); //婴儿
        log('APP婴儿价格' + JSON.stringify(infantPrice));
        order.passengers.forEach((passenger) => {
            if (passenger.type == 0) {
            } else if (passenger.type == 1) {
                let childTicketPrice = childPrice[0].ticketPrice;
                if (childTicketPrice != childCabinPriceInfo[0].ticketPrice) {
                    throw '下单失败，儿童票面价不符合。目标票面价：' + childCabinPriceInfo[0].ticketPrice + '，APP票面价：' + childTicketPrice;
                }
            } else if (passenger.type == 2) {
                let infantTicketPrice = infantPrice[0].ticketPrice;
                if (infantTicketPrice != infantCabinPriceInfo[0].ticketPrice) {
                    throw '下单失败，婴儿票面价不符合。目标票面价：' + infantCabinPriceInfo[0].ticketPrice + '，APP票面价：' + infantTicketPrice;
                }
            }
        })
    },
}