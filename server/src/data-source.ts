import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Admin } from "./entity/Admin";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "CV Indokoding sukses makmur",
  synchronize: false,
  logging: false,
  entities: [User, Admin],
  migrations: ["/src/migrations/*.ts"],
  subscribers: [],
});
