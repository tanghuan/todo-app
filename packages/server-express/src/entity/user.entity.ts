import { Entity, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Base } from "./base.entity";

@Entity()
@ObjectType()
export class User extends Base {
  @Column({
    nullable: false,
    unique: true,
  })
  @Field()
  username: string;

  @Column({
    nullable: false,
  })
  @Field()
  password: string;
}
