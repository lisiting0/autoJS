"ui";
import * as ui from "ui";
import * as rhino from "rhino";
import * as app from "app";
import * as settings from "settings";
import { checkAccess, exec } from "shell";
import { device } from "device";
import { execScriptFile } from "engines";
import {
  onVolumeDown,
  startListen,
  onMainActivityStarted,
  MainActivity,
} from "app-base-v9";
import { MUSignalRHandler } from "./signalr";
import { environment } from "./environment";
import { MUApp } from "./mu-app";
import { MUCheckInDto } from "./dtos";
import { MUMainActivity } from "./activity";

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

  const muApp = new MUApp();
  const handler = new MUSignalRHandler(
    device.androidId,
    "MU",
    (input) => muApp.CheckIn(input),
  );

  handler.onConnected(() => {
    console.log("服务器已连接");
    muApp.init(handler);
  });

  onMainActivityStarted((mainActivity: MainActivity) => {
    mainActivity.confirm.on("click", () => {
      startListen();
      const selected = mainActivity.spinner.getSelectedItem();
      const url = selected === "生产地址" ? "https://apphub.yxho.com/signalr-hubs/mu"
        : selected === "测试地址" ? "https://apphub.dev-remote.yxho.com/signalr-hubs/mu" : "http://192.168.50.115:5000/signalr-hubs/mu";
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
          appName: "MU",
          channel: "scripts",
        },
      });
      console.log("开始更新,主线程退出");
      $autojs.cancelKeepRunning(runningId);
    });

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

  ui.setMainActivity(MUMainActivity);

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
  // 第一次执行时需要调用
  // await installNpmPackage()

  console.log(`启动APP: ${app.launch(environment.appId)}`);
  const muApp = new MUApp();

  const result = await muApp.CheckIn({ passengerName: "洪泉彬", ticketNo: "781-2474342672" } as MUCheckInDto);
  console.log(JSON.stringify(result));
}

main();
