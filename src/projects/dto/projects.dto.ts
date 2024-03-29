import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class ProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsMongoId()
  @IsOptional()
  createdBy: mongoose.Types.ObjectId;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate: Date;
}
export class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsMongoId()
  createdBy: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;

  @IsBoolean()
  isCompleted: boolean;
}
