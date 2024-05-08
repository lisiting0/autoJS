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
    const navigationBar = this.getById('bottom_tab_block', 200, 30000);
    const meUiObject = navigationBar.findOne(desc('我的'));
    meUiObject.click();
    log("已点击 '我' 按钮");
    // 滑动到顶部
    this.swipeToTop();
  },
  // 我的页面，点击首页按钮
  home: function () {
    log("前往首页");
    const navigationBar = this.getById('bottom_tab_block', 200, 30000);
    const homeUiObject = navigationBar.findOne(desc('首页'));
    homeUiObject.click();
    log("首页已打开");
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
  // 先滑动一定距离
  scroll300: function () {
    sleep(1000);
    swipe(_env.screenWidth / 2, 1260, _env.screenWidth / 2, 1260 / 2, 800);
    sleep(1000);
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
    sleep(1000);
  },
  // 关闭提示层
  closeDialog: function () {
    let tip = this.waitForContainsText("我知道了", 500, 5000);
    if (tip) {
      this.clickArea(tip);
      sleep(500);
    }
  },
  closeTip: function () {
    let closeBtn = this.waitForId('btn_close', 100, 2000);
    if (closeBtn) {
      closeBtn.click()
    }

    // 红包提示
    let redPacketCloseBtn = this.waitForId('red_packet_close', 100, 2000);
    if (redPacketCloseBtn) {
      redPacketCloseBtn.click()
    }
  },
  // 跳转到我的钱包页面
  toMEITUANCardPage: function () {
    this.me();

    sleep(5000);

    // 找到所有菜单的模块
    let recycleViewUiObject = this.waitForId('mbc_recycler', 100, 2000);
    while (!recycleViewUiObject) {
      recycleViewUiObject = this.waitForId('mbc_recycler', 100, 2000);
    }
    if (ENV.debugMode) {
      log('找到所有菜单的模块');
    }
    if (recycleViewUiObject) {
      let imageViewCollection = recycleViewUiObject.find(className('android.widget.ImageView').depth(14)).toArray();
      let frameLayoutCollection = recycleViewUiObject.find(className('android.widget.FrameLayout').depth(14));
      if (ENV.debugMode) {
        log('找到目标菜单的模块');
        if (imageViewCollection.length == 3) {
          log(frameLayoutCollection.get(3));
        } else {
          log(frameLayoutCollection.get(4));
        }
      }
      if (frameLayoutCollection) {
        // 如果存在HorizontalScrollView则选择第5个
        let frameLayout = null;
        let horizontalScrollView = null;
        if (imageViewCollection.length == 3) {
          frameLayout = frameLayoutCollection.get(3);
          horizontalScrollView = frameLayout.findOne(className('android.widget.HorizontalScrollView').depth(18));
        } else {
          frameLayout = frameLayoutCollection.get(4);
          horizontalScrollView = frameLayout.findOne(className('android.widget.HorizontalScrollView').depth(18));
        }
        log(horizontalScrollView);
        if (horizontalScrollView) {
          let viewGroupCollection = frameLayout.find(className('android.view.ViewGroup').depth(20));
          if (ENV.debugMode) {
            log('找到“我的钱包”');
            log(viewGroupCollection.get(5));
          }
          this.clickArea(viewGroupCollection.get(viewGroupCollection.size() - 1));
        } else {
          let viewGroupCollection = frameLayout.find(className('android.view.ViewGroup').depth(17));
          if (ENV.debugMode) {
            log('找到“我的钱包”');
            log(viewGroupCollection.get(0));
          }
          viewGroupCollection.get(0).click();
        }
      }
    }
    sleep(3000);

    // 偶尔会跳转到账单详情页面
    let detailPage = this.waitForContainsText('历史月刊', 100, 2000);
    if (detailPage) {
      this.clickByText('返回');
      sleep(1000);
    }

    // 找到xxx的钱包页面
    let walletPage = this.waitForContainsText('余额', 100, 2000);
    if (!walletPage) {
      log('没找到“xx的钱包页面”');
      let returnText = this.waitForContainsText('返回', 100, 1000);
      if (returnText) {
        this.clickByText('返回');
      } else {
        back();
      }
      sleep(1000);
      walletPage = this.waitForContainsText('余额', 100, 2000);
    }

    // xx余额页面找到美团卡入口
    let appIdUiObject = this.waitForId('app', 100, 5000);
    if (appIdUiObject) {
      let views = appIdUiObject.find(className('android.view.View').depth(15));
      log(views.size())
      // 第五组则是模板美团卡的菜单
      let menus = views.get(5).find(className('android.view.View').depth(17)).toArray();
      if (views.size() > 5 && menus.length > 10) {
        // 向左滑动
        views.get(5).scrollRight();
        sleep(3000);
        let mtk = this.waitForText('美团卡', 100, 5000);
        log(mtk)
        if (mtk) {
          this.clickArea(mtk);
        }
      }
    }
  },
  // 时间转码，用于https请求获取验证码
  getEscapeCurrentDate: function () {
    let currentDate = new Date();
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
    const d = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
    const h = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours();
    const min = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
    return y + '-' + m + '-' + d + '%20' + h + ':' + min;
  }
};