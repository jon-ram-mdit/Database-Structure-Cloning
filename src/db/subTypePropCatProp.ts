import { AppDataSource } from "..";
import { ProductDecimalSpecs } from "../modules/products/entities/properties/decimalSpecs";
import { ProductFeatures } from "../modules/products/entities/properties/features";
import { ProductIntSpecs } from "../modules/products/entities/properties/intSpecs";
import { ProductTextSpecs } from "../modules/products/entities/properties/textSpecs";
import { SubTypesPropCatDecimalSpecs } from "../modules/products/entities/sub-type/property-category/propCatDecimalSpecs";
import { SubTypesPropCatFeatures } from "../modules/products/entities/sub-type/property-category/propCatFeatures";
import { SubTypesPropCatIntSpecs } from "../modules/products/entities/sub-type/property-category/propCatIntSpecs";
import { SubTypesPropCatTextSpecs } from "../modules/products/entities/sub-type/property-category/propCatTextSpecs";
import { SubTypesPropCat, propertyType } from "../modules/products/entities/sub-type/property-category/subTypePropCat";

const subTypePropCatTextSpecRepo = AppDataSource.getRepository(
  SubTypesPropCatTextSpecs
);
const subTypePropCatIntSpecRepo = AppDataSource.getRepository(
  SubTypesPropCatIntSpecs
);
const subTypePropCatDecimalSpecRepo = AppDataSource.getRepository(
  SubTypesPropCatDecimalSpecs
);
const subTypePropCatFeatureRepo = AppDataSource.getRepository(
  SubTypesPropCatFeatures
);

export async function createSubTypePropCatTextSpec(
  subTypePropCat: SubTypesPropCat,
  textSpec: ProductTextSpecs
) {
  try {
    const newSubTypePropCatTextSpec = new SubTypesPropCatTextSpecs();
    newSubTypePropCatTextSpec.type = propertyType.D;
    newSubTypePropCatTextSpec.subTypePropCat = subTypePropCat;
    newSubTypePropCatTextSpec.textSpec = textSpec;
    return await subTypePropCatTextSpecRepo.save(newSubTypePropCatTextSpec);
  } catch (error) {
    console.log("err on create sub type prop cat text spec is: ",error)
    throw error;
  }
}

export async function createSubTypePropCatIntSpec(
  subTypePropCat: SubTypesPropCat,
  intSpec: ProductIntSpecs
) {
  try {
    const newSubTypePropCatIntSpec = new SubTypesPropCatIntSpecs();
    newSubTypePropCatIntSpec.type = propertyType.D;
    newSubTypePropCatIntSpec.subTypePropCat = subTypePropCat;
    newSubTypePropCatIntSpec.intSpec = intSpec;
    return await subTypePropCatIntSpecRepo.save(newSubTypePropCatIntSpec);
  } catch (error) {
    console.log("err on create sub type prop cat int spec is: ",error)
    throw error;
  }
}

export async function createSubTypePropCatDecimalSpec(
  subTypePropCat: SubTypesPropCat,
  decimalSpec: ProductDecimalSpecs
) {
  try {
    const newSubTypePropCatDecimalSpec = new SubTypesPropCatDecimalSpecs();
    newSubTypePropCatDecimalSpec.type = propertyType.D;
    newSubTypePropCatDecimalSpec.subTypePropCat = subTypePropCat;
    newSubTypePropCatDecimalSpec.decimalSpec = decimalSpec;
    return await subTypePropCatDecimalSpecRepo.save(
      newSubTypePropCatDecimalSpec
    );
  } catch (error) {
    console.log("err on create sub type prop cat decimal spec is: ",error)
    throw error;
  }
}

export async function createSubTypePropCatFeature(
  subTypePropCat: SubTypesPropCat,
  feature: ProductFeatures
) {
  try {
    const newSubTypePropCatFeature = new SubTypesPropCatFeatures();
    newSubTypePropCatFeature.type = propertyType.D;
    newSubTypePropCatFeature.subTypePropCat = subTypePropCat;
    newSubTypePropCatFeature.feature = feature;
    return await subTypePropCatFeatureRepo.save(newSubTypePropCatFeature);
  } catch (error) {
    console.log("err on create sub type prop cat feature is: ",error)
    throw error;
  }
}
