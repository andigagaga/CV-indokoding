import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Admin } from "./entity/Admin";
import { Product } from "./entity/Product";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "guswandi-shoop",
  synchronize: true,
  logging: false,
  entities: [User, Admin, Product],
  migrations: ["/src/migrations/*.ts"],
  subscribers: [],
});
