import {
    IsBoolean,
    IsDate,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  import mongoose from 'mongoose';
  
  export class UpdateSubTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    description: string;
  
    @IsOptional()
    @IsMongoId()
    projectId: mongoose.Types.ObjectId;
  
    @IsOptional()
    @IsMongoId()
    prirorityId: mongoose.Types.ObjectId;
  
    @IsOptional()
    @IsOptional()
    startDate?: Date;
  
    @IsOptional()
    endDate: Date;
  
    @IsOptional()
    @IsMongoId()
    createdBy: mongoose.Types.ObjectId;
  
    @IsOptional()
    @IsString()
    attachment: string;
  
    @IsOptional()
    @IsMongoId()
    statusId: mongoose.Types.ObjectId;
  }
  