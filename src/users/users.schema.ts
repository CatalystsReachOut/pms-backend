import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  role: string;
}

export const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
});

export const UserModel = model<User>('User', UserSchema);
