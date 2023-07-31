import { HttpException, HttpStatus, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '../users/dto/signup.dto';
import { User } from '../users/users.schema';
import { LoginDto } from '../users/dto/login.dto';
import { LoginInterface, SignUpInterface } from '../interfaces/index';
import { JwtPayload } from '../types';
import { EmailService } from '../services/email.service';
import { PasswordDto } from '../users/dto/updatePassword.dto';
import * as brcypt from 'bcrypt';

@Injectable() 
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) { }

  async validateUser(payload: JwtPayload) {
    return await this.usersService.findOneById(payload.id);
  }

  generateJwtToken(user: User) {
    const payload = { id: user._id, userName: user.userName, role: user.role };
    return this.jwtService.sign(payload);
  }

  async signUp(body: SignupDto): Promise<SignUpInterface> {
    const { userName, email, password, role } = body;
    const existingUser = await this.usersService.findOneByUsername(userName);

    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const newUser = await this.usersService.create({ email, userName, password, role });
    const token = this.generateJwtToken(newUser);
    return {
      message: "User Registered Successfully!",
      token
    };
  }

  async login(loginDto: LoginDto): Promise<LoginInterface> {
    const { userName, password } = loginDto;
    const user = await this.usersService.findOneByUsername(userName);
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.usersService.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid Credentials');
    }

    const token = this.generateJwtToken(user);

    return {
      message: "LoggedIn Successfully!",
      data: user,
      token
    };
  }

  async changePassword(userName: string, PasswordDto:PasswordDto) {
    const user = await this.usersService.findOneByUsername(userName);
    const isPasswordCorrect = await this.usersService.comparePasswords(PasswordDto.oldPassword, user.password);

    if (!isPasswordCorrect) {
     throw new NotFoundException('Invalid credentials')
    }

    if(PasswordDto.oldPassword === PasswordDto.newPassword){
      throw new Error('new password should not be same as old password')
    }
    const hashedPassword = await brcypt.hash(PasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return {
      success : 'true',
      message : `password updated successfully of username ${userName}`
    }
  }

  async homepage(user: object) {
    return {
      message: "Congrats! You have hacked my prkskrs private page!"
    }
  }
}
