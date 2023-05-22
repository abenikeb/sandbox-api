import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { GeneratePassword, GenerateSalt } from '../utility';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto, res): Promise<any> {
    const existUser = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();

    if (existUser) return res.status('400').send('The user Alerady registered');

    let salt = await GenerateSalt();
    const userPassword = await GeneratePassword(createUserDto.password, salt);

    const userData = {
      username: createUserDto.username,
      password: userPassword,
      email: createUserDto.email,
      salt: salt,
    };

    const { password, ...newPayload } = userData;

    let createdUser = await this.userModel.create(userData);
    createdUser.save();

    return res
      .header('x-auth-token', await this.jwtService.signAsync(newPayload))
      .header('access-control-expose-headers', 'x-auth-token')
      .json({
        userInfo: newPayload,
      });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneWithUser(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
