import * as app from "app";
import * as selector from "ui-selector-ext-v9";
import { delay } from "lang";
import { ZHCreateOrderArgsDto } from "./zh-create-order-args-dto";
import { ZHCreateOrderResultDto } from "./zh-create-order-result-dto";
import { back, scrollBackward, scrollForward } from "accessibility";
import { environment } from "./environment";
import { exec } from "shell";
import { getCityName } from "./airports";
import { UiObject } from "ui_object";
import { formatToTimeZone } from "date-fns-timezone";
import { ZHAppProductInfo } from "./zh-app-product-info";
import {
    ZHCreditCardPayOrderArgsDto,
    ZHPayOrderResultDto,
} from "./zh-pay-order-dtos";
import { ZHOrderDetailDto, ZHQueryOrderDto } from "./zh-query-order-dto";
import {
    ISignalRHandler,
    AppDeviceStatusType,
    BuyTicketIssueOrderStatusType,
    CabinClassType,
    ContactInfo,
    CreateOrderArgs,
    CreateOrderPriceDetailDto,
    CreditCardPayInfo,
    PassengerInfo,
    PassengerType,
    TicketNoInfo,
    TicketOrderFlight,
    IdentityCardType,
} from "app-base-v9";
const appId = "com.air.sz";
const BOOKING_BTN = "booking_button";
const HOME_BTN = "radio_home";
const DATE_PATTERN = "YYYY-MM-DD";
const SHORT_DATE_PATTERN = "YYYYMMDD";
const timezoneOptions = {
    timeZone: "Asia/Shanghai",
};

export class ZHApp {
    private _handler?: ISignalRHandler;

    async init(handler: ISignalRHandler): Promise<void> {
        handler.update(AppDeviceStatusType.Initializing);
        this._handler = handler;
        console.log(`启动APP: ${app.launch(appId)}`);
        try {
            const countDownBtn = await selector.findById(
                "count_down",
                100,
                3000
            );
            countDownBtn?.click();
            await this.backToHome();
            await this.openMine();
            const account = await this.getAccountName();
            handler.update(AppDeviceStatusType.Ready, account);
        } catch (error) {
            console.error(error);
            const msg = (error as Error)?.message;
            handler.update(AppDeviceStatusType.Unknown);
            handler.log(msg);
        }
    }

    log(message: string): void {
        console.log(message);
        this._handler?.log(message);
    }

    async openMine(): Promise<void> {
        // 检测首页下面标签页的 “我”
        const mineBtn = await selector.findById("radio_mine");
        if (!mineBtn) {
            throw new Error(`找不到 我 按钮`);
        }

        mineBtn.click();
        // 我的钱包 座位是否跳转的检查依据
        // const myWallet = await selector.findById(
        //     "txt_my_wallet_title",
        //     500,
        //     5000
        // );
        // if (!myWallet) {
        //     throw new Error(`跳转 我 页面失败`);
        // }
        // 深粉商城 验证是否跳转的检查依据
        const youzan = await selector.findById(
            "youzan_ll",
            500,
            5000
        );
        if (!youzan) {
            throw new Error(`跳转 我 页面失败`);
        }
    }

    async deleteFrequentFlyer(max: number): Promise<number> {
        await this.openMine();

        const managerLayout = await selector.findById(
            "mine_manager_layout",
            100,
            3000
        );

        if (!managerLayout) {
            this.log(`没找到常用信息管理按钮，跳过乘机人删除过程`);
            return 0;
        }

        managerLayout.click();

        const passengerManagerBtn = await selector.findById(
            "management_passenger_layout",
            100,
            2000
        );
        if (!passengerManagerBtn) {
            this.log(`没找到乘机人编辑按钮，跳过乘机人删除过程`);
            return 0;
        }

        passengerManagerBtn.click();

        let passengerListView = await selector.findById(
            "passenger_list",
            500,
            5000
        );

        if (!passengerListView) {
            this.log(`没找到乘机人列表，跳过乘机人删除过程`);
            return 0;
        }

        if (passengerListView.childCount <= 0) {
            return 0;
        }

        // 滑动到最底部，同时记录乘客信息+人数 然后从后往前 保留max个乘客 删除其他乘客 一次最多删除10人
        let cardNos: string[] = [];
        let retry = 30;
        while (retry > 0) {
            retry--;
            const countWhenStart = cardNos.length;
            for (const p of passengerListView.children) {
                const cardNoText = selector.findChildById(
                    p,
                    "passenger_no_text"
                );

                if (!cardNoText) {
                    continue;
                }

                if (!cardNos.find((x) => x === cardNoText.text)) {
                    cardNos.push(cardNoText.text);
                }
            }

            if (cardNos.length === countWhenStart) {
                break;
            }

            passengerListView.scrollForward();
            await delay(1000);
            passengerListView = await selector.getById("passenger_list");
        }

        this.log(`获取所有乘客证件号${cardNos.length}个 ${cardNos.join("|")}`);
        if (cardNos.length <= max) {
            this.log(`不需要删除常旅客`);
            return 0;
        }

        let needToDelete = cardNos.slice(
            Math.max(0, cardNos.length - max - 10),
            cardNos.length - max
        );

        this.log(`需要删除数量 ${needToDelete.length}`);
        if (needToDelete.length < 1) {
            return 0;
        }

        let index = needToDelete.length - 1;

        retry = 30;
        while (retry > 0) {
            retry--;
            const item = needToDelete[index];
            let foundInCurrentView = false;
            for (const p of passengerListView.children) {
                const cardNoText = selector.findChildById(
                    p,
                    "passenger_no_text"
                );

                if (!cardNoText) {
                    continue;
                }

                if (cardNoText.text === item) {
                    foundInCurrentView = true;
                    await this.deletePassenger(cardNoText);
                    if (index > 0) {
                        index--;
                        break;
                    } else {
                        return needToDelete.length;
                    }
                }
            }

            if (foundInCurrentView) {
                continue;
            }

            passengerListView.scrollBackward();
            await delay(1000);
            passengerListView = await selector.getById("passenger_list");
        }

        return needToDelete.length;
    }

    private async deletePassenger(cardNoText: UiObject): Promise<boolean> {
        let retry = 3;
        while (retry > 0) {
            retry--;

            const parent = selector.findClickableParent(cardNoText);
            if (parent) {
                parent.longClick();
                let deleteBtn = await selector.findById(
                    "delete_passenger_btn",
                    50,
                    200
                );

                if (deleteBtn) {
                    deleteBtn.click();
                    const confirmBtn = await selector.findById(
                        "dialog_left_button",
                        200,
                        2000
                    );

                    if (confirmBtn) {
                        confirmBtn.click();
                        await this.waitForLoading();
                    }

                    return true;
                }
            }
        }

        return false;
    }

    async waitForLoading(): Promise<void> {
        let retry = 45;
        let loadingIcon = await selector.findById("loading_layout", 100, 1000);
        while (loadingIcon && retry > 0) {
            retry--;
            await delay(1000);
            loadingIcon = await selector.findById("loading_layout", 100, 1000);
        }

        if (loadingIcon) {
            throw new Error(`页面一直处于加载中状态，请检查网络`);
        }
    }

    async cancelLoading(): Promise<void> {
        let dismissLoading = await selector.findById("dismissBtn", 100, 2000);

        if (dismissLoading) {
            dismissLoading.click();
        }
    }

    async openHome(): Promise<void> {
        let home = await selector.findById(HOME_BTN, 200, 2000);
        if (home) {
            home.click();
        } else {
            home = await this.backToHome();
            home.click();
        }

        await selector.getById(BOOKING_BTN);
    }

    async scrollDate(year: number, month: number, day?: number) {
        if (!environment.adb) {
            throw new Error("滑动日期需要adb权限！当前为获取adb权限");
        }

        const dateView = await selector.getById("date_view_layout");
        await exec(
            `input swipe ${dateView.boundsInScreen.centerX} ${dateView.boundsInScreen.centerY} ${dateView.boundsInScreen.centerX + 10} ${dateView.boundsInScreen.centerY} 100`,
            { adb: true }
        );

        if (year !== 0) {
            const yearScrollView = await selector.getById("year_wv");
            const bounds = yearScrollView.boundsInScreen;
            const count = Math.abs(year);
            const targetY =
                year > 0 ? bounds.centerY - 80 : bounds.centerY + 80;
            for (let index = 0; index < count; index++) {
                await exec(
                    `input swipe ${bounds.centerX} ${bounds.centerY} ${bounds.centerX} ${targetY} 180`,
                    { adb: true }
                );
                await delay(200);
            }
        }

        if (month !== 0) {
            const monthScrollView = await selector.getById("mouth_wv");
            const bounds = monthScrollView.boundsInScreen;
            const count = Math.abs(month);
            const targetY =
                month > 0 ? bounds.centerY - 80 : bounds.centerY + 80;
            for (let index = 0; index < count; index++) {
                await exec(
                    `input swipe ${bounds.centerX} ${bounds.centerY} ${bounds.centerX} ${targetY} 180`,
                    { adb: true }
                );
                await delay(200);
            }
        }

        if (day && day !== 0) {
            const dayScrollView = await selector.getById("day_wv");
            const bounds = dayScrollView.boundsInScreen;
            const count = Math.abs(day);
            const targetY = day > 0 ? bounds.centerY - 80 : bounds.centerY + 80;
            for (let index = 0; index < count; index++) {
                await exec(
                    `input swipe ${bounds.centerX} ${bounds.centerY} ${bounds.centerX} ${targetY} 180`,
                    { adb: true }
                );
                await delay(200);
            }
        }

        const confirmBtn = await selector.getById("confirm");
        confirmBtn.click();
    }

    private async backToHome(): Promise<UiObject> {
        console.log(
            `当前找不到首页按钮，尝试回到主页 adb权限${environment.adb}`
        );

        let home = await selector.findById(HOME_BTN, 200, 2000);
        if (!home) {
            await this.waitForTip(false, true);
            home = await selector.findById(HOME_BTN, 100, 1000);
            if (home) {
                return home;
            }

            // 尝试点击右上角按钮
            const toolbarHomeBtn = await selector.findById(
                "toolbar_home_image",
                100,
                1000
            );

            if (toolbarHomeBtn) {
                toolbarHomeBtn.click();
                const goToHomeBtn = await selector.findByTextContains(
                    "去首页",
                    200,
                    2000
                );
                if (goToHomeBtn) {
                    goToHomeBtn.click();
                } else {
                    await this.waitForTip(false, true);
                }

                home = await selector.findById(HOME_BTN, 200, 2000);
                if (home) {
                    return home;
                }
            }

            let retry = 5;
            while (retry > 0) {
                retry--;
                back();
                back();

                home = await selector.findById(HOME_BTN, 200, 2000);
                if (home) {
                    return home;
                }

                const desktop = await selector.findById("workspace", 200, 2000);
                if (desktop) {
                    console.log(`启动APP: ${app.launch(appId)}`);
                    home = await selector.getById(HOME_BTN);
                    return home;
                }
            }

            throw new Error("打开主页失败 找不到首页按钮");
        } else {
            return home;
        }
    }

    async searchFlight(orig: string, dest: string, date: Date): Promise<void> {
        const oriInput = await selector.getById("booking_start_city_text");
        oriInput.click();
        await this.inputAirport(orig);
        const destInput = await selector.getById("booking_arrive_city_text");
        destInput.click();
        await this.inputAirport(dest);
        await this.selectDate(date);

        const searchBtn = await selector.getById(BOOKING_BTN);
        searchBtn.click();
    }

    async findFlight(fullFlightNo: string): Promise<UiObject | undefined> {
        await scrollBackward();
        console.log(`查找航班 ${fullFlightNo}`);
        await this.waitForLoading();
        const noFlight = await selector.findById("flight_null_text", 200, 2000);
        if (noFlight) {
            throw new Error(`该日期无此航班${fullFlightNo}`);
        }

        let flightNoText: UiObject | undefined = (
            await selector.findAllById("fight_num_text", 1000, 10000)
        ).find((x) => x.text === fullFlightNo);

        let retry = 10;
        while (!flightNoText && retry > 0) {
            retry--;
            scrollForward();
            await delay(1000);
            flightNoText = (
                await selector.findAllById("tv_month", 500, 5000)
            ).find((x) => x.text === fullFlightNo);
        }

        if (flightNoText) {
            return selector.findClickableParent(flightNoText);
        } else {
            return undefined;
        }
    }

    async validateFlightInfo(
        departureDateTime: string,
        arrivalDateTime: string,
        fullFlightNo: string
    ): Promise<void> {
        const startDateText = await selector.getById("start_date"); // 08-17 星期三
        const startTimeText = await selector.getById("start_time"); // 19:30
        const endTimeText = await selector.getById("end_time");
        const flightNoText = await selector.getById("flight_no"); // ZH1234

        const startDate = startDateText.text.substring(0, 5);

        this.log(
            `校验航班信息 ${flightNoText.text} ${startDate} ${startTimeText.text} ~ ${endTimeText.text}`
        );

        if (flightNoText.text !== fullFlightNo) {
            throw new Error(
                `校验航班信息 航班号不匹配 预期${fullFlightNo} 实际${flightNoText.text}`
            );
        }

        const depDateTime = new Date(departureDateTime);
        const arrDateTime = new Date(arrivalDateTime);
        const depDateExp = formatToTimeZone(
            depDateTime,
            "MM-DD",
            timezoneOptions
        );
        const depTimeExp = formatToTimeZone(
            depDateTime,
            "HH:mm",
            timezoneOptions
        );
        const arrTimeExp = formatToTimeZone(
            arrDateTime,
            "HH:mm",
            timezoneOptions
        );

        if (depDateExp !== startDate) {
            throw new Error(
                `校验航班信息 出发日期不匹配 预期${depDateExp} 实际${startDate}`
            );
        }

        if (depTimeExp !== startTimeText.text) {
            throw new Error(
                `校验航班信息 出发时间不匹配 预期${depTimeExp} 实际${startTimeText.text}`
            );
        }

        if (arrTimeExp !== endTimeText.text) {
            throw new Error(
                `校验航班信息 到达时间不匹配 预期${arrTimeExp} 实际${endTimeText.text}`
            );
        }
    }

    async selectCabin(args: ZHCreateOrderArgsDto): Promise<ZHAppProductInfo> {
        let products = await this.getProducts();
        const productText = products
            .map(
                (x) =>
                    `${x.productName}:${x.cabin}-(${x.ticketPrice},${x.settlementPrice})`
            )
            .join("|");

        this.log(`获取到所有产品 ${productText}`);

        // 根据要求的产品 + 价格 + 舱位 筛选
        products = this.filterByProductCodes(products, args.productCodes);
        products = this.filterByRules(products, args);

        if (products.length === 0) {
            throw new Error(`没有符合条件的产品 查到的产品(${productText}) 产品代码(${args.productCodes}) 规则 ${JSON.stringify(args.createOrderRuleInfo)}`);
        }

        products.sort(
            (firstItem, secondItem) =>
                firstItem.ticketPrice - secondItem.ticketPrice
        );

        const bestProduct = products[0];
        this.log(`已选择最优产品 ${bestProduct.productName}:${bestProduct.cabin}-(${bestProduct.ticketPrice},${bestProduct.settlementPrice})`);

        return bestProduct;
    }

    async inputPassenger(args: ZHCreateOrderArgsDto): Promise<void> {
        await this.waitForLoading();
        let retry = 10;
        let tip = await selector.findByTextContains("温馨提示", 100, 3000);
        while (retry > 0 && tip) {
            await delay(1000);
            (await selector.getById("tvCommit")).click();
            tip = await selector.findByTextContains("温馨提示", 100, 500);
        }

        // 删除所有已选中乘机人
        await this.removeAllSelectedPassenger();

        const passengerAddBtn = await selector.getById("passenger_add");
        passengerAddBtn.click();
        await delay(800);

        await this.createOrSelectPassenger(args.passengers);

        // 可能再次出现
        const confirm = await selector.findById("tvCommit", 100, 1000);
        if (confirm) {
            await delay(4000);
            confirm.click();
        }

        // 检查已选择乘机人证件
        await this.validatePassengerCardNo(args.passengers);
    }

    async inputContactAndCheck(contact: ContactInfo): Promise<void> {
        await this.getAndInputText("booking_contact_person_edit", contact.name);

        await this.getAndInputText(
            "booking_contact_mobile_edit",
            contact.phone
        );

        await this.getAndInputText("ca_contact_email", contact.email);

        const confirmCheckBox = await selector.getById("condition_radio");
        confirmCheckBox.showOnScreen();
        confirmCheckBox.click();
    }

    async getAndInputText(id: string, text: string): Promise<void> {
        const item = await selector.getById(id);
        item.showOnScreen();
        item.setText(text);
    }

    async checkPrices(
        args: CreateOrderArgs,
        cabin: string
    ): Promise<CreateOrderPriceDetailDto[]> {
        const result: CreateOrderPriceDetailDto[] = [];
        const priceDetailBtn = await selector.getById("price_info_layout");
        priceDetailBtn.click();
        try {
            let childTicketPrice: number | undefined = undefined;
            let childOilFee: number | undefined = undefined;
            const adultDetail = await selector.getById("ll_adult");
            const adultTicketPriceText = selector.getChildById(
                adultDetail,
                "tv_ticket_price"
            );
            const adultTicketPrice = Number(adultTicketPriceText.text);
            if (isNaN(adultTicketPrice)) {
                throw new Error(
                    `解析成人详情票面价失败 ${adultTicketPriceText.text}不是有效的数字`
                );
            }

            const adultOilFeeDetail = await selector.getById("ll_surcharge");
            const adultOilFeeText = selector.getChildById(
                adultOilFeeDetail,
                "tv_surcharge"
            );
            const adultOilFee = Number(adultOilFeeText.text);
            if (isNaN(adultOilFee)) {
                throw new Error(
                    `解析成人燃油失败 ${adultOilFeeText.text}不是有效的数字`
                );
            }

            const childDetail = await selector.findById("ll_child", 100, 200);
            if (childDetail) {
                const childTicketPriceText = await selector.getChildById(
                    childDetail,
                    "tv_child_ticket_price"
                );
                childTicketPrice = Number(childTicketPriceText.text);
                if (isNaN(childTicketPrice)) {
                    throw new Error(
                        `解析儿童详情票面价失败 ${childTicketPriceText.text}不是有效的数字`
                    );
                }

                const childOilFeeDetail = await selector.getById(
                    "ll_surcharge_child"
                );
                const childOilFeeText = selector.getChildById(
                    childOilFeeDetail,
                    "tv_surcharge_child"
                );

                childOilFee = Number(childOilFeeText.text);
                if (isNaN(childOilFee)) {
                    throw new Error(
                        `解析成人燃油失败 ${childOilFeeText.text}不是有效的数字`
                    );
                }
            }

            // 成人才有
            const airportTaxDetail = await selector.getById("ll_fees");
            const airportTaxText = selector.getChildById(
                airportTaxDetail,
                "tv_fees"
            );
            const airportTax = Number(airportTaxText.text);
            if (isNaN(airportTax)) {
                throw new Error(
                    `解析基建费失败 ${airportTaxText.text}不是有效的数字`
                );
            }

            for (const cabinPrice of args.cabinPriceInfos) {
                const actualPrice = cabinPrice as CreateOrderPriceDetailDto;
                switch (actualPrice.type) {
                    case PassengerType.Adult:
                        actualPrice.ticketPrice = adultTicketPrice;
                        actualPrice.settlementPrice = adultTicketPrice;
                        actualPrice.cabin = cabin;
                        actualPrice.airportTax = airportTax;
                        actualPrice.oilFee = adultOilFee;
                        actualPrice.totalTax =
                            actualPrice.airportTax + actualPrice.oilFee;
                        break;
                    case PassengerType.Child:
                        actualPrice.ticketPrice = childTicketPrice ?? 0;
                        actualPrice.settlementPrice = childTicketPrice ?? 0;
                        actualPrice.cabin = cabin;
                        actualPrice.airportTax = 0;
                        actualPrice.oilFee = childOilFee ?? 0;
                        actualPrice.totalTax =
                            actualPrice.airportTax + actualPrice.oilFee;
                        break;
                    case PassengerType.Infant:
                        break;
                    default:
                        break;
                }
                result.push(actualPrice);
            }

            return result;
        } finally {
            (await selector.getById("ll_totalPrice")).click();
        }
    }

    async validatePassengerCardNo(passengers: PassengerInfo[]): Promise<void> {
        const passengerListView = await selector.getById(
            "booking_person_list_layout"
        );

        const selectedCardNos: string[] = [];
        for (const p of passengerListView.children) {
            const no = selector.getChildById(p, "person_no_text");
            selectedCardNos.push(no.text);
        }

        for (const p of passengers) {
            if (!selectedCardNos.find((x) => x === p.identityInfo.cardNo)) {
                throw new Error(
                    `校验已选择的乘机人失败 乘机人${p.name.primary}未选中`
                );
            }
        }
    }

    async createOrSelectPassenger(passengers: PassengerInfo[]): Promise<void> {
        // 检查是否已有，如果有则选中
        const targetCardNos = passengers.map((x) => x.identityInfo.cardNo);
        const selectedCardNos: string[] = [];
        let passengerListView = await selector.findById(
            "passenger_list",
            500,
            5000
        );

        if (!passengerListView) {
            throw new Error("找不到乘机人列表，编辑乘机人失败");
        }

        if (passengerListView.children.length > 0) {
            let retry = 30;
            let lastCardNo: string = "";
            while (retry > 0) {
                retry--;
                const lastChild = passengerListView.children.at(-1);
                if (lastChild) {
                    const lastCardNoText = selector.getChildById(
                        lastChild,
                        "passenger_no_text"
                    );
                    if (lastCardNoText.text === lastCardNo) {
                        break;
                    }
                }

                for (const p of passengerListView.children) {
                    const cardNoText = selector.getChildById(
                        p,
                        "passenger_no_text"
                    );

                    if (
                        targetCardNos.find((x) => x === cardNoText.text) &&
                        !selectedCardNos.find((x) => x === cardNoText.text)
                    ) {
                        const checkBox = selector.getChildById(
                            p,
                            "passenger_checkbox"
                        );
                        if (!checkBox.checked) {
                            checkBox.click();
                        }

                        selectedCardNos.push(cardNoText.text);
                    }

                    lastCardNo = cardNoText.text;
                }

                passengerListView.scrollForward();
                await delay(1000);
                passengerListView = await selector.getById("passenger_list");
            }
        }

        this.log(`已选中乘机人 ${selectedCardNos.join(",")}`);

        if (targetCardNos.length === selectedCardNos.length) {
            (await selector.getById("passenger_sure_button")).click();
            await delay(800);
            return;
        }

        // 新建
        for (const psg of passengers) {
            if (selectedCardNos.find((x) => x === psg.identityInfo.cardNo)) {
                continue; // 已选中
            }

            await this.addPassenger(psg);
        }

        (await selector.getById("passenger_sure_button")).click();
        await delay(800);
    }

    async addPassenger(psg: PassengerInfo): Promise<void> {
        const addBtn = await selector.getById("passenger_add_layout");
        addBtn.click();

        const name = psg.name.primary ?? "" + psg.name.secondary ?? "";
        console.log(`证件类型 ${psg.identityInfo.type}`)
        if (psg.identityInfo.type != IdentityCardType.NI) {
            // 点击证件类型
            const typeBtn = await selector.getById("id_type");
            typeBtn.click();
        }
        const passengerType = await selector.getById("passenger_type_wheel");
        switch (psg.identityInfo.type) {
            case IdentityCardType.PP:
                // 护照
                this.pickerScroll(passengerType, 1);
                break;
            default:
                break;
        }
        await this.getAndInputText("passenger_name", name);
        await this.getAndInputText("passenger_ni_num", psg.identityInfo.cardNo);
        await this.getAndInputText("contact_type_num", psg.phone);

        const confirmBtn = await selector.getById("sure_add_button");
        confirmBtn.click();

        await this.waitForTip(true, true);
    }

    // 滚动
    async pickerScroll(item: UiObject, diff: number): Promise<void> {
        if (diff > 0) {
            for (let index = 0; index < diff; index++) {
                item.scrollBackward();
                await delay(300);
            }
        } else {
            for (let index = 0; index < Math.abs(diff); index++) {
                item.scrollForward();
                await delay(300);
            }
        }
    }

    async waitForTip(
        throwError: boolean,
        clickLeftBtn: boolean
    ): Promise<void> {
        const tip = await selector.findById("dialog_title_text", 200, 2000);
        if (tip) {
            const content = await selector.getById("dialog_content_text");
            const text = `出现提示 ${content.text}`;
            if (throwError) {
                (await selector.getById("dialog_left_button")).click();
                throw new Error(text);
            } else {
                console.log(text);
            }

            if (clickLeftBtn) {
                (await selector.getById("dialog_left_button")).click();
            } else {
                (
                    await selector.findById("dialog_right_button", 100, 1000)
                )?.click();
            }
        }
    }

    async removeAllSelectedPassenger(): Promise<void> {
        let retry = 20;
        while (retry > 0) {
            retry--;
            const selectedPassenger = await selector.findById(
                "passenger_item_ll",
                200,
                2000
            );

            if (!selectedPassenger) {
                return;
            }

            if (selectedPassenger.longClickable) {
                selectedPassenger.longClick();
            } else {
                (await selector.getById("person_delete_image")).click();
            }

            (await selector.findById("delete_ll", 100, 1000))?.click();
        }
    }

    filterByRules(
        products: ZHAppProductInfo[],
        args: CreateOrderArgs
    ): ZHAppProductInfo[] {
        // 成人
        const adultPassenger = args.passengers.find(
            (x) => x.type === PassengerType.Adult
        );
        if (!adultPassenger) {
            throw new Error(`不支持没有成人下单`);
        }

        const adultPrice = args.cabinPriceInfos.find(
            (x) => x.identityCardNo === adultPassenger.identityInfo.cardNo
        );

        if (!adultPrice) {
            throw new Error(`未找到成人价格 ${adultPassenger.name}`);
        }

        let result: ZHAppProductInfo[] = [];
        const compareDetail: string[] = [];

        for (const product of products) {
            const ticket = product.ticketPrice - adultPrice.ticketPrice;
            if (
                args.createOrderRuleInfo?.ticketPriceFloatRange &&
                (args.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit >
                    ticket ||
                    ticket >
                    args.createOrderRuleInfo.ticketPriceFloatRange
                        .upperLimit)
            ) {
                compareDetail.push(
                    `APP票面-OTA票面 ${product.ticketPrice}-${adultPrice.ticketPrice}=${ticket}，不符合票面价要求${args.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.ticketPriceFloatRange.upperLimit}`
                );
                continue;
            }
            const settlement =
                product.settlementPrice - adultPrice.settlementPrice;
            if (
                args.createOrderRuleInfo?.settlementPriceFloatRange &&
                (args.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit >
                    settlement ||
                    settlement >
                    args.createOrderRuleInfo.settlementPriceFloatRange
                        .upperLimit)
            ) {
                compareDetail.push(
                    `APP结算-OTA结算=${settlement}，不符合结算价要求${args.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.settlementPriceFloatRange.upperLimit}`
                );
                continue;
            }
            const sell = product.ticketPrice - adultPrice.settlementPrice;
            if (
                args.createOrderRuleInfo?.sellPriceFloatRange &&
                (args.createOrderRuleInfo.sellPriceFloatRange.lowerLimit >
                    sell ||
                    sell >
                    args.createOrderRuleInfo.sellPriceFloatRange.upperLimit)
            ) {
                compareDetail.push(
                    `APP票面-OTA结算=${sell}，不符合销售范围${args.createOrderRuleInfo.sellPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.sellPriceFloatRange.upperLimit}`
                );
                continue;
            }

            if (args.createOrderRuleInfo.fixCabin) {
                if (adultPrice.cabin[0] !== product.cabin[0]) {
                    compareDetail.push(
                        `要求固定舱位${adultPrice.cabin[0]}，实际舱位不符合 ${product.cabin[0]}`
                    );
                    continue;
                }
            } else {
                const allowedCabins =
                    args.createOrderRuleInfo.allowedCabins.split("|");
                if (!allowedCabins.find((x) => x[0] === product.cabin[0])) {
                    compareDetail.push(
                        `实际舱位不符合 ${product.cabin[0]} 不在允许的舱位范围中 ${args.createOrderRuleInfo.allowedCabins}`
                    );
                    continue;
                }
            }

            result.push(product);
        }

        this.log(`筛选产品：${compareDetail.join("||")}`);

        return result;
    }

    filterByProductCodes(
        products: ZHAppProductInfo[],
        productCodes: string
    ): ZHAppProductInfo[] {
        productCodes = productCodes?.trim();
        if (productCodes && productCodes.length > 0) {
            // 根据产品名称筛选
            const productCodeList = productCodes.split("|");
            return products.filter((x) =>
                productCodeList.find((y) => x.productName === y)
            );
        } else {
            // 不筛选
            return products;
        }
    }

    async getProducts(): Promise<ZHAppProductInfo[]> {
        let result: ZHAppProductInfo[] = [];
        const productListView = await selector.findById("flight_product_list");
        if (!productListView) {
            throw new Error(`找不到产品列表`);
        }

        let retry = 5;
        while (retry > 0) {
            retry--;
            const items = await selector.findAllById(
                "all_base_info_layout",
                500,
                5000
            );
            for (const item of items) {
                const productInfo = this.getProductInfo(item);

                const exists = result.find(
                    (x) =>
                        x.cabin === productInfo.cabin &&
                        x.productName === productInfo.productName &&
                        x.ticketPrice === productInfo.ticketPrice
                );

                if (!exists) {
                    result.push(productInfo);
                } else {
                    return result;
                }
            }

            productListView.scrollDown();
            await delay(1000);
        }

        return result;
    }

    private getProductInfo(item: UiObject): ZHAppProductInfo {
        const priceText = selector.getChildById(item, "cabin_price");
        const productNameText = selector.getChildById(item, "product_name");
        const cabinText = selector.getChildById(item, "cabin");
        const discountText = selector.getChildById(item, "discount");
        const bookingBtn = selector.getChildById(item, "booking_ticket");

        this.log(
            `找到产品 ${productNameText.text}:${priceText.text}|${cabinText.text}|${discountText.text}`
        );

        const ticketPrice = Number(priceText.text);
        if (isNaN(ticketPrice)) {
            throw new Error(`解析票面价失败 ${priceText.text}不是有效的数字`);
        }

        const productInfo = {
            productName: productNameText.text,
            cabin: cabinText.text.replace("舱", "").trim(),
            cabinClass: CabinClassType.EconomyClass,
            ticketPrice: ticketPrice,
            settlementPrice: ticketPrice,
            discountRate: discountText.text,
            bookingBtn: bookingBtn,
        } as ZHAppProductInfo;
        return productInfo;
    }

    async selectDate(date: Date) {
        let retry = 5;
        while (retry > 0) {
            retry--;
            const dateBtn = await selector.getById("booking_start_date_text");
            const currentDate = await this.getCurrentDate(
                dateBtn.text,
                new Date()
            );

            const currentDateText = formatToTimeZone(
                currentDate,
                DATE_PATTERN,
                timezoneOptions
            );
            const targetDateText = formatToTimeZone(
                date,
                DATE_PATTERN,
                timezoneOptions
            );
            console.log(
                `当前日期 ${currentDateText} 目标日期 ${targetDateText}`
            );
            if (currentDateText === targetDateText) {
                return;
            } else {
                if (!dateBtn.parent) {
                    throw new Error(`日期控件父级未找到`);
                }

                dateBtn.parent.click();
                await this.inputDate(date);
            }
        }
    }

    private async inputDate(date: Date): Promise<void> {
        await scrollBackward();

        if (
            formatToTimeZone(date, SHORT_DATE_PATTERN, timezoneOptions) ===
            formatToTimeZone(new Date(), SHORT_DATE_PATTERN, timezoneOptions)
        ) {
            const today = await selector.findByTextContains("今天");
            if (!today || !today.parent) {
                throw new Error(`找不到“今天”日期按钮`);
            }

            today.parent.click();
            return;
        }

        const targetMonthText = formatToTimeZone(
            date,
            "YYYY年MM月",
            timezoneOptions
        );
        console.log(`目标月份 ${targetMonthText}`);
        const targetMonthLabel = await this.findTargetMonthLabel(
            targetMonthText
        );

        if (!targetMonthLabel) {
            throw new Error(`找不到月份 ${targetMonthText}`);
        }

        if (!targetMonthLabel.parent) {
            throw new Error(`月份 ${targetMonthText} 的父级为空`);
        }

        // 找到日期天数面板
        const dayPanel = targetMonthLabel.parent.children.find(
            (x) => x.id === "gv_month"
        );
        if (!dayPanel) {
            throw new Error(`找不到日期面板`);
        }

        for (const iterator of dayPanel.children) {
            const dayBtn = iterator.children.find((x) => x.id === "tv_day");

            if (dayBtn && dayBtn.text === date.getDate().toString()) {
                console.log(
                    `找到日期 ${dayBtn.text} 目标日期 ${date
                        .getDate()
                        .toString()}`
                );
                iterator.click();
                return;
            }
        }
    }

    private async findTargetMonthLabel(
        month: string
    ): Promise<UiObject | undefined> {
        let label: UiObject | undefined = (
            await selector.findAllById("tv_month", 500, 5000)
        ).find((x) => x.text === month);
        let retry = 10;
        while (!label && retry > 0) {
            retry--;
            scrollForward();
            await delay(1000);
            label = (await selector.findAllById("tv_month", 500, 5000)).find(
                (x) => x.text === month
            );
        }
        return label;
    }

    private async getCurrentDate(dateText: string, now: Date): Promise<Date> {
        const dateNumbers = dateText.match(/\d+/g);
        if (dateNumbers?.length === 2) {
            const d = new Date(
                now.getFullYear(),
                +dateNumbers[0] - 1,
                +dateNumbers[1]
            );

            if (
                d < new Date(now.getFullYear(), now.getMonth(), now.getDate())
            ) {
                d.setFullYear(d.getFullYear() + 1);
            }

            return d;
        } else {
            throw new Error(`无法解析日期 ${dateText}`);
        }
    }

    async inputAirport(airport: string): Promise<void> {
        const input = await selector.getById("booking_selectcity_autotv");
        input.click();
        input.setText(airport);
        const cityName = getCityName(airport);
        await selector.getById("booking_querycity_listview");
        let retry = 10;
        let cityList = await selector.findAllById("city_bar_title", 500, 5000);

        console.log(`城市列表 ${cityList.map((x) => x.text).join(",")}`);

        // 排除
        cityList = cityList.filter(
            (x) =>
                x.text !== "B" &&
                x.text !== "A" &&
                x.text !== "热门城市" &&
                x.text !== "当前城市" &&
                x.text !== "常用城市"
        );

        console.log(
            `筛选有效城市列表 ${cityList.map((x) => x.text).join(",")}`
        );

        while (retry > 0 && cityList.length === 0) {
            retry--;
            cityList = await selector.findAllById("city_bar_title", 500, 5000);
        }

        if (cityList.length === 0) {
            throw new Error(`机场代码 ${airport} 无法查询到出发城市`);
        }

        let cityBtn: UiObject | undefined;
        if (cityList.length === 1) {
            cityBtn = cityList[0];
        } else {
            if (!cityName) {
                throw new Error(`城市 ${airport} 未配置城市名称`);
            }
            cityBtn = cityList.find((x) => x.text === cityName);
        }

        if (!cityBtn) {
            throw new Error(`城市列表找不到 ${airport} 对应的城市 ${cityName}`);
        }

        cityBtn.click();
    }

    async getAccountName(): Promise<string> {
        const accountText = await selector.findById("mine_name_text");

        if (!accountText) {
            return "";
        }

        return accountText.text;
    }

    async getTotalPrice(): Promise<number> {
        const totalPriceText = await selector.getById("total_price_text");
        const totalPrice = Number(totalPriceText.text);
        if (isNaN(totalPrice)) {
            throw new Error(
                `解析支付总价失败 ${totalPriceText.text}不是有效的数字`
            );
        }

        return totalPrice;
    }

    async confirmOrder(): Promise<void> {
        (await selector.getById("sure_pay_button")).click();
        // TODO 提交错误处理

        await this.waitForTip(true, true);

        const paySuccessTitle = await selector.findByTextContains("支付订单");
        this.log(`订单提交成功`);

        // 检测售罄
        await this.waitForTip(true, true);

        await this.clickRightTopHome();

        const goToHomeBtn = await selector.findByTextContains(
            "确认",
            200,
            2000
        );
        if (goToHomeBtn) {
            goToHomeBtn.click();
        } else {
            (await selector.getById("dialog_left_button")).click();
        }
    }

    async getOrderNo(
        fullFlightNo: string,
        depDate: string,
        totalPrice: number
    ): Promise<string> {
        await this.openWaitToPayOrder(fullFlightNo, depDate, totalPrice);

        await this.waitForLoading();
        let orderNo = (await selector.getById("tv_order_no")).text;
        if (!orderNo) {
            await delay(2000);
            orderNo = (await selector.getById("tv_order_no")).text;
        }

        await this.clickRightTopHome();

        return orderNo;
    }

    async openWaitToPayOrder(
        fullFlightNo: string,
        depDate: string,
        totalPrice: number
    ): Promise<void> {
        await this.openMine();

        const waitToPayBtn = await selector.getById("mine_wait_pay_text");
        waitToPayBtn.click();

        await this.waitForLoading();

        const orderCard = await this.findOrderCard(
            fullFlightNo,
            depDate,
            totalPrice
        );
        if (!orderCard) {
            throw new Error(
                `待支付订单中找不到订单 ${fullFlightNo} ${depDate} ${totalPrice}`
            );
        }
    }

    async findOrderCard(
        fullFlightNo: string,
        depDate: string,
        totalPrice: number,
        orderNo?: string // 为空时取第一个匹配的
    ): Promise<UiObject | undefined> {
        let retry = 10;
        let lastOrderCard: { fn: string; dt: string; p: number } | undefined =
            undefined;

        while (retry > 0) {
            await delay(1000);
            retry--;
            let ordersView = await selector.getById("recycler_view");

            if (ordersView.childCount <= 0) {
                return undefined;
            }

            const lastChild = ordersView.children.at(-1);
            if (lastChild && lastOrderCard) {
                const fn = selector.getChildById(
                    lastChild,
                    "flight_no_text"
                ).text;
                const dt = selector.getChildById(lastChild, "date_text").text;
                const p = Number(
                    selector.getChildById(lastChild, "price_text").text
                );

                if (
                    lastOrderCard.p === p &&
                    lastOrderCard.fn === fn &&
                    lastOrderCard.dt === dt
                ) {
                    break;
                }
            }

            for (let index = 0; index < ordersView.children.length; index++) {
                const order = ordersView.children[index];

                const fn = selector.getChildById(order, "flight_no_text").text;
                const dt = selector.getChildById(order, "date_text").text;
                const p = Number(
                    selector.getChildById(order, "price_text").text
                );

                lastOrderCard = { fn, dt, p };

                if (
                    fn.includes(fullFlightNo) &&
                    dt.includes(depDate) &&
                    p == totalPrice
                ) {
                    order.click();
                    if (!orderNo) {
                        return order;
                    }

                    await this.waitForLoading();

                    let actualOrderNo = (await selector.getById("tv_order_no"))
                        .text;
                    if (!actualOrderNo) {
                        await delay(2000);
                        actualOrderNo = (await selector.getById("tv_order_no"))
                            .text;
                    }

                    if (orderNo !== actualOrderNo) {
                        this.log(
                            `存在相同${fn}-${dt}-${p} 但是订单号不是目标订单号(${orderNo})的订单${actualOrderNo} 跳过`
                        );

                        // 返回
                        back();
                        ordersView = await selector.getById("recycler_view");
                    } else {
                        return order;
                    }
                } else {
                    console.log(
                        `目标订单 ${fullFlightNo}-${depDate}-${totalPrice} 当前订单 ${fn}-${dt}-${p}`
                    );
                }
            }

            ordersView.scrollForward();
        }

        return undefined;
    }

    private async clickRightTopHome() {
        const toolbarHomeBtn = await selector.getById(
            "toolbar_home_image",
            100,
            1000
        );

        toolbarHomeBtn.click();
    }

    // 下单
    async CreateOrder(
        input: ZHCreateOrderArgsDto
    ): Promise<ZHCreateOrderResultDto> {
        try {
            // 下单前检查
            if (input.flights.length > 1) {
                throw new Error("暂不支持多程下单");
            }

            const flight = input.flights[0];

            await this.openHome();

            // 删除乘机人
            await this.deleteFrequentFlyer(20);

            // 查询航班
            await this.openHome();
            await this.searchFlight(
                flight.originAirport,
                flight.destinationAirport,
                new Date(flight.departureDateTime)
            );

            await this.waitForLoading();

            // 选择航班
            const targetFlight = await this.findFlight(flight.fullFlightNo);

            if (!targetFlight) {
                throw new Error(`未找到航班 ${flight.fullFlightNo}`);
            }

            targetFlight.showOnScreen();
            this.log(`选择航班 ${targetFlight.click()}`);

            // 确保选中航班，如果没有跳转再次点击
            const startEndCity = await selector.findById(
                "flight_start_end_city",
                200,
                2000
            );
            if (startEndCity) {
                this.log(`再次点击航班 ${targetFlight.click()}`);
            }

            // 校验航班
            await this.validateFlightInfo(
                flight.departureDateTime,
                flight.arrivalDateTime,
                flight.fullFlightNo
            );

            // 选择产品舱位
            const bestProduct = await this.selectCabin(input);
            bestProduct.bookingBtn.click();
            await this.waitForLoading();

            // 乘机人编辑
            await this.inputPassenger(input);

            // 联系人 + 勾选
            await this.inputContactAndCheck(input.contactInfo);

            // 检查价格
            const actualPrices = await this.checkPrices(
                input,
                bestProduct.cabin
            );

            // 总价
            const totalPrice = await this.getTotalPrice();

            // 下单返回主页
            await this.confirmOrder();

            // 成功后获取订单号后返回主页
            const orderNo = await this.getOrderNo(
                flight.fullFlightNo,
                formatToTimeZone(
                    new Date(flight.departureDateTime),
                    DATE_PATTERN,
                    timezoneOptions
                ),
                totalPrice
            );

            return {
                success: true,
                orderNo: orderNo,
                prices: actualPrices,
                totalPrice: totalPrice,
                message: "下单成功",
            } as ZHCreateOrderResultDto;
        } catch (error) {
            console.error(error);
            const msg = (error as Error)?.message;
            this._handler?.log(msg);
            return {
                success: false,
                message: msg,
                detail: JSON.stringify(error),
            } as ZHCreateOrderResultDto;
        }
    }

    // 支付
    async CreditPayOrder(
        input: ZHCreditCardPayOrderArgsDto
    ): Promise<ZHPayOrderResultDto> {
        try {
            // 首页
            await this.openHome();
            const flight = input.flights[0];

            const depDateTime = new Date(flight.departureDateTime);
            const depDateText = formatToTimeZone(
                depDateTime,
                "YYYY-MM-DD",
                timezoneOptions
            );

            // 打开待付款订单
            await this.openWaitToPayOrder(
                flight.fullFlightNo,
                depDateText,
                input.totalAmount
            );

            await this.waitForLoading();

            // 检验订单号
            let orderNo = (await selector.getById("tv_order_no")).text;
            if (!orderNo) {
                await delay(2000);
                orderNo = (await selector.getById("tv_order_no")).text;
            }

            if (orderNo !== input.buyTicketOrderIdInfo.buyOrderNo) {
                throw new Error(
                    `找到的订单号 ${orderNo} 不是预期订单号 ${input.buyTicketOrderIdInfo.buyOrderNo}`
                );
            }

            // 校验支付金额
            const orderAmountText = await selector.getById("tv_order_money");
            const actualAmountText = orderAmountText.text
                .replace("¥", "")
                .trim();
            const actualAmount = Number(actualAmountText);
            if (isNaN(actualAmount)) {
                throw new Error(
                    `解析订单总价失败 ${actualAmountText}不是有效的数字`
                );
            }

            if (input.totalAmount < actualAmount) {
                throw new Error(
                    `实际支付金额 ${actualAmount} 大于预期金额 ${input.totalAmount}`
                );
            }

            // 去支付
            const toPayBtn = await selector.getById("btn1");
            toPayBtn.click();

            await this.waitForTip(true, true);

            await this.waitForLoading();

            // 输入支付信息
            await this.creditCardPayInput(input.creditCardPayInfo);

            // 支付确认
            const confirmPayBtn = await selector.getById("confirm_pay");
            confirmPayBtn.click();

            await this.waitForTip(true, true);

            await this.cancelLoading();

            const detailClose = await selector.findById("close", 200, 1000);
            detailClose?.click();

            if (!(await selector.findByTextContains("支付成功"))) {
                this.log(`支付按钮点击成功，但没有跳转支付成功页`);
            }

            // 返回首页
            return {
                success: true,
                totalAmount: actualAmount,
                timestamp: new Date().getTime() + "",
                paymentSerialNo: "",
            } as ZHPayOrderResultDto;
        } catch (error) {
            console.error(error);
            const msg = (error as Error)?.message;
            this._handler?.log(msg);
            return {
                success: false,
                message: msg,
                detail: JSON.stringify(error),
            } as ZHPayOrderResultDto;
        }
    }

    async creditCardPayInput(payInfo: CreditCardPayInfo) {
        const creditCardPayBtn = await selector.getById("commonUseCardLayout");
        creditCardPayBtn.click();

        await this.inputBank("广发银行");
        await this.getAndInputText("bankNumEditText", payInfo.cardNo); // 卡号
        const targetDateText = formatToTimeZone(
            new Date(payInfo.validDate),
            "MM/YY",
            timezoneOptions
        );
        await this.getAndInputText("bankValidityEditText2", targetDateText); // 有效期
        await this.getAndInputText("bankCvvEditText2", payInfo.cvv); // cvv
        await this.getAndInputText("payerName", payInfo.ownerName);
        await this.getAndInputText(
            "bankVoucherNumEditText",
            payInfo.ownerIdentityCardNo
        );
        await this.getAndInputText("bankPhoneEditText", payInfo.phone);
    }

    async inputBank(bank: string): Promise<void> {
        const btn = await selector.getById("orderBankHideLayout");
        btn.click();

        const bankText = await selector.findByTextContains(bank, 500, 5000);
        if (!bankText) {
            throw new Error(`选择银行 ${bank} 失败`);
        }

        const bankBtn = selector.findClickableParent(bankText);
        if (!bankBtn) {
            throw new Error(`银行 ${bank} 点击失败`);
        }

        bankBtn.click();
    }

    // 回填
    async QueryOrder(input: ZHQueryOrderDto): Promise<ZHOrderDetailDto> {
        try {
            // 首页
            await this.openHome();
            await this.openMine();

            const paidOrdersBtn = await selector.getById("mine_payment_text");
            paidOrdersBtn.click();

            await this.waitForLoading();

            const flight = input.flights[0];
            const depDateTime = new Date(flight.departureDateTime);
            const depDateText = formatToTimeZone(
                depDateTime,
                "YYYY-MM-DD",
                timezoneOptions
            );

            const orderCard = await this.findOrderCard(
                flight.fullFlightNo,
                depDateText,
                input.totalAmount,
                input.orderNo
            );

            if (!orderCard) {
                throw new Error(`已付款订单中找不到订单 ${input.orderNo}`);
            }

            let ticketNos: TicketNoInfo[];
            const buyOrderStatus = await this.getOrderStatus();
            if (buyOrderStatus === BuyTicketIssueOrderStatusType.已出票) {
                ticketNos = await this.getTicketNos(flight);
            } else {
                ticketNos = [];
            }

            return {
                success: true,
                status: buyOrderStatus,
                ticketNos: ticketNos,
            } as ZHOrderDetailDto;
        } catch (error) {
            console.error(error);
            const msg = (error as Error)?.message;
            this._handler?.log(msg);
            return {
                success: false,
                message: msg,
                detail: JSON.stringify(error),
            } as ZHOrderDetailDto;
        }
    }

    async getTicketNos(flight: TicketOrderFlight): Promise<TicketNoInfo[]> {
        let passengerInfos = await selector.findAllById("passenger_info");
        let result: TicketNoInfo[] = [];
        for (let index = 0; index < passengerInfos.length; index++) {
            const item = passengerInfos[index];
            const info = {
                name: selector.getChildById(item, "personItemNameText").text,
            } as TicketNoInfo;
            item.click();
            await this.waitForLoading();
            info.fullFlightNo = flight.fullFlightNo;
            info.identityCardNo = (await selector.getById("passenger_id")).text;
            info.ticketNo = (await selector.getById("ticketNumber")).text;
            result.push(info);
            back();
            await this.waitForLoading();
            passengerInfos = await selector.findAllById("passenger_info");
        }

        return result;
    }

    async getOrderStatus(): Promise<BuyTicketIssueOrderStatusType> {
        const statusText = await selector.getById("tv_order_status");
        switch (statusText.text) {
            case "已出票":
                return BuyTicketIssueOrderStatusType.已出票;
            case "已取消":
                return BuyTicketIssueOrderStatusType.出票失败;
            case "未支付/未出票":
                return BuyTicketIssueOrderStatusType.待支付;
            case "待出票":
                return BuyTicketIssueOrderStatusType.待出票;
            default:
                return BuyTicketIssueOrderStatusType.Unknown;
        }
    }
}
