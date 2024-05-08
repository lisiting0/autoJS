import * as ui from "ui";
import * as rhino from "rhino";
import * as settings from "settings";
import { checkAccess } from "shell";
import { environment } from "./environment";
import { onVolumeDown } from "app-base-v9";
import { MainActivity } from "./activity";

function init(): number {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
    rhino.install();
    settings.stableMode.value = false;
    settings.foregroundService.value = true;
    const id = $autojs.keepRunning();
    onVolumeDown(() => {
        $autojs.cancelKeepRunning(id);
        process.exitCode = -9000;
    });
    checkAccess("adb").then((r) => {
        environment.adb = r;
    });

    return id;
}

async function main(): Promise<void> {
    init();
    ui.activityLifecycle.on("all_activities_destroyed", () => {
        process.exit();
    });
    ui.setMainActivity(MainActivity);
}

main();
