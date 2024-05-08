import { accessibility, EnableServiceOptions } from "accessibility";
import { hotUpdate } from "app-base-v9";
import { device } from "device";
import { exec } from "shell";
import { Activity } from "ui";
import { environment } from "./environment";

export class MainActivity extends Activity {
    spinner: any;
    confirm: any;
    autoService: any;
    grantPermission: any;
    hotUpdate: any;
    adbPermission: boolean;

    constructor() {
        super();
        this.adbPermission = environment.adb;
    }

    get initialStatusBar() {
        return { color: "#ffffff", light: true };
    }

    get layoutXml() {
        return `
<vertical>
    <card w="*" h="40" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <horizontal>
            <text text="${environment.appName} v${
            environment.version
        }" padding="18 8 8 8" gravity="center_vertical" />
        </horizontal>
    </card>

    <card w="*" h="40" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <horizontal>
            <text text="设备的Android ID" padding="18 8 8 8" gravity="center_vertical" />
            <text text="${
                device.androidId
            }" padding="18 8 8 8" gravity="center_vertical" />
        </horizontal>
    </card>
    <card w="*" h="40" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <horizontal>
            <text text="adb权限" padding="18 8 8 8" gravity="center_vertical" />
            <text text="${
                this.adbPermission ? "已获取" : "未获取"
            }" padding="18 8 8 8" gravity="center_vertical" />
        </horizontal>
    </card>
    <button id="grantPermission" margin="5" text="获取无障碍权限" bg="#5e7ce0" textColor="white"/>
    
    <card w="*" h="40" margin="5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <Switch id="autoService" text="无障碍服务" checked="${
            accessibility.enabled
        }" padding="8 8 8 8" textSize="15sp" />
    </card>
    
    <button id="hotUpdate" margin="5" text="热更新" bg="#5e7ce0" textColor="white"/>
    <card w="*" h="40" margin="5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <horizontal>
            <text text="APP" padding="18 8 8 8" gravity="center_vertical" />
            <spinner id="spinner" entries="CZ(v2)|CZ(v3)|CZ(v4)|Qunar(v2)|Qunar(v1)|ZH(v1)" />
        </horizontal>
    </card>

    <button id="confirm" margin="5" text="确定" bg="#5e7ce0" textColor="white"/>

    <globalconsole id="console" w="*" h="300" />
</vertical>
`;
    }

    onContentViewSet(contentView: any) {
        this.spinner = contentView.findView("spinner");
        const autoService = contentView.findView("autoService");
        this.autoService = autoService;
        this.autoService.on("click", function () {
            // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
            if (autoService.isChecked() && !accessibility.enabled) {
                accessibility.enableService({
                    toast: true,
                } as EnableServiceOptions);
            }
        });

        this.grantPermission = contentView.findView("grantPermission");
        this.grantPermission.on("click", () => {
            this.grant();
        });

        this.confirm = contentView.findView("confirm");
        this.confirm.on("click", () => {
            const selected = this.spinner.getSelectedItem();
            console.log(`选择 ${selected}`);
            const { packageName, appName, channel } =
                this.getPackageInfo(selected);
            hotUpdate(
                packageName,
                appName,
                undefined,
                channel,
                "http://192.168.16.149:33452"
            );
        });
        this.hotUpdate = contentView.findView("hotUpdate");
        this.hotUpdate.on("click", () => {
            hotUpdate(
                environment.packageName,
                environment.appName,
                environment.version,
                environment.channel,
                "http://192.168.16.149:33452"
            );
        });
    }

    private getPackageInfo(item: string): {
        packageName: string;
        appName: string;
        channel: string;
    } {
        switch (item) {
            case "CZ(v2)":
                return {
                    packageName: "com.yuxiang.autojs.cz.app",
                    appName: "CZ",
                    channel: "v2",
                };

            case "CZ(v3)":
                return {
                    packageName: "com.yuxiang.autojs.cz.app",
                    appName: "CZ",
                    channel: "v3",
                };

            case "CZ(v4)":
                return {
                    packageName: "com.yuxiang.autojs.cz.app.v9",
                    appName: "CZ",
                    channel: "v4",
                };

            case "Qunar(v2)":
                return {
                    packageName: "com.yuxiang.autojs.qunar.app",
                    appName: "Qunar",
                    channel: "v2",
                };

            case "Qunar(v1)":
                return {
                    packageName: "com.yuxiang.autojs.qunar.app",
                    appName: "Qunar",
                    channel: "v1",
                };

            case "ZH(v1)":
                return {
                    packageName: "com.yuxiang.autojs.zh.app",
                    appName: "ZH",
                    channel: "v1",
                };

            default:
                throw new Error(`参数无效 ${item}`);
        }
    }

    async grant() {
        console.log(
            await exec(
                `pm grant ${environment.packageName} android.permission.WRITE_SECURE_SETTINGS`,
                { adb: true }
            )
        );
        console.log("授予权限成功");
    }
}
