import { DataSource } from "typeorm";

const baseFolder = "src/";

let entitiesArray = [
  `${baseFolder}/modules/*/entities/*.{ts,js}`,
  `${baseFolder}/modules/*/entities/*/*.{ts,js}`,
  `${baseFolder}/modules/*/entities/*/*/*.{ts,js}`,
];

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "upwork_sample_db",
  synchronize: true,
  entities: entitiesArray,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
