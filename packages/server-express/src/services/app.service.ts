import { Service } from 'typedi';

@Service()
export class AppService {
  getHello(): string {
    return 'Hello TypeGraphql!';
  }
}
