const appId = "com.taobao.trip";
import { back } from "accessibility";
import * as app from "app";
import { delay } from "lang";
import * as selector from "ui-selector-ext-v9";

export class FliggyApp {
    async startApp(): Promise<void> {
        console.log(`启动APP: ${app.launch(appId)}`);
    }

    async openMine(): Promise<void> {
        await this.clickByText("我的");
    }

    async backToHome(): Promise<void> {
        let retry = 10;
        while (retry > 0) {
            retry--;
            const bottomView = await selector.findById(
                "fliggy_bottom_view",
                500,
                2000
            );

            if (!bottomView) {
                back();
            } else {
                break;
            }
        }
    }

    async deleteFrequentPassenger(max: number): Promise<boolean> {
        await this.clickByText("常用信息");

        await this.clickByText("出行人");

        const passengerListView = await selector.getById("passenger_list_view");

        let passengerList = await selector.findAllById(
            "trip_passenger_list_item_container",
            200,
            2000
        );

        const passengerNames: string[] = [];
        let retry = 30;
        while (retry > 0) {
            retry--;
            const lengthWhenStart = passengerNames.length;
            for (const p of passengerList) {
                p.showOnScreen();
                const name = selector.findChildById(p, "usercenter_tv_name");

                if (!name) {
                    continue;
                }

                if (!passengerNames.find((x) => x === name.text)) {
                    passengerNames.push(name.text);
                    console.log(
                        `当前乘机人数量 ${passengerNames.length} 最大数量 ${max}`
                    );

                    if (passengerNames.length > max) {
                        p.parent?.longClick();
                        const deleteBtn = await selector.findById(
                            "usercenter_tv_del",
                            500,
                            5000
                        );

                        if (!deleteBtn) {
                            console.log(
                                `未找到删除按钮 跳过乘机人 ${name.text}`
                            );
                        } else {
                            deleteBtn.click();
                            const confirmBtn =
                                await selector.findByTextContains("删除");
                            confirmBtn?.click();
                            console.log(`已删除乘机人 ${name.text}`);
                            back();
                            return true;
                        }
                    }
                }
            }

            if (passengerNames.length === lengthWhenStart) {
                break;
            }

            passengerListView.scrollForward();
            await delay(1000);
            passengerList = await selector.findAllById(
                "trip_passenger_list_item_container",
                500,
                2000
            );
        }

        back();
        return false;
    }

    private async clickByText(text: string): Promise<void> {
        const changyongxinxi = await selector.findByTextContains(text);
        if (!changyongxinxi) {
            throw new Error(`找不到${text}文字`);
        }

        const changyongxinxiBtn = selector.findClickableParent(changyongxinxi);
        if (!changyongxinxiBtn) {
            throw new Error(`找不到${text}按钮`);
        }

        changyongxinxiBtn.showOnScreen();
        changyongxinxiBtn.click();
    }
}
