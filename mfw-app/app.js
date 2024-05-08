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
  waitForDescStartsWith: function (elementText, interval, timeout) {
    let item = null;
    let i = interval || this.interval;
    let t = timeout || this.timeout;
    let m = new Date().getTime() + t;
    while (item == null && m >= new Date().getTime()) {
      item = descStartsWith(elementText).findOne(i);
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
  me: function () {
    log("前往 我 页面");
    let btn = this.getById('mineFl', 200, 30000);
    btn.click();
    log("已点击 '我' 按钮");
    this.swipeToTop();
  },
  // 回到首页
  home: function () {
    log("前往主页");
    let btn = this.getById('homeFl', 200, 30000);
    btn.click();
    log("主页已打开");
  },
  // 回滚到顶部
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
  waitForChild: function (parent, childId) {
    let child;
    let m = new Date().getTime() + 10000;
    do {
      child = parent.findOne(id(childId));
    } while (child == null && m >= new Date().getTime());
    if (child == null) {
      throw 'waitForChild 不能找到 id：' + childId;
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
  }
};

function checkChildDeep(parent, cur, deep) {
  if (cur > deep) {
    return;
  }
  parent.children().toArray().forEach((child) => {
    if (!child) {
      log('deep: %s, check children: %s', cur, child);
      throw 'child null, deep: ' + cur;
    }
    checkChildDeep(child, cur + 1, deep);
  });
}