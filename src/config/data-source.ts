import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../models/User";
import { Recipe } from "../models/Recipe";
import { RecipeComment } from "../models/Comment";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.db",
  synchronize: true,
  logging: true,
  entities: [User, Recipe, RecipeComment],
});

export default AppDataSource;
