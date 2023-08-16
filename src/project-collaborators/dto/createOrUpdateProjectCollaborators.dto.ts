import { IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';
import mongoose from 'mongoose';

export class CreateOrUpdateProjectCollaboratorsDto {
  @IsMongoId()
  @IsOptional()
  userId: mongoose.Types.ObjectId;
}
