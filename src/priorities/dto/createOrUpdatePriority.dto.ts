import { IsString, MinLength } from "class-validator";

export class CreateOrUpdatePriorityDto {
    @IsString()
    name: string;
}