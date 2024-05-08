import {
    HubConnection,
    HubConnectionBuilder,
    IRetryPolicy,
    RetryContext,
} from "@microsoft/signalr";
import * as selector from "ui-selector-ext-v9";

import { accessibility, back, EnableServiceOptions } from "accessibility";
import { execScriptFile, getRunningEngines, myEngine } from "engines";
import { device } from "device";
import got from "got";
import { exec } from "shell";
import { Activity } from "ui";
import { createWriteStream } from "fs";
import stream from "stream";
import { promisify } from "util";
import { unzip, UnzipOptions } from "zip";
import { IntentOptions, makeIntent, openAppSettings } from "app";
import { UiObject } from "ui_object";

const pipeline = promisify(stream.pipeline);

export declare type MainActivityStartedEventHandler = (
    mainActivity: MainActivity
) => void;

var OnMainActivityStarted: MainActivityStartedEventHandler[] = [
    (mainActivity: MainActivity) => {
        mainActivity.autoService.on("click", function () {
            // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
            if (
                mainActivity.autoService.isChecked() &&
                !accessibility.enabled
            ) {
                accessibility.enableService({
                    toast: true,
                } as EnableServiceOptions);
            } else if (
                !mainActivity.autoService.isChecked() &&
                accessibility.enabled
            ) {
                accessibility.service.disableSelf();
            }
        });
    },
];

export function onMainActivityStarted(
    handler: MainActivityStartedEventHandler
) {
    OnMainActivityStarted.push(handler);
}

export abstract class MainActivity extends Activity {
    spinner: any;
    confirm: any;
    autoService: any;
    grantPermission: any;
    hotUpdate: any;
    test: any;
    abstract appName: string;
    abstract version: string;
    abstract adbPermission: boolean;

    constructor() {
        super();
    }

    get initialStatusBar() {
        return { color: "#ffffff", light: true };
    }

    onResume() {
        super.onResume();

        if (accessibility.enabled) {
            this.autoService.checked = true;
            this.confirm.enable = true;
            this.confirm.setText("启动");
        }
    }

    get layoutXml() {
        return `
<vertical>
    <card w="*" h="40" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <horizontal>
            <text text="${this.appName} v${
            this.version
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
    <button id="hotUpdate" margin="5" text="热更新" bg="#5e7ce0" textColor="white"/>

    <card w="*" h="40" margin="5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <Switch id="autoService" text="无障碍服务" checked="${
            accessibility.enabled
        }" padding="8 8 8 8" textSize="15sp" />
    </card>

    <card w="*" h="40" margin="5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <horizontal>
            <text text="服务" padding="18 8 8 8" gravity="center_vertical" />
            <spinner id="spinner" entries="生产地址|测试地址|本地测试" />
        </horizontal>
    </card>

    <button id="confirm" margin="5" text="${
        accessibility.enabled ? "启动" : "请先开启无障碍"
    }" bg="#5e7ce0" textColor="white" visibility="gone" enable="${
            accessibility.enabled
        }"/>
    
    <button id="test" margin="5" text="测试" bg="#5e7ce0" textColor="white"/>

    <globalconsole id="console" w="*" h="300" />
</vertical>
`;
    }

    onContentViewSet(contentView: any) {
        this.spinner = contentView.findView("spinner");
        this.confirm = contentView.findView("confirm");
        this.grantPermission = contentView.findView("grantPermission");
        this.hotUpdate = contentView.findView("hotUpdate");
        this.autoService = contentView.findView("autoService");
        this.test = contentView.findView("test");
        OnMainActivityStarted.forEach((handler) => handler(this));
    }
}

export interface ISignalRHandler {
    log(message: string): void;
    update(status: AppDeviceStatusType, account?: string): void;
    start(url: string): void;
    onConnected(eventHandler: EventHandler): void;
}

export interface AppDeviceInfo {
    id: string;
    airline: string;
    appVersion: string;
    status: AppDeviceStatusType;
    account: string;
    apiVersion: string;
    tags: string[];
    description: string;
    ip: string;
}

export enum AppDeviceStatusType {
    Unknown = 0,
    Initializing = 1,
    Ready = 2,
    Processing = 3,
}

export declare type EventHandler = () => void;

var onVolumeDownEventHandlers: EventHandler[] = [];

export function onVolumeDown(handler: EventHandler) {
    onVolumeDownEventHandlers.push(handler);
}

export function startListen() {
    // 启用按键监听
    accessibility.enableKeyEvents();

    // 监听key_event事件，包含所有按键的所有事件
    accessibility.on("key_down", (keyCode, event) => {
        // 25是音量下
        if (keyCode.toString() === "25") {
            onVolumeDownEventHandlers.forEach((handler) => handler());
        }
    });
}

export class SignalRHandler implements ISignalRHandler {
    protected onConnectedEventHandlers: EventHandler[] = [];
    protected hubConnection!: HubConnection;
    protected id!: string;
    protected airline!: string;
    protected status!: AppDeviceStatusType;
    protected account: string = "";
    protected ip: string = "";
    protected tags: string[] = [];

    constructor(id: string, airline: string, ip: string) {
        this.id = id;
        this.airline = airline;
        this.ip = ip;
    }

    onConnected(eventHandler: EventHandler) {
        this.onConnectedEventHandlers.push(eventHandler);
    }

    start(url: string) {
        this.hubConnection = new HubConnectionBuilder()
            .withAutomaticReconnect(new RetryPolicy())
            .withUrl(url)
            .build();

        this.hubConnection.start().then(() => {
            this.whenConnected();
        });

        this.hubConnection.onreconnected((id?: string) => {
            this.sendDeviceInfo();
        });

        this.hubConnection.on("GetAppDeviceInfo", () => {
            this.sendDeviceInfo();
        });
    }

    log(message: string): void {
        this.hubConnection
            .send("Log", message)
            .then(() => console.log(`发送日志 ${message}`));
    }

    update(status: AppDeviceStatusType, account?: string, ip?: string): void {
        if (account !== undefined) {
            this.account = account;
        }

        this.status = status;

        this.hubConnection
            .send("Update", {
                airline: this.airline,
                account: this.account,
                id: this.id,
                status: this.status,
                ip: ip ?? this.ip,
                tags: this.tags,
            } as AppDeviceInfo)
            .then(() =>
                console.log(
                    `已更新信息 ${this.account}:${this.status.toString()}`
                )
            );
    }

    protected sendDeviceInfo() {
        this.hubConnection
            .send("Update", {
                airline: this.airline,
                account: this.account,
                id: this.id,
                status: this.status,
                ip: this.ip,
            } as AppDeviceInfo)
            .then(() =>
                console.log(
                    `已更新信息 ${this.account}:${this.status.toString()}`
                )
            );
    }

    protected whenConnected() {
        this.onConnectedEventHandlers.forEach((handler) => {
            handler();
        });
    }
}

class RetryPolicy implements IRetryPolicy {
    nextRetryDelayInMilliseconds(retryContext: RetryContext): number | null {
        if (retryContext.previousRetryCount > 10000) {
            return null;
        }

        return Math.min(30, 2 * retryContext.previousRetryCount);
    }
}

export async function hotUpdateScript(id: number): Promise<void> {
    const args = myEngine().execArgv;

    let url = `${ args?.host ?? "http://192.168.16.149:33452" }/app/hot-update/js/${args?.appName ?? "CZ"}/${args?.channel ?? "scripts"}/download`;

    if (args?.version) {
        url += `/${args.version}`;
    }

    console.log(`热更新地址 ${url}`);

    await downloadFile(
        url,
        getRunningEngines()[0].workingDirectory + "/dist/main.node.js"
    );

    const result = await exec(
        `ls ${getRunningEngines()[0].workingDirectory} -la`
    );

    console.log(`${JSON.stringify(result)}`);

    execScriptFile("./dist/main.node.js");
    console.log("热更新完成");
    $autojs.cancelKeepRunning(id);
}

export async function hotUpdate(
    packageName: string,
    appName: string,
    appVersion?: string,
    channel?: string,
    host?: string
): Promise<void> {
    channel ??= "default";
    host ??= "http://47.108.202.111:35698";
    host = removeTrailingSlash(host);
    host += "/app/hot-update";

    // 获取目前版本
    console.log(`开始热更新 ${host} ${appName} ${channel}`);
    appVersion ??= await getCurrentVersion(packageName);
    console.log(`当前版本 ${appVersion}`);
    if (!appVersion || appVersion.length === 0) {
        return;
    }

    try {
        // 获取服务器版本
        const { body: newVersion } = await got.get(
            `${host}/${appName}/${channel}`
        );
        console.log(`当前版本 ${appVersion} 最新版本 ${newVersion}`);
        if (!newVersion || newVersion.length === 0) {
            console.log(`不存在最新版本`);
            return;
        }

        if (newVersion !== appVersion) {
            // 如果版本不同则更新
            const fileName = `/storage/emulated/0/Download/${appName}_${channel}_${newVersion}.apk`;
            await downloadFile(
                `${host}/${appName}/${channel}/download/${newVersion}`,
                fileName
            );

            const installApk = makeIntent({
                action: "VIEW",
                data: `file://${fileName}`,
                flags: ["activity_new_task", "grant_read_uri_permission"],
            } as IntentOptions);
            $autojs.androidContext.startActivity(installApk);

            // 关闭程序
            process.exit(-8888);
        } else {
            console.log("当前是最新版本");
            return;
        }
    } catch (error) {
        console.log(`检查更新失败 ${error}`);
    }
}

export async function getCurrentVersion(packageName: string): Promise<string> {
    const versionRegex: RegExp = /\d+.\d+.\d+/;

    console.log(`打开应用设置 ${openAppSettings(packageName)}`);

    const versionText = await selector.getById(
        "app_manager_details_appversion"
    );

    const regexResult = versionRegex.exec(versionText.text);
    if (regexResult === null) {
        console.log(`获取当前版本失败，正则不匹配 ${versionText.text}}`);
        return "";
    }

    back();

    return regexResult[0];
}

export async function downloadFile(
    url: string,
    fileName: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        const downloadStream = got.stream(url);
        const fileWriterStream = createWriteStream(fileName);

        downloadStream.on(
            "downloadProgress",
            ({ transferred, total, percent }) => {
                const percentage = Math.round(percent * 100);
                console.error(
                    `progress: ${transferred}/${total} (${percentage}%)`
                );
            }
        );

        pipeline(downloadStream, fileWriterStream)
            .then(() => {
                console.log(`File downloaded to ${fileName}`);
                resolve();
            })
            .catch((error) => {
                const e = `下载出现异常 ` + error;
                console.error(e);
                reject(new Error(e));
            });
    });
}

export function removeTrailingSlash(str: string) {
    return str.replace(/\/+$/, "");
}

export interface AccountInfo {
    userName: string;
    password: string;
}

export enum CabinClassType {
    Unknown = -1,
    EconomyClass = 0,
    PremiumEconomyClass = 1,
    BusinessClass = 2,
    FirstClass = 3,
}

export interface AppProductInfo {
    productName: string;
    cabin: string;
    cabinClass: CabinClassType;
    ticketPrice: number;
    settlementPrice: number;
    discountRate: string;
}
export enum BuyTicketIssueOrderStatusType {
    Unknown,
    待支付,
    待出票,
    已出票,
    已取票,
    出票失败,
}
export interface BuyTicketOrderIdInfo {
    buyOrderNo: string;
    etermOrderIdInfo: EtermOrderIdInfo;
}

export interface ContactInfo {
    name: string;
    email: string;
    phone: string;
    phoneCountryCode: string;
}

export interface CreateOrderArgs {
    productCodes: string;
    orderId: string;
    buyOrderId: string;
    createOrderId: string;
    createOrderRuleInfo: CreateOrderRuleInfo;
    createOrderAccountInfo: AccountInfo;
    contactInfo: ContactInfo;
    flights: TicketOrderFlight[];
    passengers: PassengerInfo[];
    cabinPriceInfos: TicketIssueOrderCabinPrice[];
    cabinClass: CabinClassType;
}
export interface CreateOrderPriceDetailDto extends TicketIssueOrderCabinPrice {
    directDiscount: number;
}

export interface CreateOrderResultBase extends ResultBase {
    orderNo: string;
    totalPrice: number;
    prices: CreateOrderPriceDetailDto[];
}

export interface ResultBase {
    success: boolean;
    message: string;
    detail: string;
}
export interface CreateOrderRuleInfo {
    ticketPriceFloatRange: AbsoluteDecimalRangeInfo;
    settlementPriceFloatRange: AbsoluteDecimalRangeInfo;
    sellPriceFloatRange: AbsoluteDecimalRangeInfo;
    fixCabin: boolean;
    allowedCabins: string;
    officeNo: string;
    printerNumber: string;
}

export interface AbsoluteDecimalRangeInfo extends ValueRangeBase<number> {}

export interface ValueRangeBase<T> {
    upperLimit: T;
    lowerLimit: T;
}
export interface EtermOrderIdInfo {
    smallPnr: string;
    bigPnr: string;
}
export enum GenderType {
    Male = 0,
    Female = 1,
}
export enum IdentityCardType {
    /// <summary>
    /// 身份证
    /// </summary>
    NI = 0,
    /// <summary>
    /// 护照
    /// </summary>
    PP = 1,
    /// <summary>
    /// 军官证
    /// </summary>
    MI = 2,
    /// <summary>
    /// 警官证
    /// </summary>
    JG = 3,
    /// <summary>
    /// 外国人永久居留身份证
    /// </summary>
    RP = 4,
    /// <summary>
    /// 港澳居民来往内地通行证
    /// </summary>
    HM = 5,
    /// <summary>
    /// 台湾居民居住证
    /// </summary>
    TI = 6,
    /// <summary>
    /// 台湾居民来往大陆通行证
    /// </summary>
    TW = 7,
    /// <summary>
    /// 港澳居民居住证
    /// </summary>
    SX = 8,
    /// <summary>
    /// 其他
    /// </summary>
    OT = 9,
    /// <summary>
    /// 回乡证
    /// </summary>
    HX = 10,
    /// <summary>
    /// 电子护照
    /// </summary>
    IP = 11,
    /// <summary>
    /// 文职干部证
    /// </summary>
    AB = 12,
    /// <summary>
    /// 义务兵证
    /// </summary>
    AC = 13,
    /// <summary>
    /// 士官证
    /// </summary>
    AD = 14,
    /// <summary>
    /// 文职人员证（军方证件）
    /// </summary>
    WR = 15,
    /// <summary>
    /// 职工证（军方证件）
    /// </summary>
    ZG = 16,
    /// <summary>
    /// 武警士兵证
    /// </summary>
    SB = 17,
    /// <summary>
    /// 大陆居民往来台湾通行证
    /// </summary>
    TT = 18,
    /// <summary>
    /// 海员证
    /// </summary>
    HY = 19,
    /// <summary>
    /// 驻华外交人员证
    /// </summary>
    WJ = 20,
    /// <summary>
    /// 户口本（十六周岁以下）
    /// </summary>
    HR = 21,
    /// <summary>
    /// 出生医学证明（十六周岁以下）
    /// </summary>
    BC = 22,
    /// <summary>
    /// 学生证（十六周岁以下）
    /// </summary>
    SD = 23,
    /// <summary>
    /// 户口所在地公安机关出具的身份证明
    /// </summary>
    IC = 24,
    /// <summary>
    /// 外国人永久居留证
    /// </summary>
    YJ = 25,
    /// <summary>
    /// 外国人出入境证
    /// </summary>
    PF = 26,
}

export enum CountryType {
    CN = "中国",
}

export interface IdentityInfo {
    type: IdentityCardType;
    cardNo: string;
    countryCode: string;
    nationCode: string;
    certificateValidityDate: string | null;
}
export enum NameType {
    Chinese = 0,
    English = 1,
}
export interface PassengerInfo {
    name: PassengerName;
    identityInfo: IdentityInfo;
    gender: GenderType | null;
    type: PassengerType;
    birthDate: string;
    phone: string;
    surName: string;
    givenName: string;
    index: number;
}
export interface PassengerName {
    nameType: NameType;
    primary?: string;
    secondary?: string;
}
export enum PassengerTypeFlag {
    None = 0,
    Adult = 1,
    Child = 2,
    Infant = 4,
}
export enum PassengerType {
    Adult = 0,
    Child = 1,
    Infant = 2,
}
export interface PayOrderArgs {
    buyOrderId: string;
    orderPayId: string;
    buyTicketOrderIdInfo: BuyTicketOrderIdInfo;
    requestId: string;
    totalAmount: number;
    createOrderAccountInfo: AccountInfo;
    flights: TicketOrderFlight[];
}

export interface CreditCardPayOrderArgs extends PayOrderArgs {
    creditCardPayInfo: CreditCardPayInfo;
}

export interface CreditCardPayInfo extends CreditCardInfo {
    verificationCode: string;
}

export interface CreditCardInfo {
    validDate: string;
    cardNo: string;
    cvv: string;
    ownerName: string;
    ownerIdentityCardNo: string;
    phone: string;
}
export interface TicketIssueOrderCabinPrice {
    identityCardNo: string;
    fullFlightNo: string;
    cabin: string;
    ticketPrice: number;
    settlementPrice: number;
    airportTax: number;
    oilFee: number;
    totalTax: number;
    couponCode: string;
    couponAmount: number;
    cabinClass: CabinClassType | null;
    type: PassengerType;
}

export interface TicketNoInfo {
    identityCardNo: string;
    name: string;
    fullFlightNo: string;
    ticketNo: string;
}

export interface TicketOrderFlight {
    flightIndex: number;
    originAirport: string;
    destinationAirport: string;
    fullFlightNo: string;
    departureDateTime: string;
    arrivalDateTime: string;
}

export async function getIpv6(): Promise<getIpv6Result> {
    const output = await exec("ip address show wlan0", { adb: true });
    const ipv6Regex =
        /inet6\s(?<Ip>(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))).+?temporary/gm;
    const res = ipv6Regex.exec(output.stdout);
    return {
        success: res?.groups?.Ip ? true : false,
        rawOutput: JSON.stringify(output),
        ip: res?.groups?.Ip ?? "",
    } as getIpv6Result;
}

export interface getIpv6Result {
    success: boolean;
    rawOutput: string;
    ip: string;
}
export enum CabinStatusType {
    I = -8,
    E = -7,
    R = -6,
    Z = -5,
    X = -4,
    C = -3,
    S = -2,
    Q = -1,
    L = 0,
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _4 = 4,
    _5 = 5,
    _6 = 6,
    _7 = 7,
    _8 = 8,
    A = 9,
}

export interface BuyChangeOrderPassengerInfo {
    cabin: string;
    changeFee: number;
    cabinUpgradeFee: number;
    name: PassengerName;
    birthDate: string;
    identityInfo: IdentityInfo;
    gender: GenderType | null;
    phone: string;
    type: PassengerType;
    ticketNo: string;
}

export interface ChangeCreateOrderJobArgs {
    orderId: string;
    buyOrderId: string;
    accountInfo: AccountInfo;
    buyOrderNo: string;
    flightInfos: TicketOrderFlight[];
    newFlightInfos: TicketOrderFlight[];
    buyOrderPassengerInfos: BuyChangeOrderPassengerInfo[];
    requestId: string;
}

export interface CreateTicketChangeOrderResult {
    orderNo: string;
    samllPnr: string;
    bigPnr: string;
    paymentAmount: number;
    currency: string;
    prices: CreateTicketChangeOrderPrice[];
}

export interface CreateTicketChangeOrderPrice {
    passengerType: PassengerType;
    cabinChangeFee: number;
    reissueFee: number;
}
