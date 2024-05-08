import {
    AbsoluteDecimalRangeInfo,
    AccountInfo,
    CabinClassType,
    ContactInfo,
    CreateOrderRuleInfo,
    GenderType,
    IdentityCardType,
    IdentityInfo,
    PassengerInfo,
    PassengerName,
    PassengerType,
    TicketIssueOrderCabinPrice,
    TicketOrderFlight,
} from "app-base-v9";
import { ZHCreateOrderArgsDto } from "./zh-create-order-args-dto";

// export const testCreateOrderArgs = {
//     buyOrderId: "",
//     cabinClass: CabinClassType.EconomyClass,
//     orderId: "",
//     createOrderId: "",
//     createOrderAccountInfo: {} as AccountInfo,
//     productCodes: "",
//     contactInfo: {
//         name: "何先生",
//         phone: "18522241523",
//     } as ContactInfo,
//     flights: [
//         {
//             fullFlightNo: "ZH9429",
//             flightIndex: 1,
//             originAirport: "SZX",
//             destinationAirport: "CKG",
//             departureDateTime: "2023-08-17T11:00:00Z",
//             arrivalDateTime: "2023-08-17T13:05:00Z",
//         },
//     ] as TicketOrderFlight[],
//     passengers: [
//         {
//             name: { primary: "LUI", secondary: "TAN" } as PassengerName,
//             identityInfo: {
//                 cardNo: "H03189018",
//                 type: IdentityCardType.PP,
//                 certificateValidityDate: "2031-06-15"
//             } as IdentityInfo,
//             index: 1,
//             type: PassengerType.Adult,
//             phone: "15807072950",
//             gender: GenderType.Male,
//             surName: "LUI",
//             givenName: "TAN",
//         },
//     ] as PassengerInfo[],
//     createOrderRuleInfo: {
//         fixCabin: true,
//         allowedCabins: "L|E|K",
//         ticketPriceFloatRange: {
//             lowerLimit: 0,
//             upperLimit: 0,
//         } as AbsoluteDecimalRangeInfo,
//         settlementPriceFloatRange: {
//             lowerLimit: -100,
//             upperLimit: 100,
//         } as AbsoluteDecimalRangeInfo,
//         sellPriceFloatRange: {
//             lowerLimit: -100,
//             upperLimit: 100,
//         } as AbsoluteDecimalRangeInfo,
//     } as CreateOrderRuleInfo,
//     cabinPriceInfos: [
//         {
//             fullFlightNo: "ZH9429",
//             cabin: "K",
//             cabinClass: CabinClassType.EconomyClass,
//             identityCardNo: "341122198411065052",
//             airportTax: 50,
//             oilFee: 140,
//             ticketPrice: 320,
//             settlementPrice: 311.9,
//             totalTax: 190,
//             type: PassengerType.Adult,
//         },
//     ] as TicketIssueOrderCabinPrice[],
// } as ZHCreateOrderArgsDto;

export const testCreateOrderArgs = JSON.parse(
    `{\"useProxy\":false,\"orderId\":\"3a0d2cdd-abd4-abee-898e-55e582fa428e\",\"buyOrderId\":\"3a0d2cf2-953b-326e-9be2-2abb1d1ef940\",\"createOrderId\":\"3a0d2cf2-9613-aa8c-b5d8-11f7073e658e\",\"createOrderRuleInfo\":{\"ticketPriceFloatRange\":{\"upperLimit\":0,\"lowerLimit\":0},\"settlementPriceFloatRange\":{\"upperLimit\":100000,\"lowerLimit\":-100000},\"sellPriceFloatRange\":{\"upperLimit\":79228162514264337593543950335,\"lowerLimit\":-79228162514264337593543950335},\"fixCabin\":true,\"allowedCabins\":\"B|Q|Y|U|K|W|E|H|M|L|S|V|T|P|M1|Q1|V1\",\"officeNo\":\"\",\"printerNumber\":\"1\",\"passengerTypeTicketPriceRangeInfo\":[],\"delayRebate\":0},\"createOrderAccountInfo\":{\"userName\":\"唐永泽\",\"password\":\"362321\"},\"contactInfo\":{\"name\":\"唐永泽\",\"email\":\"kk15989110684@163.com\",\"phone\":\"15989110684\"},\"flights\":[{\"flightIndex\":1,\"originAirport\":\"NKG\",\"destinationAirport\":\"TFU\",\"fullFlightNo\":\"ZH9569\",\"departureDateTime\":\"2023-08-23T00:45:00Z\",\"arrivalDateTime\":\"2023-08-23T03:15:00Z\"}],\"passengers\":[{\"name\":{\"nameType\":0,\"primary\":\"王应梅\"},\"identityInfo\":{\"type\":0,\"cardNo\":\"510422199202207642\"},\"gender\":1,\"type\":0,\"birthDate\":\"1992-02-20\",\"phone\":\"18202878560\",\"surName\":\"wang\",\"givenName\":\"yingmei\",\"index\":0}],\"cabinPriceInfos\":[{\"identityCardNo\":\"510422199202207642\",\"fullFlightNo\":\"ZH9569\",\"cabin\":\"L\",\"ticketPrice\":700,\"settlementPrice\":700,\"airportTax\":50,\"oilFee\":60,\"totalTax\":110,\"couponAmount\":0,\"type\":0}],\"cabinClass\":0}`
) as ZHCreateOrderArgsDto;
