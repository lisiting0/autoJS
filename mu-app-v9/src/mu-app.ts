import {
    AppDeviceStatusType,
} from "app-base-v9";
import * as selector from "ui-selector-ext-v9";
import {
    MUCheckInDto,
    MUCheckInResultDto
} from "./dtos";
import * as app from "app";
import { environment } from "./environment";
import { MUSignalRHandler } from "./signalr";
import { UiObject } from "ui_object";
import { delay } from "lang";
import { accessibility, back, click, select, swipe } from "accessibility";
import { exec } from "shell";
import { showToast } from "toast";

export class MUApp {
    private _handler?: MUSignalRHandler;
    private _failedCount: number = 0;
    private _networkErrorCount: number = 0;
    private _loginTokenCount: number = 0;

    // 启动APP
    async init(handler: MUSignalRHandler): Promise<void> {
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
        let mineNavigation = await selector.findByTextContains("我的", 100, 2000);
        if (!mineNavigation) {
            throw new Error(`跳转 我的 页面失败`);
        }
        selector.findClickableParent(mineNavigation)?.click();
    }

    private async backToHome(): Promise<UiObject> {
        console.log(`adb权限${environment.adb}`);

        let home = await selector.findByTextContains("首页", 100, 2000);
        if (!home) {
            let retry = 5;
            while (retry > 0) {
                retry--;

                await this.clickIfIdExists("top_bar_left_img_btn", 100, 1000);

                await this.clickIfIdExists("iv_close", 100, 1000);

                home = await selector.findByTextContains("首页", 100, 2000);
                if (home) {
                    return home;
                }
                await delay(2000);
            }

            home = await selector.findByTextContains("首页", 100, 2000);
            if (home) {
                return home;
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

    async waitForLoading(interval?: number, timeout?: number): Promise<UiObject | null> {
        interval ??= 500;
        timeout ??= 100000;

        let m = new Date().getTime() + timeout;
        let isLoading = await selector.findById("animator_view", 100, 2000);
        while (isLoading && m >= new Date().getTime()) {
            await delay(interval);
            isLoading = await selector.findById("animator_view", 100, 2000);
        }
        return isLoading;
    }

    private async waitForTip(
        throwError: boolean,
        clickConfirm: boolean,
        clickCancel?: boolean
    ): Promise<string | undefined> {
        clickCancel ??= false;
        let panel = await selector.findById("rl_dlg_height", 200, 3000);
        if (panel) {
            let messageText = await selector.findById("tv_dlg_content", 200, 3000);
            if (!messageText) {
                // 再次查询panel
                panel = await selector.findById("rl_dlg_height", 200, 1000);
                if (!panel) {
                    // 如果没有则是误报
                    return undefined;
                } else {
                    // 有再次查询消息
                    messageText = await selector.findById("tv_dlg_content", 200, 1000);
                    if (!messageText) {
                        // 没有则返回
                        return undefined;
                    }
                }
            }
            console.log(`出现提示 ${messageText.text}`);
            if (clickConfirm) {
                if (clickCancel) {
                    (await selector.findById("btn_left", 100, 1000))?.click();
                }

                (await selector.findById("btn_right", 100, 1000))?.click();
            }

            if (throwError) {
                throw new Error(`出现提示报错 ${messageText.text}`);
            } else {
                return messageText.text;
            }
        }
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

    async ensureChecked(id: string) {
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

    async getAndInputText(
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

    async stopApp(): Promise<void> {
        await delay(2000);
        console.log(`关闭APP,adb权限 ${environment.adb}`);
        if (environment.adb) {
            this.log(`关闭APP ${await exec(`am force-stop ${environment.appId}`, { adb: true, })} `);
            process.exit(-666);
        } else {
            await this.backToHome();
            process.exit(-666);
        }
    }

    async restartApp(): Promise<boolean> {
        console.log(`启动APP,adb权限 ${environment.adb}`);
        if (environment.adb) {
            this.log(`关闭APP ${await exec(`am force-stop ${environment.appId}`, { adb: true, })} `);
            await delay(5000);
            this.log(`启动APP ${app.launch(environment.appId)} `);
            return true;
        } else {
            showToast("重启APP失败没有adb权限");
            return false;
        }
    }

    /**
    * 值机
    * @param input 接收乘客姓名，票号
    * @returns
    */
    async CheckIn(input: MUCheckInDto): Promise<MUCheckInResultDto> {
        try {
            console.log(input)

            this._handler?.update(
                AppDeviceStatusType.Processing,
                environment.loginAccount
            );

            await this.openHome();
            await this.waitForLoading();

            // 点击值机
            const checkinText = await selector.findByTextContains("选座值机", 100, 3000);
            if (checkinText && checkinText.parent) {
                await click(checkinText.parent.boundsInScreen.centerX, checkinText.parent.boundsInScreen.centerY);
            }
            await this.waitForLoading();

            // 当前在代办列表。选择选座值机Tab
            const tabs = await selector.findAllById("tv_tab_title", 100, 2000);
            const xzzj = tabs.filter(x => x.text === "选座值机");
            if (xzzj && xzzj.length > 0) {
                if (xzzj[0].parent) {
                    click(xzzj[0].parent?.boundsInScreen.centerX, xzzj[0].parent?.boundsInScreen.centerY);
                }
                console.log(`点击选座值机Tab`);
                await delay(1000);
                await this.waitForLoading();
            }

            let inputItems = await selector.findAllById("ed_input", 100, 1000);
            if (inputItems.length > 0) {
                let nameInput = inputItems[0];
                if (nameInput) {
                    nameInput.click();
                    nameInput.setText(input.passengerName);
                    await delay(700);
                }

                const ticketNoInput = inputItems.at(-1);
                if (ticketNoInput) {
                    ticketNoInput.click();
                    ticketNoInput.setText(input.ticketNo);
                    await delay(700);
                }
            } else {
                throw new Error("选座值机页面跳转失败");
            }

            this.ensureChecked("cbPreBoardHomeAgree");
            await delay(500);

            await click(515, 1200);
            await delay(500);

            // 立即查询
            this.clickIfIdExists("btnPreBoardSearch", 100, 2000);
            await delay(3000);
            await this.waitForLoading();

            // 如果还存在立即查询按钮，说明没有跳转成功，未查询到相关行程
            const btnPreBoardSearchIsExist = await selector.findByTextContains("查询结果", 100, 5000);
            if (btnPreBoardSearchIsExist == null) {
                throw new Error("很抱歉，未查询到相关行程，请检查输入信息是否正确");
            }

            const notChangeSeat = await selector.findById("tvWarnReason", 100, 3000);
            if (notChangeSeat && notChangeSeat.text.includes("请登录原办理账号或乘机人本人账号进行操作")) {
                throw new Error(notChangeSeat.text);
            }

            // 选座或者更换座位
            let xzBtn = await selector.findAllById("pbFunctionBtn", 100, 4000);
            if (xzBtn.length > 0) {
                if (xzBtn.length == 1) {
                    xzBtn[0].click();
                } else {
                    xzBtn[1].click();
                }
            } else {
                const llTips = await selector.findById("llTips", 100, 3000);
                if (llTips) {
                    throw new Error(llTips.text);
                }
            }
            await delay(700);
            console.log("点击更换座位");
            await this.waitForLoading();
            await this.waitForTip(true, true);

            // 选座页面 
            let lineSeats = await selector.findAllById("lin_seat", 100, 3000);
            if (lineSeats.length > 0) {
                let clickSeat = false;
                for (let index = 0; index < lineSeats.length; index++) {
                    const linseat = lineSeats[index];
                    for (const lineSeatChild of linseat.children) {
                        if (lineSeatChild.className !== "android.widget.ImageView") {
                            continue;
                        }
                        lineSeatChild.click();
                        await delay(500);
                        // 查看是否有座位号
                        let seatNo = await selector.getById("tv_seat_no_left", 100, 1000);
                        if (seatNo.text.includes("未选座") || seatNo.text.includes("请换座")) {
                            continue;
                        }
                        console.log(`选择座位号是 ${seatNo.text}`);
                        // 座位是应急出口，关闭应急出口座位旅客告知书
                        const yj = await selector.findByTextContains("应急出口座位旅客告知书", 100, 1000);
                        if (yj) {
                            this.clickIfIdExists("cb_agreement", 100, 1000);
                            await delay(500);
                            this.clickIfIdExists("cdView", 100, 1000);
                            await delay(500);
                        }
                        // 点击下一步
                        this.clickIfIdExists("cd_go_pay", 100, 1000);
                        clickSeat = true;
                        break;
                    }
                    if (clickSeat) {
                        break;
                    }
                    if (index === lineSeats.length - 2) {
                        await swipe(500, 1700, 500, 400, 2000);
                        await delay(500);
                        lineSeats = await selector.findAllById("lin_seat", 100, 1000);
                    }
                }
                if (!clickSeat) {
                    throw new Error("选座失败，没有有效座位可选择或者更换");
                }
            } else {
                const netError = await selector.findById("tv_load_sir_base_content")
                if (netError) {
                    throw new Error(`${netError.text}`);
                }
                throw new Error("选座失败，请检查信息是否有效");
            }
            // 勾选
            const helpChecked = await selector.findById("cb_self_help", 100, 1000);
            if (helpChecked) {
                this.ensureChecked("cb_self_help");
                await delay(500);
            }
            this.ensureChecked("cb_agreement");
            await delay(500);
            await this.waitForLoading(100, 2000);
            this.clickIfIdExists("cdView", 100, 1000);
            await delay(1000);
            await this.waitForLoading();
            await this.waitForTip(true, true);

            // 返回结果
            const state = await selector.findById("tv_state");
            if (state?.text.includes("办理成功")) {
                if (state?.text === "部分办理成功") {
                    const finish = await selector.findByTextContains("完成", 100, 3000);
                    if (finish) {
                        finish.click();
                        await delay(1000);
                        // 开通微信便捷服务，不开通直接关闭 
                        this.clickIfIdExists("open_weixin_service_dialog_iv_dlg_close", 100, 3000);
                        await this.waitForLoading(100, 3000);
                    }
                    throw new Error("值机办理失败");
                }
                const tvSeat = await selector.getById("tv_seat", 100, 1000);
                const finish = await selector.findByTextContains("完成", 100, 3000);
                if (finish) {
                    finish.click();
                    await delay(1000);
                    // 开通微信便捷服务，不开通直接关闭 
                    this.clickIfIdExists("open_weixin_service_dialog_iv_dlg_close", 100, 3000);
                    await this.waitForLoading(100, 3000);
                }
                return {
                    success: true,
                    message: `${input.ticketNo}-${input.passengerName} 值机成功`,
                    seatNo: tvSeat.text
                } as MUCheckInResultDto;
            } else {
                throw new Error("值机办理失败");
            }
        }
        catch (error) {
            const msg = (error as Error)?.message;
            this._handler?.log(msg);
            this._failedCount++;
            if (msg?.includes("网络是否有效")) {
                this._networkErrorCount++;
            }

            if (this._networkErrorCount > 1) {
                this.stopApp();
                this._networkErrorCount = 0;
            }
            return {
                success: false,
                message: msg,
                detail: JSON.stringify(error),
            } as MUCheckInResultDto;
        } finally {
            if (this._failedCount > 2) {
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
