import { AppDataSource } from "../config/database";
import { ProductDecimalSpecs } from "../modules/products/entities/properties/decimalSpecs";
import { ProductFeatures } from "../modules/products/entities/properties/features";
import { ProductIntSpecs } from "../modules/products/entities/properties/intSpecs";
import { ProductTextSpecs } from "../modules/products/entities/properties/textSpecs";
import { KeyDecimalSpecs } from "../modules/products/entities/sub-type/key-specs/keyDecimalSpecs";
import { KeyFeatures } from "../modules/products/entities/sub-type/key-specs/keyFeatures";
import { KeyIntSpecs } from "../modules/products/entities/sub-type/key-specs/keyIntSpecs";
import { KeyTextSpecs } from "../modules/products/entities/sub-type/key-specs/keyTextSpecs";
import { ProductSubTypes } from "../modules/products/entities/sub-type/subType";

const keyIntSpecRepo = AppDataSource.getRepository(KeyIntSpecs);
const keyTextSpecRepo = AppDataSource.getRepository(KeyTextSpecs);
const keyDecimalSpecRepo = AppDataSource.getRepository(KeyDecimalSpecs);
const keyFeatureRepo = AppDataSource.getRepository(KeyFeatures);

export async function createKeyIntSpec(
  subType: ProductSubTypes,
  intSpec: ProductIntSpecs
) {
  try {
    const newKeyIntSpec = new KeyIntSpecs();
    newKeyIntSpec.intSpec = intSpec;
    newKeyIntSpec.subType = subType;
    return await keyIntSpecRepo.save(newKeyIntSpec);
  } catch (err) {
    console.log("err on create key int spec is: ",err)
    throw err;
  }
}

export async function createKeyTextSpec(
  subType: ProductSubTypes,
  textSpec: ProductTextSpecs
) {
  try {
    const newKeyTextSpec = new KeyTextSpecs();
    newKeyTextSpec.textSpec = textSpec;
    newKeyTextSpec.subType = subType;
    return await keyTextSpecRepo.save(newKeyTextSpec);
  } catch (err) {
    console.log("err on create key text spec is: ",err)
    throw err;
  }
}

export async function createKeyDecimalSpec(
  subType: ProductSubTypes,
  decimalSpec: ProductDecimalSpecs
) {
  try {
    const newKeyDecimalSpec = new KeyDecimalSpecs();
    newKeyDecimalSpec.decimalSpec = decimalSpec;
    newKeyDecimalSpec.subType = subType;
    return await keyDecimalSpecRepo.save(newKeyDecimalSpec);
  } catch (err) {
    console.log("err on create key dec spec is: ",err)
    throw err;
  }
}

export async function createKeyFeature(
  subType: ProductSubTypes,
  feature: ProductFeatures
) {
  try {
    const newKeyFeature = new KeyFeatures();
    newKeyFeature.feature = feature;
    newKeyFeature.subType = subType;
    return await keyFeatureRepo.save(newKeyFeature);
  } catch (err) {
    console.log("err on create key feature is: ",err)
    throw err;
  }
}
