import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class ProjectDto{

    @IsNotEmpty()
    @IsString()
    name: string;

   @IsMongoId()
   created_By: mongoose.Types.ObjectId;

   @IsNotEmpty()
   @IsString()
   thumbnail: string
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

   @IsBoolean()
   isCompleted: boolean
   
}

