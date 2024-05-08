import {
    AbsoluteDecimalRangeInfo,
    AccountInfo,
    CabinClassType,
    ContactInfo,
    CreateOrderRuleInfo,
    GenderType,
    IdentityCardType,
    IdentityInfo,
    NameType,
    PassengerInfo,
    PassengerName,
    PassengerType,
    TicketIssueOrderCabinPrice,
    TicketOrderFlight,
} from "app-base-v9";
import { CZCreateOrderArgsDto } from "./dtos";

export const testCreateOrderArgs = JSON.parse(
    `{\"useProxy\":false,\"productCodes\":\"特价经济舱|折扣经济舱|优选经济舱|全价经济舱\",\"orderId\":\"3a1215c2-656a-80dc-f5f2-05749b170d4b\",\"buyOrderId\":\"3a1215c2-9231-cc66-68ab-7accf8485e27\",\"createOrderId\":\"3a1215c2-947c-a68a-e2f7-dd076b122630\",\"createOrderRuleInfo\":{\"ticketPriceFloatRange\":{\"upperLimit\":300,\"lowerLimit\":-300},\"settlementPriceFloatRange\":{\"upperLimit\":12,\"lowerLimit\":-300},\"sellPriceFloatRange\":{\"upperLimit\":1000,\"lowerLimit\":-30},\"fixCabin\":true,\"allowedCabins\":\"N|A|M|L|H|E|R|Y|V|Z|B|U|T|D|I|J|C|F|P|Q|K\",\"officeNo\":\"\",\"printerNumber\":\"1\",\"passengerTypeTicketPriceRangeInfo\":[],\"delayRebate\":0},\"createOrderAccountInfo\":{\"userName\":\"618316613775\",\"password\":\"593672\",\"belongToOffice\":\"CAN824\"},\"contactInfo\":{\"name\":\"陈雨\",\"phone\":\"18565201807\"},\"flights\":[{\"flightIndex\":1,\"originAirport\":\"TSN\",\"destinationAirport\":\"WUH\",\"fullFlightNo\":\"CZ8506\",\"departureDateTime\":\"2024-05-04T10:50:00Z\",\"arrivalDateTime\":\"2024-05-04T13:25:00Z\"}],\"passengers\":[{\"name\":{\"nameType\":0,\"primary\":\"刘翔\"},\"identityInfo\":{\"type\":0,\"cardNo\":\"421202199609300550\"},\"gender\":0,\"type\":0,\"birthDate\":\"1996-09-30\",\"phone\":\"13346674311\",\"surName\":\"liu\",\"givenName\":\"xiang\",\"index\":0}],\"cabinPriceInfos\":[{\"identityCardNo\":\"421202199609300550\",\"fullFlightNo\":\"CZ8506\",\"cabin\":\"A\",\"ticketPrice\":700.0000,\"settlementPrice\":617.0000,\"airportTax\":50.0000,\"oilFee\":70.0000,\"totalTax\":120.0000,\"couponAmount\":0,\"type\":0}],\"cabinClass\":0,\"isInternational\":false,\"ignoreFlightNoCheck\":false,\"isChange\":false}`
) as CZCreateOrderArgsDto;
