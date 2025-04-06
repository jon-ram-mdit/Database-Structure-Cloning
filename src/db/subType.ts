import { inspect } from "util";
import { AppDataSource, subTypeLocalMap } from "..";
import { IPropCatWithProp } from "../modules/products/entities/end-product/BikeDekhoPreBulkUploadStore";
import { VariantsYears } from "../modules/products/entities/end-product/year";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";
import { OuterDecimalSpecs } from "../modules/products/entities/sub-type/outer-specs/outerDecimalSpecs";
import { OuterIntSpecs } from "../modules/products/entities/sub-type/outer-specs/outerIntSpecs";
import { OuterTextSpecs } from "../modules/products/entities/sub-type/outer-specs/outerTextSpecs";
import { SubTypesPropCatDecimalSpecs } from "../modules/products/entities/sub-type/property-category/propCatDecimalSpecs";
import { SubTypesPropCatFeatures } from "../modules/products/entities/sub-type/property-category/propCatFeatures";
import { SubTypesPropCatIntSpecs } from "../modules/products/entities/sub-type/property-category/propCatIntSpecs";
import { SubTypesPropCatTextSpecs } from "../modules/products/entities/sub-type/property-category/propCatTextSpecs";
import {
  SubTypesPropCat,
  propertyType,
} from "../modules/products/entities/sub-type/property-category/subTypePropCat";
import {
  ProductSubTypes,
  SubTypeTypes,
} from "../modules/products/entities/sub-type/subType";
import { getOrCreatePropCat } from "./propCat";

// import { redis } from "..";

const subTypeRepo = AppDataSource.getRepository(ProductSubTypes);
const subTypePropCatRepo = AppDataSource.getRepository(SubTypesPropCat);

// async function storeSubTypeToRedis(hash: string, subType: ProductSubTypes) {
//   try {
//     const jsonSubType = JSON.stringify(subType);
//     await redis.set(hash, jsonSubType);
//   } catch (error) {
//     throw error;
//   }
// }

async function addPropCatToSubType(catName: string) {
  try {
    const propCat = await getOrCreatePropCat(catName);
    const newSubTypePropCat = new SubTypesPropCat();
    newSubTypePropCat.propCat = propCat;
    newSubTypePropCat.type = propertyType.D;
    return await subTypePropCatRepo.save(newSubTypePropCat);
  } catch (err) {
    console.log("err on add prop cat to sub type: ", err);
    throw err;
  }
}

export interface ILocalSubTypeValue {
  product_sub_type_id: string;
  subType: ProductSubTypes;
  subTypePropCatLookUp: Map<string, SubTypesPropCat>;
  propCatIntSpecLookUp: Map<string, SubTypesPropCatIntSpecs>;
  propCatDecSpecLookUp: Map<string, SubTypesPropCatDecimalSpecs>;
  propCatTextSpecLookUp: Map<string, SubTypesPropCatTextSpecs>;
  propCatFeatureLookUp: Map<string, SubTypesPropCatFeatures>;
  subTypeKeyDecSpecLookUp: Set<string>;
  subTypeKeyIntSpecLookUp: Set<string>;
  subTypeKeyTextSpecLookUp: Set<string>;
  subTypeKeyFeatureLookUp: Set<string>;
  subTypeOuterIntSpecLookUp: Map<string, OuterIntSpecs>;
  subTypeOuterDecSpecLookUp: Map<string, OuterDecimalSpecs>;
  subTypeOuterTextSpecLookUp: Map<string, OuterTextSpecs>;
  insertedProperties: Set<String>;
  years: VariantsYears[];
}

function assignNewObjectToLocalSubTypeMap(subType: ProductSubTypes) {
  let newObj = {
    product_sub_type_id: subType.product_sub_type_id,
    subType,
    subTypePropCatLookUp: new Map<string, SubTypesPropCat>(),
    propCatIntSpecLookUp: new Map<string, SubTypesPropCatIntSpecs>(),
    propCatDecSpecLookUp: new Map<string, SubTypesPropCatDecimalSpecs>(),
    propCatTextSpecLookUp: new Map<string, SubTypesPropCatTextSpecs>(),
    propCatFeatureLookUp: new Map<string, SubTypesPropCatFeatures>(),
    subTypeOuterIntSpecLookUp: new Map<string, OuterIntSpecs>(),
    subTypeOuterDecSpecLookUp: new Map<string, OuterDecimalSpecs>(),
    subTypeOuterTextSpecLookUp: new Map<string, OuterTextSpecs>(),
    subTypeKeyDecSpecLookUp: new Set<string>(),
    subTypeKeyIntSpecLookUp: new Set<string>(),
    subTypeKeyTextSpecLookUp: new Set<string>(),
    subTypeKeyFeatureLookUp: new Set<string>(),
    insertedProperties: new Set<string>(),
    years: [],
  };

  subType?.propCat?.forEach((subTypePropCat) => {
    const propCatName = subTypePropCat?.propCat?.name;

    if (propCatName) {
      newObj.subTypePropCatLookUp.set(propCatName, subTypePropCat);

      subTypePropCat?.propCatIntSpecs?.forEach((propCatIntSpec) => {
        const intSpecName = propCatIntSpec?.intSpec?.name;

        intSpecName &&
          newObj.propCatIntSpecLookUp.set(
            propCatName + ":" + intSpecName,
            propCatIntSpec
          );
      });

      subTypePropCat?.propCatDecimalSpecs?.forEach((propCatDecSpec) => {
        const decSpecName = propCatDecSpec?.decimalSpec.name;

        decSpecName &&
          newObj.propCatDecSpecLookUp.set(
            propCatName + ":" + decSpecName,
            propCatDecSpec
          );
      });

      subTypePropCat?.propCatTextSpecs?.forEach((propCatTextSpec) => {
        const textSpecName = propCatTextSpec?.textSpec.name;

        textSpecName &&
          newObj.propCatTextSpecLookUp.set(
            propCatName + ":" + textSpecName,
            propCatTextSpec
          );
      });

      subTypePropCat?.propCatFeatures?.forEach((propCatFeature) => {
        const featureName = propCatFeature?.feature?.name;

        featureName &&
          newObj.propCatFeatureLookUp.set(
            propCatName + ":" + featureName,
            propCatFeature
          );
      });
    }
  });

  subType?.keyDecSpecs?.forEach((keyDecSpec) => {
    const decSpecName = keyDecSpec?.decimalSpec?.name;
    decSpecName && newObj.subTypeKeyDecSpecLookUp.add(decSpecName);
  });

  subType?.keyIntSpecs?.forEach((keyIntSpec) => {
    const intSpecName = keyIntSpec?.intSpec?.name;
    intSpecName && newObj.subTypeKeyIntSpecLookUp.add(intSpecName);
  });

  subType?.keyTextSpecs?.forEach((keyTextSpec) => {
    const textSpecName = keyTextSpec?.textSpec?.name;
    textSpecName && newObj.subTypeKeyTextSpecLookUp.add(textSpecName);
  });

  subType?.keyFeatures?.forEach((keyFeature) => {
    const featureName = keyFeature?.feature?.name;
    featureName && newObj.subTypeKeyFeatureLookUp.add(featureName);
  });

  subType?.outerIntSpecs?.forEach((outerIntSpec) => {
    const intSpecName = outerIntSpec?.intSpec?.name;
    intSpecName &&
      newObj.subTypeOuterIntSpecLookUp.set(intSpecName, outerIntSpec);
  });

  subType?.outerDecSpecs?.forEach((outerDecSpec) => {
    const decSpecName = outerDecSpec?.decimalSpec?.name;
    decSpecName &&
      newObj.subTypeOuterDecSpecLookUp.set(decSpecName, outerDecSpec);
  });

  subType?.outerTextSpecs?.forEach((outerTextSpec, outerTextSpecIndex) => {
    const textSpecName = outerTextSpec?.textSpec?.name;
    textSpecName &&
      newObj.subTypeOuterTextSpecLookUp.set(textSpecName, outerTextSpec);
  });

  return newObj;
}

export async function getOrCreateSubType(
  propCatHash: string,
  vehicleType: ProductTypes,
  propCatWithProp: IPropCatWithProp[]
) {
  try {
    // const cachedJsonSubType = await redis.get(propCatHash);
    // console.log("cached json sub type is: ", cachedJsonSubType);
    // if (cachedJsonSubType !== null) {
    //   return JSON.parse(cachedJsonSubType);
    // }

    const localCacheSubTypeMap = subTypeLocalMap.get(propCatHash);

    if (localCacheSubTypeMap) {
      return localCacheSubTypeMap;
    } else {
      const subTypeWithAllProps = await subTypeRepo.findOne({
        where: {
          propCatHash,
          productType: {
            product_type_id: vehicleType.product_type_id,
          },
        },
        relations: {
          propCat: {
            propCat: true,
            propCatIntSpecs: {
              intSpec: true,
            },
            propCatDecimalSpecs: {
              decimalSpec: true,
            },
            propCatTextSpecs: {
              textSpec: true,
            },
            propCatFeatures: {
              feature: true,
            },
          },
          keyDecSpecs: {
            decimalSpec: true,
          },
          keyIntSpecs: {
            intSpec: true,
          },
          keyTextSpecs: {
            textSpec: true,
          },
          keyFeatures: {
            feature: true,
          },
          outerDecSpecs: {
            decimalSpec: true,
          },
          outerIntSpecs: {
            intSpec: true,
          },
          outerTextSpecs: {
            textSpec: true,
          },
        },
      });

      if (subTypeWithAllProps) {
        const newSubTypeLocalValue =
          assignNewObjectToLocalSubTypeMap(subTypeWithAllProps);
        subTypeLocalMap.set(propCatHash, newSubTypeLocalValue);

        return newSubTypeLocalValue;
      } else {
        const subTypeNo = subTypeLocalMap.size + 1;
        console.log(
          `Creating Sub Type: ${vehicleType.product_type_name} Sub Type ${subTypeNo}:  Sub Type with ${propCatWithProp.length} Categories`
        );
        const newSubType = new ProductSubTypes();
        newSubType.productType = vehicleType;
        newSubType.name = `${vehicleType.product_type_name} Sub Type ${subTypeNo}:  Sub Type with ${propCatWithProp.length} Categories`;
        newSubType.type = SubTypeTypes.NB;
        newSubType.propCatHash = propCatHash;
        const dbSubType = await subTypeRepo.save(newSubType);

        // as we are checking that whether a sub type with certain hash is present or not
        // so if hash is not present on the sub type we will first create the sub type then
        // adding categories to it
        const addedSubTypePropCat = await Promise.all(
          propCatWithProp.map(async (propCat) => {
            return await addPropCatToSubType(propCat.propertyCategory);
          })
        );

        dbSubType.propCat = addedSubTypePropCat;
        const dbSubTypeWithPropCat = await subTypeRepo.save(dbSubType);
        // await storeSubTypeToRedis(propCatHash, dbSubTypeWithPropCat);
        const newSubTypeLocalValue =
          assignNewObjectToLocalSubTypeMap(dbSubTypeWithPropCat);
        subTypeLocalMap.set(propCatHash, newSubTypeLocalValue);
        return newSubTypeLocalValue;
      }
    }
  } catch (error) {
    console.log("err on get or create sub type: ", error);
    throw error;
  }
}

export async function getAllSubTypes() {
  try {
    const allSubTypes = await subTypeRepo.find({
      where: {
        productType: {
          product_type_id: "c950a14a-571c-4508-8316-955ddc3e728e",
        },
      },
      relations: {
        // propCat: {
        //   propCat: true,
        //   propCatIntSpecs: {
        //     intSpec: {
        //       unit: true,
        //     },
        //   },
        //   propCatDecimalSpecs: {
        //     decimalSpec: {
        //       unit: true,
        //     }
        //   },
        //   propCatTextSpecs: {
        //     textSpec: true,
        //   },
        //   propCatFeatures: {
        //     feature: true,
        //   },
        // },
        keyDecSpecs: {
          decimalSpec: true,
        },
        keyIntSpecs: {
          intSpec: true,
        },
        keyTextSpecs: {
          textSpec: true,
        },
        keyFeatures: {
          feature: true,
        },
        outerDecSpecs: {
          decimalSpec: true,
        },
        outerIntSpecs: {
          intSpec: true,
        },
        outerTextSpecs: {
          textSpec: true,
        },
      },
    });

    console.log(inspect(allSubTypes, { depth: Infinity }));
  } catch (error) {
    throw error;
  }
}

export async function getSubTypeForYearParse(subTypeId: string) {
  try {
    return await subTypeRepo.findOne({
      where: {
        product_sub_type_id: subTypeId,
      },
      relations: {
        productType: {
          homeProperties: {
            homeProperty: true,
          },
        },
        outerDecSpecs: {
          decimalSpec: true,
        },
        outerIntSpecs: {
          intSpec: true,
        },
        outerTextSpecs: {
          textSpec: true,
        },
        keyDecSpecs: {
          decimalSpec: true,
        },
        keyIntSpecs: {
          intSpec: true,
        },
        keyTextSpecs: {
          textSpec: true,
        },
        keyFeatures: {
          feature: true,
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
