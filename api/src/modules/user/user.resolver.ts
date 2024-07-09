import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'user' })
  getUsers() {
    return this.userService.users();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserDto') dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
