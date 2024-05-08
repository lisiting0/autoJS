import {
    ResultBase,
    AccountInfo,
    CreateOrderArgs,
    CreateOrderResultBase,
    AppProductInfo,
    PassengerType,
    CabinClassType,
    CabinStatusType,
    ChangeCreateOrderJobArgs,
    CreateTicketChangeOrderResult,
} from "app-base-v9";
import { UiObject } from "ui_object";

export interface CZDirectDiscountResultDto extends ResultBase {
    discounts: CZDirectDiscountDetail[];
}

export interface CZDirectDiscountDetail {
    date: string;
    fullFlightNo: string;
    originAirport: string;
    destinationAirport: string;
    originAirportName: string;
    destinationAirportName: string;
    discountAmount: number;
    cabin: string;
}

export interface CZFlightDetailDto {
    date: string;
    originAirport: string;
    destinationAirport: string;
    originAirportName: string;
    destinationAirportName: string;
    fullFlightNo: string;
}

export interface CZFlightsDto extends ResultBase {
    flights: CZFlightDetailDto[];
}

export interface CZQueryDirectDiscountDto {
    date: string;
    fullFlightNo: string;
    originAirport: string;
    destinationAirport: string;
    accountInfo: AccountInfo;
}

export interface CZQueryFlightsDto {
    beginDate: string;
    endDate: string;
    originAirport: string;
    destinationAirport: string;
    accountInfo: AccountInfo;
}

export interface CZCreateOrderResultDto extends CreateOrderResultBase {}

export interface CZCreateOrderArgsDto extends CreateOrderArgs {
    proxyHost: string;
    proxyPort: number;
}

export interface CZAppProductInfo extends AppProductInfo {
    bookingBtn: UiObject;
    specialProduct: boolean;
}

export interface PriceDetail {
    tax: string;
    count: string;
    ticket: string;
    total: string;
    type: PassengerType;
}

export interface CouponInfo {
    amount: number;
    code: string;
}

export interface CZPayArgsDto extends CreditCardPayOrderArgs {
    proxyHost: string;
    proxyPort: number;
    payType: CZPayMethodType;
    paymentPassword: string;
}

export interface CreditCardPayOrderArgs extends PayOrderArgs {
    creditCardPayInfo: CreditCardPayInfo;
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

export interface BuyTicketOrderIdInfo {
    buyOrderNo: string;
    etermOrderIdInfo: EtermOrderIdInfo;
}

export interface EtermOrderIdInfo {
    smallPnr: string;
    bigPnr: string;
}

export interface TicketOrderFlight {
    flightIndex: number;
    originAirport: string;
    destinationAirport: string;
    fullFlightNo: string;
    departureDateTime: string;
    arrivalDateTime: string;
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

export enum CZPayMethodType {
    Wallet = 0,
    CreditCard = 1,
}

export interface CZPayResultDto extends ResultBase {
    totalAmount: number;
    paymentSerialNo: string;
    timestamp: string;
}

export interface CZQueryFlightPricesDto {
    date: string;
    originAirport: string;
    destinationAirport: string;
    fullFlightNo: string;
    accountInfo: AccountInfo;
}

export interface CZFlightCabinPriceDto {
    cabin: string;
    cabinClass: CabinClassType;
    productName: string;
    status: CabinStatusType | null;
    currency: string;
    passengerType: PassengerType;
    ticketPrice: number;
    settlementPrice: number;
}

export interface CZFlightPriceDto {
    fullFlightNo: string;
    isSharedFlight: boolean;
    actualCarrierFullFlightNo: string;
    aircraftModel: string;
    airportTax: number | null;
    oilFee: number | null;
    cabins: CZFlightCabinPriceDto[];
    departureDate: string;
    arrivalDate: string;
    departureTime: string;
    arrivalTime: string;
}

export interface CZFlightPricesDto extends ResultBase {
    prices: CZFlightPriceDto[];
}

export interface CZPriceDetail {
    type: PassengerType;
    count?: number;
    ticketPrice: number;
    totalTax: number;
    discount?: number;
}

export interface CZCreateChangeOrderArgsDto extends ChangeCreateOrderJobArgs {}

export interface CZCreateChangeOrderResultDto
    extends CreateTicketChangeOrderResult {}
