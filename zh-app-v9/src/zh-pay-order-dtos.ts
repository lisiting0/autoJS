import { CreditCardPayOrderArgs, ResultBase } from "app-base-v9";

export interface ZHCreditCardPayOrderArgsDto extends CreditCardPayOrderArgs {}

export interface ZHPayOrderResultDto extends ResultBase {
    totalAmount: number;
    paymentSerialNo: string;
    timestamp: string;
}
