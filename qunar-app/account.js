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
      log("当前账号：%s", this.currentAccount);
    }
    return !this.currentAccount;
  },
  // 获取当前登录账号信息
  getCurrentAccount: function () {
    let ignore = APP.waitForId("atom_atte_ignore_info", 50, 1000);
    if (ignore) {
      ignore.click();
    }

    log("获取当前登录账号中...");
    APP.me();

    sleep(2000);
    log(`点击用户`);
    click(300, 160); // 点击
    sleep(2000);

    let loginName = null;
    let phoneText = APP.waitForContainsText("手机");
    while (phoneText == null) {
      sleep(200);
      phoneText = APP.waitForContainsText("手机");
    }
    if (phoneText) {
      loginName = APP.waitForContainsText("+86").text().substring(4);
    }
    return loginName;
  },
  // 登录功能，暂时不需要
  login: function (account, password) {
    log("开始登录流程");

    if (ENV.debugMode) {
      log("当前账号: " + this.currentAccount);
    }

    if (!account) {
      throw "登录账号不能为空 " + account;
    }

    if (ENV.debugMode) {
      log("检查是否当前账号为需要登录账号");
    }

    if (this.currentAccount) {
      if (
        this.currentAccount.substring(0, 3) ==
          parseInt(account.substring(0, 3)) &&
        this.currentAccount.substring(7) == parseInt(account.substring(7))
      ) {
        log("当前账号已经是需要登录的账号，返回主页");
        APP.home();
        return;
      } else if (
        this.currentAccount.substring(0, 3) !=
          parseInt(account.substring(0, 3)) &&
        this.currentAccount.substring(7) != parseInt(account.substring(7))
      ) {
        // this.logout(account, password);
        throw "账号不一致";
      }
    }

    // APP.me();

    // let clickLogin = APP.waitForDesc("cmn_mine_rn|cmn_mine_rn_username")
    // clickLogin.click();

    // if (ENV.debugMode) {
    //   log("已进入登录页面，准备点击登录");
    // }

    // this.loginWay();
  },
  // 选择登录方式，暂时不需要
  loginWay: function (account, password) {
    // 切换为其他方式登录
    APP.clickById("atom_uc_ac_btn_other_ways_login");
    // 切换为账号密码登录
    APP.waitForId("atom_uc_iv_login_pwd", 100, 2000);
    APP.clickById("atom_uc_iv_login_pwd");

    // 点击输入账号
    let accountInput = APP.getById("atom_uc_et_input_name");
    accountInput.click();
    accountInput.setText(account); // 输入账号
    // 点击输入密码
    let passwordInput = APP.getById("atom_uc_et_input_pwd");
    passwordInput.click();
    passwordInput.setText(password); // 输入密码
    if (ENV.debugMode) {
      log("账号密码已输入");
    }

    // 选择已阅读并同意协议
    APP.checkedById("atom_uc_iv_protocol_checkbox", true);
    if (ENV.debugMode) {
      log("已勾选登录协议");
    }
    // 点击登录
    APP.clickAreaById("atom_uc_btn_confirm");
    if (ENV.debugMode) {
      log("已点击登录");
    }

    // 回到首页
    APP.home();
  },
  // 注销，暂时不需要
  logout: function () {
    APP.me();
    // 点击设置图标
    let settingIcon = APP.waitForDesc("cmn_mine_rn|cmn_mine_rn_setting");
    settingIcon.click();
    sleep(1500);
    // 点击退出登录
    APP.clickAreaByText("退出登录");
    let confirmButton = APP.waitForText("确定", 50, 1000);
    if (confirmButton) {
      confirmButton.click();
      if (ENV.debugMode) {
        log("退出登录已确认");
      }
    }
    APP.home();
  },
  // 删除乘机人
  delPassenger: function () {
    // 进入我的页面
    APP.me();
    // 滑动到底部
    // let scrollView = APP.getByDesc("cmn_mine_rn|cmn_mine_rn_main_container");
    // APP.scrollForward(scrollView);
    // sleep(500);
    // 点击常用信息
    let textObject = APP.waitForContainsText("常用信息", 100, 3000);
    if (textObject) {
      log("点击常用信息");
      textObject.parent().click();
      sleep(3000);
    }
    // 进入乘机人列表页面
    if (ENV.debugMode) {
      log("进入乘机人列表页面");
    }
    // 查找乘机人集合
    sleep(800);
    let scrollCount = 0;
    let passengerScrollView = APP.waitForId("list", 100, 3000);
    if (passengerScrollView) {
      let pre = 0;
      let current = passengerScrollView.boundsInParent().bottom;
      // 滑动三页
      while (
        passengerScrollView &&
        passengerScrollView.scrollForward() &&
        scrollCount < 3
      ) {
        sleep(500);
        scrollCount++;
        current = passengerScrollView.boundsInParent().bottom;
      }
      while (scrollCount >= 3 && pre != current) {
        scrollCount++;
        let passengerCollection = passengerScrollView.find(
          className("android.widget.LinearLayout")
        );
        passengerCollection.toArray().forEach((p, i) => {
          p.longClick();
          sleep(500);
          let error = _app.waitForContainsText("服务器错误", 100, 1000);
          if (error) {
            _app.clickAreaByTextContains("确定");
          }
          let tip = APP.waitForContainsText("确定要删除", 100, 2000);
          if (tip) {
            let btn = APP.waitForId("positiveButton", 100, 2000);
            if (btn) {
              while (!btn.click()) {
                sleep(10);
              }
            }
          }
          passengerScrollView = APP.waitForId("list", 50, 1000);
          pre = current;
          current = passengerScrollView.boundsInParent().bottom;
        });
      }
    }

    // 暂无常用旅客
    let empty = APP.waitForId("atom_uc_ac_info_list_empty_tv", 100, 3000);
    let passengerItems = null;
    if (passengerScrollView) {
      passengerItems = passengerScrollView.find(
        className("android.widget.LinearLayout").depth(12)
      );
      log(passengerItems.size());
    }
    if (empty || (passengerItems && passengerItems.size() < 3)) {
      // 动态添加两个旅客，目的是添加乘机人页面存在乘客和不存在乘客的情况下一致
      for (let index = 0; index < 3; index++) {
        // 点击新增旅客
        APP.clickById("atom_uc_ll_traveller_add");
        sleep(2000);

        // 姓名
        let userNameInput = APP.waitForId(
          "atom_uc_passenger_chinese_name_edit",
          100,
          2000
        );
        if (userNameInput) {
          APP.clickArea(userNameInput);
          sleep(200);
          if (index == 0) {
            userNameInput.setText("赵家春");
          } else if (index == 1) {
            userNameInput.setText("程志伟");
          } else {
            userNameInput.setText("王金桃");
          }
          sleep(500);
        }
        // 手机
        let phoneInput = APP.waitForId(
          "atom_uc_passenger_phone_num_edit",
          100,
          2000
        );
        if (phoneInput) {
          APP.clickArea(phoneInput);
          sleep(200);
          phoneInput.setText("13660264920");
          sleep(500);
        }
        // 证件号
        let cardNoInput = APP.waitForId(
          "atom_uc_passenger_identity_edit",
          100,
          2000
        );
        if (cardNoInput) {
          APP.clickArea(cardNoInput);
          sleep(200);
          if (index == 0) {
            cardNoInput.setText("510322196611252621");
          } else if (index == 1) {
            cardNoInput.setText("210124198510212217");
          } else {
            cardNoInput.setText("422422197809227317");
          }
          sleep(500);
        }

        // 隐藏键盘
        sleep(300);
        click(device.width - 1, 500);

        // 滑动到底部
        let svScrollView = APP.getById("atom_uc_sv_root");
        APP.scrollForward(svScrollView);
        sleep(500);

        // 同意
        APP.checkedById("atom_uc_cb_agree_privacy");
        sleep(500);

        APP.clickById("atom_uc_info_btn_confirm");
        sleep(2000);
      }
    }

    sleep(1000);

    // 检测是否有聊天窗口
    APP.checkNotificationLayout();

    // 点击返回按钮
    let back = APP.waitForId("atom_uc_ac_comm_tv_back", 100, 3000);
    if (back) {
      APP.checkedById("atom_uc_ac_comm_tv_back");
      sleep(500);
    }
    // 常用信息
    let mePage = APP.waitForContainsText("常用信息", 100, 3000);
    if (mePage) {
      APP.swipeToTop();

      // 广告页关闭
      let browser_left = _app.waitForId("browser_left", 50, 1000);
      if (browser_left) {
        browser_left.click();
        sleep(2000);
      }
    }
    APP.home();
  },
};
