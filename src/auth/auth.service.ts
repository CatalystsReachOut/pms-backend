import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '../users/dto/signup.dto';
import { User } from '../users/users.schema';
import { LoginDto } from '../users/dto/login.dto';
import { LoginInterface, SignUpInterface } from '../interfaces/index';
import { JwtPayload } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(payload: JwtPayload) {
    return await this.usersService.findOneById(payload.id);
  }

  generateJwtToken(user: User) {
    const payload = { id: user._id, username: user.username, role: user.role };
    return this.jwtService.sign(payload);
  }

  async signUp(body: SignupDto): Promise<SignUpInterface> {
    const { username, password, role } = body;
    const existingUser = await this.usersService.findOneByUsername(username);

    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const newUser = await this.usersService.create({ username, password, role });
    const token = this.generateJwtToken(newUser);
    return {
      message: "User Registered Successfully!",
      token
    };
  }

  async login(loginDto: LoginDto): Promise<LoginInterface> {
    const { username, password } = loginDto;
    const user = await this.usersService.findOneByUsername(username);
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

  async homepage() {
    return {
      message: "Congrats! You have hacked my prkskrs private page!"
    }
  }
}
