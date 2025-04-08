import { In } from "typeorm";
import {
  decSpecMap,
  defaultTextSpecValueMap,
  featureMap,
  intSpecMap,
  textSpecMap,
  textSpecValueMap,
  unitMap,
} from "..";
import * as fs from "fs";
import { YearValuesType } from "../modules/products/entities/end-product/year";
import { YearTextSpecValues } from "../modules/products/entities/end-product/yearValues/yearTextSpecValues";
import { ProductDecimalSpecs } from "../modules/products/entities/properties/decimalSpecs";
import { ProductFeatures } from "../modules/products/entities/properties/features";
import { ProductIntSpecs } from "../modules/products/entities/properties/intSpecs";
import { ProductTextSpecs } from "../modules/products/entities/properties/textSpecs";
import {
  ProductTextSpecsValues,
  TextSpecValueTypes,
} from "../modules/products/entities/properties/textSpecsValues";
import { ProductUnits } from "../modules/products/entities/properties/unit";
import { AppDataSource } from "../config/database";

const textSpecRepo = AppDataSource.getRepository(ProductTextSpecs);
const textSpecValueRepo = AppDataSource.getRepository(ProductTextSpecsValues);
const unitRepo = AppDataSource.getRepository(ProductUnits);
const intSpecRepo = AppDataSource.getRepository(ProductIntSpecs);
const decSpecRepo = AppDataSource.getRepository(ProductDecimalSpecs);
const featureRepo = AppDataSource.getRepository(ProductFeatures);
const yearTextSpecValuesRepo = AppDataSource.getRepository(YearTextSpecValues);

export async function getDefaultTextSpecValueByName(textSpecName: string) {
  try {
    if (defaultTextSpecValueMap.has(textSpecName)) {
      return defaultTextSpecValueMap.get(textSpecName);
    }
    const defaultTextSpecValue = await textSpecValueRepo.findOne({
      where: {
        textSpec: {
          name: textSpecName,
        },
        value_type: TextSpecValueTypes.D,
      },
    });

    if (!defaultTextSpecValue) {
      throw new Error(
        "No Text Spec Default Value for given Text Spec ID was found"
      );
    }

    defaultTextSpecValueMap.set(textSpecName, defaultTextSpecValue);

    return defaultTextSpecValue;
  } catch (error) {
    throw error;
  }
}

export async function getOrCreateTextSpecValue(
  textSpec: ProductTextSpecs,
  textSpecValueName: string
) {
  try {
    if (textSpecValueMap.has(textSpecValueName)) {
      return textSpecValueMap.get(textSpecValueName);
    }

    const textSpecValue = await textSpecValueRepo.findOne({
      where: {
        textSpec: {
          product_text_spec_id: textSpec.product_text_spec_id,
        },
        value: textSpecValueName,
        value_type: TextSpecValueTypes.N,
      },
    });

    if (textSpecValue) {
      textSpecValueMap.set(textSpecValueName, textSpecValue);
      return textSpecValue;
    } else {
      const newTextSpecValue = new ProductTextSpecsValues();
      newTextSpecValue.textSpec = textSpec;
      newTextSpecValue.value = textSpecValueName;
      newTextSpecValue.value_type = TextSpecValueTypes.N;
      const dbTextSpecValue = await textSpecValueRepo.save(newTextSpecValue);
      textSpecValueMap.set(textSpecValueName, dbTextSpecValue);
    }
  } catch (error) {
    throw error;
  }
}

export async function getOrCreateTextSpecWithDefaultValue(name: string) {
  try {
    if (textSpecMap.has(name) && defaultTextSpecValueMap.has(name)) {
      return {
        textSpec: textSpecMap.get(name),
        defaultTextSpecValue: defaultTextSpecValueMap.get(name),
      };
    }

    const textSpec = await textSpecRepo.findOne({
      where: {
        name,
      },
    });

    if (textSpec) {
      const defaultTextSpecValue = await getDefaultTextSpecValueByName(
        textSpec.name
      );

      return { textSpec, defaultTextSpecValue };
    } else {
      const newTextSpec = new ProductTextSpecs();
      newTextSpec.name = name;
      const dbTextSpec = await textSpecRepo.save(newTextSpec);

      textSpecMap.set(name, dbTextSpec);

      // creating default text spec value for the newly created text spec
      const defaultTextSpecValue = new ProductTextSpecsValues();
      defaultTextSpecValue.textSpec = dbTextSpec;
      defaultTextSpecValue.value_type = TextSpecValueTypes.D;
      defaultTextSpecValue.value = "Default Value";
      const dbDefaultTextSpecValue = await textSpecValueRepo.save(
        defaultTextSpecValue
      );

      defaultTextSpecValueMap.set(name, dbDefaultTextSpecValue);

      return {
        textSpec: dbTextSpec,
        defaultTextSpecValue: dbDefaultTextSpecValue,
      };
    }
  } catch (error) {
    console.log(
      "error on get or create text spec with default value is: ",
      error
    );
    throw error;
  }
}

async function getOrCreateUnit(name: string) {
  try {
    if (unitMap.has(name)) {
      return unitMap.get(name);
    }

    const unit = await unitRepo.findOne({
      where: {
        name,
      },
    });

    if (unit) {
      unitMap.set(name, unit);
      return unit;
    } else {
      const newUnit = new ProductUnits();
      newUnit.name = name;
      const dbUnit = await unitRepo.save(newUnit);
      unitMap.set(name, dbUnit);
      return dbUnit;
    }
  } catch (error) {
    console.log("err on create unit spec is: ", error);
    throw error;
  }
}

export async function getOrCreateIntSpec({
  name,
  unit,
}: {
  name: string;
  unit?: string;
}) {
  try {
    if (intSpecMap.has(name)) {
      return intSpecMap.get(name);
    }

    const intSpec = await intSpecRepo.findOne({
      where: {
        name,
      },
    });

    if (intSpec) {
      intSpecMap.set(name, intSpec);
      return intSpec;
    } else {
      let dbUnit: ProductUnits;
      unit && (dbUnit = await getOrCreateUnit(unit));
      const newIntSpec = new ProductIntSpecs();
      newIntSpec.name = name;
      unit && dbUnit && (newIntSpec.unit = dbUnit);
      const dbIntSpec = await intSpecRepo.save(newIntSpec);
      intSpecMap.set(name, dbIntSpec);
      return dbIntSpec;
    }
  } catch (error) {
    console.log("err on create create int spec is: ", error);
    throw error;
  }
}

export async function getOrCreateDecSpec({
  name,
  unit,
}: {
  name: string;
  unit?: string;
}) {
  try {
    if (decSpecMap.has(name)) {
      return decSpecMap.get(name);
    }

    const decSpec = await decSpecRepo.findOne({
      where: {
        name,
      },
    });

    if (decSpec) {
      decSpecMap.set(name, decSpec);
      return decSpec;
    } else {
      let dbUnit: ProductUnits;
      unit && (dbUnit = await getOrCreateUnit(unit));
      const newDecSpec = new ProductDecimalSpecs();
      newDecSpec.name = name;
      unit && dbUnit && (newDecSpec.unit = dbUnit);
      const dbDecSpec = await decSpecRepo.save(newDecSpec);
      decSpecMap.set(name, dbDecSpec);
      return dbDecSpec;
    }
  } catch (error) {
    console.log("err on create create dec spec is: ", error);
    throw error;
  }
}

export async function getOrCreateFeature(name: string) {
  try {
    if (featureMap.has(name)) {
      return featureMap.get(name);
    }

    const feature = await featureRepo.findOne({
      where: {
        name,
      },
    });

    if (feature) {
      featureMap.set(name, feature);
      return feature;
    } else {
      const newFeature = new ProductFeatures();
      newFeature.name = name;
      const dbFeature = await featureRepo.save(newFeature);
      featureMap.set(name, dbFeature);
      return dbFeature;
    }
  } catch (error) {
    console.log("err on create create feature is: ", error);
    throw error;
  }
}

export async function getAllTextSpecWithValues() {
  try {
    const textSpecWithValues = await textSpecRepo.find({
      relations: {
        values: true,
      },
      where: {
        values: {
          value_type: TextSpecValueTypes.N,
        },
      },
    });
    fs.writeFileSync(
      "textSpecWithValues.json",
      JSON.stringify(textSpecWithValues),
      "utf-8"
    );
  } catch (error) {
    throw error;
  }
}

export async function getVehicleTypeTextSpecValues(vehicleTypeId: string) {
  try {
    const textSpecValues = await yearTextSpecValuesRepo.find({
      where: {
        value_type: YearValuesType.ND,
        variantYear: {
          subType: {
            productType: {
              product_type_id: vehicleTypeId,
            },
          },
        },
      },
      relations: {
        value: {
          textSpec: true,
        },
      },
    });

    let textSpecsSet = new Set<string>();

    textSpecValues.forEach((value) => {
      const textSpecId = value?.value?.textSpec?.product_text_spec_id;

      if (textSpecId) {
        const isTextSpecPresent = textSpecsSet.has(textSpecId);
        if (!isTextSpecPresent) {
          textSpecsSet.add(textSpecId);
        }
      }
    });

    const textSpecs = Array.from(textSpecsSet);

    const textSpecsWithValues = await textSpecRepo.find({
      relations: {
        values: true,
      },
      where: {
        product_text_spec_id: In(textSpecs),
        values: {
          value_type: TextSpecValueTypes.N,
        },
      },
    });

    fs.writeFileSync(
      "textSpecWithValues.json",
      JSON.stringify(textSpecsWithValues),
      "utf-8"
    );
  } catch (error) {
    throw error;
  }
}
