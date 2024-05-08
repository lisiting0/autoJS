// 管理所有账户相关操作
var APP = null;
var ENV = null;

module.exports = {
  setEnv: function (env) {
    ENV = env;
  },
  init: function (a) {
    APP = a;
  },
  currentAccount: null,
  isLoggedIn: function () {
    if (ENV.debugMode) {
      log('当前账号：%s', this.currentAccount);
    }
    return !this.currentAccount;
  },
  getCurrentAccount: function () {
    APP.me();

    sleep(2000);

    log('获取当前登录账号中...');
    let account;
    let login = APP.waitForId('tv_login_or_register', 100, 3000);
    if (login) {
      account = null;
    } else {
      // 已登录
      let mineInfo = APP.waitForId('ll_mine_info', 100, 3000);
      if (mineInfo) {
        let scrollView = APP.waitForId('recycler_view');
        APP.scrollForward(scrollView);
        sleep(5000);

        APP.clickAreaByText('账户管理', 100, 2000);
        sleep(2000);

        const tip = APP.waitForContainsText('温馨提示', 100, 2000);
        if (tip) {
          APP.clickById('btn_left', 100, 1000);
        }
        let phoneText = APP.waitForId('mine_account_tel_content', 100, 3000);
        if (phoneText) {
          account = phoneText.text();
        }
      }
    }

    return account;
  },
  login: function (account, password) {
    // 滑动到顶部
    let scrollView = APP.waitForId('recycler_view');
    if (scrollView) {
      scrollView.scrollBackward();
      sleep(2000);
    }

    log('开始登录流程');

    if (ENV.debugMode) {
      log('当前账号: ' + this.currentAccount);
    }

    if (!account) {
      throw '登录账号不能为空 ' + account;
    }

    if (ENV.debugMode) {
      log('检查是否当前账号为需要登录账号');
    }

    if (this.currentAccount) {
      if ((this.currentAccount.substring(0, 3) == parseInt(account.substring(0, 3))) && (this.currentAccount.substring(7) == parseInt(account.substring(7)))) {
        log('当前账号已经是需要登录的账号，返回主页');
        APP.home();
        return;
      } else if (this.currentAccount.substring(0, 3) != parseInt(account.substring(0, 3)) && this.currentAccount.substring(7) != parseInt(account.substring(7))) {
        log('当前账号不是需要登录的账号，注销');
        this.logout();
      }
    }

    APP.me();

    // 点击登录
    let clickLogin = APP.waitForId('tv_login_or_register', 100, 3000);
    if (clickLogin) {
      clickLogin.click();
      sleep(1500);
      if (ENV.debugMode) {
        log('已进入登录页面，准备点击登录');
      }
    } else {
      // 已有账号，退出账号后登录
      this.logout();
      sleep(3000);
      APP.me();
      this.login(account, password);
      return;
    }
    // 点击输入账号
    let usernameLinearLayout = APP.waitForId('ed_username');
    if (usernameLinearLayout) {
      usernameLinearLayout.findOne(id('ed_input')).click();
      sleep(300);
      usernameLinearLayout.findOne(id('ed_input')).setText(account);
      sleep(300)
    }

    APP.closeKeyboard();
    sleep(1000);

    // 点击输入密码
    let passwordLinearLayout = APP.waitForId('ed_password');
    if (passwordLinearLayout) {
      passwordLinearLayout.findOne(id('ed_input')).click();
      sleep(300);
      passwordLinearLayout.findOne(id('ed_input')).setText(password);
      if (ENV.debugMode) {
        log('账号密码已输入');
      }
      sleep(300)
    }
    // 点击其他地方把键盘隐藏
    APP.closeKeyboard();
    sleep(1000);

    // 选择已阅读并同意协议
    let checkReadId = APP.waitForId('check_read', 100, 1000);
    while (!checkReadId) {
      checkReadId = APP.waitForId('check_read', 100, 1000);
    }
    APP.checkedById('check_read', true);
    if (ENV.debugMode) {
      log('已勾选登录协议');
    }
    sleep(300)

    APP.closeKeyboard();
    sleep(1000);

    // 点击登录
    let loginBtn = APP.waitForId('btn_login', 100, 3000);
    if (loginBtn) {
      APP.clickArea(loginBtn);
      if (ENV.debugMode) {
        log('已点击登录');
      }
    }
    sleep(10000);

    let loginPage = APP.waitForId('member_login', 100, 1000);
    let loginCount = 0;
    while (loginPage && loginCount < 2) {
      sleep(2000);
      let loginBtn = APP.waitForId('btn_login', 100, 3000);
      if (loginBtn) {
        APP.clickArea(loginBtn);
      }
      loginCount++;
      loginPage = APP.waitForId('member_login', 100, 1000);
    }

    if (loginCount == 2) {
      APP.clickAreaById('back_frame');
      sleep(2000);
      // 回到首页
      APP.home();
      sleep(2000);
      throw '请确认当前账号密码无误，登录失败！！！';
    }

    sleep(2000);
    // 回到首页
    APP.home();
  },
  // 注销
  logout: function () {
    APP.me();
    // 点击设置图标
    let settingIcon = APP.getById('iv_setting', 100, 30000);
    if (settingIcon) {
      log('点击设置图标')
      settingIcon.click();
      sleep(1500);
    }
    // 点击退出登录
    let logoutBtn = APP.waitForContainsText('退出', 100, 2000);
    if (logoutBtn) {
      while (!logoutBtn.click()) {
        sleep(300);
      }
      let confirmButton = APP.waitForContainsText('确定', 50, 1000);
      if (confirmButton) {
        while (!confirmButton.click()) {
          sleep(300);
        }
        if (ENV.debugMode) {
          log('退出登录已确认');
        }
        this.currentAccount = null;
      }
    } else {
      // 退出退出登录页面
      APP.clickById('top_bar_left_img_btn');
    }
    sleep(2000);
    APP.home();
  },
  // 删除乘机人
  delPassenger: function () {
    // 进入我的页面
    APP.me();
    sleep(1000);

    // 滑动到底部
    let scrollView = APP.waitForId('recycler_view');
    APP.scrollForward(scrollView);
    sleep(5000);

    // 点击账户管理
    if (ENV.debugMode) {
      log('准备点击账户管理');
    }
    let firstView = APP.waitForId('first_recycler_view', 100, 3000);
    while (!firstView) {
      firstView = APP.waitForId('first_recycler_view', 100, 3000);
    }
    const layout = firstView.find(className('android.widget.LinearLayout'));
    log('名字：' + layout.get(1).findOne(id('tv_name')).text())
    if (layout.get(1).findOne(id('tv_name')).text() == '账户管理') {
      layout.get(1).click();
      sleep(2000);
    } else {
      // 滚动到顶部
      APP.swipeToTop();
      // 回到首页
      APP.home();
      return;
    }

    const comTip = APP.waitForContainsText('温馨提示', 100, 2000);
    if (comTip) {
      APP.clickById('btn_left', 100, 1000);
    }
    sleep(2000);

    // 点击常用信息
    if (ENV.debugMode) {
      log('准备点击常用信息');
    }
    const genInfoBtn = APP.waitForId('mine_account_geninfo', 100, 5000);
    if (genInfoBtn) {
      if (ENV.debugMode) {
        log('点击常用信息');
      }
      while (!genInfoBtn.click()) {
        sleep(300)
      }
    } else {
      if (ENV.debugMode) {
        log('没有点击常用信息');
      }
      // 点击返回按钮
      APP.clickById('top_bar_left_img_btn', 100, 1000);
      sleep(500);
      // 滚动到顶部
      APP.swipeToTop();
      // 回到首页
      APP.home();
      return;
    }

    // 查找乘机人集合
    sleep(5000);

    let scrollCount = 0;
    let passengerScrollView = APP.waitForId('mine_geninfo_rv', 50, 2000);
    if (ENV.debugMode) {
      log('进入乘机人列表页面');
    }
    if (passengerScrollView && passengerScrollView.scrollable()) {
      let pre = 0;
      let current = passengerScrollView.boundsInParent().bottom;
      // 滑动三页
      if (ENV.debugMode) {
        log('滑动3页');
      }
      while (passengerScrollView.scrollForward() && scrollCount < 3) {
        sleep(500);
        scrollCount++;
        current = passengerScrollView.boundsInParent().bottom;
      }

      let passengerCount = 5;
      while (scrollCount >= 3 && pre != current) {
        scrollCount++;
        passengerScrollView = APP.waitForId('mine_geninfo_rv', 50, 1000);
        pre = current;
        current = passengerScrollView.boundsInParent().bottom;
      }
      let delCount = 0;
      while (scrollCount >= 3 && passengerCount != delCount) {
        sleep(3000);
        passengerScrollView = APP.waitForId('mine_geninfo_rv', 50, 1000);
        let passengerCollection = passengerScrollView.find(className('android.widget.FrameLayout'));
        let swipeContent = passengerCollection.get(passengerCollection.size() - 1).findOne(id('swipe_content'));
        if (swipeContent == null) {
          return;
        }
        let swipeBounds = swipeContent.bounds();
        if (swipeBounds) {
          swipe(swipeBounds.centerX(), swipeBounds.centerY(), swipeBounds.centerX() - 150, swipeBounds.centerY(), 500);
          sleep(1000);
          let swipeRight = swipeContent.parent().findOne(id('swipe_right'));
          log('swipeRight' + swipeRight);
          if (swipeRight) {
            swipeRight.child(0).click();
            sleep(500);
            delCount++;
            log('删除的人数' + delCount);
            let tip = APP.waitForContainsText('温馨提示', 100, 2000);
            if (tip) {
              let btn = APP.waitForId('dialog_iv_dlg_btn_right', 100, 1000);
              if (btn) {
                while (!btn.click()) {
                  sleep(10);
                }
              }
            }
          }
        }
      }
    }
    let vipService = _app.waitForContainsText("东航钱包", 100, 1000);
    while (!vipService) {
      // 点击返回按钮
      APP.clickById('top_bar_left_img_btn', 100, 1000);
      sleep(500);
      // 滚动到顶部
      APP.swipeToTop();
      sleep(1000);
      vipService = _app.waitForContainsText("东航钱包", 100, 1000);
    }
    // 回到首页
    APP.home();
  }
};