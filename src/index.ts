import { DataSource } from "typeorm";
import { ILocalSubTypeValue } from "./db/subType";
import { ProductDecimalSpecs } from "./modules/products/entities/properties/decimalSpecs";
import { ProductFeatures } from "./modules/products/entities/properties/features";
import { ProductIntSpecs } from "./modules/products/entities/properties/intSpecs";
import { ProductTextSpecs } from "./modules/products/entities/properties/textSpecs";
import { ProductTextSpecsValues } from "./modules/products/entities/properties/textSpecsValues";
import { ProductUnits } from "./modules/products/entities/properties/unit";
import { bulkUploadCarData } from "./Bulk Upload Year/car";
import { bulkUploadBikeDekhoData } from "./Bulk Upload Year/bikeScooter";

const baseFolder = "src/";

let entitiesArray = [
  `${baseFolder}/modules/*/entities/*.{ts,js}`,
  `${baseFolder}/modules/*/entities/*/*.{ts,js}`,
  `${baseFolder}/modules/*/entities/*/*/*.{ts,js}`,
];

export let subTypeLocalMap = new Map<string, ILocalSubTypeValue>();

// properties map
export let textSpecMap = new Map<string, ProductTextSpecs>();
export let defaultTextSpecValueMap = new Map<string, ProductTextSpecsValues>();
export let textSpecValueMap = new Map<string, ProductTextSpecsValues>();

export let unitMap = new Map<string, ProductUnits>();
export let intSpecMap = new Map<string, ProductIntSpecs>();

export let decSpecMap = new Map<string, ProductDecimalSpecs>();

export let featureMap = new Map<string, ProductFeatures>();

export const AppDataSource = new DataSource({
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
  .then(async () => {
    console.log("Data Source has been initialized!");

    // run this bulk upload after extract the data in the specified format
    // await bulkUploadCarData();
    // await bulkUploadBikeDekhoData();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
