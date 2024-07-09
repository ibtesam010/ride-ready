import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async users() {
    return this.userModel.find().exec();
  }

  async createUser(dto: CreateUserDto) {
    const { email, firstName, lastName, phoneNumber } = dto;

    try {
      const newUser = new this.userModel({
        email,
        firstName,
        lastName,
        phoneNumber,
      });

      const user = await newUser.save();
      return user;
    } catch (e) {
      if (e.message?.includes('duplicate'))
        throw new BadRequestException('account already exists');
      else throw new BadRequestException('cannot create user');
    }
  }

  async getUserByID(id: string) {
    const user = await this.userModel.findById(id);

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      email,
    });
    return user;
  }

  async deleteUserById(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return true;
  }
}
