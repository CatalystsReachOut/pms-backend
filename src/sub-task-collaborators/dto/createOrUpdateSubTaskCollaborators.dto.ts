import { IsMongoId, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class CreateOrUpdateSubTaskCollaborators {
  @IsMongoId()
  @IsOptional()
  userId: mongoose.Types.ObjectId;
}
