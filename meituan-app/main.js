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

/**
 * 绑卡
 */
const _bindCard = require('./bindCard');
_bindCard.setEnv(_env);
_bindCard.init(_app);

/**
 * 账单详情
 */
const _billingDetails = require('./billingDetails');
_billingDetails.setEnv(_env);
_billingDetails.init(_app);

/**
 * 下单
 */
const _order = require('./order');
_order.setEnv(_env);
_order.init(_app);

/**
 * 支付和获取订单号、票号
 */
const _orderDetail = require('./orderDetail');
_orderDetail.setEnv(_env);
_orderDetail.init(_app);

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
          <toolbar title="美团脚本 v1.0.2" />
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
            <spinner id="spinner" entries="美团APP下单生产地址|测试地址" />
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
      if (ipText == '美团APP下单生产地址') {
        ip = '192.168.16.204:15910';
      }
      else if (ipText == '测试地址') {
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
}

/**
 * 主线程
 * @param {IP} serverIp
 */
function main(serverIp) {
  // 这里写脚本的主逻辑
  if (_env.debugMode) {
    log("东航自动下单程序开始运行 DebugMode: %s", _env.debugMode);
  }
  try {
    // 启动app
    _dev.openApp();

    _app.closeTip();

    // 成功与否都退出当前账号，不需要获取当前账号信息
    // 获取当前账号信息
    getAccountAndBackHome();

    initWebSocket(serverIp);

    setInterval(() => {
      let connected = _ws.isOpen();
      if (!connected) {
        console.log("连接失败！尝试重连中...");
        initWebSocket(serverIp);
      }
    }, 10000);
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

  // 登录，暂不需要
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
      // 关闭一些提示框
      _app.closeTip();

      // 删除已存在的乘机人
      _account.delPassenger();

      // 状态变为进行中
      reportProcessing();

      // 下单
      let orderData = _order.createOrder({
        createOrderRuleInfo: request.data.createOrderRuleInfo,
        flights: request.data.flights,
        price: request.data.cabinPriceInfos[0].ticketPrice,
        contactInfo: request.data.contactInfo,
        passengers: request.data.passengers,
        cabinPriceInfos: request.data.cabinPriceInfos,
        productCodes: request.data.productCodes
      });

      if (orderData) {
        // 回到首页
        returnHomePage();

        // 去详情获取订单号 
        let passengeFullName = [];
        request.data.passengers.forEach(element => {
          if (element.name.secondary) {
            passengeFullName.push(element.name.primary + ' ' + element.name.secondary);
          } else {
            passengeFullName.push(element.name.primary);
          }
        });

        let result = _orderDetail.getOrderNo(passengeFullName, orderData.totalPrice);
        if (result) {
          orderData.orderNo = result.orderNo;
        } else {
          // 重试获取订单号
          result = _orderDetail.getOrderNo(passengeFullName, orderData.totalPrice);
          if (result) {
            orderData.orderNo = result.orderNo;
          } else {
            log('重试获取订单号还是失败');
            throw '获取订单号异常';
          }
        }
        log('成功结果：' + JSON.stringify(orderData));
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
      reportException(request, "999", error, "下单异常");
    } finally {
      returnHomePage();
      reportReady();
    }
  });

  // 支付
  _ws.on("PayTicketOrder", function (socket, request) {
    try {
      // 关闭一些提示框
      _app.closeTip();

      // 状态变为进行中
      reportProcessing();

      // 支付
      let orderDetail = _orderDetail.orderToBePaid(request.data.orderNo, request.data.payAmount, request.data.payPassword, request.data.createOrderAccountInfo.userName);
      log('支付成功与否的结果:' + JSON.stringify(orderDetail));
      if (orderDetail && orderDetail.paySuccess == true) {
        socket.send(JSON.stringify({
          isSuccess: true,
          message: "订单支付成功",
          method: request.method,
          requestId: request.requestId,
          data: {
            orderNo: orderDetail.orderNo,// 订单号
            paymentSerialNumber: "",
            payAmount: orderDetail.payAmount,// 支付金额
            discountAmount: 0, // 优惠金额
            currency: "CNY",// 人民币
            paymentTime: new Date(), // 支付时间
            paymentType: "美团卡支付",
          }
        }));
      } else {
        throw '订单支付失败' + request.data.orderNo;
      }
    } catch (error) {
      if (_env.debugMode) {
        log(error);
      }
      reportException(request, "999", error, "下单异常");
    } finally {
      returnHomePage();
      reportReady();
    }
  });

  // 获取订单号和票号
  _ws.on("GetTicketNo", function (socket, request) {
    try {
      // 关闭一些提示框
      _app.closeTip();

      // 状态变为进行中
      reportProcessing();

      // 获取订单号和票号
      let orderDetail = _orderDetail.getTicketNo(request.data.fullFlightNo, request.data.orderNo.replace(" ", ""));
      if (orderDetail) {
        socket.send(JSON.stringify({
          isSuccess: true,
          message: "成功获取票号",
          method: request.method,
          requestId: request.requestId,
          data: orderDetail
        }));
      } else {
        throw '获取票号异常';
      }
    } catch (error) {
      if (_env.debugMode) {
        log(error);
      }
      reportException(request, "999", error, "下单异常");
    } finally {
      returnHomePage();
      reportReady();
    }
  });

  // 充值
  _ws.on("Recharge", function (socket, request) {
    try {
      // 关闭一些提示框
      _app.closeTip();

      // 状态变为进行中
      reportProcessing();

      // 绑卡
      const bindData = _bindCard.bind({
        createOrderAccountInfo: request.data.createOrderAccountInfo,
        meiTuanRechargeCards: request.data.meiTuanRechargeCards
      });
      if (bindData) {
        socket.send(JSON.stringify({
          isSuccess: true,
          message: "充值完成",
          method: request.method,
          requestId: request.requestId,
          data: bindData
        }));
      }
    } catch (error) {
      if (_env.debugMode) {
        log(error);
      }
      reportException(request, "999", error, "充值异常");
    } finally {
      returnHomePage();
      reportReady();
    }
  });

  // 获取明细
  _ws.on("BalanceDetail", function (socket, request) {
    try {
      // 关闭一些提示框
      _app.closeTip();

      // 状态变为进行中
      reportProcessing();

      let beginTime = null;
      if (request.data.beginTime) {
        beginTime = beginTimeFormat(request.data.beginTime);
      }
      const detailData = _billingDetails.detail(beginTime);
      if (detailData) {
        socket.send(JSON.stringify({
          isSuccess: true,
          message: "明细获取成功",
          method: request.method,
          requestId: request.requestId,
          data: detailData
        }));
      }
    } catch (error) {
      if (_env.debugMode) {
        log(error);
      }
      reportException(request, "999", error, "获取明细异常");
    } finally {
      returnHomePage();
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

// 时间格式化，用于获取明细，该时间之后的都不需要获取
function beginTimeFormat(time) {
  const date = new Date(time);
  const y = date.getFullYear;
  let m = (date.getMonth() + 1);
  if (m < 10) {
    m = '0' + m;
  }
  const d = date.getDate();
  let h = date.getHours();
  if (h < 10) {
    h = '0' + h;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = '0' + min;
  }
  let sec = date.getSeconds();
  if (sec < 10) {
    sec = '0' + sec;
  }
  return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + sec;
}

// 当前页面不是首页时，需要回到首页
function returnHomePage() {
  let homePageUiObject = _app.waitForContainsText('火车票机票', 100, 1000);
  while (homePageUiObject == null) {
    // 返回按钮
    let back_btn = _app.waitForId("button_ll", 100, 1000);
    if (back_btn) {
      back_btn.click();
      sleep(500);
    }

    // 确认离开
    let leave_btn = _app.waitForContainsText("确认离开", 50, 1000);
    if (leave_btn) {
      leave_btn.click();
      sleep(500);
    }

    if (!back_btn) {
      // 我的页面存在购物车 
      let mePage = _app.waitForId('settings_layout', 50, 1000);
      if (mePage) {
        _app.home();
        sleep(500);
      } else {
        back();
        sleep(500);
        back_btn = _app.waitForId("button_ll", 50, 1000);
      }
      homePageUiObject = _app.waitForContainsText('火车票机票', 50, 2000);
    }
    homePageUiObject = _app.waitForContainsText('火车票机票', 50, 2000);
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