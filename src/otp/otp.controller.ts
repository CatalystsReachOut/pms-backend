import { Controller, HttpException, HttpStatus, Injectable, Post, UseGuards,  NotFoundException,Req, Body } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from '../users/users.service';
import { UserEmailDto } from '../users/dto/userEmail.dto';
import { CustomRequest } from 'src/interfaces';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@Injectable()
@ApiTags('OTP')
@Controller('otp')
export class OtpController {
    constructor(
        private readonly otpService: OtpService,
        private readonly usersService: UsersService
    ) { }

    @Post('sendOtp')
    @UseGuards(AuthGuard)
    async sendOtpForVerification(@Body() body:UserEmailDto) {
        try {
            const isExistUser = await this.usersService.findOneByUserEmail(body);

            if(!isExistUser){
                throw new NotFoundException('user not found')
            }

            return await this.otpService.sendOtpForVerification(isExistUser.email);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
        }
    }

    @Post('verifyOtp')
    @UseGuards(AuthGuard)
    async verfiyOtp(@Body() body: VerifyOtpDto){
        try{
        //   const {id} = request.user;
        //   const isExistUser = await this.usersService.findOneById(id);
        //   const {otp} = request.body;
          
          return await this.otpService.verifyOtp(body);
          
        }
        catch(error){
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
        }
    }
}
