// 管理所有账户相关操作
var APP = null;
var ENV = null;
const SCROLL_VIEW = 'android.widget.ScrollView';
const VIEW_GROUP = 'android.view.ViewGroup';

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
  // 获取当前账号信息
  getCurrentAccount: function () {
    APP.me();

    sleep(2000);

    log('获取当前登录账号中...');
    let account;
    let loginUiObject = APP.waitForId('user_name', 100, 3000);
    if (loginUiObject && loginUiObject.text() == '点击登录') {
      account = null;
    } else {
      // 已登录
      // 点击设置，获取账号
      let settingUiObject = APP.waitForId('settings_layout', 100, 3000);
      if (settingUiObject) {
        settingUiObject.click();
        sleep(2000);
      }

      // 等待设置页面出现
      let settingPage = APP.waitForIdText('title', '设置', 100, 2000);
      while (!settingPage) {
        settingPage = APP.waitForIdText('title', '设置', 100, 2000);
      }

      // 账号与安全
      const accountSecurityUiObject = APP.waitForIdText('title', '账号与安全', 100, 2000);
      if (accountSecurityUiObject) {
        if (ENV.debugMode) {
          log('找到“账号与安全”');
        }
        APP.clickArea(accountSecurityUiObject);
        sleep(2000);
      }

      // 等待安全中心出现
      let securityPage = APP.waitForId('tv_titans_title_content', 100, 2000);
      while (!securityPage) {
        securityPage = APP.waitForId('tv_titans_title_content', 100, 2000);
      }

      sleep(5000);
      let phoneUiObject = textStartsWith('修改手机号码').findOne();
      if (phoneUiObject) {
        if (ENV.debugMode) {
          log('找到“修改手机号码”');
          log(phoneUiObject)
        }
        phoneUiObject = textStartsWith('修改手机号码').findOne();
        account = phoneUiObject.text().substring(7);
        log('获取到的手机号码：' + phoneUiObject.text().substring(7));
      }

      // 返回上一页
      APP.clickById('button_ll');

      sleep(1000);

      // 返回上一页
      APP.clickAreaById('left_bar_layout');
    }

    return account;
  },
  // 登录
  login: function (account, password) {
    // 滑动到顶部
    APP.swipeToTop();

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
    let clickLoginUiObject = APP.waitForId('user_name', 100, 3000);
    if (clickLoginUiObject && clickLoginUiObject.text() == '点击登录') {
      clickLoginUiObject.click();
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
    // 切换账号密码登录
    let userPasswordLoginUiObject = APP.waitForId('user_password_login', 100, 3000);
    if (userPasswordLoginUiObject) {
      if (ENV.debugMode) {
        log('切换账号密码登录');
      }
      userPasswordLoginUiObject.click();
    }
    // 清除账号
    APP.clickById('passport_mobile_delete');

    // 点击输入账号
    let mobileUiObject = APP.waitForId('passport_mobile_phone');
    if (mobileUiObject) {
      mobileUiObject.click();
      sleep(300);
      mobileUiObject.setText(account);
      sleep(300)
    }

    // 关闭键盘
    APP.closeKeyboard();
    sleep(1000);

    // 点击输入密码
    let passwordUiObject = APP.waitForId('edit_password');
    if (passwordUiObject) {
      passwordUiObject.click();
      sleep(300);
      passwordUiObject.setText(password);
      if (ENV.debugMode) {
        log('账号密码已输入');
      }
      sleep(300)
    }
    // 点击其他地方把键盘隐藏
    APP.closeKeyboard();
    sleep(1000);

    // 选择已阅读并同意协议
    let checkReadId = APP.waitForId('passport_account_checkbox', 100, 1000);
    while (!checkReadId) {
      checkReadId = APP.waitForId('passport_account_checkbox', 100, 1000);
    }
    APP.checkedById('passport_account_checkbox', true);
    if (ENV.debugMode) {
      log('已勾选登录协议');
    }
    sleep(300)

    APP.closeKeyboard();
    sleep(1000);

    // 点击登录
    let loginBtn = APP.waitForId('login_button', 100, 3000);
    if (loginBtn) {
      APP.clickArea(loginBtn);
      if (ENV.debugMode) {
        log('已点击登录');
      }
    }
    sleep(8000);

    let loginPage = APP.waitForId('passport_index_title', 100, 1000);
    let loginCount = 0;
    while (loginPage && loginCount < 2) {
      sleep(2000);
      APP.clickAreaById('login_button');
      loginCount++;
      loginPage = APP.waitForId('passport_index_title', 100, 1000);
    }

    if (loginCount == 2) {
      APP.clickById('close_button_layout');
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
    // 点击设置 
    let settingUiObject = APP.waitForId('settings_layout', 100, 3000);
    if (settingUiObject) {
      settingUiObject.click();
      sleep(2000);
    }
    // 点击退出登录
    let logoutBtn = APP.waitForId('logout', 100, 2000);
    // 存在退出登录按钮
    if (logoutBtn) {
      while (!logoutBtn.click()) {
        sleep(300);
      }
      let confirmButton = APP.waitForId('positive_button', 50, 1000);
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
      APP.clickAreaById('left_bar_layout');
    }
    sleep(2000);
    APP.home();
  },
  // 删除乘机人
  delPassenger: function () {
    // 点击首页火车票机票
    let mainFunUiObject = APP.waitForContainsText('火车票机票', 100, 1000);
    if (mainFunUiObject) {
      APP.clickArea(mainFunUiObject);
      sleep(3000);
    }

    // 进入我的页面
    let meUiObject = APP.waitForContainsText('我的', 100, 3000);
    if (meUiObject) {
      APP.clickArea(meUiObject.parent());
      sleep(3000);
    }

    let jump = APP.waitForContainsText('跳过', 100, 2000);
    if (jump) {
      APP.clickArea(jump);
    }

    // 等待个人中心文字出现
    let personalCenterTextUiObject = APP.waitForContainsText('个人中心', 100, 3000);
    while (!personalCenterTextUiObject) {
      personalCenterTextUiObject = APP.waitForContainsText('个人中心', 100, 3000);
    }
    sleep(2000);

    // 点击乘机人管理
    if (ENV.debugMode) {
      log('准备点击"乘机人管理"');
    }
    let passengerManagementUiObject = APP.waitForContainsText('乘机人管理', 100, 2000);
    while (!passengerManagementUiObject) {
      passengerManagementUiObject = APP.waitForContainsText('乘机人管理', 100, 1000);
    }
    APP.clickArea(passengerManagementUiObject.parent());
    sleep(2000);

    // 新账号，没有乘机人，退回首页
    let addPassengerBtn = APP.waitForText('添加乘机人', 100, 3000);
    log('是否不存在乘机人' + addPassengerBtn);
    if (!addPassengerBtn) {
      // 等待“新增乘机人”出现
      let waitAddPassengertUiObject = APP.waitForContainsText('新增乘机人', 100, 2000);
      if (ENV.debugMode) {
        log('等待“新增乘机人”出现' + waitAddPassengertUiObject);
      }
      while (!waitAddPassengertUiObject) {
        waitAddPassengertUiObject = APP.waitForContainsText('新增乘机人', 100, 2000);
      }
      sleep(2000);

      while (true) {
        try {
          // 滚动块
          let scrollableUiObject = className(SCROLL_VIEW).findOne();
          while (!scrollableUiObject) {
            scrollableUiObject = className(SCROLL_VIEW).findOne();
          }
          // 查找乘机人块
          let passengersBlock = scrollableUiObject.find(className(VIEW_GROUP).depth(11)).toArray();
          log(passengersBlock.length);
          if (passengersBlock.length > 2) {
            passengersBlock.forEach(element => {
              APP.clickArea(element);
              if (ENV.debugMode) {
                log('准备点击"单个乘机人"');
              }

              let waitEditPassengerTextUiObject = APP.waitForContainsText('编辑乘机人', 100, 2000);
              while (!waitEditPassengerTextUiObject) {
                waitEditPassengerTextUiObject = APP.waitForContainsText('编辑乘机人', 100, 2000);
              }

              let delTextUiObject = APP.waitForContainsText('删除', 100, 1000);
              if (delTextUiObject) {
                APP.clickArea(delTextUiObject);
                sleep(800);
                if (ENV.debugMode) {
                  log('点击"删除"');
                }

                let tip = APP.waitForContainsText('确认要删除此乘机人吗', 100, 2000);
                if (tip) {
                  let button1 = APP.waitForId('button1', 100, 1000);
                  if (button1) {
                    button1.click();
                    sleep(800);
                    if (ENV.debugMode) {
                      log('点击"删除提示"');
                    }
                  }
                  throw '删除成功，重新开始找乘机人';
                }
              }
            });
          }
          if (passengersBlock.length <= 2) {
            break;
          }
        } catch (error) {
          log(error)
        }
      }
    } else {
      APP.clickArea(addPassengerBtn.parent().parent());
      sleep(2000);
      log('添加一个乘机人')
      this.addPassenger();
    }

    // 回到首页 
    for (let index = 0; index < 3; index++) {
      // 返回上一页
      // gesture(200, [0, _env.screenHeight / 2], [_env.screenWidth * 0.8, _env.screenHeight / 2]);
      // sleep(1000);
      back();
      sleep(1000);
    }
  },
  addPassenger() {
    // 随机给添加一个乘机人，目的是方便下单添加乘机人，没有乘机人和有乘机人的情况页面长的不一样
    // 姓名
    let chineseNameUiObject = APP.waitForContainsText('请输入乘机人姓名', 100, 1000);
    if (chineseNameUiObject) {
      chineseNameUiObject.click();
      sleep(200);
      chineseNameUiObject.setText('许安树');
      sleep(800);
    }

    // 证件号
    let cardNoUiObject = APP.waitForContainsText('与乘机人的证件号码一致', 100, 1000);
    if (cardNoUiObject) {
      cardNoUiObject.click();
      sleep(200);
      cardNoUiObject.setText('510623198204225011');
      sleep(800);
    }

    // 手机号
    let phoneUiObject = APP.waitForContainsText('请输入乘机人手机号码', 100, 1000);
    if (phoneUiObject) {
      phoneUiObject.click();
      sleep(200);
      phoneUiObject.setText('13622219236');
      sleep(800);
    }
    APP.closeKeyboard();

    // 点击保存
    let saveBtn = APP.waitForContainsText('保存', 100, 1000);
    while (!saveBtn) {
      saveBtn = APP.waitForContainsText('保存', 100, 1000);
    }
    APP.clickArea(saveBtn);
    sleep(2000);
    log('点击保存');
  }
};