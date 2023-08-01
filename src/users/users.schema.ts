import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  password: string;
  role: string;
  otp: number;
}

export const UserSchema = new Schema<User>({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'manager', 'admin']
  },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  isVerified:
  {
    type: Boolean,
    default: false
  },
  otp: Number
},
  {
    timestamps: true
  });

export const UserModel = model<User>('User', UserSchema);
