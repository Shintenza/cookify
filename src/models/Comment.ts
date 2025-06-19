import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Recipe)
  recipe!: Recipe;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  text!: string;
}
