import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { Model } from 'mongoose';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private readonly userService: UserService,
  ) {}

  async signInWithEmailPassword(dto: SignInDto) {
    const { email, password } = dto;

    console.log(JSON.stringify(dto));

    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) throw new UnauthorizedException('email or password incorrect');

      const authRecord = await this.authModel.findOne({
        userId: user._id,
      });

      if (!authRecord)
        throw new UnauthorizedException('email or password incorrect');

      const isPasswordCorrect = await verify(authRecord.passwordHash, password);

      if (!isPasswordCorrect)
        throw new UnauthorizedException('email or password incorrect');

      return user;
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      throw new BadRequestException('cannot signin user');
    }
  }

  async signUpWithEmailPassword(dto: SignUpDto) {
    try {
      const { email, password, firstName, lastName, provider, phoneNumber } =
        dto;

      const passwordHash = await hash(password);

      const user = await this.userService.createUser({
        email,
        firstName,
        lastName,
        phoneNumber,
      });

      let authRecord = new this.authModel({
        passwordHash,
        userId: user._id,
        provider,
      });

      authRecord = await authRecord.save();

      if (!authRecord) {
        await this.userService.deleteUserById(user._id);
        throw new BadRequestException('cannot signup user');
      }

      return user;
    } catch (e) {
      if (e.message.includes('duplicate')) throw e;
      else throw new BadRequestException('cannot signup user');
    }
  }
}
