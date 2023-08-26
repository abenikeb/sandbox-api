import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { GeneratePassword, GenerateSalt, ValidatePassword } from '../utility';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto, res): Promise<any> {
    const existUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (existUser) return res.status(400).send('The user Alerady registered');

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(createUserDto.password, salt);

    const userData = {
      firstName: createUserDto?.firstName,
      lastName: createUserDto?.lastName,
      tel: createUserDto?.tel,
      email: createUserDto?.email,
      password: userPassword,
      salt: salt,
    };

    let createdUser = await this.userModel.create(userData);
    createdUser = await createdUser.save();

    const payload = {
      firstName: createUserDto?.firstName,
      lastName: createUserDto?.lastName,
      tel: createUserDto?.tel,
      email: createUserDto?.email,
      id: createdUser._id,
    };

    console.log('payload', payload);

    // const { password, lastName, tel, ...otherUserInfo } = userData;
    // const { password, role, createdAt, updatedAt, ...otherUserInfo } =
    //   createdUser;

    const token = await this.jwtService.signAsync(payload);

    return res
      .header('Authorization', token)
      .header('access-control-expose-headers', 'Authorization')
      .json({
        userInfo: payload,
      });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneWithEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: any, res): Promise<any> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        tel: updateUserDto.tel,
        email: updateUserDto.email,
      },
    );
    return res.json({
      updatedUser,
    });
  }

  async validateUserPassword(id: any, currentPassword: any) {
    const existUser = (await this.userModel.findOne({ _id: id })) as any;

    const validPassword = await ValidatePassword(
      currentPassword,
      existUser.password,
      existUser.salt,
    );
    if (!validPassword) return false;
    return true;
  }

  async updateUserPassword(userId: any, newPassword: any) {
    const salt_ = await GenerateSalt();
    const hashedPassword = await GeneratePassword(newPassword, salt_);

    console.log({ _id: userId });
    console.log({ salt_: salt_ });

    const user = await this.userModel.findById(userId);
    user.password = hashedPassword;
    user.salt = salt_;
    user.save();
  }
  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
