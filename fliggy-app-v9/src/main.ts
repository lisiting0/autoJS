import { delay } from "lang";
import { foregroundService, stableMode } from "settings";
import { FliggyApp } from "./fliggy-app";

var isRunning = true;

function init() {
    stableMode.value = false;
    foregroundService.value = true;
}

async function main() {
    let failedCount = 0;
    let app = new FliggyApp();
    while (isRunning) {
        try {
            await app.startApp();
            await app.backToHome();
            await app.openMine();
            while (await app.deleteFrequentPassenger(30)) {
                await delay(2000);
            }

            failedCount = 0;
            let m = new Date().getTime() + 1000 * 60 * 5;
            while (isRunning && m >= new Date().getTime()) {
                await delay(2000);
            }
        } catch (error) {
            failedCount++;
            console.error(error);
            await app.backToHome();
            await delay(5000);
        }
    }

    console.log("程序已退出");
}

init();
main();
