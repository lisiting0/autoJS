import { SignalRHandler, AppDeviceStatusType } from "app-base-v9";
import {
    CZCreateOrderArgsDto,
    CZCreateOrderResultDto,
    CZDirectDiscountResultDto,
    CZFlightsDto,
    CZPayArgsDto,
    CZPayResultDto,
    CZQueryDirectDiscountDto,
    CZQueryFlightsDto,
    CZQueryFlightPricesDto,
    CZFlightPricesDto,
    CZCreateChangeOrderArgsDto,
    CZCreateChangeOrderResultDto,
} from "./dtos";
import { environment } from "./environment";
export declare type QueryFlightsEventHandler = (
    input: CZQueryFlightsDto
) => Promise<CZFlightsDto>;
export declare type QueryDirectDiscountEventHandler = (
    input: CZQueryDirectDiscountDto
) => Promise<CZDirectDiscountResultDto>;
export declare type CreateOrderEventHandler = (
    input: CZCreateOrderArgsDto
) => Promise<CZCreateOrderResultDto>;
export declare type CreateChangeOrderEventHandler = (
    input: CZCreateChangeOrderArgsDto
) => Promise<CZCreateChangeOrderResultDto>;
export declare type PayEventHandler = (
    input: CZPayArgsDto
) => Promise<CZPayResultDto>;
export declare type QueryFlightPricesEventHandler = (
    input: CZQueryFlightPricesDto
) => Promise<CZFlightPricesDto>;

export class CZSignalRHandler extends SignalRHandler {
    private onQueryFlightsEventHandler: QueryFlightsEventHandler;
    private onQueryDirectDiscountEventHandler: QueryDirectDiscountEventHandler;
    private onCreateOrderEventHandler: CreateOrderEventHandler;
    private onCreateChangeOrderEventHandler: CreateChangeOrderEventHandler;
    private onPayEventHandler: PayEventHandler;
    private onQueryFlightPricesEventHandler: QueryFlightPricesEventHandler;

    /**
     *
     */
    constructor(
        id: string,
        airline: string,
        ip: string,
        handler1: QueryFlightsEventHandler,
        handler2: QueryDirectDiscountEventHandler,
        handler3: CreateOrderEventHandler,
        handler4: PayEventHandler,
        handler5: QueryFlightPricesEventHandler,
        handler6: CreateChangeOrderEventHandler
    ) {
        super(id, airline, ip);

        this.onQueryFlightsEventHandler = handler1;
        this.onQueryDirectDiscountEventHandler = handler2;
        this.onCreateOrderEventHandler = handler3;
        this.onPayEventHandler = handler4;
        this.onQueryFlightPricesEventHandler = handler5;
        this.onCreateChangeOrderEventHandler = handler6;

        this.tags = [
            "CreateOrder",
            "Pay",
            "QueryDirectDiscount",
            "QueryFlightPrices",
        ];
    }

    setIp(ip: string): void {
        this.ip = ip;
    }

    start(url: string) {
        super.start(url);

        // Deprecated 已废弃 使用QueryDirectDiscount即可
        // this.hubConnection.on("QueryFlights", (input: CZQueryFlightsDto) => {
        //     this.update(
        //         AppDeviceStatusType.Processing,
        //         environment.loginAccount
        //     );
        //     this.onQueryFlightsEventHandler(input).then((result) => {
        //         this.update(
        //             AppDeviceStatusType.Ready,
        //             environment.loginAccount
        //         );
        //         this.hubConnection
        //             .send("OnQueryFlights", result)
        //             .then(() =>
        //                 console.log(`已返回请求结果 ${JSON.stringify(result)}`)
        //             );
        //     });
        // });

        this.hubConnection.on(
            "QueryDirectDiscount",
            (input: CZQueryDirectDiscountDto) => {
                this.update(
                    AppDeviceStatusType.Processing,
                    environment.loginAccount,
                    this.ip
                );
                this.onQueryDirectDiscountEventHandler(input).then((result) => {
                    this.update(
                        AppDeviceStatusType.Ready,
                        environment.loginAccount,
                        this.ip
                    );
                    this.hubConnection
                        .send("OnQueryDirectDiscount", result)
                        .then(() =>
                            console.log(
                                `已返回请求结果 ${JSON.stringify(result)}`
                            )
                        );
                });
            }
        );

        this.hubConnection.on("CreateOrder", (input: CZCreateOrderArgsDto) => {
            this.update(
                AppDeviceStatusType.Processing,
                environment.loginAccount,
                this.ip
            );
            this.onCreateOrderEventHandler(input).then((result) => {
                this.update(
                    AppDeviceStatusType.Ready,
                    environment.loginAccount,
                    this.ip
                );
                this.hubConnection
                    .send("OnCreateOrder", result)
                    .then(() =>
                        console.log(`已返回创单结果 ${JSON.stringify(result)}`)
                    );
            });
        });

        this.hubConnection.on("CreateChangeOrder", (input: CZCreateChangeOrderArgsDto) => {
            this.update(
                AppDeviceStatusType.Processing,
                environment.loginAccount,
                this.ip
            );
            this.onCreateChangeOrderEventHandler(input).then((result) => {
                this.update(
                    AppDeviceStatusType.Ready,
                    environment.loginAccount,
                    this.ip
                );
                this.hubConnection
                    .send("OnCreateChangeOrder", result)
                    .then(() =>
                        console.log(`已返回创单结果 ${JSON.stringify(result)}`)
                    );
            });
        });

        this.hubConnection.on("Pay", (input: CZPayArgsDto) => {
            this.update(
                AppDeviceStatusType.Processing,
                environment.loginAccount,
                this.ip
            );
            this.onPayEventHandler(input).then((result) => {
                this.update(
                    AppDeviceStatusType.Ready,
                    environment.loginAccount,
                    this.ip
                );
                this.hubConnection
                    .send("OnPay", result)
                    .then(() =>
                        console.log(`已返回支付结果 ${JSON.stringify(result)}`)
                    );
            });
        });

        this.hubConnection.on(
            "QueryFlightPrices",
            (input: CZQueryFlightPricesDto) => {
                this.update(
                    AppDeviceStatusType.Processing,
                    environment.loginAccount,
                    this.ip
                );
                this.onQueryFlightPricesEventHandler(input).then((result) => {
                    this.update(
                        AppDeviceStatusType.Ready,
                        environment.loginAccount,
                        this.ip
                    );
                    this.hubConnection
                        .send("OnQueryFlightPrices", result)
                        .then(() =>
                            console.log(
                                `已返回查询结果 ${JSON.stringify(result)}`
                            )
                        );
                });
            }
        );
    }

    getNewProxy(): Promise<string> {
        return this.hubConnection.invoke<string>("GetProxy");
    }
}
