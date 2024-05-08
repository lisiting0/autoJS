// 所有 this 公共操作
var ENV = null;
var ScreenCenterX = 0,
  ScreenUpperY = 0,
  ScreenLowerY = 0,
  DateWidth = 0,
  Step = 0;

const TOP_HEIGHT = 231;

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
  clickByDesc: function (elementDesc, interval, timeout) {
    this.getByDesc(elementDesc, interval, timeout).click();
  },
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
      this.clickArea(item);
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
  me() {
    log("前往 我 页面");
    const navigationBar = this.getById('ctl_main', 200, 30000);
    const layout = navigationBar.find(className('android.widget.RelativeLayout'));
    layout.get(3).click();
    log("已点击 '我' 按钮");
    // 滑动到顶部
    this.swipeToTop();
  },
  home: function () {
    log("前往主页");
    const navigationBar = this.getById('ctl_main', 200, 30000);
    const layout = navigationBar.find(className('android.widget.RelativeLayout'));
    layout.get(0).click();
    log("主页已打开");
  },
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
  scrollForward: function (scrollable, t) {
    scrollable.scrollForward();
    sleep(t | 500);
  },
  // 点击其他地方把键盘隐藏
  closeKeyboard: function () {
    sleep(300);
    click(device.width - 1, 400);
  },
  // 关闭提示层
  closeDialog: function () {
    let tip = this.waitForId("coverFlow_dialog", 500, 5000);
    while (tip) {
      let btn = this.waitForId('btn_left', 100, 1000);
      if (btn) {
        while (!btn.click()) {
          sleep(10);
        }
      }
      tip = this.waitForId("coverFlow_dialog", 100, 1000);
      sleep(500);
      if (tip == null) {
        break;
      }
    }
  }
};