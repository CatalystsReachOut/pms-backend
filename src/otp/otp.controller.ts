import {
  Controller,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  UseGuards,
  NotFoundException,
  Req,
  Body,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from '../users/users.service';
import { UserEmailDto } from '../users/dto/userEmail.dto';
import { CustomRequest } from 'src/interfaces';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@Injectable()
@ApiTags('OTP')
@Controller('otps')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly usersService: UsersService,
  ) {}

  @Post('send-otp')
  async sendOtpForVerification(@Body() body: UserEmailDto) {
    try {
     
      return await this.otpService.sendOtpForVerification(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('verify-otp')
  async verfiyOtp(@Body() body: VerifyOtpDto) {
    try {
      return await this.otpService.verifyOtp(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
