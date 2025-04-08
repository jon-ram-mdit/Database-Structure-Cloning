import { DataSource } from "typeorm";

const baseFolder = "src/";
const entitiesArray = [
  `${baseFolder}/modules/*/entities/*.{ts,js}`,
  `${baseFolder}/modules/*/entities/*/*.{ts,js}`,
  `${baseFolder}/modules/*/entities/*/*/*.{ts,js}`,
];

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "upwork_sample_db_ahmed",
  synchronize: true,
  entities: entitiesArray,
});
