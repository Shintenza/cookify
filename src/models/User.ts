import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../types/user";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({
    default: "USER",
  })
  role!: UserRole;
}
