import { ZHCreateOrderArgsDto } from "./zh-create-order-args-dto";
import { ZHCreateOrderResultDto } from "./zh-create-order-result-dto";
import {
    ZHCreditCardPayOrderArgsDto,
    ZHPayOrderResultDto,
} from "./zh-pay-order-dtos";
import { ZHOrderDetailDto, ZHQueryOrderDto } from "./zh-query-order-dto";
export declare type CreateOrderEventHandler = (
    input: ZHCreateOrderArgsDto
) => Promise<ZHCreateOrderResultDto>;
export declare type CreditPayEventHandler = (
    input: ZHCreditCardPayOrderArgsDto
) => Promise<ZHPayOrderResultDto>;
export declare type QueryOrderEventHandler = (
    input: ZHQueryOrderDto
) => Promise<ZHOrderDetailDto>;
import { SignalRHandler, AppDeviceStatusType } from "app-base-v9";

export class ZHSignalRHandler extends SignalRHandler {
    private onCreateOrderEventHandler: CreateOrderEventHandler;
    private onCreditPayEventHandler: CreditPayEventHandler;
    private onQueryOrderEventHandler: QueryOrderEventHandler;

    /**
     *
     */
    constructor(
        id: string,
        airline: string,
        handler1: CreateOrderEventHandler,
        handler2: CreditPayEventHandler,
        handler3: QueryOrderEventHandler
    ) {
        super(id, airline, '');

        this.onCreateOrderEventHandler = handler1;
        this.onCreditPayEventHandler = handler2;
        this.onQueryOrderEventHandler = handler3;
    }

    start(url: string) {
        super.start(url);

        this.hubConnection.on("CreateOrder", (input: ZHCreateOrderArgsDto) => {
            this.update(AppDeviceStatusType.Processing);
            this.onCreateOrderEventHandler(input).then((result) => {
                this.update(AppDeviceStatusType.Ready);
                this.hubConnection
                    .send("OnCreateOrder", result)
                    .then(() =>
                        console.log(`已返回创单结果 ${JSON.stringify(result)}`)
                    );
            });
        });

        this.hubConnection.on(
            "CreditPay",
            (input: ZHCreditCardPayOrderArgsDto) => {
                this.update(AppDeviceStatusType.Processing);
                this.onCreditPayEventHandler(input).then((result) => {
                    this.update(AppDeviceStatusType.Ready);
                    this.hubConnection
                        .send("OnCreditPay", result)
                        .then(() =>
                            console.log(
                                `已返回创单结果 ${JSON.stringify(result)}`
                            )
                        );
                });
            }
        );

        this.hubConnection.on("QueryOrder", (input: ZHQueryOrderDto) => {
            this.update(AppDeviceStatusType.Processing);
            this.onQueryOrderEventHandler(input).then((result) => {
                this.update(AppDeviceStatusType.Ready);
                this.hubConnection
                    .send("OnQueryOrder", result)
                    .then(() =>
                        console.log(`已返回创单结果 ${JSON.stringify(result)}`)
                    );
            });
        });
    }
}
