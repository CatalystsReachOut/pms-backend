import { IsMongoId, IsNotEmpty, Length } from "class-validator";

export class VerifyOtpDto{
    @IsMongoId()
    requestId: string;

    @Length(6,6)
    otp: string;
}