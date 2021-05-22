import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserArgs } from '../args/create-user.args';
import { User } from '../entity/user.entity';

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addUser(args: CreateUserArgs): Promise<User> {
    const { username, password } = args;

    let entity = await this.userRepository.findOne({
      username,
    });

    if (entity) {
      throw new Error('Username exist.');
    }

    entity = new User();
    entity.username = username;
    const hashPwd = await hash(password, 12);
    entity.password = hashPwd;
    return this.userRepository.save(entity);
  }
}
