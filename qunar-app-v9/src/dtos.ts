export interface CZCreateOrderDto {
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

export interface CreateOrderRuleInfo {
    ticketPriceFloatRange: AbsoluteDecimalRangeInfo;
    settlementPriceFloatRange: AbsoluteDecimalRangeInfo;
    sellPriceFloatRange: AbsoluteDecimalRangeInfo;
    fixCabin: boolean;
    allowedCabins: string;
    officeNo: string;
    printerNumber: string;
}

export interface AccountInfo {
    userName: string;
    password: string;
}

export interface ContactInfo {
    name: string;
    email: string;
    phone: string;
    phoneCountryCode: string;
}

export interface TicketOrderFlight {
    flightIndex: number;
    originAirport: string;
    destinationAirport: string;
    fullFlightNo: string;
    departureDateTime: string;
    arrivalDateTime: string;
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

export interface IdentityInfo {
    type: IdentityCardType;
    cardNo: string;
    countryCode: string;
    nationCode: string;
    certificateValidityDate: string | null;
}

export declare enum IdentityCardType {
    NI = 0,
    PP = 1,
    MI = 2,
    JG = 3,
    RP = 4,
    HM = 5,
    TI = 6,
    TW = 7,
    SX = 8,
    OT = 9,
    HX = 10,
    IP = 11,
    AB = 12,
    AC = 13,
    AD = 14,
    WR = 15,
    ZG = 16,
    SB = 17,
    TT = 18,
    HY = 19,
    WJ = 20,
    HR = 21,
    BC = 22,
    SD = 23,
    IC = 24,
    YJ = 25,
    PF = 26
}

export declare enum NameType {
    Chinese = 0,
    English = 1
}

export declare enum GenderType {
    Male = 0,
    Female = 1
}

export declare enum PassengerType {
    Adult = 0,
    Child = 1,
    Infant = 2
}

export declare enum CabinClassType {
    Unknown = -1,
    EconomyClass = 0,
    PremiumEconomyClass = 1,
    BusinessClass = 2,
    FirstClass = 3
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

export interface AbsoluteDecimalRangeInfo extends ValueRangeBase<number> {
}

export interface ValueRangeBase<T> {
    upperLimit: T;
    lowerLimit: T;
}

export interface CZCreateOrderResultDto extends ResultBase {
    orderNo: string;
    totalPrice: number;
    prices: CreateOrderPriceDetailDto[];
}

export interface CreateOrderPriceDetailDto extends TicketIssueOrderCabinPrice {
    directDiscount: number;
}

export interface ResultBase {
    success: boolean;
    message: string;
    detail: string;
}