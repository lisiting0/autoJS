import {
    AppDeviceStatusType,
} from "app-base-v9";
import * as selector from "ui-selector-ext-v9";
import {
    CZCreateOrderDto,
    CZCreateOrderResultDto
} from "./dtos";
import * as app from "app";
import { environment } from "./environment";
import { QunarSignalRHandler } from "./signalr";
import { UiObject } from "ui_object";
import { delay } from "lang";
import { accessibility, back, click, select } from "accessibility";
import { exec } from "shell";
import { showToast } from "toast";

export class QunarApp {
    private _handler?: QunarSignalRHandler;
    private _failedCount: number = 0;
    private _networkErrorCount: number = 0;
    private _loginTokenCount: number = 0;

    // 启动APP
    async init(handler: QunarSignalRHandler): Promise<void> {
        handler.update(AppDeviceStatusType.Initializing);
        this._handler = handler;
        console.log(`启动APP: ${app.launch(environment.appId)}`);
        await delay(5000);
        try {
            await this.backToHome();
            await this.openMine();
            const account = await this.getAccount();
            environment.loginAccount = account;
            handler.update(AppDeviceStatusType.Ready, account);
        } catch (error) {
            console.error(error);
            const msg = (error as Error)?.message;
            handler.update(AppDeviceStatusType.Unknown);
            handler.log(msg);
            await this.backToHome();
        }
    }

    async changeProxy(proxyUrl: string): Promise<boolean> {
        // 设置代理
        if (environment.adb) {
            const result = await exec(
                `settings put global http_proxy ${proxyUrl}`,
                {
                    adb: true,
                }
            );
            console.log(result);

            showToast(`设置代理 ${proxyUrl} 结果 ${result.code == 0 ? "成功" : "失败"}`);
            return result.code == 0;
        } else {
            showToast("设置代理失败没有adb权限");
            return false;
        }
    }

    // 获取登录账号信息
    async getAccount(): Promise<string> {
        // 判断是否已登录
        const loginBtn = await selector.findByTextContains("登录", 100, 2000);
        if (loginBtn) {
            this.log("当前设备未登录");
            return "";
        }
        // 获取登录账号
        let pearlMember = await selector.getById(
            "txt_ffpno",
            1000,
            20000
        );
        let pearlMemberText = pearlMember.text;
        let cardNo: string = pearlMemberText.split("会员号")[1].trim();
        if (cardNo === "") {
            throw new Error("获取会员账号失败");
        }
        return cardNo;
    }

    private async openHome(): Promise<void> {
        let home = await selector.findByTextContains("首页", 100, 2000);
        if (!home) {
            home = await this.backToHome();
        }
        selector.findClickableParent(home)?.click();
    }

    private async openMine(): Promise<void> {
        // 检测首页导航栏的“我的”  
        let mineNavigation = await selector.findById("atom_alexhome_mod_usercenter", 100, 2000);
        if (!mineNavigation) {
            throw new Error(`跳转 我的 页面失败`);
        }
        selector.findClickableParent(mineNavigation)?.click();
    }

    private async backToHome(): Promise<UiObject> {
        console.log(`adb权限${environment.adb}`);

        let home = await selector.findById("atom_alexhome_mod_main", 100, 2000);
        if (!home) {
            let retry = 5;
            while (retry > 0) {
                retry--;

                // await this.clickIfIdExists("top_bar_left_img_btn", 100, 1000);

                // home = await selector.findById("atom_alexhome_mod_main", 100, 2000);
                // if (home) {
                //     return home;
                // }
                await delay(2000);
            }

            throw new Error("打开主页失败 找不到首页按钮");
        } else {
            return home;
        }
    }

    private log(message: string): void {
        console.log(message);
        this._handler?.log(message);
    }

    private async waitForLoading(interval?: number, timeout?: number): Promise<UiObject | null> {
        interval ??= 500;
        timeout ??= 60000;

        let m = new Date().getTime() + timeout;
        let isLoading = await selector.findById("animator_view", 100, 2000);
        while (isLoading && m >= new Date().getTime()) {
            await delay(interval);
            isLoading = await selector.findById("animator_view", 100, 2000);
        }
        return isLoading;
    }

    private async clickIfIdExists(
        id: string,
        interval: number,
        timeout: number
    ): Promise<boolean> {
        const item = await selector.findById(id, interval, timeout);
        if (item && item.clickable) {
            item.click();
            return true;
        } else {
            return false;
        }
    }

    private async ensureChecked(id: string) {
        let retry = 3;
        while (retry > 0) {
            retry--;
            const checkBox = await selector.getById(id);
            if (checkBox.checkable && !checkBox.checked) {
                checkBox.click();
                await delay(500);
            } else {
                return;
            }
        }
    }

    private async getAndInputText(
        id: string,
        text: string,
        click?: boolean
    ): Promise<void> {
        const item = await selector.getById(id);
        item.showOnScreen();
        if (click) {
            item.click();
        }
        item.setText(text);
    }

    private async stopApp(): Promise<void> {
        await delay(2000);

        if (environment.adb) {
            this.log(`关闭APP ${await exec(`am force-stop ${environment.appId}`, { adb: true, })} `);
            process.exit(-666);
        } else {
            await this.backToHome();
            back();
            back();
            back();
            process.exit(-666);
        }
    }

    private async restartApp(): Promise<boolean> {
        if (environment.adb) {
            this.log(`关闭APP ${await exec(`am force-stop ${environment.appId}`, { adb: true, })} `);
            await delay(3000);
            this.log(`启动APP ${app.launch(environment.appId)} `);
            return true;
        } else {
            showToast("重启APP失败没有adb权限");
            return false;
        }
    }

    /**
    * 南航夏日闪促
    * @param input
    * @returns
    */
    async CZCreateOrder(input: CZCreateOrderDto): Promise<CZCreateOrderResultDto> {
        try {
            console.log(input)

            this._handler?.update(
                AppDeviceStatusType.Processing,
                environment.loginAccount
            );

            await this.openHome();
            await this.waitForLoading();

            // 点击机票
            this.clickIfIdExists("atom_alexhome_youth_mod_flight", 100, 3000);

            // 找到南航夏日闪促
            const menuTarget = await selector.findAllById("__target", 100, 3000);
            console.log(menuTarget.length);
            if (menuTarget.length > 0) {
                const targetMenu = menuTarget[0].children[0].children[1].children[2];
                targetMenu.click();
                await delay(1000);
            }

            return {
                success: true,
                message: `创单成功`,
            } as CZCreateOrderResultDto;
        }
        catch (error) {
            // 判断登录是否失效
            // const login = await this.checkLoginStatus();
            // console.error(error);
            const msg = (error as Error)?.message;
            this._handler?.log(msg);
            this._failedCount++;
            if (msg?.includes("网络好像不给力")) {
                this._networkErrorCount++;
            }

            if (this._networkErrorCount >= 1) {
                this.stopApp();
                this._networkErrorCount = 0;
            }
            return {
                success: false,
                message: msg,
                detail: JSON.stringify(error),
            } as CZCreateOrderResultDto;
        } finally {
            if (this._failedCount >= 1) {
                try {
                    await this.restartApp();
                    this._failedCount = 0;
                } catch (error) {
                    const msg = (error as Error)?.message;
                    console.log(msg);
                    this._handler?.log(msg);
                }
            }
            await this.backToHome();
        }
    }
}
