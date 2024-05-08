"ui";
import * as ui from "ui";
import * as rhino from "rhino";
import * as app from "app";
import * as settings from "settings";
import { CZSignalRHandler } from "./signalr";
import { checkAccess, exec } from "shell";
import { device } from "device";
import { environment } from "./environment";
import {
  onVolumeDown,
  startListen,
  onMainActivityStarted,
  MainActivity,
  getIpv6,
  ISignalRHandler,
} from "app-base-v9";
import { CZMainActivity } from "./activity";
import { appId, CZApp } from "./cz-app";
import { execScriptFile } from "engines";
import { CZCreateChangeOrderArgsDto, CZCreateOrderArgsDto, CZQueryFlightPricesDto } from "./dtos";
import { testCreateOrderArgs } from "./test";
import {
  accessibility,
  back,
  click,
  scrollForward,
  select,
  swipe,
} from "accessibility";
import { delay } from "lang";
import { UiObjectHelper } from "./ui-object-helper";

async function grant() {
  console.log(
    await exec(
      `pm grant ${environment.packageName} android.permission.WRITE_SECURE_SETTINGS`,
      { adb: true }
    )
  );
  console.log("授予权限成功");
}

async function init(): Promise<number> {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  rhino.install();
  settings.stableMode.value = false; // 稳定模式
  settings.foregroundService.value = true; // 前台服务
  const id = $autojs.keepRunning();
  onVolumeDown(() => {;
    $autojs.cancelKeepRunning(id);
    process.exitCode = -9000;
  });
  const result = await checkAccess("adb");
  environment.adb = result;
  console.log(`adb权限 ${result}`);

  return id;
}

async function tryGetIp(handler?: ISignalRHandler): Promise<string> {
  if (environment.adb) {
    try {
      const result = await getIpv6();
      if (result.success) {
        console.log(`获取Ipv6 ${result.ip}`);
        handler?.log(`获取Ipv6 ${result.ip}`);
        return result.ip;
      } else {
        console.log(`获取Ipv6失败 ${result.rawOutput}`);
        handler?.log(`获取Ipv6失败 ${result.rawOutput}`);
        return "";
      }
    } catch (error) {
      console.log(error);
      handler?.log(`获取Ipv6失败 ${JSON.stringify(error)}`);
      return "";
    }
  } else {
    console.log(`获取Ipv6失败 未开启adb`);
    handler?.log(`获取Ipv6失败 未开启adb`);
    return "";
  }
}

async function main(): Promise<void> {
  const runningId = await init();

  const czapp = new CZApp();
  await czapp.changeProxy(":0");
  const ip = await tryGetIp();
  const handler = new CZSignalRHandler(
    device.androidId,
    "CZ",
    ip,
    (input) => {
      tryGetIp(handler).then((ip) => {
        handler.setIp(ip);
      });

      return czapp.QueryFlights(input);
    },
    (input) => {
      tryGetIp(handler).then((ip) => {
        handler.setIp(ip);
      });

      return czapp.QueryDirectDiscount(input);
    },
    (input) => {
      tryGetIp(handler).then((ip) => {
        handler.setIp(ip);
      });

      return czapp.CreateOrder(input);
    },
    (input) => {
      tryGetIp(handler).then((ip) => {
        handler.setIp(ip);
      });

      return czapp.Pay(input);
    },
    (input) => {
      tryGetIp(handler).then((ip) => {
        handler.setIp(ip);
      });

      return czapp.QueryFlightPrices(input);
    },
    (input) => {
      tryGetIp(handler).then((ip) => {
        handler.setIp(ip);
      });

      return czapp.CreateChangeOrder(input);
    }
  );

  handler.onConnected(() => {
    console.log("服务器已连接");
    czapp.init(handler);
  });

  onMainActivityStarted((mainActivity: MainActivity) => {
    mainActivity.confirm.on("click", () => {
      startListen();
      const selected = mainActivity.spinner.getSelectedItem();
      const url = selected === "生产地址" ? "https://apphub.yxho.com/signalr-hubs/cz" : selected === "测试地址" ? "https://apphub.dev-remote.yxho.com/signalr-hubs/cz" : "http://192.168.50.115:5000/signalr-hubs/cz";
      console.log(`selected:${selected} ${url}`);
      handler.start(url);
    });
    mainActivity.grantPermission.on("click", () => {
      grant();
    });
    mainActivity.test.on("click", () => {
      test();
    });
    mainActivity.hotUpdate.on("click", () => {
      execScriptFile("./dist/updater.node.js", {
        arguments: {
          appName: "CZ",
          channel: "scripts",
          // host: '47.108.202.111:38615',
          // version: ''
        },
      });
      console.log("开始更新,主线程退出");;
      $autojs.cancelKeepRunning(runningId);
    });

    // exec("ls").then((result: ExecutionResult) => {
    //     console.log(result);
    // });

    mainActivity.confirm.setVisibility.invoke(
      mainActivity.confirm,
      [0],
      "ui"
    );
  });

  ui.activityLifecycle.on("all_activities_destroyed", () => {
    process.exit();
  });

  console.log("初始化完成...");

  ui.setMainActivity(CZMainActivity);

  console.log("页面加载中...");
}

async function installNpmPackage() {
  const result = await exec("npm install --only=prod");
  if (result.code != 0) {
    console.error(result);
  } else {
    console.log(result);
  }
}

async function test(): Promise<void> {
  try {
    // execScriptFile("./dist/updater.node.js");
    // console.log("开始更新,主线程退出");
    // const id = $autojs.keepRunning();
    // $autojs.TAOcelKeepRunning(id);
    // installNpmPackage
 

    console.log(`启动APP: ${app.launch(appId)}`);
    const czapp = new CZApp();

    // 创建出票单
    // const result = await czapp.CreateOrder(testCreateOrderArgs as CZCreateOrderArgsDto);

    // 创建改签单
    const result = await czapp.CreateChangeOrder({
      "orderId": "3a10e0d6-d86a-f6b0-3b95-7c2ae25ca0c0",
      "buyOrderId": "3a10e10a-3e43-7ee1-8522-9864b5f77d02",
      "accountInfo": {
        "userName": "318138704076",
        "password": "855321"
      },
      "buyOrderNo": "GO2404203324787",
      "flightInfos": [
        {
          "flightIndex": 1,
          "originAirport": "TAO",
          "destinationAirport": "CGQ",
          "fullFlightNo": "CZ6140",
          "departureDateTime": "2024-04-28T14:00:00Z",
          "arrivalDateTime": "2024-04-28T15:50:00Z"
        }
      ],
      "newFlightInfos": [
        {
          "flightIndex": 1,
          "originAirport": "TAO",
          "destinationAirport": "CGQ",
          "fullFlightNo": "CZ6140",
          "departureDateTime": "2024-04-28T14:00:00Z",
          "arrivalDateTime": "2024-04-28T15:50:00Z"
        }
      ],
      "buyOrderPassengerInfos": [
        {
          "cabin": "T",
          "changeFee": 0,
          "cabinUpgradeFee": 0,
          "name": {
            "nameType": 0,
            "primary": "孟祥艳"
          },
          "birthDate": "1970-10-30",
          "identityInfo": {
            "type": 0,
            "cardNo": "513401197010300828"
          },
          "phone": "18962159537",
          "type": 0,
          "ticketNo": "784-2524873591"
        }
      ],
      "requestId": "0fd90d37-b1e9-4492-8140-0be4d6737ab0"
    } as CZCreateChangeOrderArgsDto);

    // const querys = [
    //     {
    //         "date": "2023-04-17",
    //         "originAirport": "TAO",
    //         "destinationAirport": "TAN",
    //         "fullFlightNo": "",
    //         "accountInfo": {
    //             "userName": "618316613775",
    //             "password": "465398"
    //         }
    //     },
    //     {
    //         "date": "2023-04-17",
    //         "originAirport": "TAO",
    //         "destinationAirport": "SHA",
    //         "fullFlightNo": "",
    //         "accountInfo": {
    //             "userName": "618316613775",
    //             "password": "465398"
    //         }
    //     },
    //     {
    //         "date": "2023-04-17",
    //         "originAirport": "TAO",
    //         "destinationAirport": "SHE",
    //         "fullFlightNo": "",
    //         "accountInfo": {
    //             "userName": "618316613775",
    //             "password": "465398"
    //         }
    //     },
    //     {
    //         "date": "2023-04-17",
    //         "originAirport": "TAO",
    //         "destinationAirport": "SHA",
    //         "fullFlightNo": "",
    //         "accountInfo": {
    //             "userName": "618316613775",
    //             "password": "465398"
    //         }
    //     }
    // ] as CZQueryFlightPricesDto[];

    // let result = [];
    // for (const q of querys) {
    //     const r = await czapp.QueryDirectDiscount(q);
    //     result.push(r);
    //     console.log(`返回结果：${r}`);
    // }

    // const result = await czapp.QueryFlightPrices({
    //   date: "2024-02-25T01:00:00Z",
    //   originAirport: "TAO",
    //   destinationAirport: "TFU",
    //   fullFlightNo: "CZ6941",
    //   accountInfo: {
    //     userName: "415920801544",
    //     password: "802925",
    //   }
    // } as CZQueryFlightPricesDto);
    // console.log(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    console.error(error);
    const msg = (error as Error)?.message;
    console.log(msg);
  }
}

main();
