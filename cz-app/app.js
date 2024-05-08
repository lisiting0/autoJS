// 所有 this 公共操作
var ENV = null;
var ScreenCenterX = 0,
  ScreenUpperY = 0,
  ScreenLowerY = 0,
  DateWidth = 0,
  Step = 0;

const DATEAPI = require("./date-api.js");
const MAIN_PAGE_MINE_ID = "main_mine_txt"; // 我 页面图标
const MAIN_PAGE_HOME_ID = "main_home_txt"; // 主页页面图标
const SEARCH_FLIGHT_BUTTON_ID = "include_main_home_view_booking_llyt_querybtn"; // 航班查询按钮
const MAIN_PAGE_DEPARTURE_ID = "include_main_home_view_booking_tv_start"; //首页 出发城市
const MAIN_PAGE_DESTINATION_ID = "include_main_home_view_booking_tv_back"; //首页 到达城市
const CITY_PAGE_CITY_TEXTBOX_ID = "book_activity_city_list_tv_citySearch"; //城市文本框
const CITY_PAGE_CITY_TEXTBOX_CLEAN_ID =
  "book_activity_city_list_iv_cleanSearchContent"; //城市文本框清除图标
const CITY_PAGE_CITY_INPUTBOX_ID = "book_activity_city_list_et_citySearch"; //城市输入框
const CITY_PAGE_CITY_RESULT_ID = "book_activity_city_list_rcyView_searchCities"; //城市结果块
const CITY_PAGE_CITY_LIST_ID = "layout_city"; //城市结果列表
const CITY_PAGE_CITY_AIRPORT_ID = "layout_airPort"; //城市结果列表
const CITY_PAGE_CITY_ID = "com.csair.mbp:id/tv_code3"; //城市名
const MAIN_PAGE_DATE_ID = "include_main_home_view_booking_tv_month_start"; // 选择日期
const CALENDAR_ID = "calendar_content_rv";
const DATE_HEIGHT = 171;
const TOP_HEIGHT = 342;
const BUTTON1 = "button1"; //提示的确定按钮或者继续按钮ID

function numberEqual(n1, n2) {
  return (n1 | 0) === (n2 | 0);
}

module.exports = {
  setEnv: function (env) {
    ENV = env;
    ScreenCenterX = ENV.screenWidth * 0.5;
    ScreenUpperY = TOP_HEIGHT + 10;
    ScreenLowerY = ENV.screenHeight * 0.9;
    DateWidth = ENV.screenWidth / 7;
    Step = ScreenLowerY - ScreenUpperY;
    if (env.debugMode) {
      log("ScreenUpperY: " + ScreenUpperY);
      log("ScreenLowerY: " + ScreenLowerY);
      log("Step: " + Step);
    }
  },
  interval: 200, // 检查控件是否出现的间隔 单位 毫秒
  timeout: 15000, // 控件出现超时 单位 毫秒
  // 等待id出现
  waitForId: function (elementId, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = id(elementId).findOne(i);
      if (ENV.debugMode && !item) {
        log(
          "item not found %s, waited %s milliseconds, total %s milliseconds, will end in %s milliseconds",
          elementId,
          i,
          t,
          m - new Date().getTime()
        );
      }
    }

    return item;
  },
  // 等待文本出现
  waitForText: function (elementText, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = text(elementText).findOne(i);
      if (ENV.debugMode && !item) {
        log(
          "item not found %s, waited %s milliseconds, total %s milliseconds, will end in %s milliseconds",
          elementText,
          i,
          t,
          m - new Date().getTime()
        );
      }
    }

    return item;
  },
  // 等待id和文本出现
  waitForIdText: function (elementId, text, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = id(elementId).text(text).findOne(i);
    }

    return item;
  },
  // 等待要包含的字符串出现
  waitForContainsText: function (text, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = textContains(text).findOne(i);
    }

    return item;
  },
  // 等待对屏幕上的id控件进行搜索，找到所有满足条件的控件集合并返回
  waitForListById: function (elementId, interval, timeout) {
    let items = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (items == null && m >= new Date().getTime()) {
      items = id(elementId).find();
      if (ENV.debugMode && !items) {
        log(
          "item not found %s, waited %s milliseconds, total %s milliseconds, will end in %s milliseconds",
          elementId,
          i,
          t,
          m - new Date().getTime()
        );
      }
    }

    return items;
  },
  // 等待当前选择器附加控件desc等于某个字符串的出现
  waitForDesc: function (elementText, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = desc(elementText).findOne(i);
      if (ENV.debugMode && !item) {
        log(
          "item not found %s, waited %s milliseconds, total %s milliseconds, will end in %s milliseconds",
          elementText,
          i,
          t,
          m - new Date().getTime()
        );
      }
    }

    return item;
  },
  // 获取id等于xxx的筛选条件
  getById: function (elementId, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = id(elementId).findOne(i);
    }

    if (!item) {
      throw "get element by id " + elementId + " timeout " + t;
    }

    return item;
  },
  // 获取id选择器的文本等于xxx的筛选条件
  getByIdText: function (elementId, text, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = id(elementId).text(text).findOne(i);
    }

    if (!item) {
      throw "get element by id text " + elementId + text + " timeout " + t;
    }

    return item;
  },
  // 获取文本等于xxx的筛选条件
  getByText: function (elementText, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = text(elementText).findOne(i);
    }

    if (!item) {
      throw "get element by text " + elementText;
    }

    return item;
  },
  // 获取文本要包含的字符串的筛选条件
  getByTextContains: function (elementText, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = textContains(elementText).findOne(i);
    }

    if (!item) {
      throw "get element by text " + elementText;
    }

    return item;
  },
  // 获取对屏幕上的id控件进行搜索，找到所有满足条件的控件集合并返回
  getListById: function (elementId, interval, timeout) {
    let items = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (m >= new Date().getTime()) {
      items = id(elementId).find();
      if (ENV.debugMode) {
        if (!items || items.empty()) {
          log(
            "item not found %s, waited %s milliseconds, total %s milliseconds, will end in %s milliseconds",
            elementId,
            i,
            t,
            m - new Date().getTime()
          );
        }
      }
      if (!items || items.empty()) {
        sleep(i);
      } else {
        break;
      }
    }

    if (!items) {
      throw "get element by id " + elementId;
    }

    return items;
  },
  // 获取当前选择器附加控件desc等于某个字符串的出现
  getByDesc: function (elementDesc, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = desc(elementDesc).findOne(i);
    }

    if (!item) {
      throw "get element by desc " + elementDesc + " timeout " + t;
    }

    return item;
  },
  // 点击指定的desc
  clickByDesc: function (elementDesc, interval, timeout) {
    this.getByDesc(elementDesc, interval, timeout).click();
  },
  // 根据坐标点击
  clickArea: function (element) {
    let bounds = element.bounds();
    if (!bounds) {
      throw "get bounds by element " + element + " failed";
    }
    click(bounds.centerX(), bounds.centerY());
  },
  // 点击指定的id
  clickById: function (elementId, interval, timeout) {
    this.getById(elementId, interval, timeout).click();
  },
  // 点击指定的文字
  clickByText(elementText, interval, timeout) {
    this.getByText(elementText, interval, timeout).click();
  },
  // 点击包含指定的文字
  clickByTextContains(elementText, interval, timeout) {
    this.getByTextContains(elementText, interval, timeout).click();
  },
  // 点击指定的id
  clickParentById: function (elementId, interval, timeout) {
    this.getById(elementId, interval, timeout).parent().click();
  },
  // 点击指定的文字
  clickParentByText(elementText, interval, timeout) {
    this.getByText(elementText, interval, timeout).parent().click();
  },
  // 点击包含指定的文字
  clickParentByTextContains(elementText, interval, timeout) {
    this.getByTextContains(elementText, interval, timeout).parent().click();
  },
  // 点击指定的id
  clickAreaById: function (elementId, interval, timeout) {
    let item = this.getById(elementId, interval, timeout);
    this.clickArea(item);
  },
  // 点击指定的文字
  clickAreaByText(elementText, interval, timeout) {
    let item = this.getByText(elementText, interval, timeout);
    this.clickArea(item);
  },
  // 点击包含指定的文字
  clickAreaByTextContains(elementText, interval, timeout) {
    let item = this.getByTextContains(elementText, interval, timeout);
    this.clickArea(item);
  },
  // 勾选指定CheckBox
  checkedById: function (elementId, isChecked, interval, timeout) {
    let item = this.getById(elementId, interval, timeout);
    if (item.checked() === isChecked) {
      if (ENV.debugMode) {
        log("CheckBox %s 状态已为%s 不需要点击", elementId, isChecked);
      }
      return;
    } else {
      if (ENV.debugMode) {
        log("点击CheckBox " + elementId);
      }
      item.click();
    }
  },
  // 勾选指定对象内部的CheckBox
  checkedInViewById: function (targetView, elementId, isChecked) {
    let item = targetView.findOne(id(elementId));
    if (item.checked() === isChecked) {
      if (ENV.debugMode) {
        log("CheckBox %s 状态已为%s 不需要点击", elementId, isChecked);
      }
      return;
    } else {
      if (ENV.debugMode) {
        log("点击CheckBox " + elementId);
      }
      item.click();
    }
  },
  // 点击首页的我按钮
  me: function () {
    log("前往 我 页面");
    this.loginFailure();
    let btn = this.getById(MAIN_PAGE_MINE_ID, 200, 40000);
    btn.parent().click();
    log("已点击 '我' 按钮");
    this.swipeToTop();
  },
  // 点击底部导航“首页”按钮
  home: function () {
    log("前往主页");
    // log("开始找导航栏");
    // this.getById("main_navigation", 200, 5000);
    // log("找到导航栏");
    let btn = this.getById(MAIN_PAGE_HOME_ID, 200, 5000);
    log("找首页");
    btn.parent().click();
    log("找到首页");
    this.getById(SEARCH_FLIGHT_BUTTON_ID);
    log("主页已打开");
    this.loginFailure();
    this.closeDialog();
  },
  /**
   * 输入出发城市、到达城市
   * @param {string} placeCode 三字码
   */
  inputPlaceCode: function (placeCode) {
    // 点击顶部搜索框
    let citySearch = this.getById(CITY_PAGE_CITY_TEXTBOX_ID);
    while (!citySearch.click()) {
      citySearch.click();
    }
    // 输入出发城市、到达城市
    let city_input = this.getById(CITY_PAGE_CITY_INPUTBOX_ID);
    city_input.setText(placeCode); // 输入信息
    sleep(300); //等待查询结束
    // 等待列表是否有到达地点
    let targetCity = this.waitForIdText(CITY_PAGE_CITY_ID, placeCode);
    while (!targetCity) {
      // 清除城市
      this.clickById(CITY_PAGE_CITY_TEXTBOX_CLEAN_ID);
      // 重新点击输入框
      this.clickAreaById(CITY_PAGE_CITY_INPUTBOX_ID);
      // 输入出发地点
      this.getById(CITY_PAGE_CITY_INPUTBOX_ID).setText(placeCode); // 输入信息
      // 結果列表
      targetCity = this.waitForIdText(CITY_PAGE_CITY_ID, placeCode);
    }
    this.waitForId(CITY_PAGE_CITY_RESULT_ID);

    var count = 0;
    var isClick = false;
    while (count < 5 && isClick == false) {
      try {
        let city_list_rcyView = id(CITY_PAGE_CITY_RESULT_ID).findOne();
        if (city_list_rcyView != null) {
          city_list_rcyView
            .children()
            .toArray()
            .forEach((child) => {
              sleep(500);
              var layoutCityList = child.find(id(CITY_PAGE_CITY_AIRPORT_ID));
              if (layoutCityList == null) {
                if (ENV.debugMode) {
                  log("layoutCityList找不到");
                }
                throw "undefind";
              }
              let findCode = layoutCityList.findOne(id(CITY_PAGE_CITY_ID));
              if (findCode == null) {
                if (ENV.debugMode) {
                  log(CITY_PAGE_CITY_ID + "找不到");
                }
                throw "undefind";
              }
              if (findCode.text() == placeCode) {
                if (
                  findCode.parent() == null ||
                  findCode.parent().parent() == null
                ) {
                  if (ENV.debugMode) {
                    log(
                      "findCode.parent()或者findCode.parent().parent()找不到"
                    );
                  }
                  throw "undefind";
                }
                while (!findCode.parent().parent().click()) {
                  findCode.parent().parent().click();
                }
                isClick = true;
              }
            });
        }
      } catch (error) {
        if (error == "undefind") {
          count++;
          continue;
        }
      }
      sleep(200);
      if (isClick) {
        break;
      }
    }
    if (count > 4) {
      throw "城市搜索异常";
    }
  },
  /**
   * 输入起飞时间
   * @param {string} date 时间2021-01-01T08:00:00Z
   */
  inputDepartureDate: function (date) {
    const systemDate = new Date();
    const systemDateYear = systemDate.getFullYear();
    const systemDateMonth = systemDate.getMonth() + 1;
    const systemDateDate = systemDate.getDate();
    const targetMonth = date.getMonth() + 1;
    const targetYear = date.getFullYear();
    const targetDay = date.getDate();
    // 同一天可以
    // log(new Date(targetYear, targetMonth, targetDay) + '当天日期!==系统当前日期' + new Date(systemDateYear, systemDateMonth, systemDateDate))
    if (
      systemDateYear + "-" + systemDateMonth + "-" + systemDateDate !=
      targetYear + "-" + targetMonth + "-" + targetDay
    ) {
      if (date.getTime() > systemDate.getTime()) {
      } else {
        log(
          "日期必须大于当天日期，目标日期：%s，当天日期：%s",
          date,
          systemDate
        );
        throw (
          "日期必须大于当天日期,目标日期：" +
          date +
          " , 当天日期为：" +
          systemDate
        );
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

      dateInputView = this.getById(MAIN_PAGE_DATE_ID);
      dateInputView.parent().click(); // 打开日期选择页面
      sleep(1000); // 等待动画结束

      this.swipeToTop();
      let y = TOP_HEIGHT + targetWeekCount * DATE_HEIGHT + DATE_HEIGHT * 0.5;

      this.clickDateButton(x, y);

      return;
    }

    while (true) {
      dateInputView = this.getById(MAIN_PAGE_DATE_ID);
      currentSelectedDate = this.parseDate(dateInputView.text());
      if (
        numberEqual(currentSelectedDate.month, targetMonth) &&
        numberEqual(currentSelectedDate.day, targetDay)
      ) {
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

      dateInputView.parent().click(); // 打开日期选择页面
      sleep(1000); // 等待动画结束
      if (ENV.debugMode) {
        log("打开日期选择页面");
      }

      let calendarView = this.getById(CALENDAR_ID);
      let calendarPageHeight = calendarView.bounds().height();
      if (ENV.debugMode) {
        log("已获取日历控件");
      }

      //获取当前选中年份
      currentSelectedDate.year = this.parseDate(
        this.getByTextContains("月").text()
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
      let currentMonthViewBottom = this.getByTextContains(
        currentSelectedDate.month + "月"
      ).bounds().bottom;

      if (ENV.debugMode) {
        log("已获取当前选中月份，下边沿 %s", currentMonthViewBottom);
      }

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
            log("已向前一个月 %s年%s月 总周数 %s", m.year, m.month, mWeekCount);
          }

          if (
            numberEqual(m.year, targetYear) &&
            numberEqual(m.month, targetMonth)
          ) {
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

        this.clickDateButton(x, y);
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
          log("当前周数 %s 日期下边沿为 %s", mWeekCount, y);
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
            log("已向后一个月 %s年%s月 总周数 %s", m.year, m.month, mWeekCount);
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

        this.clickDateButton(x, y);
      } else if (monthDelta >= 7) {
        log("targetTotalMonth " + targetTotalMonth);
        log("currentSelectedDate.year " + currentSelectedDate.year);
        log("currentSelectedDate.month " + currentSelectedDate.month);
        let a =
          parseInt((currentSelectedDate.year - 1) * 12) +
          parseInt(currentSelectedDate.month);
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
        let y =
          currentMonthViewBottom +
          targetWeekCount * DATE_HEIGHT -
          DATE_HEIGHT * 0.5;
        this.clickDateButton(x, y);
      }
    }
  },
  /**
   * 点击搜索前判断选择的日期是否正确
   * @param {string} date 时间2021-01-01T08:00:00Z
   */
  checkDepartureDateIsTrue: function (date) {
    const targetMonth = date.getMonth() + 1;
    const targetDay = date.getDate();
    let targetDateText =
      targetMonth +
      "月" +
      (targetDay < 10 ? "0" + targetDay : targetDay) +
      "日";
    let bookingDateUIObject = this.getById(MAIN_PAGE_DATE_ID);
    let bookingDateText = bookingDateUIObject.text();
    let checkCount = 0;
    log(bookingDateText + "==" + targetDateText);
    while (checkCount < 4 && bookingDateText != targetDateText) {
      this.inputDepartureDate(date);
      checkCount++;
      bookingDateUIObject = this.getById(MAIN_PAGE_DATE_ID);
      bookingDateText = bookingDateUIObject.text();
    }
    bookingDateUIObject = this.getById(MAIN_PAGE_DATE_ID);
    bookingDateText = bookingDateUIObject.text();
    if (bookingDateText != targetDateText) {
      throw (
        "日期选择有误，请重新下单，当前选中日期 " +
        bookingDateText +
        "，目标日期 " +
        targetDateText
      );
    }
  },
  /**
   * 年月份格式转化
   * @param {string} date 时间2021年01月01日
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
   * 点击日期按钮坐标
   * @param {number} x 坐标
   * @param {number} y 坐标
   */
  clickDateButton(x, y) {
    if (ENV.debugMode) {
      log("已获取坐标 %s, %s", x, y);
    }

    var count = 0;
    while (true) {
      click(x, y);
      sleep(800);
      count++;
      let isHome = this.waitForContainsText("搜索", 100, 1000);
      if (isHome) {
        break;
      } else {
        if (count > 5) {
          // 左上角的返回上一页
          let return_back = this.waitForDesc("返回上一页", 100, 1000);
          if (return_back) {
            log("找到“返回上一页”图标");
            this.clickArea(return_back);
            sleep(300);
            break;
          }
        }
      }
    }
    sleep(1000); // 等待动画

    if (ENV.debugMode) {
      log("已点击坐标 %s, %s", x, y);
    }
  },
  // 滑动到顶部
  swipeToTop: function () {
    swipe(
      ScreenCenterX,
      ScreenUpperY,
      ScreenCenterX,
      ENV.screenHeight * 12,
      200
    );
  },
  /**
   * 往上滚动
   * @param {object} scrollable 可滚动组件
   * @param {number} t 滚动后 sleep 时间
   */
  scrollForward(scrollable, t) {
    scrollable.scrollForward();
    sleep(t | 500);
  },
  // 等待提示弹窗（统一点击 button1 ）
  waitPrompt: function (timeout) {
    let tip = this.waitForContainsText("提示", 100, timeout ? timeout : 3000);
    if (tip) {
      let btn = this.waitForId(BUTTON1, 100, 1000);
      if (btn) {
        while (!btn.click()) {
          sleep(10);
        }
      }
    }
  },
  // 检测登录失效，仅回到首页，不抛异常
  loginFailure() {
    // 账号登陆超时
    let loginFailureTip = this.waitForContainsText(
      "您的登录状态已失效",
      50,
      2000
    );
    log("监测登录状态已失效" + loginFailureTip);

    if (loginFailureTip) {
      _account.currentAccount = null;
      this.waitPrompt(1000);
      sleep(1000);
      if (_env.debugMode) {
        log("登录状态已失效");
      }
      // 登录失效页面，有两个返回上一页
      let return_back_list = desc("返回上一页").find().toArray();
      log("返回上一页的个数：" + return_back_list.length);
      if (return_back_list && return_back_list.length == 2) {
        log("找到左上角返回上一页");
        this.clickArea(return_back_list[1]);
        sleep(800);
      }
      // 左上角的返回上一页
      let return_back = this.waitForDesc("返回上一页", 100, 1000);
      if (return_back) {
        log("找到“返回上一页”图标");
        this.clickArea(return_back);
        sleep(800);
      }
    }
    // 登录失效页面，有两个返回上一页
    let return_back_list = desc("返回上一页").find().toArray();
    log("返回上一页的个数：" + return_back_list.length);
    if (return_back_list && return_back_list.length == 2) {
      log("找到左上角返回上一页");
      this.clickArea(return_back_list[1]);
      sleep(800);
    }
    // 左上角的返回上一页
    let return_back = this.waitForDesc("返回上一页", 50, 1000);
    if (return_back) {
      log("找到“返回上一页”图标");
      this.clickArea(return_back);
      sleep(800);
    }
    console.log("退出检查登录失效方法");
  },
  // 检测登录状态是否失效，抛异常
  loginInvalid: function () {
    let loginFailureTip = this.waitForContainsText(
      "您的登录状态已失效",
      50,
      2000
    );
    if (loginFailureTip) {
      this.waitPrompt(1000);
      sleep(1000);
      // 登录失效页面，有两个返回上一页
      let return_back_list = desc("返回上一页").find().toArray();
      log("返回上一页的个数：" + return_back_list.length);
      if (return_back_list && return_back_list.length == 2) {
        log("找到左上角返回上一页");
        this.clickArea(return_back_list[1]);
        sleep(800);
      }
      // 左上角的返回上一页
      let return_back = this.waitForDesc("返回上一页", 50, 1000);
      if (return_back) {
        log("找到“返回上一页”图标");
        this.clickArea(return_back);
        sleep(800);
      }
      throw "账号异常";
    } else {
      log("登录未失效");
    }
  },
  // 关闭行程按钮
  closeDialog: function () {
    let dialog = this.waitForId("schedule_dialog_close_button", 50, 800);
    if (dialog) {
      dialog.click();
      sleep(800);
    }
    let dialogclose = this.waitForId("schedule_dialog_close", 50, 800);
    if (dialogclose) {
      dialogclose.click();
      sleep(800);
    }
  },
  // APP首页的4个操作（输入出发城市、到达城市，选择起飞日期，点击搜索）
  homeOperate: function (
    inputDeparture,
    inputDestination,
    inputDepartureDate,
    isSearch
  ) {
    //选择出发城市
    this.clickById(MAIN_PAGE_DEPARTURE_ID);
    this.inputPlaceCode(inputDeparture);
    // 选择到达城市
    this.clickById(MAIN_PAGE_DESTINATION_ID);
    this.inputPlaceCode(inputDestination);
    // 选择起飞日期
    this.inputDepartureDate(inputDepartureDate);
    // 检测选择的日期是否和目标日期一致
    this.checkDepartureDateIsTrue(inputDepartureDate);
    this.clickById(SEARCH_FLIGHT_BUTTON_ID);
    // isSearch为true为刷位，刷位等待时间
    this.waitPrompt(isSearch ? 10000 : 3000);
  },
  // 等待子节点
  waitForChild: function (parent, childId) {
    let child;
    let m = new Date().getTime() + 10000;
    do {
      child = parent.findOne(id(childId));
    } while (child == null && m >= new Date().getTime());
    if (child == null) {
      throw "waitForChild 不能找到 id：" + childId;
    }
    return child;
  },
  /**
   * 检测列表下是否有子节点，
   * 如果父节点的子节点还没有加载出来，也会返回没有子节点
   * @param {UICollection} collection 列表
   */
  checkCollection: function (collection, deep) {
    if (!deep) {
      deep = 1;
    }
    try {
      collection.toArray().forEach((parent) => {
        checkChildDeep(parent, 1, deep);
      });
    } catch (error) {
      return false;
    }

    return true;
  },
  // 点击返回按钮
  clickNavigateUp(interval, timeout) {
    let back_btn = this.waitForDesc("Navigate up", interval, timeout);
    if (back_btn) {
      while (!back_btn.click()) {
        sleep(10);
      }
    }
  },
};

// 检测子节点的深度
function checkChildDeep(parent, cur, deep) {
  if (cur > deep) {
    return;
  }
  parent
    .children()
    .toArray()
    .forEach((child) => {
      if (!child) {
        log("deep: %s, check children: %s", cur, child);
        throw "child null, deep: " + cur;
      }
      checkChildDeep(child, cur + 1, deep);
    });
}
