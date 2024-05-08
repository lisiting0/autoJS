"nodejs";

const { showToast } = require("toast");
const axios = require("axios");
const { launch, startActivity } = require("app");
const {
    findById,
    findAllById,
    getById,
    findByTextContains,
} = require("ui-selector-ext-v9");

const { foregroundService, stableMode } = require("settings");
const { delay } = require("lang");

const accounts = [
    { username: "0831223", passowrd: "CANlxj178." },
    { username: "0800327", passowrd: "CANlxj178." },
];

const reportUrl = "https://otacallback.yxho.com/api/ota-callback/asd/rhc";

var isRunning = true;

function init() {
    stableMode.value = false;
    foregroundService.value = true;
}

async function postRHCResult(username) {
    const all = await findByTextContains("帐单报告下载，请点击");
    console.log(all.text);

    const regex =
        /清算持有量\(RHC\)[:：]\s*?RMB\s*(?<total>[\d,，.]+).*已使用的清算持有量\(RHC\)[:：]\s*RMB\s*(?<used>[\-\d,，.]+)\s*已使用的清算持有量\(RHC\)占比[:：]\s*(?<percentage>[\-\d.%]+)/s;

    const result = regex.exec(all.text);
    if (!result) {
        reportError(username, "解析正则失败：" + all.text);
        return;
    }

    console.log("total:" + result.groups.total);
    console.log("used:" + result.groups.used);
    console.log("percentage:" + result.groups.percentage);

    axios
        .post(reportUrl, {
            IsSuccess: true,
            Account: username,
            Total: parseFloat(result.groups.total.replaceAll(",", "")),
            Used: parseFloat(result.groups.used.replaceAll(",", "")),
            Percentage:
                parseFloat(result.groups.percentage.replace("%", "")) / 100.0,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
}

function reportError(username, error, count) {
    axios
        .post(reportUrl, {
            IsSuccess: false,
            Account: username,
            Message: `失败计数 ${count} ${error}`,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.error(e);
        });
}

async function closeAllWindow() {
    // const multiWindow = await getById("toolbar_btn_muti_window");
    // multiWindow.click();
    // const cleanAllBtn = await getById("btn_clean_all_tab");
    // cleanAllBtn.click();

    const btn = await getById("tab_center_button");
    btn.click();

    const closeAllBtn = await getById("close_all_button");
    closeAllBtn.click();

    const newTabBtn = await getById("new_tab_button");
    newTabBtn.click();
}

async function getRHC() {
    showToast("打开浏览器：" + launch("com.microsoft.emmx"));

    await closeAllWindow();

    const websiteIcons = await findAllById("edge_top_sites_title");
    console.log(`${websiteIcons[0].text} 已点击${websiteIcons[0].click()}`);

    // if (!searchBox) {
    //     startActivity({
    //         action: "android.settings.ACCESSIBILITY_SETTINGS",
    //     });
    //     return;
    // }

    // searchBox.click();

    // const inputBox = await getById("url_bar");
    // if (!inputBox) {
    // }
    // inputBox.setText("https://www.iata-asd.com");

    // const searchBtn = await getById("search_ctrl_btn");
    // searchBtn.click();

    await delay(10000);

    for (const account of accounts) {
        const accountBox = await getById("login_form:userCodeInput");
        accountBox.setText("");
        accountBox.setText(account.username);
        console.log("已设置用户名");
        const passwordBox = await getById("login_form:userPasswordInput");
        passwordBox.setText("");
        passwordBox.setText(account.passowrd);
        console.log("已设置密码");
        const loginBtn = await getById("login_form:login");
        loginBtn.click();

        console.log("点击登录");
        await delay(10000);

        await postRHCResult(account.username);

        const logout = await getById("j_id3:exit_id");
        logout.click();

        await delay(10000);

        const label = await findByTextContains("Username");
        label.click();
    }

    await closeAllWindow();
}

async function main() {
    let failedCount = 0;
    let failedDelay = 1000;
    while (isRunning) {
        try {
            await getRHC();
            failedCount = 0;
            let m = new Date().getTime() + 1000 * 60 * 30;
            while (isRunning && m >= new Date().getTime()) {
                await delay(2000);
            }
        } catch (error) {
            failedCount++;
            const errorText = JSON.stringify(error);
            console.error(error);
            console.error(errorText);
            reportError(accounts[0].username, errorText, failedCount);
            reportError(accounts[1].username, errorText, failedCount);
            await closeAllWindow();
            await delay(failedDelay);
            failedDelay = failedDelay * 2;
            if (failedDelay > 86400000) {
                break;
            }
        }
    }

    console.log("程序已退出");
}

init();
main();
