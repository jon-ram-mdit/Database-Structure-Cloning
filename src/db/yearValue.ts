import { QueryRunner } from "typeorm";
import { AppDataSource } from "../config/database";
import { VariantsYears, YearValuesType } from "../modules/products/entities/end-product/year";
import { YearOuterDecimalSpecValues } from "../modules/products/entities/end-product/yearOuterValues/yearOuterDecimalSpecValues";
import { YearOuterIntSpecValues } from "../modules/products/entities/end-product/yearOuterValues/yearOuterIntSpecValues";
import { YearOuterTextSpecValues } from "../modules/products/entities/end-product/yearOuterValues/yearOuterTextSpecValues";
import { YearDecimalSpecValues } from "../modules/products/entities/end-product/yearValues/yearDecimalSpecValues";
import { YearFeaturesValues } from "../modules/products/entities/end-product/yearValues/yearFeaturesValues";
import { YearIntSpecValues } from "../modules/products/entities/end-product/yearValues/yearIntSpecValues";
import { YearTextSpecValues } from "../modules/products/entities/end-product/yearValues/yearTextSpecValues";
import { ProductTextSpecsValues } from "../modules/products/entities/properties/textSpecsValues";
import { OuterDecimalSpecs } from "../modules/products/entities/sub-type/outer-specs/outerDecimalSpecs";
import { OuterIntSpecs } from "../modules/products/entities/sub-type/outer-specs/outerIntSpecs";
import { OuterTextSpecs } from "../modules/products/entities/sub-type/outer-specs/outerTextSpecs";
import { SubTypesPropCatDecimalSpecs } from "../modules/products/entities/sub-type/property-category/propCatDecimalSpecs";
import { SubTypesPropCatFeatures } from "../modules/products/entities/sub-type/property-category/propCatFeatures";
import { SubTypesPropCatIntSpecs } from "../modules/products/entities/sub-type/property-category/propCatIntSpecs";
import { SubTypesPropCatTextSpecs } from "../modules/products/entities/sub-type/property-category/propCatTextSpecs";
import { parseVehicleAllProperties } from "../utils/product/parseAllVehicleProperties";
import { getSubTypeForYearParse } from "./subType";


export async function createYearTextSpecValue({
  queryRunner,
  year,
  propCatTextSpec,
  textSpecValue,
  defaultValue,
}: {
  queryRunner: QueryRunner;
  year: VariantsYears;
  propCatTextSpec: SubTypesPropCatTextSpecs;
  textSpecValue: ProductTextSpecsValues;
  defaultValue: boolean;
}) {
  try {
    const newYearTextSpecValue = new YearTextSpecValues();
    newYearTextSpecValue.propCatTextSpec = propCatTextSpec;
    newYearTextSpecValue.variantYear = year;
    newYearTextSpecValue.value = textSpecValue;
    newYearTextSpecValue.value_type = defaultValue
      ? YearValuesType.D
      : YearValuesType.ND;
    return queryRunner.manager.save(newYearTextSpecValue);
  } catch (error) {
    console.log("err on create year text spec value is: ", error);
    throw error;
  }
}

export async function createYearOuterTextSpecValue({
  queryRunner,
  year,
  outerTextSpec,
  textSpecValue,
  defaultValue,
}: {
  queryRunner: QueryRunner;
  year: VariantsYears;
  outerTextSpec: OuterTextSpecs;
  textSpecValue: ProductTextSpecsValues;
  defaultValue: boolean;
}) {
  try {
    const newYearTextSpecValue = new YearOuterTextSpecValues();
    newYearTextSpecValue.outerTextSpec = outerTextSpec;
    newYearTextSpecValue.variantYear = year;
    newYearTextSpecValue.value = textSpecValue;
    newYearTextSpecValue.value_type = defaultValue
      ? YearValuesType.D
      : YearValuesType.ND;
    return queryRunner.manager.save(newYearTextSpecValue);
  } catch (error) {
    console.log("err on create year outer text spec value is: ", error);
    throw error;
  }
}

// int spec
export async function createYearIntSpecValue({
  queryRunner,
  year,
  propCatIntSpec,
  intSpecValue,
  defaultValue,
}: {
  queryRunner: QueryRunner;
  year: VariantsYears;
  propCatIntSpec: SubTypesPropCatIntSpecs;
  intSpecValue: number;
  defaultValue: boolean;
}) {
  try {
    const newYearIntSpecValue = new YearIntSpecValues();
    newYearIntSpecValue.propCatIntSpec = propCatIntSpec;
    newYearIntSpecValue.variantYear = year;
    newYearIntSpecValue.value = defaultValue ? 0 : intSpecValue;
    newYearIntSpecValue.value_type = defaultValue
      ? YearValuesType.D
      : YearValuesType.ND;
    return queryRunner.manager.save(newYearIntSpecValue);
  } catch (error) {
    console.log("err on create year int spec value is: ", error);
    throw error;
  }
}

export async function createYearOuterIntSpecValue({
  queryRunner,
  year,
  outerIntSpec,
  intSpecValue,
  defaultValue,
}: {
  queryRunner: QueryRunner;
  year: VariantsYears;
  outerIntSpec: OuterIntSpecs;
  intSpecValue: number;
  defaultValue: boolean;
}) {
  try {
    const newYearIntSpecValue = new YearOuterIntSpecValues();
    newYearIntSpecValue.outerIntSpec = outerIntSpec;
    newYearIntSpecValue.variantYear = year;
    newYearIntSpecValue.value = defaultValue ? 0 : intSpecValue;
    newYearIntSpecValue.value_type = defaultValue
      ? YearValuesType.D
      : YearValuesType.ND;
    return queryRunner.manager.save(newYearIntSpecValue);
  } catch (error) {
    console.log("err on create year outer int spec value is: ", error);
    throw error;
  }
}

// decimal spec
export async function createYearDecimalSpecValue({
  queryRunner,
  year,
  propCatDecimalSpec,
  decimalSpecValue,
  defaultValue,
}: {
  queryRunner: QueryRunner;
  year: VariantsYears;
  propCatDecimalSpec: SubTypesPropCatDecimalSpecs;
  decimalSpecValue: number;
  defaultValue: boolean;
}) {
  try {
    const newYearDecimalSpecValue = new YearDecimalSpecValues();
    newYearDecimalSpecValue.propCatDecimalSpec = propCatDecimalSpec;
    newYearDecimalSpecValue.variantYear = year;
    newYearDecimalSpecValue.value = defaultValue ? 0.1 : decimalSpecValue;
    newYearDecimalSpecValue.value_type = defaultValue
      ? YearValuesType.D
      : YearValuesType.ND;
    return queryRunner.manager.save(newYearDecimalSpecValue);
  } catch (error) {
    console.log("err on create year dec spec value is: ", error);
    throw error;
  }
}

export async function createYearOuterDecimalSpecValue({
  queryRunner,
  year,
  outerDecimalSpec,
  decimalSpecValue,
  defaultValue,
}: {
  queryRunner: QueryRunner;
  year: VariantsYears;
  outerDecimalSpec: OuterDecimalSpecs;
  decimalSpecValue: number;
  defaultValue: boolean;
}) {
  try {
    const newYearDecimalSpecValue = new YearOuterDecimalSpecValues();
    newYearDecimalSpecValue.outerDecSpec = outerDecimalSpec;
    newYearDecimalSpecValue.variantYear = year;
    newYearDecimalSpecValue.value = defaultValue ? 0.1 : decimalSpecValue;
    newYearDecimalSpecValue.value_type = defaultValue
      ? YearValuesType.D
      : YearValuesType.ND;
    return queryRunner.manager.save(newYearDecimalSpecValue);
  } catch (error) {
    console.log("err on create year outer dec spec value is: ", error);
    throw error;
  }
}

// feature
export async function createYearFeatureValue({
  queryRunner,
  year,
  propCatFeature,
  featureValue,
  defaultValue,
}: {
  queryRunner: QueryRunner;
  year: VariantsYears;
  propCatFeature: SubTypesPropCatFeatures;
  featureValue: boolean;
  defaultValue: boolean;
}) {
  try {
    const newYearFeatureValue = new YearFeaturesValues();
    newYearFeatureValue.propCatFeature = propCatFeature;
    newYearFeatureValue.variantYear = year;
    newYearFeatureValue.value = defaultValue ? false : featureValue;
    newYearFeatureValue.value_type = defaultValue
      ? YearValuesType.D
      : YearValuesType.ND;
    return queryRunner.manager.save(newYearFeatureValue);
  } catch (error) {
    console.log("err on create year feature value is: ", error);
    throw error;
  }
}

const yearRepo = AppDataSource.getRepository(VariantsYears);
const yearFeaturesValuesRepo =
  AppDataSource.getRepository(YearFeaturesValues);
const yearTextSpecValuesRepo =
  AppDataSource.getRepository(YearTextSpecValues);
const yearIntSpecValuesRepo = AppDataSource.getRepository(YearIntSpecValues);
const yearDecimalSpecValuesRepo = AppDataSource.getRepository(
  YearDecimalSpecValues
);

export async function getYearPropertyValues(yearId: string) {
  try {
    const [
      year,
      yearDecimalSpecValues,
      yearFeaturesValues,
      yearIntSpecValues,
      yearTextSpecValues,
    ] = await Promise.all([
      yearRepo.findOne({
        relations: {
          subType: true,
        },
        where: {
          variant_year_id: yearId,
        },
        withDeleted: true,
      }),
      yearDecimalSpecValuesRepo.find({
        where: {
          variantYear: {
            variant_year_id: yearId,
          },
        },
        relations: {
          propCatDecimalSpec: {
            subTypePropCat: {
              propCat: true,
            },
            decimalSpec: {
              unit: true,
            },
          },
        },
      }),
      yearFeaturesValuesRepo.find({
        where: {
          variantYear: {
            variant_year_id: yearId,
          },
        },
        relations: {
          propCatFeature: {
            subTypePropCat: {
              propCat: true,
            },
            feature: true,
          },
        },
      }),
      yearIntSpecValuesRepo.find({
        where: {
          variantYear: {
            variant_year_id: yearId,
          },
        },
        relations: {
          propCatIntSpec: {
            subTypePropCat: {
              propCat: true,
            },
            intSpec: {
              unit: true,
            },
          },
        },
      }),
      yearTextSpecValuesRepo.find({
        where: {
          variantYear: {
            variant_year_id: yearId,
          },
        },
        relations: {
          value: true,
          propCatTextSpec: {
            subTypePropCat: {
              propCat: true,
            },
            textSpec: true,
          },
        },
      }),
    ]);
    console.log(
      "year: ",
      year,
      " year decimal spec values: ",
      yearDecimalSpecValues,
      "year feature values: ",
      yearFeaturesValues,
      "year int spec values: ",
      yearIntSpecValues,
      "year text spec values: ",
      yearTextSpecValues
    );

    const subType = await getSubTypeForYearParse(
      year.subType.product_sub_type_id
    );
    console.log("sub type is: ", subType);

    year.yearDecimalSpecValues = yearDecimalSpecValues;
    year.yearIntSpecValues = yearIntSpecValues;
    year.yearTextSpecValues = yearTextSpecValues;
    year.yearFeaturesValues = yearFeaturesValues;
    const parsedPropCatProp = parseVehicleAllProperties(year, subType);
    console.log("parsed prop cat prop is: ", parsedPropCatProp);
    // return {
    //   propCat: parsedPropCatProp.propCatWithProp,
    //   subType: subType,
    // };
  } catch (error) {
    throw error;
  }
}
