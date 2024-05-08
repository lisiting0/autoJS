// 单个航班
var APP = null;
var ENV = null;

const DEFAULT_CABIN_TOTAL_TAX = -1;

const RMB = "¥";

const CLOSE_DIALOG = "close_dialog";

const SCROLL_VIEW = "android.widget.ScrollView";
/**
 * 右上角的回到主页按钮
 */
const TITLE_HOME = "domestic_flight_title_home_bt";
/**
 * 航班列表，可滑动
 */
const FLIGHTS_CONTAINER = "domestic_list_data_rv";
/**
 * 顶部的城市标题
 */
const TITLE_CITY = "domestic_list_title_city_tv";
/**
 * 无航班的ID
 */
const NO_FLIGHT_ID = "domestic_list_error_tv";
/**
 * 航班项的ID
 */
const FLIGHT_CARD_ID = "item_card_view";
/**
 * 起飞航站楼
 */
const FLIGHT_DEP_TERM = "item_dep_plane_term_name_tv";
/**
 * 起飞时间
 */
const FLIGHT_DEP_TIME = "item_dep_time_tv";
/**
 * 到达时间
 */
const FLIGHT_ARR_TIME = "item_arr_time_tv";
/**
 * 中转
 */
const FLIGHT_TRANSFER = "item_transfer_tv";
/**
 * 航班号
 */
const FLIGHT_NO = "com.csair.mbp:id/item_flight_no_tv";
/**
 * 实际承运
 */
const ACTUAL_CARRIER = "domestic_full_cabin_tv_actual_carrier";
/**
 * 承运
 */
const CARRIER = "domestic_full_cabin_tv_flight_number";
/**
 * 舱等
 */
const CABINCLASS = "cabin_tab_llyt";
/**
 * 舱等标题
 */
const CABINCLASS_TITLE = "view_cabin_tab_tv_title";
/**
 * 舱位块
 */
const CABIN_CARD = "item_domestic_full_cabin_ll";
/**
 * 舱位选购
 */
const CABIN_CHOOSE = "item_domestic_full_cabin_tv_choose";
/**
 * 舱位预定
 */
const CABIN_BOOK = "item_domestic_full_cabin_tv_book";
/**
 * 舱位数量
 */
const CABIN_COUNT = "item_domestic_full_cabin_tv_count";
/**
 * 舱位价格
 */
const CABIN_PRICE = "item_domestic_full_cabin_tv_price";
/**
 * 直减容器
 */
const CABIN_DIRECT_CONTAINER = "item_domestic_full_cabin__order_cut_view";
/**
 * 直减
 */
const CABIN_DIRECT_CONTENT = "book_item_tag_content_tv_content";
/**
 * 舱位名
 */
const CABIN_NAME = "com.csair.mbp:id/item_domestic_full_cabin_tv_cabin_name";
/**
 * 舱位类型名
 */
const CABIN_TYPE_NAME = "item_domestic_full_cabin_tv_cabin_type";
/**
 * 舱位信息
 */
const CABIN_INFO = "book_item_share_flight_domestic_cabinInfo";
/**
 * 选购下的舱位价格
 */
const CABIN_PRICE_IN_CHOOSE = "book_item_share_flight_list_domestic_tv_price";
/**
 * 选购下的舱位按钮
 */
const CABIN_BOOK_IN_CHOOSE = "book_item_share_flight_list_domestic_tv_book";
/**
 * 舱位页面滑动
 */
const CABIN_SCROLL = "android.widget.ScrollView";
/**
 * 后一天
 */
const DATE_BAR_RIGHT = "include_flight_list_date_bar_rll_right";
/**
 * 今天日期 7月5日 周日
 */
const TODAY = "include_flight_list_date_bar_tv_date";
/**
 * 售罄
 */
const SELL_OUT = "item_sellout_tv";
/**
 * 减
 */
const CUT_ID = "item_order_cut_logo_tv";

let CabinClassType = {
    经济舱: 0,
    明珠经济舱: 1,
    商务舱: 2,
    "头等/公务舱": 3,
};

module.exports = {
    setEnv: function (env) {
        ENV = env;
    },
    init: function (a) {
        APP = a;
    },
    // 搜索单个航班的运价
    searchFlight: function (request) {
        log("开始搜索航班");
        let currentDate = new Date(request.data.primaryFlight.departureDate);
        let endDate;
        if (!request.data.primaryFlight.departureEndDate) {
            endDate = currentDate;
        } else {
            endDate = new Date(request.data.primaryFlight.departureEndDate);
        }

        APP.homeOperate(
            request.data.primaryFlight.originAirport,
            request.data.primaryFlight.destinationAirport,
            currentDate,
            true
        );

        let errorTip = APP.waitForContainsText("20000", 50, 800);
        if (errorTip) {
            let btn1 = APP.waitForId("button1", 100, 500);
            if (btn1) {
                while (!btn1.click()) {
                    sleep(10);
                }
            }
        }

        clickDialog();

        let loginPage = APP.waitForContainsText("欢迎登录", 100, 2000);
        if (loginPage) {
            APP.clickNavigateUp(50, 500);
            throw "账号异常";
        }

        let result = {
            primaryFlights: {},
        };

        do {
            let rawMonth = currentDate.getMonth() + 1;
            let month = rawMonth < 10 ? "0" + rawMonth : rawMonth;
            let rawDate = currentDate.getDate();
            let date = rawDate < 10 ? "0" + rawDate : rawDate;
            let d = currentDate.getFullYear() + "-" + month + "-" + date;
            log("爬取日期" + d + "的航班");
            // 根据日期获取所有航班
            var fullFlightNo = request.data.primaryFlight.airline + request.data.primaryFlight.flightNo;
            let flights = getFlightsWithDate(
                d,
                request.data.primaryFlight.originAirport,
                request.data.primaryFlight.destinationAirport,
                fullFlightNo
            );
            if (flights != null) {
                result.primaryFlights = flights;
            }

            log("爬取日期" + d + "的航班完毕");

            if (currentDate >= endDate) {
                break;
            }

            currentDate.setDate(currentDate.getDate() + 1);
            log("点击后一天");
            APP.getById(DATE_BAR_RIGHT).click();
            log("后一天为: " + currentDate.toString());
            //  检测后一天是否加载完毕
            sleep(1000);
            let today = APP.getById(TODAY);
            let timeout = new Date().getTime() + 15000;

            while (
                !today ||
                today
                    .text()
                    .indexOf(
                        currentDate.getMonth() + 1 + "月" + currentDate.getDate() + "日"
                    ) == -1
            ) {
                if (timeout < new Date().getTime()) {
                    throw "后一天检测超时";
                }
                sleep(1000);
                today = APP.getById(TODAY);
                log("today -- " + !today);
                log(
                    "date: " +
                    today
                        .text()
                        .indexOf(
                            currentDate.getMonth() + 1 + "月" + currentDate.getDate() + "日"
                        ) ==
                    -1
                );

                log("在while里");
            }
            sleep(100);
            log("选择到了后一天:" + currentDate.getDate());
        } while (currentDate <= endDate);

        let titleHome = APP.waitForId(TITLE_HOME, 100, 1000);
        if (titleHome) {
            titleHome.click();
        }

        let bookHome = APP.waitForId("book_home", 100, 1000);
        if (bookHome) {
            bookHome.click();
        }
        log("开始搜索航班结束");

        log("result: " + JSON.stringify(result));

        return result;
    },
};

function clickDialog() {
    // 关闭公告内容
    let closeNotice = APP.waitForId('close', 100, 3000);
    if (closeNotice) {
        closeNotice.click();
    }

    toast("检测可关闭的 dialog 中");
    let bar = APP.waitForId(CLOSE_DIALOG, 100, 2000);
    while (bar) {
        bar.click();
        bar = APP.waitForId(CLOSE_DIALOG, 100, 2000);
    }
}

/**
 * 爬取指定日期、起飞到达下、航班号的航班信息
 * @param {String} date 日期
 * @param {String} depAirportCode 起飞机场代码
 * @param {String} arrAirportCode 到达机场代码
 * @returns 返回找到的航班
 */
function getFlightsWithDate(date, depAirportCode, arrAirportCode, fullFlightNo) {
    log(
        "进入到爬取指定日期: " +
        date +
        " - 起飞: " +
        depAirportCode +
        " - 到达: " +
        arrAirportCode
    );
    log("此时在航班列表页面");

    /**
     * 当前页面的航班列表
     */
    let flightCollection = waitFlightView();

    if (flightCollection.size() < 1) {
        // 返回空值
        return null;
    }

    let lastFlight = getLastFlightFlag(flightCollection);

    log("获取临时航班号：" + lastFlight);

    let flightArray = flightCollection.toArray();
    for (let index = 0; index < flightArray.length; index++) {
        let element = flightArray[index];

        log("正在爬取第" + index + 1 + "个航班");
        if (SellOut(element)) {
            log("航班售罄，跳过");
            continue;
        }
        let flight = getFlight(element, date, depAirportCode, arrAirportCode, fullFlightNo);
        if (flight == null) {
            continue;
        }
        log("爬取到的航班信息: " + flight);
        log("\n爬取下一个航班");
        return flight;
    }

    log("航班列表翻页");
    while (flightCollection != null && flightCollection.size() != 0) {
        let s = APP.getById(FLIGHTS_CONTAINER);
        if (!s) {
            clickDialog();
        }
        if (!s.scrollForward()) {
            //  不能翻页说明没有航班
            log("航班列表不能翻页");
            return flights;
        }

        s.scrollForward();
        sleep(700);

        flightCollection = waitFlightView();
        log("找到" + flightCollection.size() + "个航班");
        if (flightCollection.size() == 0) {
            return flights;
        }

        let cur = getLastFlightFlag(flightCollection);

        log("对比当前最后航班和临时航班: " + cur + " - " + lastFlight);
        if (lastFlight == cur) {
            log("滑动到底部");
            break;
        } else {
            log("未滑动到底部");
            lastFlight = cur;
        }

        let array = flightCollection.toArray();
        for (let index = 0; index < array.length; index++) {
            let element = array[index];

            log("正在爬取第" + index + 1 + "个航班");

            if (SellOut(element)) {
                log("航班售罄，跳过");
                continue;
            }

            let nextFlight = element.findOne(id(FLIGHT_NO));
            if (!nextFlight) {
                log("第%s个航班找不到航班号, 跳过", index);
                continue;
            }

            let flight = getFlight(element, date, depAirportCode, arrAirportCode, fullFlightNo);
            if (flight == null) {
                continue;
            }

            log("爬取到的航班信息: " + flight);
            log("\n爬取下一个航班");
            return flight;
        }
    }

    log(
        "日期: " +
        date +
        " - 起飞: " +
        depAirportCode +
        " - 到达: " +
        arrAirportCode +
        "的航班爬取完毕"
    );
    return null;
}

function waitFlightView() {
    /**
     * 当前页面的航班列表
     */
    let flightCollection = APP.getListById(FLIGHT_CARD_ID);

    if (flightCollection.size() < 1) {
        log("=========================================================");
        log("= 在航班列表页面获取到 " + flightCollection.size() + " 个航班");
        log("=========================================================");
        return flightCollection;
    }

    let timeout = new Date().getTime() + 1000;
    while (
        !APP.checkCollection(flightCollection, 2) &&
        timeout > new Date().getTime()
    ) {
        flightCollection = APP.getListById(FLIGHT_CARD_ID);
    }
    if (timeout < new Date().getTime()) {
        throw "找不到子节点";
    }

    log("有子节点");

    return flightCollection;
}

/**
 * 获取当前航班分页的最后一个标识
 * @param {Array} flightCollection 航班列表
 * @returns 最后一个标识
 */
function getLastFlightFlag(flightCollection) {
    let temp = flightCollection.get(flightCollection.size() - 1);
    let lastFlight = APP.waitForChild(temp, FLIGHT_NO).text();
    return lastFlight;
}

/**
 * 获取单个航班的信息
 * @param {String} date 日期
 * @param {any} card 一个航班块
 * @param {String} depAirportCode 起飞机场三字码
 * @param {String} arrAirportCode 到达机场三字码
 * @returns 单个航班
 */
function getFlight(card, date, depAirportCode, arrAirportCode, fullFlightNo) {
    log("进入到爬取单个航班信息方法，此时在航班列表页面");
    sleep(100);

    let flightNoEle = card.findOne(id(FLIGHT_NO));
    if (!flightNoEle) {
        log("找不到航班号, %s, %s, %s, 跳过", date, depAirportCode, arrAirportCode);
        return null;
    }

    // 所有航班
    let flightNo = flightNoEle.text().trim();
    if (flightNo.substring(0, 6) != fullFlightNo) {
        log("找不到航班号, %s 跳过", fullFlightNo);
        return null;
    }
    log("当前航班号：" + flightNo.substring(0, 6));

    let flight = {
        departure: {},
        arrival: {},
        carrier: {},
        actualCarrier: {},
        cabins: [],
    };
    let flightTimeObject = flightNoEle.parent().parent().findOne(id("item_flight_time_card"));
    let startTime = "";
    let endTime = "";
    if (flightTimeObject) {
        flightTimeObject.children().toArray().forEach((child, childIndex) => {
            if (!child) {
                log('deep: %s, check children: %s', cur, child);
                throw 'child null, deep: ' + cur;
            }
            if (childIndex == 0) {
                startTime = child.text();
            }
            if (childIndex == 3) {
                endTime = child.text();
            }
        });
    }

    flight.departure.date = date;
    flight.departure.time = startTime + ':00';
    flight.arrival.date = date;
    flight.arrival.time = endTime + ':00';
    flight.departure.airportCode = depAirportCode;
    flight.arrival.airportCode = arrAirportCode;

    log("点击该航班进入选择舱位页面");
    card.click();
    //  这里可能会因为有遮挡而点不到
    try {
        flight = getCabinsAndCarrier(flight);
    } catch (error) {
        log("catch: " + error);
        if (
            error != null &&
            typeof error == "string" &&
            error.indexOf("timeout") != -1
        ) {
            log("获取控件超时，可能被遮挡");
            return null;
        } else {
            throw error;
        }
    }
    //  点击回退按钮
    log("退回到航班列表页面");
    click(10, 70);

    APP.waitForId(FLIGHTS_CONTAINER);

    return flight;
}

/**
 * 查找航班的舱位和承运信息
 * @param {any} flight 航班
 * @returns 包含了舱位和承运信息的航班
 */
function getCabinsAndCarrier(flight) {
    log("进入查找航班的舱位和承运信息方法，此时在选择舱位页面");
    //  承运信息
    let carrier = APP.getById(CARRIER).text();
    flight.carrier.airline = carrier.substring(0, 2);
    flight.carrier.flightNo = carrier.substring(2);
    flight.carrier.aircraftModel = "";
    flight.carrier.aircraftModelDescription = "";
    log("爬取承运信息：" + carrier);
    flight.actualCarrier.aircraftModel = "";
    flight.actualCarrier.aircraftModelDescription = "";

    if (flight.isSharedFlight) {
        let actualCarrierEle = id(ACTUAL_CARRIER).findOne(1000);
        //  如果实际航班和航班是同一个
        if (actualCarrierEle && actualCarrierEle.text) {
            carrier = actualCarrierEle.text();
            if (carrier.startsWith("实际承运")) {
                carrier = carrier.substring(4);
            }
            flight.actualCarrier.airline = carrier.substring(0, 2);
            flight.actualCarrier.flightNo = carrier.substring(2);
        } else {
            flight.actualCarrier.airline = flight.carrier.airline;
            flight.actualCarrier.flightNo = flight.carrier.flightNo;
        }
        log(
            "为共享航班，爬取到的实际承运信息为：" +
            flight.actualCarrier.airline +
            flight.actualCarrier.flightNo
        );
    }

    log("获取舱等列表");
    let cabinClasses = id(CABINCLASS).find();
    sleep(500)
    let timeout = new Date().getTime() + 3000;
    while (timeout > new Date().getTime()) {
        try {
            checkChildDeep = APP.checkChildDeep(cabinClasses, 1, 1);
        } catch (error) {
            log(error);
            sleep(1000);
            cabinClasses = id(CABINCLASS).find();
        }
    }
    if (!cabinClasses || cabinClasses.size() == 0) {
        log("找不到舱等");
        return flight;
    }
    log("找到" + cabinClasses.size() + "个舱等");
    sleep(300);
    cabinClasses
        .toArray()
        .reverse()
        .forEach((cabinClass) => {
            scrollTop();
            let title = cabinClass.findOne(id(CABINCLASS_TITLE)).text();
            log("点击舱等: " + title);
            APP.clickArea(cabinClass);
            sleep(100);
            log("获取舱位列表");
            let tCanbins = getCabins(title);
            tCanbins.forEach((t) => {
                flight.cabins.push(t);
            });
        });

    return flight;
}

/**
 * 获取舱等下的所有舱位
 * @returns 仓等下的所有舱位
 */
function getCabins(classClass) {
    log("进入到获取舱位列表方法");
    let cabins = [];

    let cabinCards = waitForCabinList();
    log("获取到" + cabinCards.size() + "个舱位");
    if (cabinCards.size() == 0) {
        return cabins;
    }

    let temp = cabinCards.get(cabinCards.size() - 1);
    let tempCabin = APP.waitForChild(temp, CABIN_NAME).text().replace("舱", "");
    log("记录临时舱位: " + tempCabin);

    cabinCards.toArray().forEach((cabin) => {
        log("获取单独舱位信息");
        let cabinName = cabin.findOne(id(CABIN_NAME)).text().substring(0, 1);
        let cabinTypeName = cabin.findOne(id(CABIN_TYPE_NAME)).text(); // 比如 学生特惠 特价经济舱
        log("   -舱位名：" + cabinName + " 类型名：" + cabinTypeName);
        // cabinTypeName.indexOf("学生特惠") == -1 && cabinTypeName.indexOf("青年特惠") == -1 && 
        // cabinTypeName.indexOf("长者特惠") == -1 && cabinTypeName.indexOf("新会员专享") == -1 && 
        // cabinTypeName.indexOf("11.11专享") == -1 && cabinTypeName.indexOf("多人特惠") == -1
        // 未找到，则为 -1
        if (cabinTypeName.indexOf("舱") > -1) {
            let cabinInfo = getCabin(cabin);
            cabinInfo.cabinClass = CabinClassType[classClass];
            cabins.push(cabinInfo);
        } else {
            log("学生特惠、青年特惠、长者特惠、新会员专享、11.11专享、多人特惠跳过");
            return;
        }
    });

    log("舱等" + classClass + "中翻页");
    while (cabinCards != null && cabinCards.size() != 0) {
        let s = className(SCROLL_VIEW);
        s.scrollForward();
        sleep(700);

        cabinCards = waitForCabinList();

        log("获取到" + cabinCards.size() + "个舱位");
        temp = cabinCards.get(cabinCards.size() - 1);
        let cur = temp.findOne(id(CABIN_NAME)).text().replace("舱", "");
        log("对比当前最后舱位和临时舱位: " + cur + " - " + tempCabin);
        if (tempCabin == cur) {
            log("滑动到底部，退出滑动，返回舱位列表");
            break;
        } else {
            log("未滑动到底部");
            tempCabin = cur;
        }

        cabinCards.toArray().forEach((cabin) => {
            log("获取单独舱位信息");
            let cabinInfo = getCabin(cabin);
            if (cabins.filter((t) => t.cabin == cabinInfo.cabin).length != 0) {
                log("重复的舱位: " + cabinInfo.cabin);
                return;
            }
            cabinInfo.cabinClass = CabinClassType[classClass];
            cabins.push(cabinInfo);
        });
    }

    return cabins;
}

function waitForCabinList() {
    let cabinCards = APP.getListById(CABIN_CARD);
    timeout = new Date().getTime() + 1000;
    while (!APP.checkCollection(cabinCards, 2) && timeout > new Date().getTime()) {
        cabinCards = APP.getListById(CABIN_CARD);
    }
    if (timeout < new Date().getTime()) {
        throw "舱位列表找不到子节点";
    }

    log("舱位列表有子节点");
    return cabinCards;
}

/**
 * 获取舱位块下的信息
 * @param {any} cabinCard 舱位块
 * @returns 舱位信息
 */
function getCabin(cabinCard) {
    log("进入到获取舱位块下的信息方法");
    let cabin = {
        prices: [],
    };

    cabinInfo = APP.waitForChild(cabinCard, CABIN_NAME);

    cabin.cabin = cabinInfo.text().replace("舱", "");

    log("   -舱位名：" + cabin.cabin);

    let price = {};
    price.discount = 0;
    price.passengerType = 0;
    price.totalTax = DEFAULT_CABIN_TOTAL_TAX;
    price.currency = "CNY";

    let cabinCount = cabinCard.findOne(id(CABIN_COUNT)).text();
    log("舱位文本: " + cabinCount);
    let len = getLen(cabinCount);
    price.Status = len > 1 ? +cabinCount.substring(len - 1) : len;

    log("   -座位数（余票）：" + price.Status);
    price.ticketPrice = +APP.waitForChild(cabinCard, CABIN_PRICE)
        .text()
        .replace(RMB, "");
    log("   -价格" + price.ticketPrice);

    let directContainer = cabinCard.findOne(id(CABIN_DIRECT_CONTAINER));
    if (directContainer) {
        log("   -有直减");

        let directDiscount = directContainer
            .findOne(id(CABIN_DIRECT_CONTENT))
            .text();
        price.directDiscount = directDiscount.replace(RMB, "");
        log("   -直减" + price.directDiscount);
    } else {
        log("   -没有直减");
    }
    cabin.prices.push(price);
    return cabin;
}

function getLen(obj) {
    log("typeof(obj.length): " + typeof obj.length);
    switch (typeof obj.length) {
        case "function":
            return obj.length();
        case "number":
            return obj.length;
        default:
            return obj.length;
    }
}

function scrollTop() {
    let s = className(CABIN_SCROLL);
    s.scrollBackward();
    sleep(700);
}

/**
 * 航班是否售罄
 * @param {any} flightCard 航班块
 * @returns 是否售罄
 */
function SellOut(flightCard) {
    let sellOut = flightCard.findOne(id(SELL_OUT));
    return (sellOut && sellOut.text && sellOut.text());
}
