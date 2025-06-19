import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../models/User";
import { Recipe } from "../models/Recipe";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.db",
  synchronize: true,
  logging: true,
  entities: [User, Recipe],
});

export default AppDataSource;
