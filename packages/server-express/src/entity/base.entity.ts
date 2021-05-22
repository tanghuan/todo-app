import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export abstract class Base {
  @ObjectIdColumn()
  @Field((type) => ID)
  id: ObjectID;

  @CreateDateColumn()
  @Field()
  createAt: Date;

  @UpdateDateColumn()
  @Field()
  updateAt: Date;

  @DeleteDateColumn()
  @Field()
  deleteAt: Date;
}
