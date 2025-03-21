import { QueryRunner } from "typeorm";
import {
  createYearDecimalSpecValue,
  createYearFeatureValue,
  createYearIntSpecValue,
  createYearOuterDecimalSpecValue,
  createYearOuterIntSpecValue,
  createYearOuterTextSpecValue,
  createYearTextSpecValue,
} from "./yearValue";
import { VariantsYears } from "../modules/products/entities/end-product/year";
import { ProductTextSpecsValues } from "../modules/products/entities/properties/textSpecsValues";
import { OuterDecimalSpecs } from "../modules/products/entities/sub-type/outer-specs/outerDecimalSpecs";
import { OuterIntSpecs } from "../modules/products/entities/sub-type/outer-specs/outerIntSpecs";
import { OuterTextSpecs } from "../modules/products/entities/sub-type/outer-specs/outerTextSpecs";
import { SubTypesPropCatDecimalSpecs } from "../modules/products/entities/sub-type/property-category/propCatDecimalSpecs";
import { SubTypesPropCatFeatures } from "../modules/products/entities/sub-type/property-category/propCatFeatures";
import { SubTypesPropCatIntSpecs } from "../modules/products/entities/sub-type/property-category/propCatIntSpecs";
import { SubTypesPropCatTextSpecs } from "../modules/products/entities/sub-type/property-category/propCatTextSpecs";

export function addDefaultTextSpecValueToYears({
  queryRunner,
  years,
  propCatTextSpec,
  defaultTextSpecValue,
}: {
  queryRunner: QueryRunner;
  years: VariantsYears[];
  propCatTextSpec: SubTypesPropCatTextSpecs;
  defaultTextSpecValue: ProductTextSpecsValues;
}) {
  try {
    return years.map(async (year) => {
      return await createYearTextSpecValue({
        queryRunner,
        year,
        propCatTextSpec,
        textSpecValue: defaultTextSpecValue,
        defaultValue: true,
      });
    });
  } catch (error) {
    console.log("err on add default text spec value to years is: ",error)
    throw error;
  }
}

export function addDefaultOuterTextSpecValueToYears({
  queryRunner,
  years,
  outerTextSpec,
  defaultTextSpecValue,
}: {
  queryRunner: QueryRunner;
  years: VariantsYears[];
  outerTextSpec: OuterTextSpecs;
  defaultTextSpecValue: ProductTextSpecsValues;
}) {
  try {
    return years.map(async (year) => {
      return await createYearOuterTextSpecValue({
        queryRunner,
        year,
        outerTextSpec,
        textSpecValue: defaultTextSpecValue,
        defaultValue: true,
      });
    });
  } catch (error) {
    console.log("err on add default outer text spec value to years is: ",error)
    throw error;
  }
}

// int spec
export function addDefaultIntSpecValueToYears({
  queryRunner,
  years,
  propCatIntSpec,
}: {
  queryRunner: QueryRunner;
  years: VariantsYears[];
  propCatIntSpec: SubTypesPropCatIntSpecs;
}) {
  try {
    return years.map(async (year) => {
      return await createYearIntSpecValue({
        queryRunner,
        year,
        propCatIntSpec,
        intSpecValue: 0,
        defaultValue: true,
      });
    });
  } catch (error) {
    console.log("err on add default int spec value to years is: ",error)
    throw error;
  }
}

export function addDefaultOuterIntSpecValueToYears({
  queryRunner,
  years,
  outerIntSpec,
}: {
  queryRunner: QueryRunner;
  years: VariantsYears[];
  outerIntSpec: OuterIntSpecs;
}) {
  try {
    return years.map(async (year) => {
      return await createYearOuterIntSpecValue({
        queryRunner,
        year,
        outerIntSpec,
        intSpecValue: 0,
        defaultValue: true,
      });
    });
  } catch (error) {
    console.log("err on add default outer int spec value to years is: ",error)
    throw error;
  }
}

// decimal spec
export function addDefaultDecimalSpecValueToYears({
  queryRunner,
  years,
  propCatDecimalSpec,
}: {
  queryRunner: QueryRunner;
  years: VariantsYears[];
  propCatDecimalSpec: SubTypesPropCatDecimalSpecs;
}) {
  try {
    return years.map(async (year) => {
      return await createYearDecimalSpecValue({
        queryRunner,
        year,
        propCatDecimalSpec,
        decimalSpecValue: 0.1,
        defaultValue: true,
      });
    });
  } catch (error) {
    console.log("err on add default dec spec value to years is: ",error)
    throw error;
  }
}

export function addDefaultOuterDecimalSpecValueToYears({
  queryRunner,
  years,
  outerDecimalSpec,
}: {
  queryRunner: QueryRunner;
  years: VariantsYears[];
  outerDecimalSpec: OuterDecimalSpecs;
}) {
  try {
    return years.map(async (year) => {
      return await createYearOuterDecimalSpecValue({
        queryRunner,
        year,
        outerDecimalSpec,
        decimalSpecValue: 0.1,
        defaultValue: true,
      });
    });
  } catch (error) {
    console.log("err on add default outer dec spec value to years is: ",error)
    throw error;
  }
}

// feature
export function addDefaultFeatureValueToYears({
  queryRunner,
  years,
  propCatFeature,
}: {
  queryRunner: QueryRunner;
  years: VariantsYears[];
  propCatFeature: SubTypesPropCatFeatures;
}) {
  try {
    return years.map(async (year) => {
      return await createYearFeatureValue({
        queryRunner,
        year,
        propCatFeature,
        featureValue: false,
        defaultValue: true,
      });
    });
  } catch (error) {
    console.log("err on add default feature value to years is: ",error)
    throw error;
  }
}
