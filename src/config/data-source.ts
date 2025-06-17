import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../models/User";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.db",
  synchronize: true,
  logging: true,
  entities: [User],
});

export default AppDataSource;
