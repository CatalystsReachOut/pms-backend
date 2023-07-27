import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) { }

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(createUserDto: SignupDto): Promise<User> {
    const { username, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword, role });
    return newUser.save();
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
