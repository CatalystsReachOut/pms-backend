import { HttpException, HttpStatus, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '../users/dto/signup.dto';
import { User } from '../users/users.schema';
import { LoginDto } from '../users/dto/login.dto';
import { LoginInterface, SignUpInterface } from '../interfaces/index';
import { JwtPayload } from '../types';
import { EmailService } from '../services/email.service';
import { ChangePasswordDto } from '../users/dto/updatePassword.dto';
import { UserEmailDto, UserNewPasswordDto } from 'src/users/dto/userEmail.dto';
import * as crypto from 'crypto'

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

  async changePassword(userName: string, changePasswordDto:ChangePasswordDto) {
    const user = await this.usersService.findOneByUsername(userName);
    const isPasswordCorrect = await this.usersService.comparePasswords(changePasswordDto.oldPassword, user.password);

    if (!isPasswordCorrect) {
     throw new NotFoundException('Invalid credentials')
    }

    if(changePasswordDto.oldPassword === changePasswordDto.newPassword){
      throw new Error('new password should not be same as old password')
    }
    const hashedPassword = await this.usersService.hashPassword(changePasswordDto.newPassword);
    user.password = hashedPassword;
    await user.save();
    return {
      success : 'true',
      message : `password updated successfully`
    }
  }

  async forgotPassword(body: UserEmailDto){
    const isExistUser = await this.usersService.findOneByUserEmail(body);
  
    if(!isExistUser){
      throw new NotFoundException('User not found');
    }

   const forgotToken = crypto.randomBytes(20).toString('hex');
   const encryptedToken = await this.tokenEncryption(forgotToken);
   isExistUser.forgotPasswordToken = encryptedToken;
   isExistUser.forgotPasswordExpiry = new Date(Date.now() + 5 * 60 * 1000); // 20 mins to expire the token for password reset
   await isExistUser.save();

    // send email to reset password
    this.emailService.sendEmail(
      {
        email: isExistUser.email,
        subject: 'link for resetting password',
        message: `please click on <a href="http://localhost:9000/auth/reset-password/${forgotToken}>this link</a> to reset your password`
      }
    )

    return {
      success: true,
      message: 'reset link sent successfully to the registered email'
    }

  }

  async resetPassword(token: string, userNewPassword:UserNewPasswordDto){
    const forgotPasswordToken = await this.tokenEncryption(token);
    const property = 'forgotPasswordToken';
    const isExistUser = await this.usersService.findOneByProperty(property,forgotPasswordToken,{forgotPasswordExpiry : {$gt: Date.now()}});
    
    // if user is not found or resetPassword link is expired
    if(!isExistUser){
      throw new NotFoundException('user not found or reset link expired')
    }

    const { password } = userNewPassword;
    const hashedPassword = await this.usersService.hashPassword(password);
    isExistUser.password = hashedPassword;
    
    isExistUser.forgotPasswordToken = undefined;
    isExistUser.forgotPasswordExpiry = undefined;

    await isExistUser.save()

    return {
      message: 'password reset done successfully',
      success: true
    }

  }

  async homepage(user: object) {
    return {
      message: "Congrats! You have hacked my prkskrs private page!"
    }
  }
  
  async tokenEncryption(token: string): Promise<string>{
     return crypto.createHash('sha256').update(token).digest('hex')
  }
}
