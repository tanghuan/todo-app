import { Service } from "typedi";
import { Resolver, Query } from "type-graphql";
import { AppService } from "../services/app.service";

@Service()
@Resolver()
export class AppResolver {
  constructor(private appService: AppService) {}

  @Query((type) => String)
  hello(): string {
    return this.appService.getHello();
  }
}
