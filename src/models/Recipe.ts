import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MealType, SkillLevel, StoreAvailability } from "../types/recipe";
import { User } from "./User";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @Column()
  mealType!: MealType;

  @Column()
  level!: SkillLevel;

  @Column()
  storeAvailability!: StoreAvailability;

  @Column()
  time!: number;

  @Column("simple-array")
  ingredeints!: string[];

  @Column("simple-array")
  steps!: string[];

  @ManyToOne(() => User)
  author!: User;
}
