import {
    AccountInfo,
    BuyTicketIssueOrderStatusType,
    ResultBase,
    TicketNoInfo,
    TicketOrderFlight,
} from "app-base-v9";

export interface ZHQueryOrderDto {
    orderNo: string;
    totalAmount: number;
    createOrderAccountInfo: AccountInfo;
    flights: TicketOrderFlight[];
}

export interface ZHOrderDetailDto extends ResultBase {
    ticketNos: TicketNoInfo[];
    status: BuyTicketIssueOrderStatusType;
}
