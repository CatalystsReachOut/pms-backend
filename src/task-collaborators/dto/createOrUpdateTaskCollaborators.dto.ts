import { IsMongoId, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class CreateOrUpdateTaskCollaboratorsDto {
  @IsMongoId()
  @IsOptional()
  userId: mongoose.Types.ObjectId;
}
