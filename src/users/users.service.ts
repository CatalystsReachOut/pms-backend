import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { UserEmailDto } from './dto/userEmail.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findOneByUsername(userName: string): Promise<User | null> {
    return this.userModel.findOne({ userName }).exec();
  }

  // a custom method to do a query based on any property
  async findOneByProperty<K extends keyof User>(
    property: K,
    value: User[K],
    condition?: {},
  ): Promise<User | null> {
    const query = { [property]: value, ...condition };
    const isExistUser = await this.userModel.findOne(query);
    return isExistUser;
  }

  async findOneByUserEmail(body: UserEmailDto): Promise<User | null> {
    const { email: userEmail } = body;
    return this.userModel.findOne({ email: userEmail }).exec();
  }

  async create(createUserDto: SignupDto): Promise<User> {
    const { email, userName, password, role } = createUserDto;
    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({
      email,
      userName,
      password: hashedPassword,
      role,
    });
    return newUser.save();
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
