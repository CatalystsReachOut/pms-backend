import { IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class ProjectDto{

    @IsNotEmpty()
    @IsString()
    name: string;

   @IsMongoId()
   created_By: mongoose.Types.ObjectId;

   @IsNotEmpty()
   @IsString()
   thumbnail: string;

   @IsOptional()
   start_Date?: Date;

   @IsOptional()
   end_Date: Date;
}
export class UpdateProjectDto{

    @IsNotEmpty()
    @IsString()
    name: string;

   @IsMongoId()
   created_By: mongoose.Types.ObjectId;

   @IsNotEmpty()
   @IsString()
   thumbnail: string;

   @IsOptional()
   start_Date: Date;

   @IsOptional()
   end_Date: Date;

   @IsBoolean()
   is_Completed: boolean

}

