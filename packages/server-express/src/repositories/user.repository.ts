import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entity/user.entity';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
