import { Entity, Column } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class User extends Base {
  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;
}
