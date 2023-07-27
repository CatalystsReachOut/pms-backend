import { Injectable, Post, Body, HttpStatus, HttpException, Controller, UseGuards } from '@nestjs/common';
import { SignupDto } from '../users/dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { AuthGuard } from './auth.guard';

@Injectable()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() body: SignupDto) {
    try {
      return await this.authService.signUp(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }


  @Post('homepage')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async homepage() {
    try {
      return await this.authService.homepage();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
