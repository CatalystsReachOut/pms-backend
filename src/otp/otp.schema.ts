import { Schema, Document, model } from "mongoose";

export interface Otp extends Document {
    email: string,
    otp: string,
    otpExpiry: Date,
    updatedAt: Date
}

export const OtpSchema = new Schema<Otp>(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        otp: {
            type: String,
            required: true
        },
        otpExpiry: {
            type: Date,
            required: true
        },
        updatedAt:{
            type: Date,
            expires: '1m'
        }
    },
    {
        timestamps: true
    }
)

OtpSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

export const UserModel = model<Otp>('Otp',OtpSchema)