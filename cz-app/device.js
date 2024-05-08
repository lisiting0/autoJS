// 管理所有设备
const DeviceCapabilityType = require("./DeviceCapabilityType.js"); //设备可操作类型

var ACCOUNT = null;
var ENV = null;

module.exports = {
  setEnv: function (env) {
    ENV = env;
  },
  init: function (a) {
    ACCOUNT = a;
  },
  // 获取当天设备信息
  getDeviceInfo: function (request) {
    return {
      method: request.method,
      requestId: request.requestId,
      deviceInfo: {
        name: device.getAndroidId(),
        description: ENV.app.description,
        capabilities: [
          {
            type: DeviceCapabilityType.SearchFlights,
            supportedAirline: [ENV.app.supportedAirline],
          },
          {
            type: DeviceCapabilityType.CreateTicketOrder,
            supportedAirline: [ENV.app.supportedAirline],
          },
          {
            type: DeviceCapabilityType.SearchTicketOrders,
            supportedAirline: [ENV.app.supportedAirline],
          },
          {
            type: DeviceCapabilityType.GetTicketOrderDetail,
            supportedAirline: [ENV.app.supportedAirline],
          },
          {
            type: DeviceCapabilityType.CancelTicketOrder,
            supportedAirline: [ENV.app.supportedAirline],
          },
          {
            type: DeviceCapabilityType.Payment,
            supportedAirline: [ENV.app.supportedAirline],
          },
          {
            type: DeviceCapabilityType.LoginLogout,
            supportedAirline: [ENV.app.supportedAirline],
          },
        ],
        apiVersion: ENV.app.apiVersion,
        appVersion: ENV.app.version,
        loginInfo: {
          isLoggedIn: ACCOUNT.isLoggedIn(),
          account: ACCOUNT.currentAccount,
          appName: ENV.appName,
          airline: ENV.app.supportedAirline,
        },
      },
    };
  },
  // 启动App
  openApp: function () {
    toastLog("即将打开" + ENV.appName);
    launch(ENV.appPackageName);
    waitForPackage(ENV.appPackageName);
  },
  // 退出App
  closeApp: function () {
    var sh = new Shell(true);
    //强制停止app
    if(ENV.debugMode){
      log('强制停止app')
    }
    sh.exec("am force-stop " + ENV.appPackageName);
    sh.exit();
    sleep(1000);
    // wait for exit
  }
};
