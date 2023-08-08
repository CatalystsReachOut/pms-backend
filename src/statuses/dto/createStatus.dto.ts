import { IsString, MinLength } from "class-validator";

export class CreateOrUpdateStatusDto {
    @IsString()
    name: string;
}