"ui";
auto();

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

const _muOrder = require('./muOrder');
_muOrder.setEnv(_env);
_muOrder.init(_app);

const DeviceStatusType = require("./DeviceStatusType.js"); //设备状态

var thread;

// 关闭稳定模式
$settings.setEnabled('stable_mode', false);
// 启用前台服务
$settings.setEnabled('foreground_service', true);
// 音量上键停止所有脚本
$settings.setEnabled('stop_all_on_volume_up', true);
// 屏蔽音量键调节声音
events.setKeyInterceptionEnabled("volume_up", true);

if (_env.debugMode) {
  log('稳定模式: ' + $settings.isEnabled('stable_mode'));
  log('前台服务: ' + $settings.isEnabled('foreground_service'));
  log('音量上键停止所有脚本: ' + $settings.isEnabled('stop_all_on_volume_up'));
}

//启用按键监听
events.observeKey();

// 监听音量下键按下
events.onKeyDown("volume_down", function (event) {
  thread = threads.start(function () {
    reportException(_ws.getCurrentRequest(), "1", "用户手动终止程序");
    _ws.close("手动退出");
    _ws.waitForDisconnected();
  })
  toastLog('按音量键下键停止');
  // 停止所有正在运行的脚本,包括当前脚本自身
  engines.stopAll();
  exit();
});

setScreenMetrics(_env.screenWidth, _env.screenHeight);

// 选择ip
showAddressUI();

//显示登录界面
function showAddressUI() {
  ui.layout(
    <frame w="*" h="*">
      <vertical>
        <appbar>
          <toolbar title="东航脚本 v1.2.6" />
        </appbar>

        <card w="*" h="40" margin="10" cardCornerRadius="2dp"
          cardElevation="1dp" gravity="center_vertical">
          <Switch
            id="autoService"
            text="无障碍服务"
            checked="{{auto.service != null}}"
            padding="8 8 8 8"
            textSize="15sp"
          />
        </card>
        {/* let serverIp = "ws://192.168.16.204:15910";//下单--204
        let serverIp = "ws://192.168.16.204:16910";//测试  */}
        <card w="*" h="40" margin="10" cardCornerRadius="2dp"
          cardElevation="1dp" gravity="center_vertical">
          <horizontal>
            <text text="选择IP" padding="18 8 8 8" gravity="center_vertical" />
            <spinner id="spinner" entries="东航APP下单生产地址|测试地址" />
          </horizontal>
        </card>

        <button id="confirm" text="确定" bg="#5e7ce0" textColor="white" />

        <horizontal gravity="center" marginTop="20">
          <button id="hideLog" text="关闭日志" bg="#ffffff" textColor="black" />
          <button id="showLog" text="显示日志" bg="#5e7ce0" textColor="white" />
        </horizontal>

      </vertical>
    </frame>
  );

  ui.hideLog.visibility = 8;//隐藏

  ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
      _app.startActivity({
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
      return;  //返回。不再往下执行
    };
    ui.confirm.attr('bg', "#adb0b8");
    ui.confirm.setEnabled(false);
    thread = threads.start(function () {
      let ipText = ui.spinner.getSelectedItem();
      let ip = '';
      if (ipText == '东航APP下单生产地址') {
        ip = '192.168.16.204:15910';
      } else if (ipText == '测试地址') {
        ip = '192.168.16.204:16910';
      }
      toast("您输入的IP地址为" + ip);
      //在新线程执行的代码
      main('ws://' + ip);
    });
  });

  ui.hideLog.on("click", () => {
    console.hide();
    ui.hideLog.visibility = 8;//隐藏
    ui.showLog.visibility = 0;//显示
  });

  ui.showLog.on("click", () => {
    console.hide();
    ui.hideLog.visibility = 0;//显示
    ui.showLog.visibility = 8;//隐藏
    setTimeout(function () {
      console.show();;
      console.setPosition(0, 600);
    }, 500)
  });

  // 将日志保存到手机本地
  // console.setGlobalLogConfig({
  //   "file": "/sdcard/脚本日志/mu-autojs-log.txt"
  // });
}

function main(serverIp) {
  // 这里写脚本的主逻辑
  if (_env.debugMode) {
    log("东航自动下单程序开始运行 DebugMode: %s", _env.debugMode);
  }
  try {
    // 启动app
    _dev.openApp();

    // 成功与否都退出当前账号，不需要获取当前账号信息
    // 获取当前账号信息
    // getAccountAndBackHome();

    initWebSocket(serverIp);

    setInterval(() => {
      let connected = _ws.isOpen();
      if (!connected) {
        console.log("连接失败！尝试重连中...");
        initWebSocket(serverIp);
      }
    }, 10000);

    const navigationBar = _app.waitForId('ctl_main', 200, 30000);
    while (!navigationBar) {
      toastLog('没找到导航栏，请重新重启手机');
    }
  } catch (error) {
    if (_env.debugMode) {
      log("出现异常 " + error);
    }
  } finally {
    // 检测是否回到首页，如果没有，则返回上一页，有返回主页的按钮直接点击按钮
    returnHomePage();
    reportReady();
    if (_env.debugMode) {
      log("线程执行完毕");
    }
    toastLog('可以接单啦！！！！');
  }
}

// 获取账号信息
function getAccountAndBackHome() {
  // 获取当前登录账号
  getAccount();
  if (_account.currentAccount) {
    // 点击返回
    _app.clickById('top_bar_left_img_btn');
    // 回滚到顶部
    let scrollView = _app.waitForId('recycler_view');
    scrollView.scrollBackward();
    sleep(500);
  }
  // 回到首页
  _app.home();
}

// 获取账号信息
function getAccount() {
  let currentAccount = _account.getCurrentAccount();
  if (currentAccount) {
    _account.currentAccount = currentAccount;
  } else {
    _account.currentAccount = null;
  }
  if (_env.debugMode) {
    log("获取当前账号成功 " + _account.currentAccount);
  }
}

function initWebSocket(serverIp) {
  if (_env.debugMode) {
    log("初始化websocket");
  }

  // 设备信息
  _ws.on("DeviceInfo", function (socket, request) {
    socket.send(JSON.stringify(_dev.getDeviceInfo(request)));
  });

  // 登录
  _ws.on("Login", function (socket, request) {
    reportProcessing();
    try {
      _account.login(request.data.createOrderAccountInfo.userName, request.data.createOrderAccountInfo.password);
    } catch (error) {
      reportException(request, "999", error, "登录时出现未知异常");
    } finally {
      reportReady();
    }
  });

  // 创建订单
  _ws.on("CreateTicketOrder", function (socket, request) {
    try {
      // 账号不一致，则重新登录
      _account.login(request.data.createOrderAccountInfo.userName, request.data.createOrderAccountInfo.password);
      _account.currentAccount = request.data.createOrderAccountInfo.userName;

      // 删除已存在的乘机人
      if (_account.currentAccount) {
        _account.delPassenger();
      }

      // 状态改为进行中
      reportProcessing();

      // 下单
      let orderData = _muOrder.order({
        createOrderRuleInfo: request.data.createOrderRuleInfo,
        flights: request.data.flights,
        price: request.data.cabinPriceInfos[0].ticketPrice,
        contactInfo: request.data.contactInfo,
        passengers: request.data.passengers,
        cabinPriceInfos: request.data.cabinPriceInfos,
        productCodes: request.data.productCodes
      });

      if (orderData) {
        log("订单下单成功");
        socket.send(JSON.stringify({
          isSuccess: true,
          message: "订单下单成功",
          method: request.method,
          requestId: request.requestId,
          data: orderData
        }));
      }
    } catch (error) {
      if (_env.debugMode) {
        log(error);
      }
      // 捕获抢登录的提示
      const loginTip = _app.waitForContainsText('您的会员账号', 100, 2000);
      if (loginTip) {
        const knownBtn = _app.waitForContainsText("我知道了", 100, 1000);
        if (knownBtn) {
          knownBtn.click();
        }
      } else {
        reportException(request, "999", error, "下单时出现异常");
      }
    } finally {
      returnHomePage();

      // 即将退出登录
      log('即将退出登录');
      _account.logout();

      reportReady();
    }
  });

  // 支付
  _ws.on("PayTicketOrder", function (socket, request) {
    try {
      // 下单完成后自动退出登录，每次进来，都需要重新登录
      _account.login(request.data.createOrderAccountInfo.userName, request.data.createOrderAccountInfo.password);
      _account.currentAccount = request.data.createOrderAccountInfo.userName;

      // 状态改为进行中
      reportProcessing();

      // 订单支付 
      let paymentResult = _muOrder.getOrderByOrderNo(request.data.orderNo, request.data.totalAmount, request.data.creditCardPayInfo);
      if (paymentResult) {
        socket.send(JSON.stringify({
          isSuccess: true,
          message: "订单支付成功",
          method: request.method,
          requestId: request.requestId,
        }));
      }
    } catch (error) {
      if (_env.debugMode) {
        log(error);
      }

      if (error == '余额不足') {
        const err = '余额不足，订单支付失败！！！订单号：' + request.data.orderNo + '，登录账号和密码：' + request.data.createOrderAccountInfo.userName + ' - ' + request.data.createOrderAccountInfo.password;
        reportException(request, "999", err, "下单时出现异常");
      }

      // 捕获抢登录的提示
      const loginTip = _app.waitForContainsText('您的会员账号', 100, 2000);
      if (loginTip) {
        const knownBtn = _app.waitForContainsText("我知道了", 100, 1000);
        if (knownBtn) {
          knownBtn.click();
          reportException(request, "999", '您的会员账号在另一台设备登录', "下单时出现异常");
        }
      } else {
        reportException(request, "999", error, "下单时出现异常");
      }
    } finally {
      returnHomePage();

      // 即将退出登录
      log('即将退出登录');
      _account.logout();

      reportReady();
    }
  });

  if (_env.debugMode) {
    log("websocket handler 已注册 准备连接服务器: " + serverIp);
  }
  _ws.initialize(serverIp, 10, true);
  if (_env.debugMode) {
    log("websocket初始化成功");
  }
  reportInitializing();
}

// 当前页面不是首页时，需要回到首页
function returnHomePage() {
  let homePageObject = _app.waitForContainsText('预订搜索', 100, 1000);
  while (homePageObject == null) {
    // 捕获抢登录的提示
    let knownBtn = _app.waitForContainsText("我知道了", 100, 1000);
    if (knownBtn) {
      knownBtn.click();
      sleep(500);
    }
    // 登录页面的返回按钮
    let back_frame = _app.waitForId("back_frame", 100, 1000);
    if (back_frame) {
      back_frame.click();
      sleep(500);
    }
    // 首页的图标ID
    let right_btn = _app.waitForId("top_bar_right_img_btn", 100, 1000);
    if (right_btn) {
      right_btn.click();
      sleep(500);
    }
    // 上一页的图标id
    let left_btn = _app.waitForId("top_bar_left_img_btn", 100, 1000);
    if (left_btn) {
      left_btn.click();
      sleep(500);
    }
    // 捕获抢登录的提示
    let login_tip = _app.waitForContainsText('您的会员账号', 100, 2000);
    if (login_tip) {
      const known_btn = _app.waitForContainsText("我知道了", 100, 1000);
      if (known_btn) {
        known_btn.click();
      }
    }
    // 温馨提示
    let btn_right = _app.waitForId("btn_right", 100, 1000);
    if (btn_right) {
      btn_right.click();
      sleep(500);
    }
    // 回到航班查询页会有提示层出现
    _app.closeDialog();
    if (!left_btn && !right_btn) {
      // 我的页面存在东航钱包
      let vipService = _app.waitForContainsText("东航钱包", 100, 1000);
      if (vipService) {
        _app.home();
        sleep(500);
      }
    }
    homePageObject = _app.waitForId('tv_booking_btn', 100, 1000);
  }
}

function reportException(request, code, error, detail) {
  if (_env.debugMode) {
    log("程序出现异常 %s", error);
  }
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