"ui";
const _env = require("./env.js");
_env.debugMode = true;

const _ws = require("./ws.js");
_ws.setEnv(_env);

const _app = require("./app.js");
_app.setEnv(_env);

const _account = require("./account.js");
_account.setEnv(_env);
_account.init(_app);

const _dev = require("./device.js");
_dev.setEnv(_env);
_dev.init(_account);

const _flights = require("./flights.js");
_flights.setEnv(_env);
_flights.init(_app);

const _searchFlight = require("./searchFlight.js");
_searchFlight.setEnv(_env);
_searchFlight.init(_app);

const _order = require("./order.js");
_order.setEnv(_env);
_order.init(_app);

const DeviceStatusType = require("./DeviceStatusType.js"); //设备状态
const BOOK_HOME_ID = "book_home"; //右上角返回首页的ID
const MAIN_HOME_BTN_ID = "main_home_txt";
grantPermission();

var thread;

// 关闭稳定模式
$settings.setEnabled("stable_mode", false);
// 启用前台服务
$settings.setEnabled("foreground_service", true);
// 音量上键停止所有脚本
$settings.setEnabled("stop_all_on_volume_up", true);
// 屏蔽音量键调节声音
events.setKeyInterceptionEnabled("volume_up", true);

log("稳定模式: " + $settings.isEnabled("stable_mode"));
log("前台服务: " + $settings.isEnabled("foreground_service"));
log("音量上键停止所有脚本: " + $settings.isEnabled("stop_all_on_volume_up"));
changeProxy(":0");

//启用按键监听
events.observeKey();

// 监听音量下键按下
events.onKeyDown("volume_down", function (event) {
  thread = threads.start(function () {
    reportException(_ws.getCurrentRequest(), "1", "用户手动终止程序");
    _ws.close("手动退出");
    _ws.waitForDisconnected();
  });
  toastLog("手动终止程序");
  // 停止所有正在运行的脚本,包括当前脚本自身
  engines.stopAll();
  exit();
});

setScreenMetrics(_env.screenWidth, _env.screenHeight);

// 选择ip
showAddressUI();

//显示登录界面
function showAddressUI() {
  ui.layout(`
    <frame w="*" h="*">
      <vertical>
        <appbar>
          <toolbar title="南航脚本 v3.1.6" />
        </appbar>

        <card
          w="*"
          h="40"
          margin="10"
          cardCornerRadius="2dp"
          cardElevation="1dp"
          gravity="center_vertical"
        >
          <horizontal>
            <text
              text="设备的Android ID"
              padding="18 8 8 8"
              gravity="center_vertical"
            />
            <text
              text="{{device.getAndroidId()}}"
              padding="18 8 8 8"
              gravity="center_vertical"
            />
          </horizontal>
        </card>

        <card
          w="*"
          h="40"
          margin="10"
          cardCornerRadius="2dp"
          cardElevation="1dp"
          gravity="center_vertical"
        >
          <Switch
            id="autoService"
            text="无障碍服务"
            checked="{{auto.service != null}}"
            padding="8 8 8 8"
            textSize="15sp"
          />
        </card>

        {/* let serverIp = "ws://192.168.16.204:15910";//下单--204
        let serverIp = "ws://192.168.16.204:15911";//刷位--204
        let serverIp = "ws://192.168.16.149:15911";//下单--149
        let serverIp = "ws://192.168.16.204:16910";//测试  */}
        <card
          w="*"
          h="40"
          margin="10"
          cardCornerRadius="2dp"
          cardElevation="1dp"
          gravity="center_vertical"
        >
          <horizontal>
            <text text="选择IP" padding="18 8 8 8" gravity="center_vertical" />
            <spinner
              id="spinner"
              entries="南航APP下单生产地址|南航APP刷位生产地址|测试地址"
            />
          </horizontal>
        </card>

        <button id="confirm" text="确定" bg="#5e7ce0" textColor="white" />

        <horizontal gravity="center" marginTop="20">
          <button id="hideLog" text="关闭日志" bg="#ffffff" textColor="black" />
          <button id="showLog" text="显示日志" bg="#5e7ce0" textColor="white" />
        </horizontal>
      </vertical>
    </frame>`);

  ui.hideLog.visibility = 8; //隐藏

  ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
      app.startActivity({
        action: "android.settings.ACCESSIBILITY_SETTINGS",
      });
    }
    if (!checked && auto.service != null) {
      auto.service.disableSelf();
    }
  });

  // 当用户回到本界面时，resume事件会被触发
  ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
  });

  ui.confirm.on("click", () => {
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
      toastLog("请先开启无障碍服务！");
      return; //返回。不再往下执行
    }
    ui.confirm.attr("bg", "#adb0b8");
    ui.confirm.setEnabled(false);
    thread = threads.start(function () {
      let ipText = ui.spinner.getSelectedItem();
      let ip = "";
      if (ipText == "南航APP下单生产地址") {
        ip = "192.168.16.204:15910";
      } else if (ipText == "南航APP刷位生产地址") {
        ip = "192.168.16.204:15911";
      } else if (ipText == "测试地址") {
        ip = "192.168.16.204:16910";
      }
      toast("您输入的IP地址为" + ip);
      //在新线程执行的代码
      main("ws://" + ip);
    });
  });

  ui.hideLog.on("click", () => {
    console.hide();
    ui.hideLog.visibility = 8; //隐藏
    ui.showLog.visibility = 0; //显示
  });

  ui.showLog.on("click", () => {
    console.hide();
    ui.hideLog.visibility = 0; //显示
    ui.showLog.visibility = 8; //隐藏
    setTimeout(function () {
      console.show();
      console.setPosition(0, 600);
    }, 500);
  });
}

function main(serverIp) {
  // 这里写脚本的主逻辑
  log("南航自动下单程序开始运行 DebugMode: %s", _env.debugMode);

  var closeThread;
  try {
    // 启动app
    _dev.openApp();

    _app.loginFailure();

    _app.closeDialog();

    initWebSocket(serverIp);

    closeThread = threads.start(function () {
      closeAdsAndGetAccount();
    });

    setInterval(() => {
      let connected = _ws.isOpen();
      if (!connected) {
        console.log("连接失败！尝试重连中...");
        initWebSocket(serverIp);
      }
    }, 10000);
  } catch (error) {
    log("出现异常 " + error);
  } finally {
    // 检测是否回到首页
    goHomePage();
    closeThread.interrupt();
    log("线程执行完毕");
    toastLog("可以接单啦");
    reportReady();
  }
}

function closeAdsAndGetAccount() {
  let ad = _app.waitForId("close_btn", 50, 1000);
  if (ad) {
    if (_env.debugMode) {
      log("点击广告关闭按钮");
    }
    ad.click();
  }
  // 获取当前登录账号
  // getAccount();
  // _app.home();
}

function getAccount() {
  let currentAccount = _account.getCurrentAccount();
  if (currentAccount) {
    if (currentAccount === "未认证" || currentAccount === "卡号显示错误") {
      log("准备退出当前未认证账号");
      _account.logout();
      _account.currentAccount = null;
    } else {
      _account.currentAccount = currentAccount;
    }
  } else {
    _account.currentAccount = null;
  }
  log("获取当前账号成功 " + _account.currentAccount);
}

function changeProxy(proxyUrl) {
  // 设置代理
  const hasAdb = shell.checkAccess("adb");
  console.log(`adb: ${hasAdb}`);
  if (hasAdb) {
    const result = shell(`settings put global http_proxy ${proxyUrl}`, {
      adb: true,
    });
    console.log(result);
    toastLog(`设置代理 ${proxyUrl} 结果 ${result.code == 0 ? "成功" : "失败"}`);
  } else {
    toastLog(`设置代理失败没有adb权限`);
  }
}

function grantPermission() {
  const hasAdb = shell.checkAccess("adb");
  console.log(`adb: ${hasAdb}`);
  if (hasAdb) {
    const result = shell(
      `shell pm grant com.yuxiang.autojs.cz.app android.permission.WRITE_SECURE_SETTINGS`,
      {
        adb: true,
      }
    );
    console.log(result);
  } else {
    toastLog(`设置权限失败没有开启adb`);
  }
}

function initWebSocket(serverAddress) {
  log("初始化websocket");

  // 设备信息
  _ws.on("DeviceInfo", function (socket, request) {
    socket.send(JSON.stringify(_dev.getDeviceInfo(request)));
  });

  // 重置
  _ws.on("Reset", function (socket, request) {
    reportProcessing();
    try {
      _dev.closeApp();
      // wait for exit
      _dev.openApp();
      closeAdsAndGetAccount();
      socket.send(
        JSON.stringify({
          isSuccess: true,
          message: null,
          method: request.method,
          requestId: request.requestId,
          data: null,
        })
      );
    } catch (error) {
      reportException(request, "999", error, "重置时出现未知异常");
    } finally {
      reportReady();
    }
  });

  // 登录
  _ws.on("Login", function (socket, request) {
    reportProcessing();
    try {
      login(socket, request);
    } catch (error) {
      reportException(request, "999", error, "登录时出现未知异常");
    } finally {
      reportReady();
    }
  });

  // 创建订单
  _ws.on("CreateTicketOrder", function (socket, request) {
    try {
      const host =
        request.data.proxyHost === undefined ? "" : request.data.proxyHost;
      const proxyUrl = `${host}:${request.data.proxyPort}`;
      console.log(`proxy url: ${proxyUrl}`);
      changeProxy(proxyUrl);

      _app.loginFailure();
      // 获取当前登录账号
      getAccount();
      // 每次执行下单命令之前，判断账号是否一致，不一致则重新登录
      login(socket, request);
      // 检测登录是否失效
      _app.loginInvalid();
      // 删除乘机人
      if (_account.currentAccount) {
        _account.delPassenger();
      }
      reportProcessing();
      let adultCabinPriceInfo = request.data.cabinPriceInfos.filter(
        (c) => c.type == 0
      )[0];
      // 下单
      _flights.intoOrder({
        originAirport: request.data.flights[0].originAirport, // 出发城市
        destinationAirport: request.data.flights[0].destinationAirport, // 到达城市
        departureDate: request.data.flights[0].departureDateTime, // 起飞时间
        arrivalDate: request.data.flights[0].arrivalDateTime, // 到达时间
        cabin: adultCabinPriceInfo.cabin, // 舱位
        fullFlightNo: adultCabinPriceInfo.fullFlightNo, // 航班号
        price: adultCabinPriceInfo.ticketPrice, // OTA票面价
        settlementPrice: adultCabinPriceInfo.settlementPrice, // OTA结算价
        productCodes: request.data.productCodes, // 产品类型（青年特惠、学生特惠···）
        ticketPriceFloatRange:
          request.data.createOrderRuleInfo.ticketPriceFloatRange, // 票面价范围
        settlementPriceFloatRange:
          request.data.createOrderRuleInfo.settlementPriceFloatRange, // 结算价范围
        sellPriceFloatRange:
          request.data.createOrderRuleInfo.sellPriceFloatRange, // 买入价范围
        cabinPriceInfos: request.data.cabinPriceInfos,
        fixCabin: request.data.createOrderRuleInfo.fixCabin, // 是否固定舱位
      });

      // 到达下单页面
      let orderData = _order.inputInformationAndPayment(request);
      if (orderData) {
        let book_home = _app.waitForId(BOOK_HOME_ID, 50, 500);
        if (book_home) {
          while (!book_home.click()) {
            sleep(10);
          }
        }
        socket.send(
          JSON.stringify({
            isSuccess: true,
            message: "创建订单成功",
            method: request.method,
            requestId: request.requestId,
            data: orderData,
          })
        );
      }
    } catch (error) {
      log("捕获到异常：" + error);
      reportException(request, "999", error, "下单时出现异常");
      _app.loginFailure();
      if (error == "账号异常") {
        _account.currentAccount = null;
        exitAPP();
      }
    } finally {
      // 检测是否回到首页
      goHomePage();
      if (_account.currentAccount) {
        try {
          _account.logout();
        } catch (error) {
          reportException(request, "999", error, "注销出现异常");
          _app.loginFailure();
          // 检测是否回到首页
          goHomePage();
        }
      }
      reportReady();
    }
  });

  // 爬取
  // _ws.on("QueryTicket", function (socket, request) {
  //   // 每次执行下单命令之前，判断账号是否一致，不一致则重新登录
  //   login(socket, request);
  //   reportProcessing();
  //   // 查询订单
  //   try {
  //     let result = _flights.search(request, _ws);
  //     socket.send(
  //       JSON.stringify({
  //         isSuccess: true,
  //         message: null,
  //         method: request.method,
  //         requestId: request.requestId,
  //         data: result,
  //       })
  //     );
  //   } catch (error) {
  //     reportException(request, "999", error, "查询航班出现异常");
  //     let book_home = _app.waitForId(BOOK_HOME_ID, 100, 500);
  //     if (book_home) {
  //       while (!book_home.click()) {
  //         sleep(10);
  //       }
  //     }
  //     loginFailure();
  //     // 检测是否回到首页
  //     goHomePage();
  //     if (error == "账号异常") {
  //       _account.currentAccount = null;
  //       exitAPP();
  //     }
  //   } finally {
  //     reportReady();
  //   }
  // });

  var _queryTicketRunning = false;
  // 爬取有直减的运价
  _ws.on("QueryTicket", function (socket, request) {
    if (_queryTicketRunning) {
      socket.send(
        JSON.stringify({
          isSuccess: false,
          message: "已有程序正在运行",
          method: request.method,
          requestId: request.requestId,
        })
      );
      return;
    }
    _queryTicketRunning = true;
    // 查询订单
    try {
      // 获取当前登录账号
      getAccount();
      login(socket, request);
      reportProcessing();
      let result = _flights.searchDirectAirline(request, _ws);
      if (result) {
        const book_home = _app.waitForId(BOOK_HOME_ID, 100, 500);
        if (book_home) {
          while (!book_home.click()) {
            sleep(10);
          }
        }
        socket.send(
          JSON.stringify({
            isSuccess: true,
            message: null,
            method: request.method,
            requestId: request.requestId,
            data: result,
          })
        );
      }
    } catch (error) {
      reportException(request, "999", error, "查询航班出现异常");
      _app.loginFailure();
      // 检测是否回到首页
      goHomePage();
      if (error == "账号异常") {
        _account.currentAccount = null;
      }
    } finally {
      if (_account.currentAccount) {
        try {
          _account.logout();
        } catch (error) {
          reportException(request, "999", error, "注销出现异常");
          _app.loginFailure();
          // 检测是否回到首页
          goHomePage();
        }
      }
      reportReady();
      _queryTicketRunning = false;
    }
  });

  // 获取单个航班的运价(刷位)
  _ws.on("GetFlight", function (socket, request) {
    // 查询订单
    try {
      // 获取当前登录账号
      getAccount();
      login(socket, request);
      reportProcessing();
      let result = _searchFlight.searchFlight(request, _ws);
      if (result) {
        let book_home = _app.waitForId(BOOK_HOME_ID, 100, 500);
        if (book_home) {
          while (!book_home.click()) {
            sleep(10);
          }
        }
        socket.send(
          JSON.stringify({
            isSuccess: true,
            message: null,
            method: request.method,
            requestId: request.requestId,
            data: result,
          })
        );
      }
    } catch (error) {
      reportException(request, "999", error, "查询航班出现异常");
      _app.loginFailure();
      // 检测是否回到首页
      goHomePage();

      if (error == "账号异常") {
        _account.currentAccount = null;
      }
    } finally {
      if (_account.currentAccount) {
        try {
          _account.logout();
        } catch (error) {
          reportException(request, "999", error, "注销出现异常");
          _app.loginFailure();
          // 检测是否回到首页
          goHomePage();
        }
      }
      reportReady();
    }
  });

  log("websocket handler 已注册  准备连接服务器: " + serverAddress);

  _ws.initialize(serverAddress, 10, true);

  log("websocket初始化成功");
  reportInitializing();
}

// 当前页面不是首页时，需要回到首页
function goHomePage() {
  let wfObject = _app.waitForId(
    "include_main_home_view_booking_llyt_querybtn",
    50,
    1000
  );
  while (!wfObject) {
    // 可能位于加载中页面
    back();
    sleep(1000);

    // 首頁ID
    let book_home = _app.waitForId(BOOK_HOME_ID, 50, 500);
    if (book_home) {
      log("找到右上角首页的图标");
      while (!book_home.click()) {
        sleep(10);
      }
    }

    // 首頁ID
    let home_btn = _app.waitForId(MAIN_HOME_BTN_ID, 50, 500);
    if (home_btn) {
      log("找到右上角首页的图标");
      while (!home_btn.parent().click()) {
        sleep(10);
      }
    }

    wfObject = _app.waitForId(
      "include_main_home_view_booking_llyt_querybtn",
      50,
      1000
    );

    // 填写订单页面点击左上角返回
    let orderNotSubmit = _app.waitForContainsText("订单暂未提交", 50, 500);
    if (orderNotSubmit) {
      log("找到“订单暂未提交”提示");
      let button2Btn = _app.waitForId("button2", 50, 500);
      while (!button2Btn.click()) {
        sleep(10);
      }
    }

    // 登录失效页面，有两个返回上一页
    let return_back_list = desc("返回上一页").find().toArray();
    log("返回上一页的个数：" + return_back_list.length);
    if (return_back_list && return_back_list.length == 2) {
      log("找到左上角返回上一页");
      _app.clickArea(return_back_list[1]);
      sleep(300);
    }

    // 左上角的返回上一页
    let return_back = _app.waitForDesc("返回上一页", 50, 500);
    if (return_back) {
      log("找到“返回上一页”图标");
      _app.clickArea(return_back);
      sleep(300);
    }

    _app.clickNavigateUp(50, 500);

    // 关闭公告内容（航班列表会出现），有时候会卡在这
    let closeNotice = _app.waitForId("close", 50, 500);
    if (closeNotice) {
      while (!closeNotice.click()) {
        sleep(10);
      }
    }

    // 关闭系统弹框
    let cancel = _app.waitForId("button2", 50, 500);
    if (cancel) {
      while (!cancel.click()) {
        sleep(10);
      }
    }

    // 南航客票代购承诺书，有时候会卡在这
    let orderConfirmId = _app.waitForId("agreement_confirm_bt", 50, 500);
    if (orderConfirmId) {
      while (!orderConfirmId.click()) {
        sleep(10);
      }
    }

    _app.waitPrompt();
    _app.loginFailure();
    wfObject = _app.waitForId(
      "include_main_home_view_booking_llyt_querybtn",
      50,
      1000
    );
  }
  _app.closeDialog();
}

function exitAPP() {
  gesture(
    200,
    [0, _env.screenHeight / 2],
    [_env.screenWidth * 0.8, _env.screenHeight / 2]
  );
  sleep(300);
  gesture(
    200,
    [0, _env.screenHeight / 2],
    [_env.screenWidth * 0.8, _env.screenHeight / 2]
  );
  sleep(10000);
  _dev.openApp();
}

function login(socket, request) {
  _account.login(
    request.data.createOrderAccountInfo.userName,
    request.data.createOrderAccountInfo.password
  );
  _account.currentAccount = request.data.createOrderAccountInfo.userName;
}

function reportException(request, code, error, detail) {
  log("程序出现异常 %s", error);
  _ws.sendObject({
    isSuccess: false,
    method: request ? request.method : "Exception",
    requestId: request ? request.requestId : null,
    code: code,
    message: JSON.stringify({
      ex: error,
      detail: detail,
    }),
    data: null,
  });
}

function reportProcessing() {
  reportStatus(DeviceStatusType.Processing);
  log("设备状态已变更为 处理中");
}

function reportReady() {
  reportStatus(DeviceStatusType.Ready);
  log("设备状态已变更为 就绪");
}

function reportInitializing() {
  reportStatus(DeviceStatusType.Initializing);
  log("设备状态已变更为 初始化中");
}

function reportStatus(status) {
  _ws.sendObject({
    method: "StatusReport",
    requestId: guid(),
    status: status,
  });
}

function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
