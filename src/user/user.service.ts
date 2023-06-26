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
    if (!createUserDto.captchaCode) {
      return res.status(422).json({
        message: 'Unproccesable request, please provide the required fields',
      });
    }
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${createUserDto.captchaCode}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        method: 'POST',
      },
    );
    const captchaValidation = await response.json();
    if (captchaValidation.success) {
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
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .json({
          userInfo: payload,
        });
    }

    return res.status(422).json({
      message: 'Unproccesable request, Invalid captcha code',
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

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
