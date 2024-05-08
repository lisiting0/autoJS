// 价格查询
var APP = null;
var ENV = null;

const DEFAULT_CABIN_TOTAL_TAX = -1;

const RMB = "¥";

const CLOSE_DIALOG = "close_dialog";

const SCROLL_VIEW = "android.widget.ScrollView";
/**
 * 右上角的回到主页按钮
 */
const TITLE_HOME = "book_home";
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
  search: function (request) {
    log("开始搜索航班");
    let currentDate = new Date(request.data.flights[0].departureDateTime);
    // let currentDate = new Date('2021-06-30');
    // let endDate = new Date('2021-06-30');
    let endDate;
    if (!request.data.flights[0].arrivalDateTime) {
      endDate = currentDate;
    } else {
      endDate = new Date(request.data.flights[0].arrivalDateTime);
    }

    APP.homeOperate(
      request.data.flights[0].originAirport,
      request.data.flights[0].destinationAirport,
      currentDate
    );

    sleep(1200);

    clickDialog();

    let result = {
      primaryFlights: [],
    };

    let emptyFlights = APP.waitForId(NO_FLIGHT_ID, 100, 2000);
    if (emptyFlights) {
      APP.clickById(TITLE_HOME);
      return {};
    }

    do {
      let rawMonth = currentDate.getMonth() + 1;
      let month = rawMonth < 10 ? "0" + rawMonth : rawMonth;
      let rawDate = currentDate.getDate();
      let date = rawDate < 10 ? "0" + rawDate : rawDate;
      let d = currentDate.getFullYear() + "-" + month + "-" + date;
      log("爬取日期" + d + "的航班");
      let flights = getFlightsWithDate(
        d,
        request.data.flights[0].originAirport,
        request.data.flights[0].destinationAirport
      );
      if (flights != null) {
        flights.forEach((t) => {
          result.primaryFlights.push(t);
        });
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

    APP.clickById(TITLE_HOME);
    log("开始搜索航班结束");

    log("result: " + JSON.stringify(result));

    return result;
  },
  // 查询有直减的航班
  searchDirectAirline: function (request) {
    log("开始搜索航班");
    let currentDate = new Date(request.data.primaryFlight.departureDate);
    let endDate;
    if (!request.data.primaryFlight.departureEndDate) {
      endDate = currentDate;
    } else {
      endDate = new Date(request.data.primaryFlight.departureEndDate);
    }

    try {
      APP.homeOperate(
        request.data.primaryFlight.originAirport,
        request.data.primaryFlight.destinationAirport,
        currentDate,
        true
      );
    } catch (error) {
      throw error;
    }

    let errorTip = APP.waitForContainsText("20000", 50, 800);
    if (errorTip) {
      let btn1 = APP.waitForId("button1", 50, 500);
      if (btn1) {
        while (!btn1.click()) {
          sleep(10);
        }
      }
    }

    clickDialog();

    let loginPage = APP.waitForContainsText("欢迎登录", 50, 2000);
    if (loginPage) {
      APP.clickNavigateUp(50, 500);
      throw "账号异常";
    }

    let result = {
      primaryFlights: [],
    };

    // 选择直飞
    // const navigationBar = _app.waitForId('domestic_list_navigation_bar', 100, 6000);
    // if (navigationBar) {
    //   navigationBar.children().get(3).click();
    // }
    // const checkboxNonStop = _app.waitForId('dialog_flight_list_filter_checkBox_nonStop', 100, 2000);
    // if (checkboxNonStop) {
    //   checkboxNonStop.children().get(3).click();
    // }
    // const tvConfirm = _app.waitForId('dialog_flight_list_filter_tv_confirm', 100, 2000);
    // if (tvConfirm) {
    //   tvConfirm.click();
    // }

    do {
      let rawMonth = currentDate.getMonth() + 1;
      let month = rawMonth < 10 ? "0" + rawMonth : rawMonth;
      let rawDate = currentDate.getDate();
      let date = rawDate < 10 ? "0" + rawDate : rawDate;
      let d = currentDate.getFullYear() + "-" + month + "-" + date;
      log("爬取日期" + d + "的航班");
      // 根据日期获取有直减的航班
      let flights = getDirectFlightsWithDate(
        d,
        request.data.primaryFlight.originAirport,
        request.data.primaryFlight.destinationAirport
      );
      if (flights != null) {
        flights.forEach((t) => {
          result.primaryFlights.push(t);
        });
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

    APP.clickById(TITLE_HOME);
    log("开始搜索航班结束");

    log("result: " + JSON.stringify(result));

    return result;
  },
  intoOrder: function (request) {
    try {
      let currentDate = new Date(request.departureDate);
      APP.homeOperate(
        request.originAirport,
        request.destinationAirport,
        currentDate
      );

      sleep(1200);

      clickDialog();
      findFlight(request);
    } catch (error) {
      switch (error) {
        case orderMessage.finished:
          break;
        case orderMessage.notFoundCabinClass:
          throw error;
        default:
          throw error;
      }
    }
  },
};

function clickDialog() {
  // 关闭公告内容
  let closeNotice = APP.waitForId("close", 100, 3000);
  if (closeNotice) {
    closeNotice.click();
  }

  toast("检测可关闭的 dialog 中");
  let bar = APP.waitForId(CLOSE_DIALOG, 100, 2000);
  while (bar) {
    bar.click();
    bar = APP.waitForId(CLOSE_DIALOG, 100, 2000);
  }

  // 检查 惊喜优惠券
  const suprise = "surprise_coupons_card";
  let suprise_card = APP.waitForId(suprise, 100, 2000);
  while (suprise_card) {
    sleep(1000);
    suprise_card = APP.waitForId(suprise, 100, 2000);
  }
}

/**
 * 爬取指定日期、起飞到达下的航班信息
 * @param {String} date 日期
 * @param {String} depAirportCode 起飞机场代码
 * @param {String} arrAirportCode 到达机场代码
 * @returns 返回找到的航班
 */
function getFlightsWithDate(date, depAirportCode, arrAirportCode) {
  log(
    "进入到爬取指定日期: " +
      date +
      " - 起飞: " +
      depAirportCode +
      " - 到达: " +
      arrAirportCode
  );
  log("此时在航班列表页面");
  let flights = [];

  /**
   * 当前页面的航班列表
   */
  let flightCollection = waitFlightView();
  let lastFlight = getFlightFlag(flightCollection);

  log("获取临时航班号：" + lastFlight);

  let count = 0;
  flightCollection.toArray().forEach((f) => {
    log("正在爬取第" + ++count + "个航班");
    if (SellOut(f)) {
      log("航班售罄，跳过");
      return;
    }
    let flight = getFlight(f, date, depAirportCode, arrAirportCode);
    if (flight == null) {
      return;
    }
    log("爬取到的航班信息: " + flight);
    log("\n爬取下一个航班");
    flights.push(flight);
  });

  log("航班列表翻页");
  while (flightCollection != null && flightCollection.size() != 0) {
    let s = APP.getById(FLIGHTS_CONTAINER);
    if (!s) {
      clickDialog();
    }

    s.scrollForward();
    sleep(700);

    flightCollection = waitFlightView();
    log("找到" + flightCollection.size() + "个航班");
    if (flightCollection.size() == 0) {
      return flights;
    }

    let cur = getFlightFlag(flightCollection);

    log("对比当前最后航班和临时航班: " + cur + " - " + lastFlight);
    if (lastFlight == cur) {
      log("滑动到底部");
      break;
    } else {
      log("未滑动到底部");
      lastFlight = cur;
    }

    flightCollection.toArray().forEach((f) => {
      log("正在爬取第" + ++count + "个航班");

      if (SellOut(f)) {
        log("航班售罄，跳过");
        return;
      }

      let nextFlight = f.findOne(id(FLIGHT_NO));
      if (!nextFlight) {
        log("第%s个航班找不到航班号, 跳过", count - 1);
        return;
      }
      let flightNo = nextFlight.text().trim();
      flightNo = flightNo.substring(0, flightNo.indexOf(" "));
      if (
        flights.filter(
          (t) => t.carrier.airline + t.carrier.flightNo == flightNo
        ).length != 0
      ) {
        log("重复的航班: " + flightNo + "跳过");
        return;
      }

      let flight = getFlight(f, date, depAirportCode, arrAirportCode);
      if (flight == null) {
        return;
      }

      log("爬取到的航班信息: " + flight);
      log("\n爬取下一个航班");
      flights.push(flight);
    });
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
  return flights;
}

/**
 * 爬取指定日期、起飞到达下的有直减航班信息
 * @param {String} date 日期
 * @param {String} depAirportCode 起飞机场代码
 * @param {String} arrAirportCode 到达机场代码
 * @returns 返回找到的航班
 */
function getDirectFlightsWithDate(date, depAirportCode, arrAirportCode) {
  log(
    "进入到爬取指定日期: " +
      date +
      " - 起飞: " +
      depAirportCode +
      " - 到达: " +
      arrAirportCode
  );
  log("此时在航班列表页面");
  let flights = [];

  /**
   * 当前页面的航班列表
   */
  let flightCollection = waitFlightView();

  if (flightCollection.size() < 1) {
    // 返回空值
    return flights;
  }

  let lastFlight = getFlightFlag(flightCollection);

  log("获取临时航班号：" + lastFlight);

  let count = 0;
  flightCollection.toArray().forEach((f) => {
    log("正在爬取第" + ++count + "个航班");
    if (SellOut(f)) {
      log("航班售罄，跳过");
      return flights;
    }
    let flight = getDirectFlight(f, date, depAirportCode, arrAirportCode);
    if (flight == null) {
      return flights;
    }
    log("爬取到的航班信息: " + flight);
    log("\n爬取下一个航班");
    flights.push(flight);
  });

  log("航班列表翻页");
  while (flightCollection != null && flightCollection.size() != 0) {
    let s = APP.getById(FLIGHTS_CONTAINER);
    if (!s) {
      clickDialog();
    }

    s.scrollForward();
    sleep(700);

    flightCollection = waitFlightView();
    log("找到" + flightCollection.size() + "个航班");
    if (flightCollection.size() == 0) {
      return flights;
    }

    let cur = getFlightFlag(flightCollection);

    log("对比当前最后航班和临时航班: " + cur + " - " + lastFlight);
    if (lastFlight == cur) {
      log("滑动到底部");
      break;
    } else {
      log("未滑动到底部");
      lastFlight = cur;
    }

    flightCollection.toArray().forEach((f) => {
      log("正在爬取第" + ++count + "个航班");

      if (SellOut(f)) {
        log("航班售罄，跳过");
        return flights;
      }

      let nextFlight = f.findOne(id(FLIGHT_NO));
      if (!nextFlight) {
        log("第%s个航班找不到航班号, 跳过", count - 1);
        return flights;
      }
      let flightNo = nextFlight.text().trim();
      flightNo = flightNo.substring(0, flightNo.indexOf(" "));
      if (
        flights.filter(
          (t) => t.carrier.airline + t.carrier.flightNo == flightNo
        ).length != 0
      ) {
        log("重复的航班: " + flightNo + "跳过");
        return;
      }

      let flight = getDirectFlight(f, date, depAirportCode, arrAirportCode);
      if (flight == null) {
        return flights;
      }

      log("爬取到的航班信息: " + flight);
      log("\n爬取下一个航班");
      flights.push(flight);
    });
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
  return flights;
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
function getFlightFlag(flightCollection) {
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
function getFlight(card, date, depAirportCode, arrAirportCode) {
  log("进入到爬取单个航班信息方法，此时在航班列表页面");
  sleep(100);

  let flightNoEle = card.findOne(id(FLIGHT_NO));
  if (!flightNoEle) {
    log("找不到航班号, %s, %s, %s, 跳过", date, depAirportCode, arrAirportCode);
    return null;
  }

  let flightNo = flightNoEle.text().trim();
  log("当前航班号：" + flightNo);
  let transfer = card.findOne(id(FLIGHT_TRANSFER)).text();
  if (transfer + "") {
    log("中转: " + transfer + "");
    return null;
  }
  log("没有中转，继续");
  let flight = {
    departure: {},
    arrival: {},
    carrier: {},
    actualCarrier: {},
    cabins: [],
  };

  let city = getCity();
  log("分割城市：" + city[0] + " - " + city[1]);

  let deptAirportAndTerminal = splitAirportAndTerminal(
    APP.waitForChild(card, FLIGHT_DEP_TERM).text()
  );
  let arrAirportAndTerminal = splitAirportAndTerminal(
    APP.waitForChild(card, FLIGHT_DEP_TERM).text()
  );

  flight.departure.date = date;
  flight.departure.airportName = deptAirportAndTerminal[0];
  flight.departure.terminal = deptAirportAndTerminal[1];
  flight.departure.time = APP.waitForChild(card, FLIGHT_DEP_TIME).text();
  flight.departure.airportCode = depAirportCode;
  flight.departure.city = city[0];

  flight.arrival.date = date;
  flight.arrival.airportName = arrAirportAndTerminal[0];
  flight.arrival.terminal = arrAirportAndTerminal[1];
  flight.arrival.time = APP.waitForChild(card, FLIGHT_ARR_TIME).text();
  flight.arrival.airportCode = arrAirportCode;
  flight.arrival.city = city[1];

  log(
    "获取到航班起飞到达：" + flight.departure.time + "-" + flight.arrival.time
  );

  flight.isSharedFlight =
    card.findOne(id(FLIGHT_NO)).text().indexOf("共享") !== -1;
  log("是否为共享航班：" + flight.isSharedFlight);

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
 * 获取有直减的单个航班的信息
 * @param {String} date 日期
 * @param {any} card 一个航班块
 * @param {String} depAirportCode 起飞机场三字码
 * @param {String} arrAirportCode 到达机场三字码
 * @returns 单个航班
 */
function getDirectFlight(card, date, depAirportCode, arrAirportCode) {
  log("进入到爬取单个航班信息方法，此时在航班列表页面");
  sleep(100);

  let flightNoEle = card.findOne(id(FLIGHT_NO));
  if (!flightNoEle) {
    log("找不到航班号, %s, %s, %s, 跳过", date, depAirportCode, arrAirportCode);
    return null;
  }

  // 有直减的航班
  let flightNo = flightNoEle.text().trim();
  log("当前航班号：" + flightNo);
  let cut = card.findOne(id(CUT_ID));
  if (!cut) {
    log("没有直减");
    return null;
  }
  log("有直减，继续");

  let flight = {
    departure: {},
    arrival: {},
    carrier: {},
    actualCarrier: {},
    cabins: [],
  };

  flight.departure.date = date;
  flight.departure.airportCode = depAirportCode;
  flight.arrival.date = date;
  flight.arrival.airportCode = arrAirportCode;

  log("点击该航班进入选择舱位页面");
  card.click();
  //  这里可能会因为有遮挡而点不到
  try {
    flight = getEconomyClassCabinsAndCarrier(flight);
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
  sleep(500);
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
      // flight.cabins = getCabins(title);
    });

  return flight;
}

/**
 * 查找经济舱的航班的舱位和承运信息（爬取直减运价的方法）
 * @param {any} flight 航班
 * @returns 包含了舱位和承运信息的航班
 */
function getEconomyClassCabinsAndCarrier(flight) {
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

  log("获取舱等列表");
  let cabinClasses = id(CABINCLASS).find();
  sleep(500);
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
      if (title == "经济舱") {
        log("点击舱等: " + title);
        APP.clickArea(cabinClass);
        sleep(100);
        log("获取舱位列表");
        let tCanbins = getCabins(title);
        tCanbins.forEach((t) => {
          flight.cabins.push(t);
        });
      }
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
    let cabinInfo = getCabin(cabin);
    cabinInfo.cabinClass = CabinClassType[classClass];
    cabins.push(cabinInfo);
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
  // let cabinCards = id(CABIN_CARD).find();
  let cabinCards = APP.getListById(CABIN_CARD);
  timeout = new Date().getTime() + 1000;
  while (
    !APP.checkCollection(cabinCards, 2) &&
    timeout > new Date().getTime()
  ) {
    // cabinCards = id(CABIN_CARD).find();
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

  log("   -座位数：" + price.Status);
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

/**
 * 起飞的机场和航站楼是混在一起的，这个方法用于分开
 * @param {string} text 待分离的文本
 * @returns 数组，['机场', '航站楼']
 */
function splitAirportAndTerminal(text) {
  log("进入到获取起飞的机场和航站楼的方法, text: " + text);

  let len = getLen(text);
  log("text length: " + len);
  if (len < 3) {
    return [text, ""];
  }

  let value;
  let lastTwo = text.substring(len - 2);
  if (
    ((lastTwo.charAt(0) >= "a" && lastTwo.charAt(0) <= "z") ||
      (lastTwo.charAt(0) >= "A" && lastTwo.charAt(0) <= "Z")) &&
    lastTwo.charAt(1) >= 0 &&
    lastTwo.charAt(1) <= 9
  ) {
    value = [text.substring(0, len - 2), lastTwo];
  } else {
    value = [text, ""];
  }

  log("获取到值为：" + value[0] + " - " + value[1]);
  return value;
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

/**
 * 获取页面标题的起飞到达的城市
 * @returns [起飞城市, 到达城市]
 */
function getCity() {
  let citys = APP.getById(TITLE_CITY);
  let value = citys.text();
  let sp = value.split("-");
  return [sp[0], sp[1]];
}

/**
 * 下单页面的在下面
 */

/**
 * 下单用
 * 找到指定日期、起飞到达下的航班信息
 */
function findFlight(input) {
  log("此时在航班列表页面");
  let expectFlight = input.fullFlightNo;
  log("预计航班号为：" + expectFlight);

  /**
   * 当前页面的航班列表
   */
  let flightCollection = waitFlightView();

  if (flightCollection.size() < 1) {
    throw orderMessage.foundNoFlight;
  }

  let temp = flightCollection.get(flightCollection.size() - 1);
  let lastFlight = temp.findOne(id(FLIGHT_NO)).text();
  if (lastFlight.indexOf(" ") != -1) {
    lastFlight = lastFlight.substring(0, lastFlight.indexOf(" "));
  }

  log("获取临时航班号：" + lastFlight);

  let count = 0;
  flightCollection.toArray().forEach((f) => {
    log("正在找第" + ++count + "个航班");
    let flightNoFind = f.findOne(id(FLIGHT_NO));
    if (flightNoFind) {
      let flightNo = flightNoFind.text().trim();
      if (flightNo.indexOf(" ") != -1) {
        flightNo = flightNo.substring(0, flightNo.indexOf(" "));
      }
      log("找到的航班号为：" + flightNo);
      let flightTimeCard = f.findOne(id("item_flight_time_card"));
      let departureTime = flightTimeCard.child(0).text();
      log("找到的起飞时间：" + departureTime);
      let arriveTime = flightTimeCard.child(3).text();
      log("找到的到达时间：" + arriveTime);
      let departureDateTime = getHourAndMin(input.departureDate);
      let arrivalDateTime = getHourAndMin(input.arrivalDate);
      log(departureDateTime, arrivalDateTime);
      if (flightNo == expectFlight) {
        if (
          departureTime != departureDateTime &&
          arriveTime != arrivalDateTime
        ) {
          throw "起飞到达时间不一致";
        }
        if (SellOut(f)) {
          throw orderMessage.sellOut;
        }
        log("点击该航班进入选择舱位页面");
        f.click();
        findCabinClass(input);
      }
    }
  });

  log("航班列表翻页");
  while (flightCollection != null && flightCollection.size() != 0) {
    let s = APP.getById(FLIGHTS_CONTAINER);
    if (!s) {
      clickDialog();
    }

    s.scrollForward();
    sleep(700);

    flightCollection = waitFlightView();
    log("找到" + flightCollection.size() + "个航班");
    if (flightCollection.size() == 0) {
      throw orderMessage.foundNoFlight;
    }
    temp = flightCollection.get(flightCollection.size() - 1);
    let cur = temp.findOne(id(FLIGHT_NO)).text();

    log("对比当前最后航班和临时航班: " + cur + " - " + lastFlight);
    if (lastFlight == cur) {
      log("滑动到底部");
      break;
    } else {
      log("未滑动到底部");
      lastFlight = cur;
    }

    flightCollection.toArray().forEach((f) => {
      log("正在爬取第" + ++count + "个航班");

      let flightNo = f.findOne(id(FLIGHT_NO)).text().trim();
      if (flightNo.indexOf(" ") != -1) {
        flightNo = flightNo.substring(0, flightNo.indexOf(" "));
      }
      log("找到的航班号为：" + flightNo);
      if (flightNo == expectFlight) {
        if (SellOut(f)) {
          throw orderMessage.sellOut;
        }
        log("点击该航班进入选择舱位页面");
        f.click();
        findCabinClass(input);
      }

      log("\n找下一个航班");
    });
  }
  log("没有找到航班：" + expectFlight);
  throw orderMessage.foundNoFlight;
}
// 返回时分
function getHourAndMin(date) {
  const d = new Date(date);
  let h = d.getHours();
  if (h < 10) {
    h = "0" + h;
  }
  let m = d.getMinutes();
  if (m < 10) {
    m = "0" + m;
  }
  return h + ":" + m;
}

function findCabinClass(input) {
  log("获取舱等列表");
  let cabinClasses = APP.getListById(CABINCLASS);
  sleep(500);
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
    throw orderMessage.notFoundCabinClass;
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
      findCabins(input);
    });
  //  到这里就表示找不到对应舱位了，抛出
  throw orderMessage.foundNoCabin;
}

function findCabins(input) {
  let cabinCards = waitForCabinList();

  log("获取到" + cabinCards.size() + "个舱位");
  if (cabinCards.size() == 0) {
    return;
  }

  let temp = cabinCards.get(cabinCards.size() - 1);
  let tempCabin = temp.findOne(id(CABIN_NAME)).text().substring(0, 1);
  log("记录临时舱位: " + tempCabin);

  let scrollView = className(SCROLL_VIEW).findOne();
  let pre = 0;
  let current = scrollView.boundsInParent().bottom;
  let tempCabinTypeAndPrice = []; // 临时保存价格、产品code、结算价、买入价
  let allCabinTypeAndPrice = [];
  let productCodes = [];
  if (
    input.productCodes &&
    input.productCodes != null &&
    input.productCodes != ""
  ) {
    log("产品类型：" + input.productCodes);
    productCodes = input.productCodes.split("|");
  }

  // 有筛选学生特惠、青年特惠、长者特惠、多人特惠...，多个里面挑选最低价
  function nextPage(scrollView) {
    APP.scrollForward(scrollView);
    scrollView = className(SCROLL_VIEW).findOne();
    let c = scrollView.boundsInParent().bottom;
    return c;
  }

  // 找到所有产品类型和价格，并排序
  function findCabinTypeNameAndPrice(settlementPrice, input) {
    sleep(500);
    cabinCards.toArray().forEach((cabin) => {
      if (cabin.findOne(id(CABIN_TYPE_NAME)) == null) {
        return;
      }
      let cabinName = cabin.findOne(id(CABIN_NAME)).text().substring(0, 1);
      let cabinTypeName = cabin.findOne(id(CABIN_TYPE_NAME)).text(); // 比如 学生特惠 特价经济舱
      let cabinPriceText = cabin.findOne(id(CABIN_PRICE)).text();
      let cabinPrice = cabinPriceText.substring(1);
      log(" 类型名：" + cabinTypeName + " 价格：" + cabinPrice);
      let directContainer = cabin.findOne(id(CABIN_DIRECT_CONTAINER));
      let directPrice = 0;
      if (directContainer) {
        directPrice = directContainer
          .findOne(id(CABIN_DIRECT_CONTENT))
          .text()
          .substring(1); //立减价格
      } else {
        directPrice = 0;
      }
      log(" 立减：" + directPrice);
      // 获取所有产品类型和价格，并排序(一定得排序，不然顺序会对不上，目的是用于比较价格时，提示票面价、结算价和买入价)
      let hasAllCabinTypeAndPriceTemp = allCabinTypeAndPrice.filter(
        (t) => t.cabinTypeName == cabinTypeName
      );
      if (hasAllCabinTypeAndPriceTemp.length == 0) {
        allCabinTypeAndPrice.push({
          cabinName: cabinName,
          cabinTypeName: cabinTypeName,
          cabinPrice: cabinPrice,
          directPrice: directPrice,
          settlementPrice: parseFloat(cabinPrice - directPrice).toFixed(1), //【 app结算价 = app票面价 - 立减】 - 【ota结算价】，
          sellPrice: parseFloat(cabinPrice - settlementPrice).toFixed(1), //买入价=app票面价-ota结算价
        });
      }

      // 查看当前舱位类型是否符合后台给的舱位类型，有则临时保存
      if (
        input.productCodes &&
        input.productCodes != null &&
        input.productCodes != ""
      ) {
        let hasTypeName = productCodes.filter((t) => t == cabinTypeName);
        let hasTypeNameTemp = tempCabinTypeAndPrice.filter(
          (t) => t.cabinTypeName == cabinTypeName
        );
        if (hasTypeName.length > 0 && hasTypeNameTemp.length == 0) {
          // 结算价范围 = app结算价 - ota结算价
          // 买入价范围 = app票面价 - ota结算价
          // 票面价范围 = app票面价 - ota票面价
          if (input.fixCabin) {
            if (cabinName.toUpperCase() == input.cabin.toUpperCase()) {
              tempCabinTypeAndPrice.push({
                cabinName: cabinName,
                cabinTypeName: cabinTypeName,
                cabinPrice: cabinPrice,
                directPrice: directPrice,
                settlementPrice: parseFloat(cabinPrice - directPrice).toFixed(
                  1
                ), //【 app结算价 = app票面价 - 立减】 - 【ota结算价】，
                sellPrice: parseFloat(cabinPrice - settlementPrice).toFixed(1), //买入价=app票面价-ota结算价
              });
            }
          } else {
            tempCabinTypeAndPrice.push({
              cabinName: cabinName,
              cabinTypeName: cabinTypeName,
              cabinPrice: cabinPrice,
              directPrice: directPrice,
              settlementPrice: parseFloat(cabinPrice - directPrice).toFixed(1), //【 app结算价 = app票面价 - 立减】 - 【ota结算价】，
              sellPrice: parseFloat(cabinPrice - settlementPrice).toFixed(1), //买入价=app票面价-ota结算价
            });
          }
        }
      } else {
        if (
          cabinTypeName.indexOf("学生特惠") == -1 &&
          cabinTypeName.indexOf("青年特惠") == -1 &&
          cabinTypeName.indexOf("长者特惠") == -1 &&
          cabinTypeName.indexOf("新会员专享") == -1 &&
          cabinTypeName.indexOf("11.11专享") == -1 &&
          cabinTypeName.indexOf("多人特惠") == -1 &&
          cabinTypeName.indexOf("候鸟返程特惠") == -1 &&
          cabinTypeName.indexOf("会员日") == -1
        ) {
          if (input.fixCabin) {
            if (cabinName.toUpperCase() == input.cabin.toUpperCase()) {
              tempCabinTypeAndPrice.push({
                cabinName: cabinName,
                cabinTypeName: cabinTypeName,
                cabinPrice: cabinPrice,
                directPrice: directPrice,
                settlementPrice: parseFloat(cabinPrice - directPrice).toFixed(
                  1
                ), // app结算价 = app票面价 - 立减，
                sellPrice: parseFloat(cabinPrice - settlementPrice).toFixed(1), //买入价=app票面价-ota结算价
              });
            }
          } else {
            tempCabinTypeAndPrice.push({
              cabinName: cabinName,
              cabinTypeName: cabinTypeName,
              cabinPrice: cabinPrice,
              directPrice: directPrice,
              settlementPrice: parseFloat(cabinPrice - directPrice).toFixed(1), // app结算价 = app票面价 - 立减，
              sellPrice: parseFloat(cabinPrice - settlementPrice).toFixed(1), // 买入价 = app票面价-ota结算价
            });
          }
        }
      }
    });
  }

  // 找到所有产品code和价格
  while (pre != current) {
    // 排序好的结果
    findCabinTypeNameAndPrice(input.settlementPrice, input);
    pre = current;
    current = nextPage(scrollView);
  }

  // 回到顶部
  if (pre == current) {
    scrollView.scrollBackward();
    sleep(500);
    pre = 0;
  }
  // 排序
  allCabinTypeAndPrice.sort(
    (firstItem, secondItem) => firstItem.cabinPrice - secondItem.cabinPrice
  );
  log(
    "所有产品类型和价格排序后的顺序：" + JSON.stringify(allCabinTypeAndPrice)
  );

  // 排序
  tempCabinTypeAndPrice.sort(
    (firstItem, secondItem) => firstItem.cabinPrice - secondItem.cabinPrice
  );
  log("排序后的价格：");
  log(tempCabinTypeAndPrice);

  while (pre != current) {
    clickBooking(input, allCabinTypeAndPrice);
    pre = current;
    current = nextPage(scrollView);
  }

  // 重新判断价格是否符合，点击选择
  function clickBooking(input, allCabinTypeAndPrice) {
    let cabinCards = waitForCabinList();

    let ticketPriceUpper = 0;
    let ticketPriceLower = 0;
    if (input.ticketPriceFloatRange != null) {
      ticketPriceUpper = input.ticketPriceFloatRange.upperLimit + input.price;
      ticketPriceLower = input.ticketPriceFloatRange.lowerLimit + input.price;
      console.log(
        "票面价上限：%s，票面价下限%s",
        ticketPriceUpper,
        ticketPriceLower
      );
    }

    let complianceData = []; // 票面价匹配后的数据
    for (let index = 0; index < tempCabinTypeAndPrice.length; index++) {
      let item = tempCabinTypeAndPrice[index];
      // 票面价比较
      if (
        item.cabinPrice >= ticketPriceLower &&
        item.cabinPrice <= ticketPriceUpper
      ) {
        complianceData.push({
          cabinName: item.cabinName,
          cabinTypeName: item.cabinTypeName,
          cabinPrice: item.cabinPrice,
          directPrice: item.directPrice,
          settlementPrice: item.settlementPrice,
          sellPrice: item.sellPrice,
        });
      }
    }
    log("票面价匹配后的数据");
    log(complianceData);

    // 不管有没有产品类型，都会临时保存和目标舱位相同的价格、舱位、结算价、买入价信息
    if (complianceData.length > 0) {
      adultPassengerPriceCompare(complianceData[0], input);
    } else {
      throw (
        "产品类型、价格或舱位不符，实际查到的产品类型、价格和舱位：" +
        JSON.stringify(allCabinTypeAndPriceResult(allCabinTypeAndPrice))
      );
    }

    cabinCards.toArray().forEach((cabin) => {
      if (cabin.findOne(id(CABIN_NAME)) == null) {
        return;
      }
      if (cabin.findOne(id(CABIN_TYPE_NAME)) == null) {
        return;
      }
      let cabinName = cabin.findOne(id(CABIN_NAME)).text().substring(0, 1);
      let cabinTypeName = cabin.findOne(id(CABIN_TYPE_NAME)).text(); // 比如 学生特惠 特价经济舱
      // 查看当前舱位类型是否符合后台给的舱位类型，有则临时保存
      if (
        input.productCodes &&
        input.productCodes != null &&
        input.productCodes != ""
      ) {
        if (input.fixCabin) {
          if (
            cabinName.toUpperCase() == input.cabin.toUpperCase() &&
            cabinTypeName == complianceData[0].cabinTypeName
          ) {
            log(cabinName + " == " + input.cabin);
            clickCabinIntoOrder(cabin, input.price);
          }
        } else {
          if (cabinTypeName == complianceData[0].cabinTypeName) {
            log(cabinName + " == " + input.cabin);
            clickCabinIntoOrder(cabin, input.price);
          }
        }
      } else {
        if (
          cabinTypeName.indexOf("学生特惠") == -1 &&
          cabinTypeName.indexOf("青年特惠") == -1 &&
          cabinTypeName.indexOf("长者特惠") == -1 &&
          cabinTypeName.indexOf("新会员专享") == -1 &&
          cabinTypeName.indexOf("11.11专享") == -1 &&
          cabinTypeName.indexOf("多人特惠") == -1 &&
          cabinTypeName.indexOf("候鸟返程特惠") == -1 &&
          cabinTypeName.indexOf("会员日") == -1
        ) {
          log("学生特惠、青年特惠、长者特惠、新会员专享、候鸟返程特惠跳过");
          if (input.fixCabin) {
            log(cabinName + " == " + input.cabin);
            if (cabinName.toUpperCase() == input.cabin.toUpperCase()) {
              clickCabinIntoOrder(cabin, input.price);
            }
          } else {
            if (cabinTypeName == complianceData[0].cabinTypeName) {
              log(cabinName + " == " + input.cabin);
              clickCabinIntoOrder(cabin, input.price);
            }
          }
        }
      }
    });
  }
}

// 重构一下所有产品类型和价格的结果，目的是让出票员看的懂和简洁
function allCabinTypeAndPriceResult(allCabinTypeAndPrice) {
  let result = [];
  allCabinTypeAndPrice.forEach((element) => {
    result.push(
      element.cabinTypeName +
        "-" +
        element.cabinPrice +
        "-" +
        element.cabinName +
        "-直减" +
        element.directPrice
    );
  });
  return result;
}

// 重构一下所有产品类型和价格的结果，目的是让出票员看的懂和简洁
function objectResult(element) {
  return (
    element.cabinTypeName +
    "-" +
    element.cabinPrice +
    "-" +
    element.cabinName +
    "-直减" +
    element.directPrice
  );
}

// 成人价格比较
function adultPassengerPriceCompare(tempCabinTypeAndPrice, input) {
  // 成人价格信息
  let adultCabinPriceInfo = input.cabinPriceInfos.filter((p) => p.type == 0)[0];
  log("成人价格信息：" + adultCabinPriceInfo);
  // 如果存在优惠券，则票面价需要减优惠券金额再比价
  if (adultCabinPriceInfo.couponAmount > 0) {
    tempCabinTypeAndPrice.settlementPrice =
      tempCabinTypeAndPrice.settlementPrice - adultCabinPriceInfo.couponAmount;
    log("减去优惠券金额，结算价为：" + tempCabinTypeAndPrice.settlementPrice);
  }
  // 只会比较单个成人票面价
  if (input.ticketPriceFloatRange != null) {
    let ticketPriceUpper =
      input.ticketPriceFloatRange.upperLimit + adultCabinPriceInfo.ticketPrice;
    let ticketPriceLower =
      input.ticketPriceFloatRange.lowerLimit + adultCabinPriceInfo.ticketPrice;
    if (ENV.debugMode) {
      log("票面价上限%s，票面价下限%s", ticketPriceUpper, ticketPriceLower);
      log("票面价%s", tempCabinTypeAndPrice.cabinPrice);
    }
    // 票面价比较
    if (
      tempCabinTypeAndPrice.cabinPrice >= ticketPriceLower &&
      tempCabinTypeAndPrice.cabinPrice <= ticketPriceUpper
    ) {
    } else {
      const ticketPriceValue = Math.abs(
        parseFloat(
          tempCabinTypeAndPrice.cabinPrice - adultCabinPriceInfo.ticketPrice
        ).toFixed(1)
      );
      // 票面价低于票面价浮动幅度范围下限，则报错：票面价比ota票面价低"航司票面价-ota票面价的绝对值"，过低，请检查降舱降价规则。
      if (tempCabinTypeAndPrice.cabinPrice < ticketPriceLower) {
        throw (
          "票面价比ota票面价低" +
          ticketPriceValue +
          "，过低，请检查降舱降价规则。实际查询到的产品类型、票面和舱位" +
          JSON.stringify(objectResult(tempCabinTypeAndPrice))
        );
      }
      // 票面价高于票面价浮动幅度范围上限，则报错：票面价比ota票面价高"航司票面价-ota票面价的绝对值"，过高，请检查降舱降价规则。
      if (tempCabinTypeAndPrice.cabinPrice > ticketPriceUpper) {
        throw (
          "票面价比ota票面价高" +
          ticketPriceValue +
          "，过高，请检查降舱降价规则。实际查询到的产品类型、票面和舱位" +
          JSON.stringify(objectResult(tempCabinTypeAndPrice))
        );
      }
    }
  }
  // 只会比较单个成人结算价
  if (input.settlementPriceFloatRange != null) {
    let settlementPriceUpper =
      input.settlementPriceFloatRange.upperLimit +
      adultCabinPriceInfo.settlementPrice;
    let settlementPriceLower =
      input.settlementPriceFloatRange.lowerLimit +
      adultCabinPriceInfo.settlementPrice;
    if (ENV.debugMode) {
      log(
        "结算价上限%s，票面价下限%s",
        settlementPriceUpper,
        settlementPriceLower
      );
      log("航司结算价%s", tempCabinTypeAndPrice.settlementPrice);
    }
    // 符合结算价<=下限 结算价>=上限
    if (
      tempCabinTypeAndPrice.settlementPrice >= settlementPriceLower &&
      tempCabinTypeAndPrice.settlementPrice <= settlementPriceUpper
    ) {
    } else {
      let settlementPriceValue = Math.abs(
        parseFloat(
          tempCabinTypeAndPrice.settlementPrice -
            adultCabinPriceInfo.settlementPrice
        ).toFixed(1)
      );
      // 结算价低于结算价浮动幅度范围下限，则报错：结算金额赚"航司结算价-ota结算价的绝对值"，过高，请检查出票规则。
      if (tempCabinTypeAndPrice.settlementPrice < settlementPriceLower) {
        throw (
          "结算金额赚" +
          settlementPriceValue +
          "，过低，请检查出票规则。实际查询到的产品类型、票面和舱位" +
          JSON.stringify(objectResult(tempCabinTypeAndPrice))
        );
      }
      // 结算价高于结算价浮动幅度范围上限，则报错：结算金额亏"航司结算价-ota结算价的绝对值"过高，请检查出票规则。
      if (tempCabinTypeAndPrice.settlementPrice > settlementPriceUpper) {
        throw (
          "结算金额亏" +
          settlementPriceValue +
          "，过高，请检查出票规则。实际查询到的产品类型、票面和舱位" +
          JSON.stringify(objectResult(tempCabinTypeAndPrice))
        );
      }
    }
  }
  // 只会比较单个成人销售价：销售价=APP票面价-后台结算价
  if (input.sellPriceFloatRange != null) {
    let sellPriceUpper = input.sellPriceFloatRange.upperLimit;
    let sellPriceLower = input.sellPriceFloatRange.lowerLimit;
    if (ENV.debugMode) {
      log("销售价上限%s，销售价下限%s", sellPriceUpper, sellPriceLower);
      log("销售价%s", tempCabinTypeAndPrice.sellPrice);
    }
    // 符合结算价<=下限 结算价>=上限
    if (
      tempCabinTypeAndPrice.sellPrice >= sellPriceLower &&
      tempCabinTypeAndPrice.sellPrice <= sellPriceUpper
    ) {
    } else {
      let sellPriceValue = Math.abs(
        parseFloat(
          tempCabinTypeAndPrice.cabinPrice - adultCabinPriceInfo.settlementPrice
        ).toFixed(1)
      );
      // 票面价低于销售价浮动范围下限，则报错：票面价比ota优惠价低"航司票面价-ota结算价的绝对值"，过低，请检查降舱降价规则。
      if (tempCabinTypeAndPrice.sellPrice < sellPriceLower) {
        throw (
          "票面价比ota优惠价低" +
          sellPriceValue +
          "，过低，请检查降舱降价规则。实际查询到的产品类型、票面和舱位" +
          JSON.stringify(objectResult(tempCabinTypeAndPrice))
        );
      }
      // 票面价高于销售价浮动范围上限，则报错：票面价比ota优惠价高"航司票面价-ota结算价的绝对值"，过高，请检查降舱降价规则。
      if (tempCabinTypeAndPrice.sellPrice > sellPriceUpper) {
        throw (
          "票面价比ota优惠价高" +
          sellPriceValue +
          "，过高，请检查降舱降价规则。实际查询到的产品类型、票面和舱位" +
          JSON.stringify(objectResult(tempCabinTypeAndPrice))
        );
      }
    }
  }
}

function clickBookButton(info) {
  info.findOne(id(CABIN_BOOK_IN_CHOOSE)).click();
  clickNoUpgrade();
  clickRefurnAirlineList();
  throw orderMessage.finished;
}

function clickCabinIntoOrder(cabinCard, inputPrice) {
  log("预计价格为：" + inputPrice);
  let book = cabinCard.findOne(id(CABIN_BOOK));
  if (book) {
    book.click();
    clickNoUpgrade();
    throw orderMessage.finished;
  }

  let chooseBtn = cabinCard.findOne(id(CABIN_CHOOSE));
  if (chooseBtn) {
    chooseBtn.click();
    scrollCabinView();

    let cabinInfos = id(CABIN_INFO).find();
    let temp = cabinInfos.get(cabinInfos.size() - 1);
    let tempPrice = temp.findOne(id(CABIN_PRICE_IN_CHOOSE)).text();
    let info = cabinInfos.get(0);
    let price = info.findOne(id(CABIN_PRICE_IN_CHOOSE)).text();
    price = parseInt(price.replace(RMB, ""));
    log("找到价格：" + price + "，预计价格：" + inputPrice);
    clickBookButton(info);
    log("翻页");
    while (cabinInfos != null && cabinInfos.size() != 0) {
      scrollCabinView();

      cabinInfos = id(CABIN_INFO).find();
      temp = cabinInfos.get(cabinInfos.size() - 1);
      let curPrice = temp.findOne(id(CABIN_PRICE_IN_CHOOSE)).text();

      if (curPrice == tempPrice) {
        log("退出翻页: " + curPrice + "=" + tempPrice);
        break;
      }

      let info = cabinInfos.get(0);
      info.findOne(id(CABIN_BOOK_IN_CHOOSE)).click();
      clickNoUpgrade();
      throw orderMessage.finished;
    }

    let choose = cabinCard.findOne(id(CABIN_CHOOSE));
    APP.clickArea(choose);
  }
}

function clickNoUpgrade() {
  sleep(200);
  log("进入我不升*方法");
  let btn = APP.waitForContainsText("我不升", 100, 2000);
  if (btn) {
    log("找我不升*到按钮");
    btn.click();
    log("点击我不升");
  }
}

function clickRefurnAirlineList() {
  sleep(200);
  log("点击返回航班列表");
  let btn = APP.waitForContainsText("不支持在线购买", 100, 2000);
  if (btn) {
    log("找返回航班列表按钮");
    btn.click();
    log("点击返回航班列表");
    throw "不支持在线购买30分钟内截止办理登记手续的航班，请联系机场票务柜台。";
  }
}

function scrollCabinView() {
  let s = className(CABIN_SCROLL);
  s.scrollForward();
  sleep(700);
}

function scrollTop() {
  let s = className(CABIN_SCROLL);
  s.scrollBackward();
  sleep(700);
}
let orderMessage = {
  finished: "已经点击预定",
  notFoundCabinClass: "找不到舱等",
  sellOut: "航班售罄",
  foundNoFlight: "找不到航班",
  foundNoCabin: "找不到舱位",
  foundNoPrice: "价格不符合",
};

/**
 * 航班是否售罄
 * @param {any} flightCard 航班块
 * @returns 是否售罄
 */
function SellOut(flightCard) {
  let sellOut = flightCard.findOne(id(SELL_OUT));
  return sellOut && sellOut.text && sellOut.text();
}
