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
    log("获取当前登录账号中...");
    APP.me();

    // 设置按钮
    let settingBtn = APP.waitForId('settingBtn', 100, 8000);
    if (settingBtn) {
      settingBtn.click();
      sleep(1000);
    }
    // 点击账号绑定与设置
    APP.clickById('more_account_setting_layout');
    sleep(1000);

    let account = null;
    // 获取账号
    let phoneText = APP.getById('account_setting_phone_binding_num_text', 100, 3000);
    if (phoneText) {
      account = phoneText.text().substring(4);
    }
    return account;
  },
  // 登录功能
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
      if ((this.currentAccount.substring(0, 3) == parseInt(account.substring(0, 3))) && (this.currentAccount.substring(7) == parseInt(account.substring(7)))) {
        log("当前账号已经是需要登录的账号，返回主页");
        APP.home();
        return;
      } else if (this.currentAccount.substring(0, 3) != parseInt(account.substring(0, 3)) && this.currentAccount.substring(7) != parseInt(account.substring(7))) {
        throw "账号不一致";
      }
    }

    if (ENV.debugMode) {
      log("已进入登录页面，准备点击登录");
    }

    APP.me();

    // 看当前选择的登录方式（验证码登录、密码登录）
    // 密码输入块
    let pwdInputLayout = APP.waitForId("pwdInputLayout", 100, 3000);
    if (!pwdInputLayout) {
      // 点击密码登录
      let accoutLogin = APP.waitForId("tvAccoutLogin", 100, 3000);
      accoutLogin.click();
      sleep(500);
    }

    // 输入账号
    let accountInput = APP.getById("etInputAccount", 100, 3000);
    accountInput.click();
    // 存在清除按钮，则先清除
    let btnClean = APP.waitForId('btnClean', 100, 1000);
    if (btnClean) {
      btnClean.click();
      sleep(500);
    }
    accountInput.setText(account);
    sleep(500);

    // 输入密码
    let passwordInput = APP.getById("etPwd", 100, 3000);
    passwordInput.click();
    passwordInput.setText(password);
    sleep(500);
    if (ENV.debugMode) {
      log("账号密码已输入");
    }

    // 隐藏键盘
    APP.clickAreaByText('登录后更精彩');
    sleep(500);

    // 选择已阅读并同意协议
    APP.checkedById("btnProtocolAgree", true);
    if (ENV.debugMode) {
      log("已勾选登录协议");
    }

    // 点击登录
    APP.clickById("submitLayout");
    if (ENV.debugMode) {
      log("已点击登录");
    }

    // 点击同意隐私条款
    let positiveBtn = APP.waitForId('positiveBtn', 100, 3000);
    if (positiveBtn) {
      positiveBtn.click();
    }

    // 回到首页
    APP.home();
  },
  // 注销
  logout: function () {
    APP.me();

    // 点击设置图标
    let settingBtn = APP.waitForId('settingBtn', 100, 8000);
    settingBtn.click();
    sleep(1000);

    // 点击退出当前账号
    APP.clickById('logoutBtn');
    sleep(500);

    // 确定要退出登录
    let confirmButton = APP.getById("positiveBtn", 50, 1000);
    if (confirmButton) {
      confirmButton.click();
      if (ENV.debugMode) {
        log("退出登录已确认");
      }
    }

    APP.home();
  },
};
