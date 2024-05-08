// 管理所有账户相关操作

var APP = null;
var ENV = null;

const ACCOUNT_NAME_ID = "tv_title_name"; // 账户名称
const AUTH_STATE_ID = "tv_auth_state"; // 账号实名验证状态：未认证、已认证
const MEMBER_NUMBER_ID = "mine_member_level_part_member_number_tv"; // 账号
const ENTER_LOGIN_BUTTON_ID = "tv_login_context"; // 进入登录页面按钮
const MEMBER_NUMBER_LOGIN_RADIO_ID = "activity_login_type_right_radioButton"; //账号登录切换按钮
const MEMBER_NUMBER_LOGIN_PANEL_ID = "activity_login_llyt_member_layout"; //账号登录面板
const LAST_ACCOUNT_DELETE_BUTTON_ID = "activity_login_userid_delete_btn";
const LOGIN_ACCOUNT_ID = "activity_login_et_member_account"; // 登录账号输入框
const LOGIN_PASSWORD_ID = "activity_login_et_member_password_id"; // 登录密码输入框
const LOGIN_CHECK_ID = "activity_login_privacy_policy"; // 登录协议checkbox
const LOGIN_BUTTON_ID = "activity_login_btn_login_button"; // 登录按钮
const LOGIN_SAVE_ACCOUNT_ID = "activity_login_tbtn_save_account_tip"; // 记住登录
const SETTING_ID = "img_setting"; // 设置按钮图标
const LOGOUT_BUTTON_ID = "tv_loginLogout";
const SCROLL_VIEW = "android.widget.ScrollView"; //我的页面滑动块
const PASSEGNGER_LISR_SCROLL_VIEW =
  "book_activity_passenger_list_rv_passengerList"; //乘机人滑动块
const PASSENGER_LAYOUT_ID = "book_item_my_passenger_layout_psgInfo"; //乘机人块
const PASSENGER_CHECK_ID = "book_item_my_passenger_cb_check"; //乘机人选择框
const PASSENGER_DEL_ID = "book_activity_passenger_list_menu_delete"; //删除按钮id

module.exports = {
  setEnv: function (env) {
    ENV = env;
  },
  init: function (a) {
    APP = a;
  },
  currentAccount: null,
  // 账号信息，用于判断是否登录
  isLoggedIn: function () {
    if (ENV.debugMode) {
      log("当前账号：%s", this.currentAccount);
    }
    return !this.currentAccount;
  },
  // 获取当前账号信息
  getCurrentAccount: function () {
    log("获取当前登录账号中...");

    APP.me();

    let authState = APP.waitForId(AUTH_STATE_ID, 50, 1000);
    if (!authState) {
      authState = APP.waitForId("mine_new_auth_state_iv", 50, 1000);
      if (!authState) {
        return null;
      }
    }

    const newPearlCard = APP.waitForId("pearlCard", 200, 2000);
    if (newPearlCard) {
      // 判断是否已登录
      let memberName = APP.waitForContainsText("明珠会员", 50, 1000);
      if (!memberName) {
        return null;
      }

      APP.getById("mine_new_scrollview").scrollBackward();
      memberName = APP.getByTextContains("明珠会员");
      memberName.parent().children().toArray()[2].click(); // 展示卡号
      sleep(1000);
      memberName = APP.getByTextContains("明珠会员");
      return memberName.parent().children().toArray()[1].text();
    } else {
      // 已登录，但卡号显示***
      let cardNo = "*";
      let count = 0;
      while (cardNo.includes("*") && count < 10) {
        if (ENV.debugMode) {
          log("等待账号出现中");
        }
        APP.loginInvalid();
        let accountUiObject = APP.getById(MEMBER_NUMBER_ID, 100, 5000);
        cardNo = accountUiObject.text().split(" ").join("");
        count++;
      }
      if (count > 10) {
        APP.home();
        sleep(800);
        APP.me();
        getCurrentAccount();
      }

      if (cardNo.length < 12) {
        return null;
      } else {
        return cardNo;
      }
    }
  },
  // 账号密码登录
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

    // if (this.currentAccount === account) {
    //   log("当前账号已经是需要登录的账号，返回主页");
    //   APP.home();
    //   return;
    // }

    // if (this.currentAccount && this.currentAccount != account) {
    //   this.logout();
    // }

    if (this.currentAccount) {
      APP.loginInvalid();
      this.logout();
    }
    log(`当前${this.currentAccount}`);

    APP.me();

    const old = APP.waitForId("ll_head_portrait", 100, 2000);
    if (old) {
      old.click();
    } else {
      APP.clickById("mine_new_head", 100, 2000);
    }
    // APP.clickAreaById(ENTER_LOGIN_BUTTON_ID);

    if (ENV.debugMode) {
      log("已进入登录页面，准备点击会员登录");
    }

    if (!id(MEMBER_NUMBER_LOGIN_PANEL_ID).exists()) {
      if (ENV.debugMode) {
        log("需要点击会员登陆");
      }

      // 切换为会员登录
      APP.clickById(MEMBER_NUMBER_LOGIN_RADIO_ID);

      APP.waitForId(MEMBER_NUMBER_LOGIN_PANEL_ID, 100, 2000);
    }

    if (ENV.debugMode) {
      log("已进入会员登录页面，准备删除上次的账号");
    }

    // 历史遗留的账号删除
    let deleteBtn = APP.waitForId(LAST_ACCOUNT_DELETE_BUTTON_ID, 100, 1000);
    if (deleteBtn) {
      deleteBtn.click();
    }

    // 点击输入账号
    let accountInput = APP.getById(LOGIN_ACCOUNT_ID);
    APP.clickArea(accountInput);
    accountInput.setText(account); // 输入账号
    // 点击输入密码
    let passwordInput = APP.getById(LOGIN_PASSWORD_ID);
    APP.clickArea(passwordInput);
    passwordInput.setText(password); // 输入密码

    if (ENV.debugMode) {
      log("账号密码已输入");
    }

    // 选择已阅读并同意协议
    APP.checkedById(LOGIN_CHECK_ID, true);
    APP.checkedById(LOGIN_SAVE_ACCOUNT_ID, true);
    if (ENV.debugMode) {
      log("已勾选登录协议");
    }

    // 点击登录
    APP.clickById(LOGIN_BUTTON_ID);
    if (ENV.debugMode) {
      log("已点击登录");
    }

    let loginFailure = APP.waitForContainsText(
      "您输入的用户名、密码不匹配哟",
      50,
      1000
    );
    if (loginFailure) {
      let btn = APP.waitForId("button1", 50, 500);
      if (btn) {
        while (!btn.click()) {
          sleep(10);
        }
      }
      throw "您输入的用户名、密码不匹配";
    }

    let loginFailure2 = APP.waitForContainsText(
      "您的账户因连续5次输错密码",
      50,
      1000
    );
    if (loginFailure2) {
      let btn = APP.waitForId("button1", 50, 500);
      if (btn) {
        while (!btn.click()) {
          sleep(10);
        }
      }
      throw "您的账户因连续5次输错密码而需要冻结24小时，请耐心等待。";
    }

    let tip = APP.waitForContainsText("尊敬", 50, 1000);
    if (tip) {
      let cancleBtn = APP.waitForContainsText("取消", 50, 500);
      if (cancleBtn) {
        while (!cancleBtn.click()) {
          sleep(10);
        }
      }
    }

    console.log("登录完成准备回到首页");
    sleep(3000);

    // 回到首页
    APP.home();
  },
  // 注销
  logout: function () {
    APP.me();

    const setting = APP.waitForId(SETTING_ID, 200, 2000);
    if (setting) {
      setting.click();
    } else {
      APP.clickById("mine_new_setting_img");
    }

    // 点击退出登录
    let loginId = APP.waitForId(LOGOUT_BUTTON_ID, 100, 1000);
    if (loginId) {
      APP.clickById(LOGOUT_BUTTON_ID);
    }

    if (ENV.debugMode) {
      log("等待退出登录确认按钮");
    }

    let confirmButton = APP.waitForText("确定", 50, 1000);
    if (confirmButton) {
      confirmButton.click();
      if (ENV.debugMode) {
        log("退出登录已确认");
      }
      sleep(800);
    }

    if (ENV.debugMode) {
      log("账号已退出");
    }

    APP.clickNavigateUp(100, 1000);

    let cancelBtn = APP.waitForId("button2", 200, 2000);
    if (cancelBtn) {
      cancelBtn.click();
    }

    console.log("注销完成准备回到首页");
    sleep(3000);

    APP.home();
  },
  // 删除乘机人
  delPassenger: function () {
    // 进入我的页面
    APP.me();
    // 登录失效
    APP.loginInvalid();
    // 滑动到底部
    let scrollView = className(SCROLL_VIEW);
    scrollView.scrollForward();
    sleep(700);
    // 点击常用乘机人
    let textObject = APP.waitForContainsText("常用乘机人", 100, 2000);
    if (textObject) {
      textObject.parent().click();
    } else {
      // 新版乘机人列表
      let basicInfo = APP.waitForContainsText("基本信息", 100, 2000);
      basicInfo.parent().parent().click();
      textObject = APP.waitForContainsText("常用乘机人", 100, 2000);
      if (textObject) {
        textObject.parent().click();
      }
    }
    // 进入乘机人列表页面
    if (ENV.debugMode) {
      log("进入乘机人列表页面");
    }
    APP.loginInvalid();
    let netError = APP.waitForContainsText("您的网络好像不给力哦", 200, 2000);
    if (netError) {
      APP.clickByTextContains("确定");
      sleep(500);
    } else {
      // 等待乘机人加载 如果超时未加载则
      let passengerCollection = id(PASSENGER_LAYOUT_ID).find();
      let retry = 60;
      while (
        retry > 0 &&
        (!passengerCollection || passengerCollection.empty())
      ) {
        retry--;
        console.log("等待加载乘机人列表");
        sleep(1000);
        passengerCollection = id(PASSENGER_LAYOUT_ID).find();
      }

      if (!passengerCollection || passengerCollection.empty()) {
        let retry = 5;
        while (retry > 0) {
          back();
          sleep(1500);
          retry--;
          let text = APP.waitForText("乘机人信息管理", 100, 1000);
          if (!text) {
            break;
          }
        }

        scrollView.scrollBackward();
        sleep(500);
        APP.home();
        return;
      }

      // 查找乘机人集合
      let scrollCount = 0;
      let passengerScrollView = APP.waitForId(
        PASSEGNGER_LISR_SCROLL_VIEW,
        100,
        2000
      );
      let checkCount = [];
      while (passengerScrollView && passengerScrollView.scrollForward()) {
        sleep(700);
        scrollCount++;
        if (scrollCount > 2) {
          passengerCollection = APP.getListById(PASSENGER_LAYOUT_ID);
          passengerCollection.toArray().forEach((p) => {
            let checkPassenger = p.findOne(id(PASSENGER_CHECK_ID));
            let checkPassengerName = p.findOne(
              id("book_item_my_passenger_cb_check")
            );
            if (checkPassenger) {
              sleep(500);
              if (checkPassenger.checked() == false) {
                checkPassenger.click();
                if (checkPassengerName) {
                  checkCount.push(checkPassengerName.text());
                }
              }
            }
          });
        }
      }
      sleep(700);
      // 删除乘机人
      if (checkCount.length > 0 && APP.waitForId(PASSENGER_DEL_ID, 200, 1000)) {
        APP.clickById(PASSENGER_DEL_ID);
        sleep(1000);
        APP.waitPrompt();
        sleep(1000);
        APP.waitPrompt();
        sleep(1000);
      }
    }
    // 我的页面有可能找不到“常用乘机人”菜单，导致找不到返回按钮
    APP.clickNavigateUp(100, 1000);
    sleep(500);

    scrollView.scrollBackward();
    sleep(500);
    APP.home();
  },
};
