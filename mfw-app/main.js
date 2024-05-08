// "ui";

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

const _order = require('./mfw_order');
_order.setEnv(_env);
_order.init(_app);

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

log('稳定模式: ' + $settings.isEnabled('stable_mode'));
log('前台服务: ' + $settings.isEnabled('foreground_service'));
log('音量上键停止所有脚本: ' + $settings.isEnabled('stop_all_on_volume_up'));

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

// showAddressUI();

function showAddressUI() {
  ui.layout(
    <frame w="*" h="*">
      <vertical>
        <appbar>
          <toolbar title="马蜂窝脚本 v1.0.0" />
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
        {/* let serverIp = "ws://192.168.16.204:15910";//正式
        let serverIp = "ws://192.168.16.204:16910";//测试 */}
        <card w="*" h="40" margin="10" cardCornerRadius="2dp"
          cardElevation="1dp" gravity="center_vertical">
          <horizontal>
            <text text="选择IP" padding="18 8 8 8" gravity="center_vertical" />
            <spinner id="spinner" entries="马蜂窝APP下单生产地址|测试地址" />
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
      return;  //返回。不再往下执行
    };
    ui.confirm.attr('bg', "#adb0b8");
    ui.confirm.setEnabled(false);
    thread = threads.start(function () {
      let ipText = ui.spinner.getSelectedItem();
      let ip = '';
      if (ipText == '马蜂窝APP下单生产地址') {
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
}

function main(serverIp) {
  // 这里写脚本的主逻辑
  log("去哪儿自动下单程序开始运行 DebugMode: %s", _env.debugMode);
  try {
    // 启动app
    _dev.openApp();

    initWebSocket(serverIp);

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
    // 检测是否回到首页，如果没有，则返回上一页，有返回主页的按钮直接点击按钮
    returnHomePage();
    log("线程执行完毕");
    reportReady();
  }
}

function getAccountAndBackHome() {
  // 获取当前登录账号
  let currentAccount = _account.getCurrentAccount();
  if (currentAccount) {
    _account.currentAccount = currentAccount;
  } else {
    _account.currentAccount = null;
  }
  log("获取当前账号成功 " + _account.currentAccount);

  // 返回到我的页面
  for (let index = 0; index < 2; index++) {
    let backImg = _app.waitForId('bubble_image', 100, 3000);
    if (backImg) {
      _app.clickArea(backImg);
      sleep(800); // 一定要有等待时间，不然会点击不到
    }
  }

  _app.home();
}

function initWebSocket(serverAddress) {
  log("初始化websocket");

  // 设备信息
  _ws.on("DeviceInfo", function (socket, request) {
    getAccountAndBackHome();
    socket.send(JSON.stringify(_dev.getDeviceInfo(request)));
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
      // 从首页开始进行下单
      returnHomePage();

      login(socket, request);

      reportProcessing();

      let adultCabinPriceInfo = request.data.cabinPriceInfos.filter(c => c.type == 0)[0];

      // 下单
      let orderData = _order.order({
        productChannel: request.data.productChannel, // 产品渠道   航司旗舰店、去哪旗舰店
        productCodes: request.data.productCodes, // 产品类型 商务优选、旅行套餐
        createOrderRuleInfo: request.data.createOrderRuleInfo,
        departure: request.data.flights[0].originAirport,
        arrive: request.data.flights[0].destinationAirport,
        fullFlightNo: request.data.flights[0].fullFlightNo,
        departureDate: request.data.flights[0].departureDateTime,
        price: adultCabinPriceInfo.ticketPrice,
        contactInfo: request.data.contactInfo,
        passengers: request.data.passengers,
        cabinPriceInfos: request.data.cabinPriceInfos,
      });
      socket.send(JSON.stringify({
        isSuccess: true,
        message: "创建订单成功",
        method: request.method,
        requestId: request.requestId,
        data: orderData
      }));
      if (orderData) {
        // 返回上一页
        gesture(200, [0, _env.screenHeight / 2], [_env.screenWidth * 0.8, _env.screenHeight / 2]);
        sleep(800);
      }
    } catch (error) {
      reportException(request, "999", error, "下单时出现异常");
    } finally {
      returnHomePage();
      reportReady();
    }
  });

  log("websocket handler 已注册 准备连接服务器: " + serverAddress);
  _ws.initialize(serverAddress, 10, true);
  log("websocket初始化成功");
  reportInitializing();
}

// 当前页面不是首页时，需要回到首页
function returnHomePage() {
  let wfObject = _app.waitForId('atom_alexhome_youth_mod_flight', 100, 1000);
  while (wfObject == null) {
    let atomBack = _app.waitForId("atom_flight_ivBack", 100, 1000);
    if (atomBack) {
      _app.clickArea(atomBack);
      sleep(2000);
    }
    let back_btn = _app.waitForDesc("qdIcon", 100, 1000);
    if (back_btn) {
      _app.clickArea(back_btn);
      sleep(2000);
    }
    // 提示窗关闭
    let window_close = _app.waitForId("atom_alexhome_tv_close_window", 100, 1000);
    if (window_close) {
      window_close.click();
      sleep(2000);
    }
    // 弹窗关闭
    let closeBtn = _app.waitForId("close_btn", 100, 1000);
    if (closeBtn) {
      closeBtn.click();
      sleep(2000);
    }
    // 广告页关闭
    let browser_left = _app.waitForId("browser_left", 100, 1000);
    if (browser_left) {
      browser_left.click();
      sleep(2000);
    }
    if (!atomBack && !back_btn && !window_close && !closeBtn && !browser_left) {
      // 点击常用信息
      let textObject = _app.waitForDesc('cmn_mine_rn|cmn_mine_rn_icon_area_card_1', 100, 1000);
      if (textObject) {
        _app.home();
        sleep(2000);
      } else {
        back();
        sleep(2000);
        wfObject = _app.waitForId('atom_alexhome_youth_mod_flight', 100, 2000);
      }
    }
    wfObject = _app.waitForId('atom_alexhome_youth_mod_flight', 100, 1000);
  }
}

function login(socket, request) {
  _account.login(request.data.createOrderAccountInfo.userName, request.data.createOrderAccountInfo.password);
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

// _account.login('15814583534', 'yx362321');
// _account.logout();
// 广州到成都 5-9暂时无航班
let request = {
  data: {
    "orderId": "3a00b46e-674e-e2df-36bd-ba04e056ee9e",
    "createOrderRuleInfo": {
      "ticketPriceFloatRange": {
        "upperLimit": 0.0,
        "lowerLimit": -300.0
      },
      "settlementPriceFloatRange": {
        "upperLimit": 5.0,
        "lowerLimit": -300.0
      },
      "sellPriceFloatRange": {
        "upperLimit": 100.0,
        "lowerLimit": -200.0
      },
      "fixCabin": true,
      "allowedCabins": "",
      "officeNo": ""
    },
    "createOrderAccountInfo": {
      "userName": "13711133262",
      "password": "yx362321"
    },
    "contactInfo": {
      "name": "孔先生",
      "phone": "13711133262"
    },
    "flights": [{
      "flightIndex": 1,
      "originAirport": "SHE",
      "destinationAirport": "TAO",
      "fullFlightNo": "CZ3417",
      "departureDateTime": "2022-05-14T07:15:00Z",
      "arrivalDateTime": "2022-05-14T09:40:00Z"

    }],
    "passengers": [{
      "name": {
        "nameType": 0,
        "primary": "汪敏锐"
      },
      "identityInfo": {
        "type": 0,
        "cardNo": "450881200011247722"
      },
      "type": 0,
      "birthDate": "2000-11-24",
      "phone": "13725470369",
      "index": 0
    }],
    "cabinPriceInfos": [{
      "identityCardNo": "450881200011247722",
      "fullFlightNo": "QW9780",
      "cabin": "K",
      "ticketPrice": 295.0000,
      "settlementPrice": 295.0000,
      "airportTax": 50.0000,
      "oilFee": 10.0000,
      "totalTax": 60.0000,
      "couponAmount": 0.0,
      "type": 0
    }]
  }
}
let adultCabinPriceInfo = request.data.cabinPriceInfos.filter(c => c.type == 0)[0];
_order.order({
  productChannel: request.data.productChannel, // 产品渠道   航司旗舰店、去哪旗舰店
  productCodes: request.data.productCodes, // 产品类型 商务优选、旅行套餐
  createOrderRuleInfo: request.data.createOrderRuleInfo,
  departure: request.data.flights[0].originAirport,
  arrive: request.data.flights[0].destinationAirport,
  fullFlightNo: request.data.flights[0].fullFlightNo,
  departureDateTime: request.data.flights[0].departureDateTime,
  arrivalDateTime: request.data.flights[0].arrivalDateTime,
  price: adultCabinPriceInfo.ticketPrice,
  contactInfo: request.data.contactInfo,
  passengers: request.data.passengers,
  cabinPriceInfos: request.data.cabinPriceInfos,
})