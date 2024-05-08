"ui";
import * as ui from "ui";
import * as rhino from "rhino";
import * as app from "app";
import * as settings from "settings";
import { ZHSignalRHandler } from "./signalr";
import { checkAccess, exec } from "shell";
import { device } from "device";
import { environment } from "./environment";
import {
    onVolumeDown,
    startListen,
    onMainActivityStarted,
    MainActivity,
    hotUpdate,
} from "app-base-v9";
import { ZHMainActivity } from "./activity";
import { ZHApp } from "./zh-app";
import { execScriptFile } from "engines";
import { testCreateOrderArgs } from "./test";
import { ZHQueryOrderDto } from "./zh-query-order-dto";
import * as selector from "ui-selector-ext-v9";

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
    settings.stableMode.value = false;
    settings.foregroundService.value = true;
    const id = $autojs.keepRunning();
    onVolumeDown(() => {
        $autojs.cancelKeepRunning(id);
        process.exitCode = -9000;
    });

    const result = await checkAccess("adb");
    environment.adb = result;
    console.log(`adb权限 ${result}`);

    return id;
}

async function main(): Promise<void> {
    const runningId = await init();

    const zhapp = new ZHApp();
    const handler = new ZHSignalRHandler(
        device.androidId,
        "ZH",
        (input) => zhapp.CreateOrder(input),
        (input) => zhapp.CreditPayOrder(input),
        (input) => zhapp.QueryOrder(input)
    );

    handler.onConnected(() => {
        console.log("服务器已连接");
        zhapp.init(handler);
    });

    onMainActivityStarted((mainActivity: MainActivity) => {
        mainActivity.confirm.on("click", () => {
            startListen();
            const selected = mainActivity.spinner.getSelectedItem();
            const url = selected === "生产地址" ? "https://apphub.yxho.com/signalr-hubs/zh" : selected === "测试地址" ?
                "https://apphub.dev-remote.yxho.com/signalr-hubs/zh" : "http://192.168.50.115:5000/signalr-hubs/zh";
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
            // hotUpdate(
            //     environment.packageName,
            //     environment.appName,
            //     environment.version,
            //     "v1",
            //     "http://192.168.16.149:33452"
            // );
            execScriptFile("./dist/updater.node.js", {
                arguments: {
                    appName: "ZH",
                    channel: "scripts",
                },
            });
            console.log("开始更新,主线程退出");
            $autojs.cancelKeepRunning(runningId);
        });
        // exec("npm install --only=prod").then((result: ExecutionResult) => {
        // exec("ls node_modules").then((result: ExecutionResult) => {
        //     if (result.code != 0) {
        //         console.error(result);
        //     } else {
        //         console.log(result);
        //     }
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

    ui.setMainActivity(ZHMainActivity);

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
    const keepRunning = await init();

    try { 
        // execScriptFile("./dist/updater.node.js");
        // console.log("开始更新,主线程退出");
        // const id = $autojs.keepRunning();
        // $autojs.cancelKeepRunning(id);
        // installNpmPackage
        const zhapp = new ZHApp();
        console.log(`启动APP: ${app.launch("com.air.sz")}`);

        // const oriInput = await selector.getById("booking_start_city_text");
        // oriInput.click();
        // await zhapp.inputAirport("TFU");

        // await zhapp.addPassenger(testCreateOrderArgs.passengers[0]);

        const result = await zhapp.CreateOrder(testCreateOrderArgs);
        console.log(JSON.stringify(result));
        // if (result.success) {
        //     const payResult = await zhapp.CreditPayOrder({
        //         buyOrderId: "",
        //         orderPayId: "",
        //         requestId: "",
        //         totalAmount: result.totalPrice,
        //         createOrderAccountInfo: {},
        //         flights: testCreateOrderArgs.flights,
        //         creditCardPayInfo: {
        //             validDate: "2024-12-01",
        //             cardNo: "5201521210108644",
        //             cvv: "387",
        //             ownerName: "熊奀英",
        //             ownerIdentityCardNo: "362321197312277521",
        //             phone: "15817030174",
        //         } as CreditCardPayInfo,
        //         buyTicketOrderIdInfo: {
        //             buyOrderNo: result.orderNo,
        //         } as BuyTicketOrderIdInfo,
        //     } as ZHCreditCardPayOrderArgsDto);
        //     console.log(JSON.stringify(payResult));
        // }

        // const payResult = await zhapp.CreditPayOrder({
        //     buyOrderId: "",
        //     orderPayId: "",
        //     requestId: "",
        //     totalAmount: 510,
        //     createOrderAccountInfo: {},
        //     flights: testCreateOrderArgs.flights,
        //     creditCardPayInfo: {
        //         validDate: "2024-12-01",
        //         cardNo: "5201521210108644",
        //         cvv: "387",
        //         ownerName: "熊奀英",
        //         ownerIdentityCardNo: "362321197312277521",
        //         phone: "15817030174",
        //     } as CreditCardPayInfo,
        //     buyTicketOrderIdInfo: {
        //         buyOrderNo: "2022081573645987",
        //     } as BuyTicketOrderIdInfo,
        // } as ZHCreditCardPayOrderArgsDto);
        // console.log(JSON.stringify(payResult));

        // const orderDetail = await zhapp.QueryOrder({
        //     orderNo: "2022081573645987",
        //     totalAmount: 510,
        //     createOrderAccountInfo: {},
        //     flights: testCreateOrderArgs.flights,
        // } as ZHQueryOrderDto);

        // console.log(JSON.stringify(orderDetail));
    } catch (error) {
        console.log(error);
        console.error(error);
        const msg = (error as Error)?.message;
        console.log(msg);
    }

    $autojs.cancelKeepRunning(keepRunning);
    console.log("结束");
}

main();