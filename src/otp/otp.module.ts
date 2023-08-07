import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { EmailService } from '../services/email.service';
import { OtpSchema } from './otp.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }]), AuthModule, UsersModule],
    controllers: [OtpController],
    providers: [OtpService, EmailService],
    exports: [OtpModule]
})
export class OtpModule { }
