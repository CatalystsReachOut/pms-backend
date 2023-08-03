import { Controller, HttpException, HttpStatus, Injectable, Post, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CustomRequest } from 'src/auth/auth.controller';
import { UsersService } from '../users/users.service';

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
    async sendOtpForVerification(@Req() request: CustomRequest) {
        try {
            const { id } = request.user;
            const isExistUser = await this.usersService.findOneById(id);

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
    async verfiyOtp(@Req() request: CustomRequest){
        try{
          const {id} = request.user;
          const isExistUser = await this.usersService.findOneById(id);
          const {otp} = request.body;
          
          return await this.otpService.verifyOtp(isExistUser.email,otp);
          
        }
        catch(error){
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
        }
    }
}
