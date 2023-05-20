import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly catModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdCat = await this.catModel.create(createUserDto);
    return createdCat;
  }

  async findAll(): Promise<User[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.catModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.catModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
