import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/user.schema';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signInWithEmailPassword(@Args('signInDto') dto: SignInDto) {
    return this.authService.signInWithEmailPassword(dto);
  }

  @Mutation(() => User)
  async signUpWithEmailPassword(@Args('signUpDto') dto: SignUpDto) {
    return this.authService.signUpWithEmailPassword(dto);
  }
}
