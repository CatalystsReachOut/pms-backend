import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Otp } from './otp.schema';
import { EmailService } from '../services/email.service';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { UserEmailDto } from 'src/users/dto/userEmail.dto';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel('Otp') private readonly otpModel: Model<Otp>,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
  ) {}

  async generateOtp() {
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }

  async findOtpByEmail(userEmail: string) {
    return await this.otpModel.findOne({ email: userEmail });
  }

  async sendOtpForVerification(body: UserEmailDto) {
    const { email } = body;

    const isExistUser = await this.usersService.findOneByUserEmail({ email });
    if (!isExistUser) {
      throw new NotFoundException('User Not Found');
    }

    let isExistOtp = await this.findOtpByEmail(email);

    
    const otpExpirationDuration = 60 * 1000; // OTP expiry time in milliseconds
    const otp = '123456'; // For testing, replace with your OTP generation logic

    if (isExistOtp) {
      // If an OTP exists, update its value and expiry time
      if (isExistOtp.otpExpiry.getTime() > Date.now()) {
        return {
          success: true,
          message: `An OTP has already been sent to the registered email`,
          data: {
            requestId: isExistOtp._id,
            otp: isExistOtp.otp,
          },
        };
      }

      // Update existing OTP
      isExistOtp.otp = otp;
      isExistOtp.otpExpiry = new Date(Date.now() + otpExpirationDuration);
      await isExistOtp.save();
    } else {
      // Create a new OTP
      const newOtp = new this.otpModel({
        email: email,
        otp: otp,
        otpExpiry: new Date(Date.now() + otpExpirationDuration),
      });
      await newOtp.save();
      isExistOtp = newOtp; // Update isExistOtp to reference the new OTP

      const options = {
        email: newOtp.email,
        subject: 'OTP for Verification',
        message: `OTP for verification of your email is ${newOtp.otp}`,
      };

      // Send an email with the OTP
      // this.emailService.sendEmail(options);
    }

    return {
      success: true,
      message: `OTP sent successfully to the registered email`,
      data: {
        requestId: isExistOtp._id,
        otp: isExistOtp.otp,
      },
    };
  }

  async verifyOtp(body: VerifyOtpDto) {
    const { requestId, otp } = body;
    const isExistOtp = await this.otpModel.findOne({
      _id: requestId,
      otp,
      otpExpiry: { $gt: Date.now() },
    });
    if (!isExistOtp) {
      throw new NotFoundException('otp not found');
    }

    const isExistUser = await this.usersService.findOneByProperty(
      'email',
      isExistOtp.email,
    );
    if (!isExistUser) {
      throw new NotFoundException('User not found');
    }

    isExistUser.isVerified = true;
    await isExistUser.save();

    return {
      success: true,
      message: 'user verified successfully',
    };
  }
}
