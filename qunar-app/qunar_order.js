var APP = null;
var ENV = null;

const SEARCH_BUTTOM = "atom_flight_tv_search_text";
const SCROLL_VIEW = "android.widget.ScrollView";
const swipeheight = 1260; //选取可滑动的高度
const barHeight = 70; //日期一格高度

module.exports = {
  setEnv: function (env) {
    ENV = env;
  },
  init: function (a) {
    APP = a;
  },
  /**
   * 下单
   * @param {object} input 下单参数
   */
  order: function (input) {
    //  点击机票按钮
    var flightBtn = APP.getById("atom_alexhome_youth_mod_flight");
    if (flightBtn) {
      flightBtn.click();
    }
    //  输入起飞到达
    inputDepartureAndArrive(input.departure, input.arrive);
    let departureD = new Date(input.departureDate);
    let year = departureD.getFullYear();
    let month = departureD.getMonth() + 1;
    let day = departureD.getDate();
    // 选择日期
    selectDate(year, month, day);
    APP.clickById(SEARCH_BUTTOM);
    closeDialog();
    sleep(10000);
    let error = APP.waitForContainsText("小骆驼", 50, 5000);
    if (error) {
      APP.clickByTextContains("确认");
      sleep(1000);
    }

    // 弹框通知
    const confirmBtn = APP.waitForContainsText("知道了", 200, 2000);
    if (confirmBtn) {
      confirmBtn.parent().click();
    }

    // 查找航班
    let fCard = findFlight(input.fullFlightNo);
    if (!fCard) {
      throw "找不到航班: " + input.fullFlightNo;
    }
    if (fCard == "已售完") {
      throw "已售完 ";
    }
    const hour = departureD.getHours();
    const min = departureD.getMinutes();
    let departureHour = hour < 10 ? "0" + hour : hour;
    let departureMin = min < 10 ? "0" + min : min;
    const departureTime = departureHour + ":" + departureMin;
    console.log("目标时间: " + departureTime);
    if (!checkDepartureTime(fCard, departureTime)) {
      throw (
        "找不到起飞时间为: " + departureTime + "的航班: " + input.fullFlightNo
      );
    }
    fCard.click();
    sleep(1000);
    // 航班临近起飞时间，购买前请先到值机柜台确认出票后仍有时间值机再预订
    let tip = APP.waitForContainsText("已确认有时间值机", 50, 1000);
    if (tip) {
      APP.clickArea(tip.parent());
    }
    // 选择经济舱
    clickCabinClass();
    findPrice(
      input.cabinPriceInfos,
      input.createOrderRuleInfo,
      input.productChannel,
      input.productCodes
    );
    addPassengers(input.passengers, input.contactInfo);
    return orderDetail(input);
  },
};

/**
 * 输入出发到达城市
 * @param {出发城市} departure
 * @param {到达城市} arrive
 */
function inputDepartureAndArrive(departure, arrive) {
  function input(text) {
    APP.getById("city_suggest_view").click();
    let dep = className("android.widget.EditText").findOne();
    dep.setText(text);
    sleep(1000);
    let texts = findTextContainsAtLeast(text, 2, 30000);
    if (texts) {
      let d = texts.get(1);
      sleep(500);
      console.log("before back");
      back();
      sleep(1000);
      console.log("after back");
      APP.clickArea(d);
      console.log("click 目标城市");
    }
    sleep(500);
  }

  APP.getById("atom_flight_tv_dep_city").click();
  input(departure);
  sleep(1000);

  APP.getById("atom_flight_tv_arr_city").click();
  input(arrive);
  sleep(1000);
}

/**
 *
 * @param {文本} elementText
 * @param {次数} count
 * @param {超时时间} t
 * @returns
 */
function findTextContainsAtLeast(elementText, count, t) {
  let item = null;
  let m = new Date().getTime() + t;
  while ((item == null || item.size() < count) && m >= new Date().getTime()) {
    item = textContains(elementText).find();
  }
  if (!item || item.size() < count) {
    throw "get element by text " + elementText;
  }

  return item;
}

/**
 * 选择出发日期
 * @param {年} year
 * @param {月} month
 * @param {日} day
 */
function selectDate(year, month, day) {
  const dateUiObject = APP.getById("atom_flight_tv_dep_date");
  APP.clickArea(dateUiObject);
  sleep(5000);

  let curMon = dateUiObject.text().split("月")[0];
  log("获取到的日期：" + dateUiObject.text());
  let monDiff = month - curMon;

  // 等待当前日期加载完毕
  let yearMonthTitle =
    "q_flight_calendarMonthHeaderTitle#" + year + "年" + curMon + "月";
  while (!yearMonthTitle) {
    yearMonthTitle =
      "q_flight_calendarMonthHeaderTitle#" + year + "年" + curMon + "月";
  }

  if (monDiff == 1) {
    APP.swipeToTop();
    sleep(800);
  } else if (monDiff > 2) {
    scroll.scrollForward();
    sleep(500);
  }

  // 等待日期加载完毕
  let dayDesc =
    "q_flight_calendarDayItem#" +
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day);
  while (!dayDesc) {
    dayDesc =
      "q_flight_calendarDayItem#" +
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day);
  }

  let a = APP.getByDesc(dayDesc, 100, 5000);
  if (!a) {
    console.log("未找到" + dayDesc);
    while (!scroll.scrollForward()) {
      console.log("等待");
      sleep(800);
      a = APP.getByDesc(dayDesc, 100, 5000);
      if (!a) {
        console.log("未找到" + dayDesc);
      } else {
        a.click();
        break;
      }
    }
  } else {
    a.click();
  }

  let search = null;
  do {
    search = APP.waitForId(SEARCH_BUTTOM, 2000, 2000);
    if (search) {
      break;
    }
    a.click();
    sleep(1000);
  } while (search == null);
}

/**
 * 关闭提示层
 */
function closeDialog() {
  let dialog = APP.waitForDesc("undefinedqdDialog#close", 100, 2000);
  if (dialog) {
    dialog.click();
  }
  let known1 = APP.waitForDescStartsWith(
    "SingleSearchPage|RedItemTipLayer_TipDetailLayer|Touchable_#TipDetailLayer_line",
    100,
    2000
  );
  if (known1) {
    log("点击“知道了”");
    known1.click();
  }
  let known2 = APP.waitForDescStartsWith(
    "SingleSearchPage|RedItemTipLayer_TipDetailLayer|Touchable",
    100,
    2000
  );
  if (known2) {
    log("点击“知道了”");
    known2.click();
  }

  let known3 = APP.waitForDesc(
    "OtaPage|InterceptTipLayer_InterceptAlertqdDialog|button#0",
    100,
    2000
  );
  if (known3) {
    log("点击“知道了”");
    known3.click();
  }
}

/**
 * 查找目标航班
 * @param {航班号} fullFlightNo
 * @returns
 */
function findFlight(fullFlightNo) {
  let error = APP.waitForContainsText("小骆驼", 100, 5000);
  if (error) {
    APP.clickByTextContains("确认");
    sleep(1000);
  }

  let flightsContainer = APP.getByDesc(
    "flight_module_search|QunarFlightList|ScrollView"
  );
  let pre = flightsContainer.boundsInParent().bottom;
  let current = 0;

  let f = findFlightInCurrentPage(fullFlightNo);
  if (f) {
    console.log("找到" + fullFlightNo);
    return f;
  }

  function nextPage(flightsContainer) {
    APP.scrollForward(flightsContainer);
    flightsContainer = APP.getByDesc(
      "flight_module_search|QunarFlightList|ScrollView"
    );
    let c = flightsContainer.boundsInParent().bottom;
    return c;
  }

  function findFlightInCurrentPage(fullFlightNo) {
    //  中转的不要, 所以使用 waitForDesc
    let f = APP.waitForDesc(
      "flight_module_search|QunarFlightList|Flights_" + fullFlightNo,
      100,
      5000
    );
    console.log(f);
    if (f && f.findOne(textContains("已售完"))) {
      return "已售完";
    }
    return f;
  }

  while (pre != current) {
    pre = current;
    current = nextPage(flightsContainer);
    f = findFlightInCurrentPage(fullFlightNo);
    if (f) {
      console.log("找到" + fullFlightNo);
      break;
    }
  }
  console.log("pre: " + pre + " - " + "current: " + current);
  return f;
}

/**
 * 核对找到的航班号的块是不是该时间
 * @param {Object} fCard 找到航班号的块
 * @param {string} departureTime 起飞时间, 格式 HH:mm
 */
function checkDepartureTime(fCard, departureTime) {
  //  判断起飞时间
  //  一个航班在一天内的一个起飞到达只会有一班,
  //  所以核对了起飞到达和航班号, 这个航班号就是这一天里唯一的一班
  //  再核对起飞时间就可以知道是不是要的航班
  let time = fCard.findOne(desc("flight_module_search|List|dep_time"));
  if (!time) {
    time = fCard.findOne(className("android.widget.TextView").depth(20));
  }
  if (!time) {
    time = fCard.findOne(textContains(departureTime));
    if (time) {
      return true;
    } else {
      return false;
    }
  }
  console.log("time: " + time.text());
  return time.text() == departureTime;
}

/**
 * 点击经济舱
 */
function clickCabinClass() {
  let cabinClasses = descContains(
    "f_major_bundle_rn|QunarVendorList|InnerVendor|TabType#"
  ).find();
  for (let i = 0; i < cabinClasses.length; i++) {
    let c = cabinClasses.get(i);
    let child = c.children();
    let ct = child.get(0).text();
    if (ct === "经济舱") {
      APP.clickArea(c);
      break;
    }
  }
}

// 找预订之前，先滑动一定距离
function scroll300() {
  swipe(
    ENV.screenWidth / 2,
    1260,
    ENV.screenWidth / 2,
    ENV.screenHeight / 2,
    500
  );
  sleep(800);
}

/**
 * 文字转换
 * @param {string} key // 文本
 * @returns
 */
function textConversion(key) {
  // 商务优选 转换为 商旅优选·极速出票
  // 旅行套餐 转换为 当日低价·含旅行券
  let text = "";
  switch (key) {
    case "商务优选":
      text = "商旅优选·极速出票";
      break;
    case "旅行套餐":
      text = "当日低价·含旅行券";
      break;
  }
  return text;
}

/**
 * 多种价格时，先选择符合的价格
 * @param {number} ticketPriceUpper
 * @param {number} ticketPriceLower
 * @param {string} productCodes 产品类型：商务优选、旅行套餐
 */
function clickOtherPrice(ticketPriceUpper, ticketPriceLower, productCodes) {
  // 关闭提示窗
  closeDialog();

  // 加载失败了，点击重试
  let loadingError = APP.waitForContainsText("加载失败了", 100, 3000);
  if (loadingError) {
    APP.clickByTextContains("重试");
  }

  scroll300();

  function nextPage(scrollView) {
    APP.scrollForward(scrollView);
    scrollView = APP.getByDesc("f_major_bundle_rn|QunarVendorList|ScrollView");
    let c = scrollView.boundsInParent().bottom;
    return c;
  }

  let scrollView = APP.waitForDesc(
    "f_major_bundle_rn|QunarVendorList|ScrollView"
  );
  while (!scrollView) {
    scrollView = APP.waitForDesc(
      "f_major_bundle_rn|QunarVendorList|ScrollView"
    );
  }
  let pre = 0;
  let current = scrollView.boundsInParent().bottom;

  log("后端给的产品类型文字：" + productCodes);

  while (pre != current) {
    try {
      // 获取所有价格模块
      let priceItems = descStartsWith("f_major_bundle_rn|Ota|VenderItem")
        .find()
        .toArray();
      log("获取到的所有价格模块：" + priceItems.length);
      priceItems.forEach((e) => {
        // 排除预订的价格数据
        let bookBtn = e.findOne(textContains("预订"));
        if (bookBtn) {
          return;
        }

        // 获取到的票面价，有些版本不存在f_major_bundle_rn|QunarVendorList|Vendors|Price
        let ticketPriceDesc = e.findOne(
          desc("f_major_bundle_rn|QunarVendorList|Vendors|Price")
        );
        let ticketPrice = 0;
        if (ticketPriceDesc) {
          ticketPrice = parseFloat(ticketPriceDesc.text());
        } else {
          let ticketPricePanel = e.findOne(
            desc("f_major_bundle_rn|QunarVendorList|Vendors")
          );
          ticketPriceDesc = ticketPricePanel.child(0).child(0).child(1);
          ticketPrice = parseFloat(ticketPriceDesc.text());
        }
        log("获取到的票面价" + ticketPrice);

        // 获取存在两种价格的模块
        let priceTabs1 = e
          .find(
            descStartsWith(
              "OtaPage|VendorList_VendorItem_InnerVendorRevisionTopTabTag|Touchable"
            )
          )
          .toArray();
        log("存在两种价格：" + priceTabs1.length);
        let priceTabs2 = e
          .find(
            descStartsWith("f_major_bundle_rn|QunarVendorList|InnerVendor|Item")
          )
          .toArray();
        log("存在两种价格：" + priceTabs2.length);

        // 筛选商务优选|旅行套餐
        if (priceTabs1.length == 2 || priceTabs2.length == 2) {
          // 如果不包含商务优选、旅行套餐或者去哪儿官方，需要排除
          let tab1 = e.findOne(textContains("商旅优选"));
          let tab11 = e.findOne(textContains("极速出票"));
          let tab2 = e.findOne(textContains("当日低价"));
          let tab22 = e.findOne(textContains("含旅行"));
          let tab3 = e.findOne(textContains("去哪儿官方"));
          log("是否存在“商旅优选”" + tab1);
          log("是否存在“极速出票”" + tab11);
          log("是否存在“当日低价”" + tab2);
          log("是否存在“含旅行”" + tab22);
          log("是否存在“去哪儿官方”" + tab3);
          // 都不存在商旅优选、极速出票、当日低价、去哪儿官方，则这两价格都需要排除
          if (tab1 == null && tab11 && tab2 == null && tab22 && tab3 == null) {
            log(
              "都不存在商旅优选、极速出票、当日低价、去哪儿官方，则这两价格排除"
            );
            return;
          }
          if (productCodes && productCodes != null && productCodes != "") {
            if (
              productCodes.indexOf("商务优选") > -1 ||
              productCodes.indexOf("旅行套餐") > -1
            ) {
              if (tab3) {
                log("存在去哪儿官方的价格");
                log(priceTabs1[0].child(0).findOne(textContains("特惠")));
                if (
                  priceTabs1[0].child(0).findOne(textContains("特惠")) ||
                  priceTabs1[0].child(0).findOne(textContains("专享"))
                ) {
                  APP.clickArea(priceTabs1[1]);
                }
              } else {
                if (
                  ticketPrice >= ticketPriceLower &&
                  ticketPrice <= ticketPriceUpper
                ) {
                  throw "第一个价格符合";
                } else {
                  // 选择其他价格
                  if (priceTabs1.length == 2) {
                    APP.clickArea(priceTabs1[1]);
                  } else {
                    APP.clickArea(priceTabs2[1]);
                  }
                }
              }
            }
          } else {
            // 如果没有商务优选|旅行套餐，则根据价格匹配点击
            if (
              ticketPrice >= ticketPriceLower &&
              ticketPrice <= ticketPriceUpper
            ) {
              throw "第一个价格符合";
            } else {
              // 选择其他价格
              if (priceTabs1.length == 2) {
                APP.clickArea(priceTabs1[1]);
              } else {
                APP.clickArea(priceTabs2[1]);
              }
            }
          }
        }
      });
    } catch (error) {
      if (error == "第一个价格符合") {
      }
    } finally {
      pre = current;
      current = nextPage(scrollView);
    }
  }

  // 回到顶部
  if (pre == current) {
    while (scrollView.scrollBackward()) {
      scrollView.scrollBackward();
    }
    sleep(800);
    pre = 0;
    scroll300();
  }
}

let allPrice = []; // 获取所有产品类型和价格
/**
 * 获取所有产品类型和价格，不同航司不同舱位对行李重量不同
 * @param {array} cabinPriceInfos 价格信息
 * @param {string} productChannel 产品渠道：去哪儿旗舰店、航司旗舰店
 * @param {string} productCodes 产品类型：商务优选、旅行套餐
 * @returns
 */
function GetAllPrice(adultCabinPriceInfo, productChannel, productCodes) {
  function nextPage(scrollView) {
    APP.scrollForward(scrollView);
    scrollView = APP.getByDesc("f_major_bundle_rn|QunarVendorList|ScrollView");
    let c = scrollView.boundsInParent().bottom;
    return c;
  }

  log(
    "航司:" +
      adultCabinPriceInfo.fullFlightNo.substring(0, 2) +
      "，舱位：" +
      adultCabinPriceInfo.cabin
  );

  let scrollView = APP.waitForDesc(
    "f_major_bundle_rn|QunarVendorList|ScrollView"
  );
  while (!scrollView) {
    scrollView = APP.waitForDesc(
      "f_major_bundle_rn|QunarVendorList|ScrollView"
    );
  }
  let pre = 0;
  let current = scrollView.boundsInParent().bottom;

  // 查找所有选购的内容
  let tempPrice = [];

  log("产品渠道名称：" + productChannel);

  while (pre != current) {
    try {
      // 获取所有价格模块
      let priceItems = descStartsWith("f_major_bundle_rn|Ota|VenderItem")
        .find()
        .toArray();
      log("获取到的所有价格模块：" + priceItems.length);
      priceItems.forEach((e) => {
        // 排除预订的价格数据
        let bookBtn = e.findOne(textContains("预订"));
        if (bookBtn) {
          return;
        }

        let productCode = null;
        // 获取存在两种价格的模块
        let priceTabs1 = e
          .find(
            descStartsWith(
              "OtaPage|VendorList_VendorItem_InnerVendorRevisionTopTabTag|Touchable"
            )
          )
          .toArray();
        let priceTabs2 = e
          .find(
            descStartsWith("f_major_bundle_rn|QunarVendorList|InnerVendor|Item")
          )
          .toArray();
        if (priceTabs1.length == 2 || priceTabs2.length == 2) {
          // 如果不包含商务优选或者旅行套餐，需要排除
          if (
            e.findOne(textContains("商旅优选")) ||
            e.findOne(textContains("极速出票")) ||
            e.findOne(textContains("当日低价")) ||
            e.findOne(textContains("含旅行")) ||
            e.findOne(textContains("去哪儿官方"))
          ) {
            productCode = "产品类型";
          } else {
            return;
          }
        }

        // 筛选商务优选|旅行套餐，有两种价格的情况
        if (productCodes && productCodes != null && productCodes != "") {
          // 如果没有要求下长者特惠、青年特惠、多人特惠，也需要排除
          // 长者特惠（长者特惠+长者专享+长者尊享）、青年特惠（青年特惠）、多人特惠（多人特惠）需要支持下单
          if (
            productCodes.indexOf("长者特惠") == -1 ||
            productCodes.indexOf("青年特惠") == -1 ||
            productCodes.indexOf("多人特惠") == -1
          ) {
            if (
              e.findOne(textContains("长者特惠")) ||
              e.findOne(textContains("长者专享")) ||
              e.findOne(textContains("长者尊享")) ||
              e.findOne(textContains("青年特惠")) ||
              e.findOne(textContains("多人特惠"))
            ) {
              log("排除长者特惠、青年特惠、多人特惠");
              return;
            }
          }
        }

        // 排除银行卡支付专享、新会员专享、新客专享、新户专享、学生特惠、学生专享
        if (
          e.findOne(textContains("银行卡支付专享")) ||
          e.findOne(textContains("新会员专享")) ||
          e.findOne(textContains("新客专享")) ||
          e.findOne(textContains("新户专享")) ||
          e.findOne(textContains("学生特惠")) ||
          e.findOne(textContains("学生专享")) ||
          e.findOne(textContains("至少包含1位17-25周岁")) ||
          e.findOne(textContains("限")) ||
          e.findOne(textContains("拿去花服务专享"))
        ) {
          log(
            "排除“银行卡支付专享、新会员专享、新客专享、新户专享、学生特惠、学生专享、青年特惠、包含限、拿去花服务专享”"
          );
          return;
        }

        // 排除学生专享
        let studentUiObject = e.findOne(
          desc("f_major_bundle_rn|QunarVendorList|Vendors|Name_学生专享")
        );
        if (studentUiObject) {
          if (ENV.debugMode) {
            log("排除学生专享");
          }
          return;
        }

        // 按航司舱位下行李额
        let packageWeightText = "";
        if (
          adultCabinPriceInfo.fullFlightNo.substring(0, 2) == "PN" &&
          (adultCabinPriceInfo.cabin == "Y" ||
            adultCabinPriceInfo.cabin == "B" ||
            adultCabinPriceInfo.cabin == "H" ||
            adultCabinPriceInfo.cabin == "K" ||
            adultCabinPriceInfo.cabin == "L" ||
            adultCabinPriceInfo.cabin == "M" ||
            adultCabinPriceInfo.cabin == "X")
        ) {
          let packageWeightUiObject = e.findOne(textContains("托运行李10KG"));
          log("是否找到托运行李信息");
          log(packageWeightUiObject);
          if (packageWeightUiObject != null) {
            packageWeightText = packageWeightUiObject.text().substring(0, 8);
            log(packageWeightText);
          } else {
            return;
          }
        } else if (adultCabinPriceInfo.fullFlightNo.substring(0, 2) == "9H") {
          // 9H航司的行李额   Y舱 30KG  Q舱 25KG  B/H/M/K/L/M/X舱 10KG
          if (adultCabinPriceInfo.cabin == "Y") {
            let packageWeightUiObject = e.findOne(textContains("托运行李30KG"));
            log("是否找到托运行李信息");
            log(packageWeightUiObject);
            if (packageWeightUiObject) {
              packageWeightText = packageWeightUiObject.text().substring(0, 8);
              log(packageWeightText);
            } else {
              return;
            }
          } else if (adultCabinPriceInfo.cabin == "Q") {
            let packageWeightUiObject = e.findOne(textContains("托运行李25KG"));
            log("是否找到托运行李信息");
            log(packageWeightUiObject);
            if (packageWeightUiObject) {
              packageWeightText = packageWeightUiObject.text().substring(0, 8);
              log(packageWeightText);
            } else {
              return;
            }
          } else if (
            adultCabinPriceInfo.cabin == "B" ||
            adultCabinPriceInfo.cabin == "H" ||
            adultCabinPriceInfo.cabin == "M" ||
            adultCabinPriceInfo.cabin == "K" ||
            adultCabinPriceInfo.cabin == "L" ||
            adultCabinPriceInfo.cabin == "M" ||
            adultCabinPriceInfo.cabin == "X"
          ) {
            let packageWeightUiObject = e.findOne(textContains("托运行李10KG"));
            log("是否找到托运行李信息");
            log(packageWeightUiObject);
            if (packageWeightUiObject) {
              packageWeightText = packageWeightUiObject.text().substring(0, 8);
              log(packageWeightText);
            } else {
              throw "未找到行李额";
            }
          }
        }

        let productChannelName = ""; // 渠道名称
        if (productChannel && productChannel != null && productChannel != "") {
          // 去哪旗舰店
          // 渠道名称包含去哪旗舰店的，需要找到文字信息：预计5分钟出票+极速退款+24小时客服
          if (productChannel.indexOf("去哪旗舰店") > -1) {
            if (
              e.findOne(textContains("预计5分钟出票")) &&
              e.findOne(textContains("极速退款")) &&
              e.findOne(textContains("24小时客服"))
            ) {
              productChannelName = "去哪旗舰店";
              log(productChannelName);
            }
          }
          // 航司旗舰店
          if (productChannel.indexOf("航司旗舰店") > -1) {
            if (e.findOne(textContains("极速出票"))) {
              productChannelName = "航司旗舰店";
              log(productChannelName);
            }
          }
        }

        // 获取到的票面价
        let ticketPriceDesc = e.findOne(
          desc("f_major_bundle_rn|QunarVendorList|Vendors|Price")
        );
        let ticketPrice = 0;
        if (ticketPriceDesc) {
          ticketPrice = parseFloat(ticketPriceDesc.text());
        } else {
          let ticketPricePanel = e.findOne(
            desc("f_major_bundle_rn|QunarVendorList|Vendors")
          );
          ticketPriceDesc = ticketPricePanel.child(0).child(0).child(1);
          ticketPrice = parseFloat(ticketPriceDesc.text());
        }
        log("获取到的票面价" + ticketPrice);

        // 记录结果集
        let tempPriceLength0 = tempPrice.filter(
          (p) => p.ticketPrice == ticketPrice
        ).length;
        if (tempPriceLength0 == 0) {
          tempPrice.push({
            packageWeightText: packageWeightText, // 托运行李重量
            productChannel: productChannelName, // 旗舰店名称
            productCode: productCode,
            ticketPrice: ticketPrice, // APP价格
            settlementPrice: ticketPrice, // app结算价 = app票面价 - 立减，
            sellPrice: parseFloat(
              ticketPrice - adultCabinPriceInfo.settlementPrice
            ).toFixed(1), // 销售价=app票面价-ota结算价
          });
        }
        let allPriceNotExist = allPrice.filter(
          (p) => p.ticketPrice == ticketPrice
        ).length;
        if (allPriceNotExist == 0) {
          allPrice.push({
            packageWeightText: packageWeightText, // 托运行李重量
            productChannel: productChannelName, // 旗舰店名称
            ticketPrice: ticketPrice, // APP价格
          });
        }
      });
    } catch (error) {
      throw error;
    } finally {
      pre = current;
      current = nextPage(scrollView);
    }
  }
  // 排序
  allPrice.sort((a, b) => a.ticketPrice - b.ticketPrice);
  tempPrice.sort((a, b) => a.ticketPrice - b.ticketPrice);

  if (ENV.debugMode) {
    log("所有价格排序： %s", JSON.stringify(allPrice));
    log("排序后的价格： %s", JSON.stringify(tempPrice));
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
  return tempPrice;
}

/**
 * 点击选购预定
 * @param {array} cabinPriceInfos 价格信息
 * @param {Object} createOrderRuleInfo  验价规则
 * @param {string} productChannel  产品渠道   航司旗舰店、去哪旗舰店
 * @param {string} productCodes 产品类型 商务优选、旅行套餐
 */
function findPrice(
  cabinPriceInfos,
  createOrderRuleInfo,
  productChannel,
  productCodes
) {
  // 关闭提示窗
  closeDialog();

  let adultCabinPriceInfo = cabinPriceInfos.filter((c) => c.type == 0)[0]; // 比较成人的价格

  // 票面价上限和下限
  let ticketPriceUpper = 0;
  let ticketPriceLower = 0;
  if (createOrderRuleInfo.ticketPriceFloatRange != null) {
    ticketPriceUpper =
      createOrderRuleInfo.ticketPriceFloatRange.upperLimit +
      adultCabinPriceInfo.ticketPrice;
    ticketPriceLower =
      createOrderRuleInfo.ticketPriceFloatRange.lowerLimit +
      adultCabinPriceInfo.ticketPrice;
    log("票面价上限%s，票面价下限%s", ticketPriceUpper, ticketPriceLower);
  }

  // 查找需要点击其他价格的，并点击
  clickOtherPrice(ticketPriceUpper, ticketPriceLower, productCodes);

  // 获取所有价格
  let tempPrices = GetAllPrice(
    adultCabinPriceInfo,
    productChannel,
    productCodes
  );

  // 将符合票面价上限和下限的另外单独保存
  let eligiblePrices = [];
  for (let index = 0; index < tempPrices.length; index++) {
    let element = tempPrices[index];
    // 只会比较单个成人票面价
    if (
      element.productCode &&
      element.productCode != "产品类型" &&
      element.ticketPrice >= ticketPriceLower &&
      element.ticketPrice <= ticketPriceUpper
    ) {
      eligiblePrices.push({
        packageWeightText: element.packageWeightText,
        productChannel: element.productChannel,
        productCode: element.productCode,
        ticketPrice: element.ticketPrice,
        settlementPrice: element.settlementPrice,
        sellPrice: element.sellPrice,
      });
    } else {
      eligiblePrices.push({
        packageWeightText: element.packageWeightText,
        productChannel: element.productChannel,
        productCode: element.productCode,
        ticketPrice: element.ticketPrice,
        settlementPrice: element.settlementPrice,
        sellPrice: element.sellPrice,
      });
    }
  }
  log("剩余符合的价格：" + JSON.stringify(eligiblePrices));

  if (eligiblePrices.length == 0) {
    throw (
      "价格不符，实际查到的价格：" + JSON.stringify(allPriceResult(allPrice))
    );
  } else {
    adultPriceCompare(
      eligiblePrices[0],
      adultCabinPriceInfo,
      createOrderRuleInfo
    );
  }

  clickXG(productCodes, eligiblePrices, adultCabinPriceInfo, productChannel);
}

// 重构一下所有价格的结果，目的是让出票员看的懂和简洁
function allPriceResult(allPrice) {
  let result = [];
  allPrice.forEach((element) => {
    result.push(
      element.ticketPrice +
        "-" +
        element.packageWeightText +
        "-" +
        element.productChannel
    );
  });
  return result;
}

/**
 * 成人价格比较
 * @param {object} curPrice // 比较票面价符合的数据
 * @param {object} createOrderRuleInfo
 */
function adultPriceCompare(curPrice, adultCabinPriceInfo, createOrderRuleInfo) {
  log("成人价格信息：" + JSON.stringify(adultCabinPriceInfo));
  // 如果是有产品类型的则不需要比价票面价
  if (curPrice.productCode && curPrice.productCode != "产品类型") {
    // 票面价比较
    if (createOrderRuleInfo.ticketPriceFloatRange != null) {
      let ticketPriceUpper =
        createOrderRuleInfo.ticketPriceFloatRange.upperLimit +
        adultCabinPriceInfo.ticketPrice;
      let ticketPriceLower =
        createOrderRuleInfo.ticketPriceFloatRange.lowerLimit +
        adultCabinPriceInfo.ticketPrice;
      log("票面价上限%s，票面价下限%s", ticketPriceUpper, ticketPriceLower);
      log("航司票面价%s", curPrice.ticketPrice);
      log("产品类型：" + curPrice.productCode);
      if (
        curPrice.ticketPrice >= ticketPriceLower &&
        curPrice.ticketPrice <= ticketPriceUpper
      ) {
      } else {
        let ticketPriceValue = Math.abs(
          parseFloat(
            curPrice.ticketPrice - adultCabinPriceInfo.ticketPrice
          ).toFixed(1)
        );
        // 票面价低于票面价浮动幅度范围下限，则报错：票面价比ota票面价低"航司票面价-ota票面价的绝对值"，过低，请检查降舱降价规则。
        if (curPrice.ticketPrice < ticketPriceLower) {
          throw (
            "票面价比ota票面价低" +
            ticketPriceValue +
            "，过低，请检查降舱降价规则。实际查询到的票面" +
            curPrice.ticketPrice
          );
        }
        // 票面价高于票面价浮动幅度范围上限，则报错：票面价比ota票面价高"航司票面价-ota票面价的绝对值"，过高，请检查降舱降价规则。
        if (curPrice.ticketPrice > ticketPriceUpper) {
          throw (
            "票面价比ota票面价高" +
            ticketPriceValue +
            "，过高，请检查降舱降价规则。实际查询到的票面" +
            curPrice.ticketPrice
          );
        }
      }
    }
  }

  // 比较成人结算价
  if (createOrderRuleInfo.settlementPriceFloatRange != null) {
    let settlementPriceUpper =
      createOrderRuleInfo.settlementPriceFloatRange.upperLimit +
      adultCabinPriceInfo.settlementPrice;
    let settlementPriceLower =
      createOrderRuleInfo.settlementPriceFloatRange.lowerLimit +
      adultCabinPriceInfo.settlementPrice;
    if (ENV.debugMode) {
      log(
        "结算价上限%s，结算价下限%s",
        settlementPriceUpper,
        settlementPriceLower
      );
      log("航司结算价%s", curPrice.settlementPrice);
    }
    // 符合结算价<=下限 结算价>=上限
    if (
      curPrice.settlementPrice >= settlementPriceLower &&
      curPrice.settlementPrice <= settlementPriceUpper
    ) {
    } else {
      let settlementPriceValue = Math.abs(
        parseFloat(
          curPrice.settlementPrice - adultCabinPriceInfo.settlementPrice
        ).toFixed(1)
      );
      // 结算价低于结算价浮动幅度范围下限，则报错：结算金额赚"航司结算价-ota结算价的绝对值"，过高，请检查出票规则。
      if (curPrice.settlementPrice < settlementPriceLower) {
        throw (
          "结算金额赚" +
          settlementPriceValue +
          "，过低，请检查出票规则。实际查询到的产品类型、票面和舱位" +
          curPrice.settlementPrice
        );
      }
      // 结算价高于结算价浮动幅度范围上限，则报错：结算金额亏"航司结算价-ota结算价的绝对值"过高，请检查出票规则。
      if (curPrice.settlementPrice > settlementPriceUpper) {
        throw (
          "结算金额亏" +
          settlementPriceValue +
          "，过高，请检查出票规则。实际查询到的产品类型、票面和舱位" +
          curPrice.settlementPrice
        );
      }
    }
  }

  // 比较成人销售价：销售价=APP票面价-OTA结算价
  if (createOrderRuleInfo.sellPriceFloatRange != null) {
    let sellPriceUpper = createOrderRuleInfo.sellPriceFloatRange.upperLimit;
    let sellPriceLower = createOrderRuleInfo.sellPriceFloatRange.lowerLimit;
    if (ENV.debugMode) {
      log("销售价上限%s，销售价下限%s", sellPriceUpper, sellPriceLower);
      log("销售价%s", curPrice.sellPrice);
    }
    // 符合结算价<=下限 结算价>=上限
    if (
      curPrice.sellPrice >= sellPriceLower &&
      curPrice.sellPrice <= sellPriceUpper
    ) {
    } else {
      let sellPriceValue = Math.abs(
        parseFloat(
          curPrice.ticketPrice - adultCabinPriceInfo.settlementPrice
        ).toFixed(1)
      );
      log("销售价" + sellPriceValue);
      // 票面价低于销售价浮动范围下限，则报错：票面价比ota优惠价低"航司票面价-ota结算价的绝对值"，过低，请检查降舱降价规则。
      if (curPrice.sellPrice < sellPriceLower) {
        throw (
          "结算金额赚" +
          sellPriceValue +
          "，过低，请检查降舱降价规则。实际查询到的票面" +
          curPrice.ticketPrice
        );
      }
      // 票面价高于销售价浮动范围上限，则报错：票面价比ota优惠价高"航司票面价-ota优惠价的绝对值"，过高，请检查降舱降价规则。
      if (curPrice.sellPrice > sellPriceUpper) {
        throw (
          "结算金额亏" +
          sellPriceValue +
          "，过高，请检查降舱降价规则。实际查询到的票面" +
          curPrice.ticketPrice
        );
      }
    }
  }
}

function clickXG(
  productCodes,
  eligiblePrices,
  adultCabinPriceInfo,
  productChannel
) {
  function nextPage(scrollView) {
    APP.scrollForward(scrollView);
    scrollView = APP.getByDesc("f_major_bundle_rn|QunarVendorList|ScrollView");
    let c = scrollView.boundsInParent().bottom;
    return c;
  }

  let xg = null;
  let scrollView2 = APP.waitForDesc(
    "f_major_bundle_rn|QunarVendorList|ScrollView",
    100,
    3000
  );
  while (!scrollView2) {
    scrollView2 = APP.waitForDesc(
      "f_major_bundle_rn|QunarVendorList|ScrollView",
      100,
      1000
    );
  }
  let pre = 0;
  let current = scrollView2.boundsInParent().bottom;
  while (pre != current) {
    try {
      // 获取所有价格模块
      let priceItems = descStartsWith("f_major_bundle_rn|Ota|VenderItem")
        .find()
        .toArray();
      log("获取到的所有价格模块：" + priceItems.length);
      priceItems.forEach((e) => {
        // 排除预订的价格数据
        let bookBtn = e.findOne(textContains("预订"));
        if (bookBtn) {
          return;
        }

        // 筛选商务优选|旅行套餐，有两种价格的情况
        if (productCodes && productCodes != null && productCodes != "") {
          if (
            productCodes.indexOf("商务优选") > -1 ||
            productCodes.indexOf("旅行套餐") > -1
          ) {
            // 获取存在两种价格的模块
            let priceTabs1 = e
              .find(
                descStartsWith(
                  "OtaPage|VendorList_VendorItem_InnerVendorRevisionTopTabTag|Touchable"
                )
              )
              .toArray();
            let priceTabs2 = e
              .find(
                descStartsWith(
                  "f_major_bundle_rn|QunarVendorList|InnerVendor|Item"
                )
              )
              .toArray();
            if (priceTabs1.length == 2 || priceTabs2.length == 2) {
              // 如果不包含商务优选或者旅行套餐，需要排除
              if (
                e.findOne(textContains("商旅优选")) ||
                e.findOne(textContains("含旅行"))
              ) {
              } else {
                return;
              }
            }
          }
          // 如果没有要求下长者特惠、青年特惠、多人特惠，也需要排除
          // 长者特惠（长者特惠+长者专享+长者尊享）、青年特惠（青年特惠）、多人特惠（多人特惠）需要支持下单
          if (
            productCodes.indexOf("长者特惠") == -1 ||
            productCodes.indexOf("青年特惠") == -1 ||
            productCodes.indexOf("多人特惠") == -1
          ) {
            if (
              e.findOne(textContains("长者特惠")) ||
              e.findOne(textContains("长者专享")) ||
              e.findOne(textContains("长者尊享")) ||
              e.findOne(textContains("青年特惠")) ||
              e.findOne(textContains("多人特惠"))
            ) {
              log("排除长者特惠、青年特惠、多人特惠");
              return;
            }
          }
        }

        // 排除银行卡支付专享、新会员专享、新客专享、新户专享、学生特惠、学生专享
        if (
          e.findOne(textContains("银行卡支付专享")) ||
          e.findOne(textContains("新会员专享")) ||
          e.findOne(textContains("新客专享")) ||
          e.findOne(textContains("新户专享")) ||
          e.findOne(textContains("学生特惠")) ||
          e.findOne(textContains("学生专享")) ||
          e.findOne(textContains("至少包含1位17-25周岁")) ||
          e.findOne(textContains("限")) ||
          e.findOne(textContains("拿去花服务专享"))
        ) {
          log(
            "排除“银行卡支付专享、新会员专享、新客专享、新户专享、学生特惠、学生专享、青年特惠、包含限、拿去花服务专享”"
          );
          return;
        }
        // 排除学生专享
        let studentUiObject = e.findOne(
          desc("f_major_bundle_rn|QunarVendorList|Vendors|Name_学生专享")
        );
        if (studentUiObject) {
          if (ENV.debugMode) {
            log("排除学生专享");
            log(studentUiObject);
            return;
          }
        }
        // 按航司舱位下行李额
        let packageWeightText = "";
        if (
          adultCabinPriceInfo.fullFlightNo.substring(0, 2) == "PN" &&
          (adultCabinPriceInfo.cabin == "Y" ||
            adultCabinPriceInfo.cabin == "B" ||
            adultCabinPriceInfo.cabin == "H" ||
            adultCabinPriceInfo.cabin == "K" ||
            adultCabinPriceInfo.cabin == "L" ||
            adultCabinPriceInfo.cabin == "M" ||
            adultCabinPriceInfo.cabin == "X")
        ) {
          let packageWeightUiObject = e.findOne(textContains("托运行李10KG"));
          log("是否找到托运行李信息");
          log(packageWeightUiObject);
          if (packageWeightUiObject != null) {
            packageWeightText = packageWeightUiObject.text().substring(0, 8);
            log(packageWeightText);
          } else {
            return;
          }
        } else if (adultCabinPriceInfo.fullFlightNo.substring(0, 2) == "9H") {
          // 9H航司的行李额   Y舱 30KG  Q舱 25KG  B/H/M/K/L/M/X舱 10KG
          if (adultCabinPriceInfo.cabin == "Y") {
            let packageWeightUiObject = e.findOne(textContains("托运行李30KG"));
            log("是否找到托运行李信息");
            log(packageWeightUiObject);
            if (packageWeightUiObject) {
              packageWeightText = packageWeightUiObject.text().substring(0, 8);
              log(packageWeightText);
            } else {
              return;
            }
          } else if (adultCabinPriceInfo.cabin == "Q") {
            let packageWeightUiObject = e.findOne(textContains("托运行李25KG"));
            log("是否找到托运行李信息");
            log(packageWeightUiObject);
            if (packageWeightUiObject) {
              packageWeightText = packageWeightUiObject.text().substring(0, 8);
              log(packageWeightText);
            } else {
              return;
            }
          } else if (
            adultCabinPriceInfo.cabin == "B" ||
            adultCabinPriceInfo.cabin == "H" ||
            adultCabinPriceInfo.cabin == "M" ||
            adultCabinPriceInfo.cabin == "K" ||
            adultCabinPriceInfo.cabin == "L" ||
            adultCabinPriceInfo.cabin == "M" ||
            adultCabinPriceInfo.cabin == "X"
          ) {
            let packageWeightUiObject = e.findOne(textContains("托运行李10KG"));
            log("是否找到托运行李信息");
            log(packageWeightUiObject);
            if (packageWeightUiObject) {
              packageWeightText = packageWeightUiObject.text().substring(0, 8);
              log(packageWeightText);
            } else {
              throw "未找到行李额";
            }
          }
        }

        // 去哪旗舰店
        let productChannelName = ""; // 渠道名称
        if (productChannel && productChannel != null && productChannel != "") {
          // 渠道名称包含去哪儿旗舰店的，需要找到文字信息：预计5分钟出票+极速退款+24小时客服
          if (productChannel.indexOf("去哪旗舰店") > -1) {
            if (
              e.findOne(textContains("预计5分钟出票")) &&
              e.findOne(textContains("极速退款")) &&
              e.findOne(textContains("24小时客服"))
            ) {
              productChannelName = "去哪旗舰店";
            }
          }
          // 航司旗舰店
          if (productChannel.indexOf("航司旗舰店") > -1) {
            if (e.findOne(textContains("极速出票"))) {
              productChannelName = "航司旗舰店";
              log(productChannelName);
            }
          }
        }

        // 获取到的票面价
        let ticketPriceDesc = e.findOne(
          desc("f_major_bundle_rn|QunarVendorList|Vendors|Price")
        );
        let ticketPrice = 0;
        if (ticketPriceDesc) {
          ticketPrice = parseFloat(ticketPriceDesc.text());
        } else {
          let ticketPricePanel = e.findOne(
            desc("f_major_bundle_rn|QunarVendorList|Vendors")
          );
          ticketPriceDesc = ticketPricePanel.child(0).child(0).child(1);
          ticketPrice = parseFloat(ticketPriceDesc.text());
        }
        log("获取到的票面价" + ticketPrice);

        log(
          "判断价格、渠道名称、产品类型是否符合" +
            (ticketPrice == eligiblePrices[0].ticketPrice &&
              eligiblePrices[0].packageWeightText == packageWeightText &&
              eligiblePrices[0].productChannel == productChannelName)
        );
        if (
          ticketPrice == eligiblePrices[0].ticketPrice &&
          eligiblePrices[0].packageWeightText == packageWeightText &&
          eligiblePrices[0].productChannel == productChannelName
        ) {
          let xgBtn = e.findOne(textContains("选购"));
          log("坐标" + xgBtn.bounds().bottom);
          if (
            adultCabinPriceInfo.fullFlightNo.substring(0, 2) == "PN" &&
            (adultCabinPriceInfo.cabin == "Y" ||
              adultCabinPriceInfo.cabin == "B" ||
              adultCabinPriceInfo.cabin == "H" ||
              adultCabinPriceInfo.cabin == "K" ||
              adultCabinPriceInfo.cabin == "L" ||
              adultCabinPriceInfo.cabin == "M" ||
              adultCabinPriceInfo.cabin == "X")
          ) {
            while (true) {
              if (xgBtn.bounds().bottom < 0) {
                log("往回翻一页");
                scrollView2.scrollBackward();
                sleep(800);
              } else if (xgBtn.bounds().bottom > ENV.screenHeight - 1) {
                log(`坐标超出${ENV.screenHeight - 1}，往上滑动一页`);
                scrollView2.scrollForward();
                sleep(800);
              }
              xgBtn = e.findOne(textContains("选购"));
              log("往回翻一页或滑动一页后选购的坐标：" + xgBtn.bounds().bottom);

              if (
                xgBtn.bounds().bottom > 100 &&
                xgBtn.bounds().bottom < ENV.screenHeight - 1
              ) {
                log("找到对应的价格并点击：" + ticketPrice);
                sleep(1000);
                //APP.clickArea(xgBtn);
                xgBtn.parent().parent().parent().parent().click();
                sleep(3000);
                // 点击普通预定
                let bookingBtnObject = APP.waitForDesc(
                  "f_major_bundle_rn|QunarVendorList|LayerBookingLeftButton",
                  100,
                  5000
                );
                while (!bookingBtnObject) {
                  bookingBtnObject = APP.waitForDesc(
                    "f_major_bundle_rn|QunarVendorList|LayerBookingLeftButton",
                    100,
                    5000
                  );
                }
                APP.clickArea(bookingBtnObject);
                xg = true;
                break;
              }
            }
          } else {
            while (true) {
              if (xgBtn.bounds().bottom < 0) {
                log("往回翻一页");
                scrollView2.scrollBackward();
                sleep(800);
              } else if (xgBtn.bounds().bottom > ENV.screenHeight - 1) {
                log(`坐标超出${ENV.screenHeight - 1}，往上滑动一页`);
                scrollView2.scrollForward();
                sleep(800);
              }
              xgBtn = e.findOne(textContains("选购"));
              log("往回翻一页或滑动一页后选购的坐标：" + xgBtn.bounds().bottom);

              if (
                xgBtn.bounds().bottom > 100 &&
                xgBtn.bounds().bottom < ENV.screenHeight - 1
              ) {
                log("找到对应的价格并点击：" + ticketPrice);
                sleep(1000);
                // APP.clickArea(xgBtn);
                xgBtn.parent().parent().parent().parent().click();
                sleep(2000);
                // 点击普通预定
                let bookingBtnObject = APP.waitForDesc(
                  "f_major_bundle_rn|QunarVendorList|LayerBookingLeftButton",
                  100,
                  5000
                );
                while (!bookingBtnObject) {
                  bookingBtnObject = APP.waitForDesc(
                    "f_major_bundle_rn|QunarVendorList|LayerBookingLeftButton",
                    100,
                    5000
                  );
                }
                log("找到普通预定：" + bookingBtnObject);
                APP.clickArea(bookingBtnObject);
                sleep(2000);
                xg = true;
                break;
              }
            }
          }
        }
        if (xg == true) {
          throw "普通预订";
        }
      });
    } catch (error) {
      log("捕获到的异常：" + error);
      if (error == "普通预订") {
        pre = 0;
        current = 0;
      }
    } finally {
      if (pre != current) {
        pre = current;
        current = nextPage(scrollView2);
      }
    }
  }

  if (ENV.debugMode) {
    log("是否点击选购");
    log(xg);
  }

  if (xg == null) {
    log("未找到符合价格的航班" + JSON.stringify(allPriceResult(allPrice)));
    throw "未找到符合价格的航班" + JSON.stringify(allPriceResult(allPrice));
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
  swipe(x1, swipeheight, x2, swipeheight + swipeCount * barHeight, 800);
}

// 滑动某天：curDay页面的天或者当天，targetDay目标天
function scrollDay(curDay, targetDay) {
  //滑动选月
  if (ENV.debugMode) {
    log("正在自动找日：%s", targetDay);
  }
  let dayOfDifference = parseInt(
    curDay - parseInt(targetDay.replace(/\b(0+)/gi, ""))
  );
  if (ENV.debugMode) {
    log("与当前日相差：%s", dayOfDifference);
  }
  let round = 0;
  let mod = 0;
  if (dayOfDifference < 0) {
    round = Math.floor(-dayOfDifference / 10); // 向下取整,丢弃小数部分
    mod = -dayOfDifference % 10; //取余
  } else {
    round = Math.floor(dayOfDifference / 10); // 向下取整,丢弃小数部分
    mod = dayOfDifference % 10; //取余
  }
  if (ENV.debugMode) {
    log("日取整：%s,日取余：%s", round, mod);
  }
  sleep(500); //等待日历控件出现
  let dayXPos = text("确定").findOne().bounds().centerX();
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
    log("正在自动找月份：%s", targetMonth);
  }
  let monthOfDifference = parseInt(
    curMonth - parseInt(targetMonth.replace(/\b(0+)/gi, ""))
  );
  if (ENV.debugMode) {
    log("与当前月相差：%s", monthOfDifference);
  }
  let round = 0;
  let mod = 0;
  if (monthOfDifference < 0) {
    round = Math.floor(-monthOfDifference / 10); // 向下取整,丢弃小数部分
    mod = -monthOfDifference % 10; //取余
  } else {
    round = Math.floor(monthOfDifference / 10); // 向下取整,丢弃小数部分
    mod = monthOfDifference % 10; //取余
  }
  if (ENV.debugMode) {
    log("月份取整：%s,月份取余：%s", round, mod);
  }
  sleep(500); //等待日历控件出现
  //滑动选月份
  if (round > 0) {
    for (let index = 0; index < round; index++) {
      slide(
        _env.screenWidth / 2,
        _env.screenWidth / 2,
        monthOfDifference > 0 ? 10 : -10
      );
      sleep(300);
    }
  }
  if (mod > 0) {
    slide(
      _env.screenWidth / 2,
      _env.screenWidth / 2,
      monthOfDifference > 0 ? mod : -mod
    );
    sleep(300);
  }
}

// 滑动某年：curYear页面的年或者当年，targetYear目标年
function scrollYear(curYear, targetYear) {
  //滑动选年
  if (ENV.debugMode) {
    log("正在自动找年份%s", targetYear);
  }
  let yearOfDifference = parseInt(curYear - parseInt(targetYear));
  if (ENV.debugMode) {
    log("年份差：%s", yearOfDifference);
  }
  let round = 0;
  let mod = 0;
  if (yearOfDifference < 0) {
    // 上滑
    round = Math.floor(-yearOfDifference / 10); // 向下取整,丢弃小数部分
    mod = -yearOfDifference % 10; //取余
  } else {
    // 下滑
    round = Math.floor(yearOfDifference / 10); // 向下取整,丢弃小数部分
    mod = yearOfDifference % 10; //取余
  }
  if (ENV.debugMode) {
    log("月份取整：%s,月份取余：%s", round, mod);
  }
  sleep(500); //等待日历控件出现
  //滑动选年
  if (round > 0) {
    for (let index = 0; index < round; index++) {
      slide(
        _env.screenWidth / 3 / 2,
        _env.screenWidth / 3 / 2,
        yearOfDifference > 0 ? 10 : -10
      );
      sleep(300);
    }
  }
  if (mod > 0) {
    slide(
      _env.screenWidth / 3 / 2,
      _env.screenWidth / 3 / 2,
      yearOfDifference > 0 ? mod : -mod
    );
    sleep(300);
  }
}

// 名单信息中录入年月日
function selectBirth(birth) {
  let birthdayInput = APP.waitForDesc(
    "f_major_bundle|passengerEdit|birthdayInput_textValue"
  );
  // 点击出生日期
  APP.clickArea(birthdayInput);
  sleep(800);

  // 目标年月日
  let births = birth.split("-");
  let year,
    month,
    day = "";
  if (births.length > 2) {
    let date = new Date("1990-01-01");
    year = date.getFullYear(); //获取完整的年份(4位)19870728
    month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    day = date.getDate(); //获取当前日(1-31)
  }
  log("开始选择年月日 " + birth);
  scrollYear(year, births[0]);
  scrollMonth(month, births[1]);
  scrollDay(day, births[2]);
  // 点击确定
  sleep(300);
  let confirmBtn = APP.waitForContainsText("确定");
  APP.clickArea(confirmBtn);
  sleep(500);
}

// 检测PLUS会员或者舒适出行里的所有保险是否有勾选，取消已勾选的保险
function checkVIPService() {
  // 如果出现尊敬的PLUS会员
  let plusVip = APP.waitForContainsText("尊敬的PLUS会员", 100, 2000);
  if (plusVip) {
    log("出现“尊敬的plus会员”，需要滑动到最右边");
  }
  let plusVip2 = APP.waitForContainsText("舒适出行", 100, 2000);
  if (plusVip2) {
    log("或者出现“舒适出行”，需要滑动到最右边");
  }
  if (plusVip || plusVip2) {
    let horizontalScrollView = APP.waitForDescStartsWith(
      "OrderFillView|OrderFillPage_XProductList_XProductListNew_XProductItemList|ScrollView",
      100,
      2000
    );
    if (horizontalScrollView) {
      // 获取所有保险内容
      let xproductList = horizontalScrollView
        .find(desc("f_major_bundle_rn|booking|XproductScrollisXProduct"))
        .toArray();
      log("开始找当前保险是否被勾选");
      xproductList.forEach((proElement, proIndex) => {
        if (proIndex != 0 && proIndex % 2 == 0) {
          // 向右边滑动
          horizontalScrollView.scrollRight();
          sleep(800);
        }
        var checked = proElement.findOne(descEndsWith("qdCheckBox#true#false"));
        if (checked) {
          log("有保险被勾选上，取消勾选");
          checked.click();
          sleep(800);
        }
        if (proIndex == xproductList.length - 1) {
          // 恢复原样
          let count = 5;
          while (count > 0) {
            horizontalScrollView.scrollLeft();
            sleep(800);
            count--;
          }
        }
      });
    }
  }
}

// 检测出行保障里的所有保险是否有被勾选
function checkTravelGuarantee() {
  let horizontalScrollView = APP.waitForDesc(
    "f_major_bundle_rn|booking|InsureProduct",
    100,
    2000
  );
  if (horizontalScrollView) {
    // 获取所有保险内容
    let insureItems = horizontalScrollView
      .find(descStartsWith("f_major_bundle_rn|booking|moreInsureItem"))
      .toArray();
    log("找到保险的勾选框是否被勾选");
    insureItems.forEach((insureElement, insureIndex) => {
      if (insureIndex == 0) {
        log("排除第一个，第一个是无保障");
        return;
      }
      if (insureIndex % 3 == 0) {
        // 向右边滑动
        horizontalScrollView.scrollRight();
        sleep(800);
      }
      var checked = insureElement.findOne(
        desc("OrderFillView|OrderFillPage_InsureListqdCheckBox#true#false")
      );
      if (checked) {
        log("有保险被勾选上，取消勾选");
        checked.click();
        sleep(800);
      }
      if (insureIndex == insureItems.length - 1) {
        // 恢复原样
        let count = 3;
        while (count > 0) {
          horizontalScrollView.scrollLeft();
          sleep(800);
          count--;
        }
      }
    });
  }
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

  // 等待选择乘机人出现
  APP.waitForContainsText("选择乘机人", 100, 4000);

  // 联系方式
  let contactInput = APP.waitForDesc(
    "f_major_bundle_rn|QunarBooking|ContactPhoneInput_TextInput"
  );
  contactInput.click();
  sleep(300);
  contactInput.setText(contactInfo.phone);

  // 点击其他地方把键盘隐藏
  sleep(300);
  click(device.width - 1, 500);

  log("点击更多乘机人 / 新增乘机人");
  let addPassengerBtn = APP.getByDesc(
    "f_major_bundle_rn|QunarBooking|PassengerAddButton"
  );
  APP.clickArea(addPassengerBtn);
  sleep(2000);

  let targetIdCardNos = []; // 目标用户
  passengers.forEach((p) => targetIdCardNos.push(p.identityInfo.cardNo));

  let needCheckedPassengers = []; //需要选择的用户

  // 取消选择已选择的乘机人
  cancleChecked();
  sleep(3000);

  // 获取所有已存在的乘机人
  let existPassengers = existPassengersFn();
  sleep(3000);
  log("已存在的乘机人" + JSON.stringify(existPassengers));

  // 不存在則新增，存在則等待勾選
  passengers.forEach((p) => {
    if (indexOf(existPassengers, p.identityInfo.cardNo) < 0) {
      // 点击手动输入新增
      let addBtn = APP.getByTextContains("手动输入新增");
      APP.clickArea(addBtn.parent());
      sleep(5000);
      // 新增乘机人
      addOrEditPassenger(p);
    } else {
      needCheckedPassengers.push(p.identityInfo.cardNo);
    }
  });

  log("需要选择的乘机人" + JSON.stringify(needCheckedPassengers));
  sleep(5000);

  // 选择已存在的乘机人
  let checkedPassenger = checkedExistPassengerFn(
    needCheckedPassengers,
    targetIdCardNos
  );
  if (checkedPassenger.length != needCheckedPassengers.length) {
    throw "添加乘机人有误";
  }
  sleep(5000);

  // 点击确定
  let confirmBtn = APP.waitForDesc(
    "f_major_bundle_rn|PassengerList|save",
    100,
    1000
  );
  if (confirmBtn) {
    APP.clickArea(confirmBtn);
  }

  sleep(2000);
  let adultNum = 0; // 明细里的成人数量
  let childNum = 0; // 明细里的儿童数量
  let infantNum = 0; // 明细里的儿童数量
  let countUiObject = APP.waitForContainsText("已选");
  log(countUiObject);
  let nums = countUiObject.text().match(/\d+(.\d+)?/g);
  log("获取到的已选人数：" + JSON.stringify(nums));
  if (nums.length > 0) {
    adultNum = nums[0];
    if (ENV.debugMode) {
      log("APP成人人数：" + adultNum);
    }
    // 是否含有儿童文字,第二组数字都是儿童
    if (countUiObject.text().indexOf("儿童") > -1) {
      childNum = nums.length > 1 ? nums[1] : 0;
      if (ENV.debugMode) {
        log("APP儿童人数：" + childNum);
      }
    }
    // 是否含有婴儿文字
    if (countUiObject.text().indexOf("婴儿") > -1) {
      infantNum = nums.length > 1 ? nums[nums.length - 1] : 0;
      if (ENV.debugMode) {
        log("APP婴儿人数：" + infantNum);
      }
    }
  }
  const adultCount = passengers.filter((p) => p.type == 0).length;
  const childCount = passengers.filter((p) => p.type == 1).length;
  const infantCount = passengers.filter((p) => p.type == 2).length;
  log("成人目标数量%s，实际下单人数%s", adultCount, adultNum);
  log("儿童目标数量%s，实际下单人数%s", childCount, childNum);
  log("婴儿目标数量%s，实际下单人数%s", infantCount, infantNum);
  if (
    adultCount != adultNum ||
    childCount != childNum ||
    infantCount != infantNum
  ) {
    throw (
      "APP下单人数与目标人数不一致，请重新下单。成人：" +
      adultNum +
      "，儿童：" +
      childNum +
      "，婴儿：" +
      infantNum
    );
  }
}

// 取消默认勾选的乘机人
function cancleChecked() {
  // 取消默认选中的乘机人// 乘机人滚动块
  const existPassengerScrollView = className(SCROLL_VIEW).findOne(); // 滑动块
  const cancleCheckedPassenger = existPassengerScrollView
    .find(desc("f_major_bundle_rn|PassengerList|passengerItem"))
    .toArray(); // 乘机人块
  cancleCheckedPassenger.forEach((element) => {
    let checkedItem = element.findOne(descEndsWith("qdCheckBox#true#false"));
    if (checkedItem) {
      APP.clickArea(checkedItem);
    }
    sleep(1000);
  });
}

// 获取所有已存在的乘机人
function existPassengersFn() {
  let lastCardNo = "";
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
    let passengerList = existPassengerScrollView
      .find(desc("f_major_bundle_rn|PassengerList|passengerItem"))
      .toArray(); // 乘机人块
    if (passengerList.length > 0) {
      passengerList.forEach((p) => {
        let idCardNoText = "";
        let idCardNo = "";
        let idCardNoUiObject = p.findOne(
          desc("f_major_bundle_rn|PassengerList|cardDesc_身份证")
        );
        if (idCardNoUiObject != null) {
          idCardNoText = idCardNoUiObject.text();
        }
        let hzUiObject = p.findOne(
          desc("f_major_bundle_rn|PassengerList|cardDesc_护照")
        );
        if (hzUiObject != null) {
          idCardNoText = hzUiObject.text();
        }
        if (idCardNoText.indexOf("身份证") > -1) {
          idCardNo = idCardNoText
            .substring(4)
            .replace(" ", "")
            .replace(" ", "");
        } else if (idCardNoText.indexOf("护照") > -1) {
          idCardNo = idCardNoText.substring(3).replace(" ", "");
        }
        currentCardNo = idCardNo;
        // 不存在该乘客才追加
        let existPsg = existPassengers.filter((e) => e == idCardNo);
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
  log("回滚到顶部");
  APP.swipeToTop();

  log("开始选择已存在的乘机人");
  let checkedPassenger = [];
  let lastCardNoText = "";
  let currentCardNoText;

  function nextPage(scrollView) {
    APP.scrollForward(scrollView);
  }

  while (checkedPassenger.length != needCheckedPassengers.length) {
    lastCardNoText = currentCardNoText;
    log(lastCardNoText + "===" + currentCardNoText);
    let checkedPassengerScrollView = className(SCROLL_VIEW).findOne(); // 滑动块
    let passengerList = checkedPassengerScrollView
      .find(desc("f_major_bundle_rn|PassengerList|passengerItem"))
      .toArray(); // 乘机人块
    if (passengerList.length > 0) {
      passengerList.forEach((p, i) => {
        let idCardNoText = "";
        let idCardNo = "";
        if (!p) {
          return;
        }
        let idCardNoUiObject = p.findOne(
          desc("f_major_bundle_rn|PassengerList|cardDesc_身份证")
        );
        if (idCardNoUiObject != null) {
          idCardNoText = idCardNoUiObject.text();
        }
        let hzUiObject = p.findOne(
          desc("f_major_bundle_rn|PassengerList|cardDesc_护照")
        );
        if (hzUiObject != null) {
          idCardNoText = hzUiObject.text();
        }
        if (idCardNoText.indexOf("身份证") > -1) {
          idCardNo = idCardNoText
            .substring(4)
            .replace(" ", "")
            .replace(" ", "");
        } else if (idCardNoText.indexOf("护照") > -1) {
          idCardNo = idCardNoText.substring(3).replace(" ", "");
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
                log("已选中乘机人 %s", idCardNo);
              }
            }
          }
        }
      });
    }
    log("滑动下一页");
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
  APP.waitForContainsText("新增乘机人", 100, 3000);
  let targetCertificateType = passenger.identityInfo.type;
  if (targetCertificateType == 0) {
    // 姓名
    let userNameInput = APP.waitForDesc(
      "f_major_bundle_rn|QunarBooking|PassengerAddNameInput_TextInput"
    );
    if (userNameInput) {
      APP.clickArea(userNameInput);
      sleep(200);
      userNameInput.setText(passenger.name.primary);
    }
  } else if (targetCertificateType == 1) {
    let cardTypeUiObject = APP.waitForDesc(
      "f_major_bundle|passengerEdit|cardTypeInput_textValue"
    );
    APP.clickArea(cardTypeUiObject.parent());
    sleep(800);
    slide(ENV.screenWidth / 2, ENV.screenWidth / 2, -1);
    sleep(300);

    let confirmBtn = APP.waitForDesc(
      "f_major_bundle_rn|PassengerEdit|certPickerConfirm"
    );
    APP.clickArea(confirmBtn);
    sleep(500);

    // 姓
    let subNameInput = APP.waitForDesc(
      "f_major_bundle_rn|editPassenger|lastName_"
    );
    subNameInput.click();
    sleep(200);
    subNameInput.setText(passenger.name.primary);
    // 名
    let givenNameInput = APP.waitForDesc(
      "f_major_bundle_rn|editPassenger|firstName_"
    );
    givenNameInput.click();
    sleep(200);
    givenNameInput.setText(passenger.name.secondary);
  }

  // 证件号
  let cardNoInput = APP.waitForDesc(
    "f_major_bundle_rn|QunarBooking|PassengerAddCardNoInput_TextInput"
  );
  cardNoInput.click();
  sleep(200);
  cardNoInput.setText(passenger.identityInfo.cardNo);

  // 手机号
  let phoneInput = APP.waitForDesc(
    "f_major_bundle_rn|QunarBooking|PassengerAddPhoneNumInput_TextInput"
  );
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
  let saveBtn = APP.waitForDesc(
    "f_major_bundle_rn|QunarBooking|PassengerSaveButton",
    100,
    1000
  );
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
    throw "该舱位不支持售卖婴儿票";
  }

  let tip3 = APP.waitForContainsText("该舱位不支持售卖儿童票", 200, 500);
  if (tip3) {
    throw "该舱位不支持售卖儿童票";
  }
}

// 价格比较（儿童、婴儿）
function priceCompare(passenger, actualPrices, order) {
  let childCabinPriceInfo = order.cabinPriceInfos.filter((p) => p.type == 1);
  let infantCabinPriceInfo = order.cabinPriceInfos.filter((p) => p.type == 2);
  let childPrice = actualPrices.filter((p) => p.type === 1); //儿童
  let infantPrice = actualPrices.filter((p) => p.type === 2); //婴儿
  if (passenger.type == 0) {
  } else if (passenger.type == 1) {
    let childTicketPrice = childPrice[0].ticketPrice;
    if (childTicketPrice != childCabinPriceInfo[0].ticketPrice) {
      throw "下单失败，儿童票面价不符合";
    }
  } else if (passenger.type == 2) {
    let infantTicketPrice = infantPrice[0].ticketPrice;
    if (infantTicketPrice != infantCabinPriceInfo[0].ticketPrice) {
      throw "下单失败，婴儿票面价不符合";
    }
  }
}

// 订单详情
function orderDetail(order) {
  // 点击明细
  let detail = APP.waitForDesc("f_major_bundle_rn|bottom_order_price|details");
  APP.clickArea(detail);
  sleep(1000);

  let actualPrices = [];
  let totalPriceText = 0;
  let priceItem = desc("priceItem").find().toArray();
  let passengerTypeText = priceItem[0]
    .findOne(desc("f_major_bundle_rn|priceItem|ageDesc"))
    .text();
  log(passengerTypeText);
  if (passengerTypeText == "成人") {
    let ticketPriceText = priceItem[0]
      .findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices"))
      .text();
    let airportTaxText = priceItem[1]
      .findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices"))
      .text();
    let oilFeeText = priceItem[2]
      .findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices"))
      .text();
    if (ENV.debugMode) {
      log(
        "票面价：" +
          ticketPriceText +
          "，基建：" +
          airportTaxText +
          "，燃油：" +
          oilFeeText
      );
    }
    order.passengers.forEach((element) => {
      if (element.type == 0) {
        actualPrices.push({
          type: element.type, //成人
          ticketPrice: parseFloat(ticketPriceText.substring(1)), //票面价
          settlementPrice: parseFloat(ticketPriceText.substring(1)), //票面价=票面价-直减（去哪儿没有直减）
          airportTax: parseFloat(airportTaxText.substring(1)), // 基建
          oilFee: parseFloat(oilFeeText.substring(1)), //燃油
        });
      }
    });
  }

  for (let index = 0; index < priceItem.length; index++) {
    let element = priceItem[index];
    if (index > 2) {
      let passengerType1UiObject = element.findOne(
        desc("f_major_bundle_rn|priceItem|ageDesc")
      );
      if (
        passengerType1UiObject != null &&
        passengerType1UiObject.text() == "儿童"
      ) {
        let ticketPriceText = element
          .findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices"))
          .text();
        let airportTaxText = priceItem[index + 1]
          .findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices"))
          .text();
        let oilFeeText = priceItem[index + 2]
          .findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices"))
          .text();
        if (ENV.debugMode) {
          log(
            "儿童票面价：" +
              ticketPriceText +
              "，基建：" +
              airportTaxText +
              "，燃油：" +
              oilFeeText
          );
        }
        order.passengers.forEach((element) => {
          if (element.type == 1) {
            actualPrices.push({
              type: element.type, //儿童
              ticketPrice: parseFloat(ticketPriceText.substring(1)), //票面价
              airportTax: parseFloat(airportTaxText.substring(1)), // 基建
              oilFee: parseFloat(oilFeeText.substring(1)), //燃油
            });
          }
        });
      }
      let passengerType2UiObject = element.findOne(
        desc("f_major_bundle_rn|priceItem|ageDesc")
      );
      if (
        passengerType2UiObject != null &&
        passengerType2UiObject.text() == "婴儿"
      ) {
        let ticketPriceText = element
          .findOne(desc("f_major_bundle_rn|booking|PriceDetailPrices"))
          .text();
        if (ENV.debugMode) {
          log("婴儿票面价：" + ticketPriceText);
        }
        order.passengers.forEach((element) => {
          if (element.type == 2) {
            actualPrices.push({
              type: element.type, //婴儿
              ticketPrice: parseFloat(ticketPriceText.substring(1)), //票面价
              airportTax: 0, // 基建
              oilFee: 0, //燃油
            });
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
  let aggree = APP.waitForDesc(
    "f_major_bundle_rn|booking|ProtocolCheckBoxqdCheckBox#false#false",
    100,
    2000
  );
  if (aggree) {
    let scrollBottom = APP.waitForDesc(
      "f_major_bundle_rn|QunarBooking|ScrollView"
    );
    APP.scrollForward(scrollBottom);
    sleep(500);
    log("勾选已阅读并同意");
    aggree.click();
    sleep(1000);
  }

  clickNext();

  // 检测优惠提示
  // let closeBtn = APP.waitForDesc("f_major_bundle_rn|booking|procuctDetainCustom|btnCancel", 100, 3000);
  // if (closeBtn) {
  //     log('点击提示框 "否"')
  //     closeBtn.click();
  // }

  // 如果出现意外保障的提示框，第一次点击有可能会勾选航空意外险，需要根据价格判断所有乘机人的票面价+燃油+基建和总价比较
  // 如果不一致，说明有可能勾选了航空意外险，需要取消
  let sum = 0;
  for (let index = 0; index < actualPrices.length; index++) {
    const element = actualPrices[index];
    sum = sum + element.ticketPrice + element.oilFee + element.airportTax;
  }
  log("计算乘机人的总价格" + sum);
  // 重新获取总价格
  let priceElement = APP.waitForDesc(
    "f_major_bundle_rn|ExtraCarPage|Price",
    100,
    5000
  );
  if (priceElement) {
    totalPriceText = priceElement.text();
    if (sum != totalPriceText) {
      // 返回上一页
      back();
      sleep(1000);
      // 回滚到顶部
      let scrollCount = 2;
      while (scrollCount > 0) {
        // 滑动一页
        let scrollBottom = APP.waitForDesc(
          "f_major_bundle_rn|QunarBooking|ScrollView"
        );
        scrollBottom.scrollBackward();
        sleep(1000);

        // 移除被勾选的保险
        checkVIPService();
        checkTravelGuarantee();
        scrollCount--;
      }

      let scrollBottom = APP.waitForDesc(
        "f_major_bundle_rn|QunarBooking|ScrollView"
      );
      while (scrollBottom.scrollForward()) {
        sleep(800);
      }

      // 回滚到底部，重新点击下一步
      clickNext();

      // 重新获取总支付价，如果不符合，则抛异常
      totalPriceText = APP.waitForDesc(
        "f_major_bundle_rn|ExtraCarPage|Price",
        100,
        5000
      ).text();
      if (sum != totalPriceText) {
        throw "总支付不符，预计总价:" + sum + " 实际总价" + totalPriceText;
      }
    }
  }

  // 点击去支付
  let submitBtn = APP.waitForDesc(
    "f_major_bundle_rn|booking|submitBtn",
    100,
    5000
  );
  if (submitBtn) {
    if (ENV.debugMode) {
      log("点击去支付");
    }
    submitBtn.parent().parent().click();
  }
  sleep(3000);

  let payReductCloseBtn = APP.waitForId(
    "pub_pay_reduce_dialog_close",
    100,
    3000
  );
  if (payReductCloseBtn) {
    if (ENV.debugMode) {
      log("点击优惠砸中了");
    }
    payReductCloseBtn.click();
  }

  // 关闭支付窗口
  let payBack = APP.waitForId("pub_pay_payframe_back", 100, 5000);
  if (!payBack) {
    back();
    payReductCloseBtn = APP.waitForId("pub_pay_reduce_dialog_close", 100, 3000);
    if (payReductCloseBtn) {
      if (ENV.debugMode) {
        log("点击优惠砸中了");
      }
      payReductCloseBtn.click();
    }
    payBack = APP.waitForId("pub_pay_payframe_back", 100, 5000);
  }
  if (payBack) {
    if (ENV.debugMode) {
      log("点击关闭支付");
    }
    payBack.click();
  }
  sleep(1000);

  // 放弃支付
  let cancelPay = APP.waitForId("pub_pay_left_button", 100, 5000);
  if (cancelPay) {
    if (ENV.debugMode) {
      log("点击放弃支付");
    }
    cancelPay.click();
  }
  sleep(5000);

  // 可能存在弹框
  let apollo = APP.waitForId("cmsApolloAlert-0", 200, 2000);
  while (apollo) {
    back();
    sleep(1000);
    apollo = APP.waitForId("cmsApolloAlert-0", 200, 2000);
  }

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
    totalPrice: parseFloat(totalPriceText),
  };
}

// 点击下一步
function clickNext() {
  // 点击下一步(偶尔获取不到下一步的desc值)
  let next = APP.waitForDesc(
    "OrderFillView|OrderFillPage_OrderPriceqdButton#下一步",
    100,
    3000
  );
  if (next) {
    APP.clickArea(next);
    sleep(800);
  }

  let cancelBtn = APP.waitForDesc(
    "f_major_bundle_rn|booking|procuctDetainCustom|btnCancel",
    100,
    3000
  );
  if (cancelBtn) {
    log('点击提示框 "否"');
    cancelBtn.click();
  }

  // 点击下一步
  let next2 = APP.waitForDesc("f_major_bundle_rn|booking|submitBtn", 100, 3000);
  if (next2) {
    APP.clickArea(next2);
    sleep(800);
  }

  let t = 10000;
  let m = new Date().getTime() + t;
  while (m >= new Date().getTime()) {
    let error = APP.waitForContainsText("该价格的机票已经售完", 100, 200);
    if (error) {
      APP.clickByTextContains("确定");
      throw "该价格的机票已经售完，请重新下单";
    }
    let error1 = APP.waitForContainsText("您预订的航班已经售完", 100, 200);
    if (error1) {
      APP.clickByTextContains("确定");
      throw "您预订的航班已经售完";
    }
    let error2 = APP.waitForContainsText("票价升高", 100, 200);
    if (error2) {
      APP.clickByTextContains("重新选择");
      throw "票价升高了";
    }
    let error3 = APP.waitForContainsText("本产品购买要求至少", 100, 200);
    if (error3) {
      APP.clickByTextContains("确定");
      throw "抱歉，本产品购买要求不满足，请重新选择乘机人或其他产品";
    }
    let error4 = APP.waitForContainsText("至少包含一位", 100, 200);
    if (error4) {
      APP.clickByTextContains("确定");
      throw "至少包含一位xx周岁（含）的旅客购买";
    }
  }

  // 点击提示框 "否"
  cancelBtn = APP.waitForDesc(
    "f_major_bundle_rn|booking|procuctDetainCustom|btnCancel",
    100,
    3000
  );
  if (cancelBtn) {
    log('点击提示框 "否"');
    cancelBtn.click();
  }

  sleep(5000);

  // 检测是否重复预定
  let repeatBtn = APP.waitForContainsText("继续重复预订", 100, 5000);
  if (repeatBtn) {
    if (ENV.debugMode) {
      log("点击继续重复预订");
    }
    repeatBtn.parent().click();
    sleep(1000);
  }

  // 检测是否继续预定
  let repeatBtn2 = APP.waitForContainsText("继续预订", 100, 5000);
  if (repeatBtn2) {
    if (ENV.debugMode) {
      log("点击继续预订");
    }
    repeatBtn2.parent().click();
    sleep(1000);
  }

  let thinkAgainBtn = APP.waitForContainsText("再想想", 100, 3000);
  if (thinkAgainBtn) {
    if (ENV.debugMode) {
      log("点击再想想");
    }
    thinkAgainBtn.parent().click();
    throw "乘机人已购买过相同行程航班，无法重复预定";
  }
  sleep(1000);
}
