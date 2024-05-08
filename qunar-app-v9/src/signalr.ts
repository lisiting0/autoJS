import { SignalRHandler, AppDeviceStatusType } from "app-base-v9";
import {
    MUCheckInDto,
    MUCheckInResultDto,
} from "./dtos";
import { environment } from "./environment";
export declare type CheckInEventHandler = (
    input: MUCheckInDto
) => Promise<MUCheckInResultDto>;

export class QunarSignalRHandler extends SignalRHandler {
    private onCheckInEventHandler: CheckInEventHandler;

    /**
     *
     */
    constructor(
        id: string,
        airline: string,
        handler1: CheckInEventHandler,
    ) {
        super(id, airline, '');

        this.onCheckInEventHandler = handler1;

        this.tags = ['Checkin'];
    }

    setIp(ip: string): void {
        this.ip = ip;
    }

    start(url: string) {
        super.start(url);

        this.hubConnection.on(
            "Checkin",
            (input: MUCheckInDto) => {
                this.update(
                    AppDeviceStatusType.Processing,
                    environment.loginAccount,
                    this.ip
                );
                this.onCheckInEventHandler(input).then((result) => {
                    this.update(
                        AppDeviceStatusType.Ready,
                        environment.loginAccount,
                        this.ip
                    );
                    this.hubConnection
                        .send("OnCheckin", result)
                        .then(() =>
                            console.log(`已返回请求结果 ${JSON.stringify(result)}`)
                        );
                });
            }
        );
    }

    getNewProxy(): Promise<string> {
        return this.hubConnection.invoke<string>("GetProxy");
    }
}
