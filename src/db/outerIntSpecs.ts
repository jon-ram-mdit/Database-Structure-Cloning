import { AppDataSource } from "..";
import { ProductDecimalSpecs } from "../modules/products/entities/properties/decimalSpecs";
import { ProductIntSpecs } from "../modules/products/entities/properties/intSpecs";
import { ProductTextSpecs } from "../modules/products/entities/properties/textSpecs";
import { OuterDecimalSpecs } from "../modules/products/entities/sub-type/outer-specs/outerDecimalSpecs";
import { OuterIntSpecs } from "../modules/products/entities/sub-type/outer-specs/outerIntSpecs";
import { OuterTextSpecs } from "../modules/products/entities/sub-type/outer-specs/outerTextSpecs";
import { ProductSubTypes } from "../modules/products/entities/sub-type/subType";

const outerIntSpecRepo = AppDataSource.getRepository(OuterIntSpecs);
const outerDecSpecRepo = AppDataSource.getRepository(OuterDecimalSpecs);
const outerTextSpecRepo = AppDataSource.getRepository(OuterTextSpecs);

const svgLogoUrl = "https://www.svgrepo.com/show/504472/icon-pack-studio.svg";

export async function createSubTypeOuterIntSpec(
  subType: ProductSubTypes,
  intSpec: ProductIntSpecs
) {
  try {
    const newSubTypeOuterIntSpec = new OuterIntSpecs();
    newSubTypeOuterIntSpec.intSpec = intSpec;
    newSubTypeOuterIntSpec.subType = subType;
    newSubTypeOuterIntSpec.for_home_screen = true;
    newSubTypeOuterIntSpec.image_url = svgLogoUrl;
    return outerIntSpecRepo.save(newSubTypeOuterIntSpec);
  } catch (error) {
    console.log("err on create sub type outer int spec is: ",error)
    throw error;
  }
}

export async function createSubTypeOuterTextSpec(
  subType: ProductSubTypes,
  textSpec: ProductTextSpecs
) {
  try {
    const newSubTypeOuterTextSpec = new OuterTextSpecs();
    newSubTypeOuterTextSpec.textSpec = textSpec;
    newSubTypeOuterTextSpec.subType = subType;
    newSubTypeOuterTextSpec.for_home_screen = true;
    newSubTypeOuterTextSpec.image_url = svgLogoUrl;
    return outerTextSpecRepo.save(newSubTypeOuterTextSpec);
  } catch (error) {
    console.log("err on create sub type outer text spec is: ",error)
    throw error;
  }
}

export async function createSubTypeOuterDecimalSpec(
  subType: ProductSubTypes,
  decimalSpec: ProductDecimalSpecs
) {
  try {
    const newSubTypeOuterDecimalSpec = new OuterDecimalSpecs();
    newSubTypeOuterDecimalSpec.decimalSpec = decimalSpec;
    newSubTypeOuterDecimalSpec.subType = subType;
    newSubTypeOuterDecimalSpec.for_home_screen = true;
    newSubTypeOuterDecimalSpec.image_url = svgLogoUrl;
    return outerDecSpecRepo.save(newSubTypeOuterDecimalSpec);
  } catch (error) {
    console.log("err on create sub type outer decimal spec is: ",error)
    throw error;
  }
}
