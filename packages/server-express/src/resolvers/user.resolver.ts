import { Resolver, Mutation, Args } from "type-graphql";
import { Service } from "typedi";
import { CreateUserArgs } from "../args/create-user.args";
import { User } from "../entity/user.entity";
import { UserService } from "../services/user.service";

@Service()
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async addUser(@Args() args: CreateUserArgs): Promise<User> {
    return this.userService.addUser(args);
  }
}
