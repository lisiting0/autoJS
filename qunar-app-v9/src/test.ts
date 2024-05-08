import { CZCreateOrderDto } from "./dtos";

export const testCreateOrderArgs = JSON.parse(
    `{\"useProxy\":false,\"productCodes\":\"特价经济舱|折扣经济舱|优选经济舱|全价经济舱|经济舱|折扣公务舱|额外400里程\",\"orderId\":\"3a0d567f-7b7a-ed6c-8f59-f8eb4b1a04ff\",\"buyOrderId\":\"3a0d5682-a8b7-a730-9d38-46334f57f71b\",\"createOrderId\":\"3a0d5682-a907-7405-3561-b90baae72832\",\"createOrderRuleInfo\":{\"ticketPriceFloatRange\":{\"upperLimit\":100,\"lowerLimit\":-300},\"settlementPriceFloatRange\":{\"upperLimit\":13,\"lowerLimit\":-300},\"sellPriceFloatRange\":{\"upperLimit\":1000,\"lowerLimit\":-300},\"fixCabin\":false,\"allowedCabins\":\"T|U|N|A|M|L|H|E|R|Y|V|Z|B|D|I|J|C|F|P|Q|K\",\"officeNo\":\"\",\"printerNumber\":\"1\",\"passengerTypeTicketPriceRangeInfo\":[],\"delayRebate\":0},\"createOrderAccountInfo\":{\"userName\":\"615011863540\",\"password\":\"482409\"},\"contactInfo\":{\"name\":\"张永超\",\"phone\":\"13660567305\"},\"flights\":[{\"flightIndex\":1,\"originAirport\":\"CAN\",\"destinationAirport\":\"HAK\",\"fullFlightNo\":\"CZ340\",\"departureDateTime\":\"2023-08-30T08:20:00Z\",\"arrivalDateTime\":\"2023-08-30T09:35:00Z\"}],\"passengers\":[{\"name\":{\"nameType\":0,\"primary\":\"吴森林\"},\"identityInfo\":{\"type\":0,\"cardNo\":\"513601198308234574\",\"countryCode\":\"\",\"nationCode\":\"\"},\"gender\":0,\"type\":0,\"birthDate\":\"1983-08-23\",\"phone\":\"18962159537\",\"surName\":\"wu\",\"givenName\":\"senlin\",\"index\":0},{\"name\":{\"nameType\":0,\"primary\":\"吴雄\"},\"identityInfo\":{\"type\":0,\"cardNo\":\"512902196903251275\",\"countryCode\":\"\",\"nationCode\":\"\"},\"gender\":0,\"type\":0,\"birthDate\":\"1969-03-25\",\"phone\":\"13622219236\",\"surName\":\"wu\",\"givenName\":\"xiong\",\"index\":0},{\"name\":{\"nameType\":0,\"primary\":\"杨龙春\"},\"identityInfo\":{\"type\":0,\"cardNo\":\"45242819810316181X\",\"countryCode\":\"\",\"nationCode\":\"\"},\"gender\":0,\"type\":0,\"birthDate\":\"1981-03-16\",\"phone\":\"18565201889\",\"surName\":\"yang\",\"givenName\":\"longchun\",\"index\":0}],\"cabinPriceInfos\":[{\"identityCardNo\":\"513601198308234574\",\"fullFlightNo\":\"CZ340\",\"cabin\":\"V\",\"ticketPrice\":870.0000,\"settlementPrice\":767.9000,\"airportTax\":50.0000,\"oilFee\":30.0000,\"totalTax\":80.0000,\"couponAmount\":0,\"type\":0},{\"identityCardNo\":\"512902196903251275\",\"fullFlightNo\":\"CZ340\",\"cabin\":\"V\",\"ticketPrice\":870.0000,\"settlementPrice\":767.9000,\"airportTax\":50.0000,\"oilFee\":30.0000,\"totalTax\":80.0000,\"couponAmount\":0,\"type\":0},{\"identityCardNo\":\"45242819810316181X\",\"fullFlightNo\":\"CZ340\",\"cabin\":\"V\",\"ticketPrice\":870.0000,\"settlementPrice\":767.9000,\"airportTax\":50.0000,\"oilFee\":30.0000,\"totalTax\":80.0000,\"couponAmount\":0,\"type\":0}],\"cabinClass\":0}`
) as CZCreateOrderDto;