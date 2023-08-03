import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Otp } from './otp.schema';
import { EmailService } from '../services/email.service';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class OtpService {
    constructor(
        @InjectModel('Otp') private readonly otpModel: Model<Otp>,
        private readonly emailService: EmailService,
        private readonly usersService: UsersService
        ){}

    async generateOtp(){
        let otp = "";
        for(let i=0; i < 6; i++){
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    }

    async sendOtpForVerification(userEmail: string){
         const isExistOtp = await this.otpModel.findOne({email : userEmail});
         let otp = await this.generateOtp()
        
         if(isExistOtp){
            isExistOtp.otp = otp;
            isExistOtp.otpExpiry = new Date(Date.now() + 60 * 1000);

            await isExistOtp.save();
            const options = {
                email : isExistOtp.email,
                subject: 'otp for verify',
                message: `otp for verification of your email is ${isExistOtp.otp}`
            }
            // send email for otp
            this.emailService.sendEmail(options);
            return {
                success: true,
                message: 'new otp sent successfully to the registered email'
            }
         }
         
         const newOtp = new this.otpModel({email: userEmail, otp: otp, otpExpiry: new Date(Date.now() + 60 * 1000)})
         await newOtp.save();
         const options = {
            email : newOtp.email,
            subject: 'otp for verify',
            message: `otp for verification of your email is ${newOtp.otp}`
        }
        // sendemail for otp
        this.emailService.sendEmail(options);
        return {
            success: true,
            message: 'new otp sent successfully to the registered email'
        }
    }

    async verifyOtp(email: string, otp: string){
        const isExistOtp = await this.otpModel.findOne({ email, otp, otpExpiry: {$gt : Date.now()} });
        if(!isExistOtp){
          throw new NotFoundException('otp not found')
        }


        const isExistUser = await this.usersService.findOneByProperty('email',email);
        if(!isExistUser){
           throw new NotFoundException('User not found');
        }

        isExistUser.isVerified = true;
        await isExistUser.save();

        return {
            success: true,
            message: 'user verified successfully'
        }
    }
}
