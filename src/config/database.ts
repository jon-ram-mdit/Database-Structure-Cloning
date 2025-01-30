import "reflect-metadata";
import { DataSource } from "typeorm";

import config from "./";

const baseFolder = config.NODE_ENV === "development" ? "src/" : "dist";
// const ssl = config.NODE_ENV === "development" ? false : true;
// const extra =
//   config.NODE_ENV === "development"
//     ? {}
//     : {
//         ssl: {
//           rejectUnauthorized: false,
//         },
//       };
const synchronize = config.NODE_ENV === "development" ? true : false;
const logging = config.NODE_ENV === "development" ? true : false;

let entitiesArray = [
  `${process.cwd()}/${baseFolder}/modules/*/entities/*.{ts,js}`,
  `${process.cwd()}/${baseFolder}/modules/*/entities/*/*.{ts,js}`,
  `${process.cwd()}/${baseFolder}/modules/*/entities/*/*/*.{ts,js}`,
];

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize,
  // ssl,
  // extra,
  migrations: ["database/migrations/*.js"],
  logging: false,
  entities: entitiesArray,
});
