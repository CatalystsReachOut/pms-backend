import { IsString,Min,MinLength } from "class-validator";

export class PasswordDto{
    @IsString()
    @MinLength(6)
    oldPassword:string;

    @IsString()
    @MinLength(6)
    newPassword:string;
}