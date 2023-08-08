import { Schema, Document, model } from 'mongoose';

export interface Status extends Document {
  name: string;
}

export const StatusSchema = new Schema<Status>({
  name: { type: String, required: true, unique: true },
},
  {
    timestamps: true
  });

export const StatusModel = model<Status>('Status', StatusSchema);
