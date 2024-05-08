export interface MUCheckInDto {
    passengerName: string;
    ticketNo: string;
}

export interface MUCheckInResultDto extends ResultBase {
    seatNo: string;
}

export interface ResultBase {
    success: boolean;
    message: string;
    detail: string;
}