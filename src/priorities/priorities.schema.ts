import { Schema, Document, model } from 'mongoose';

export interface Priority extends Document {
  name: string;
}

export const PrioritySchema = new Schema<Priority>({
  name: { type: String, required: true, unique: true },
},
  {
    timestamps: true
  });

export const PriorityModel = model<Priority>('Priority', PrioritySchema);
