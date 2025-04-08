import { getOrCreateSubType } from "./subType";
import { AppDataSource } from "../config/database";
import {
  getDefaultTextSpecValueByName,
  getOrCreateDecSpec,
  getOrCreateFeature,
  getOrCreateIntSpec,
  getOrCreateTextSpecValue,
  getOrCreateTextSpecWithDefaultValue,
} from "./prop";
import {
  createYearDecimalSpecValue,
  createYearFeatureValue,
  createYearIntSpecValue,
  createYearOuterDecimalSpecValue,
  createYearOuterIntSpecValue,
  createYearOuterTextSpecValue,
  createYearTextSpecValue,
} from "./yearValue";
import {
  createSubTypePropCatDecimalSpec,
  createSubTypePropCatFeature,
  createSubTypePropCatIntSpec,
  createSubTypePropCatTextSpec,
} from "./subTypePropCatProp";
import { getAllYearsUsingSubType, getOrCreateLatestYear } from "./year";
import {
  addDefaultDecimalSpecValueToYears,
  addDefaultFeatureValueToYears,
  addDefaultIntSpecValueToYears,
  addDefaultOuterDecimalSpecValueToYears,
  addDefaultOuterIntSpecValueToYears,
  addDefaultOuterTextSpecValueToYears,
  addDefaultTextSpecValueToYears,
} from "./yearBulkDefaultValues";
import {
  createSubTypeOuterDecimalSpec,
  createSubTypeOuterIntSpec,
  createSubTypeOuterTextSpec,
} from "./outerIntSpecs";
import {
  createKeyDecimalSpec,
  createKeyFeature,
  createKeyIntSpec,
  createKeyTextSpec,
} from "./keyProps";
import { insertBulkYearColors } from "./yearColors";
import { updateVariantDesc } from "./variants";
import * as crypto from "crypto";
import { insertBulkYearImages } from "./yearImages";
import { ModelsVariants } from "../modules/products/entities/end-product/variants";
import { IPropCatWithProp } from "../modules/products/entities/end-product/BikeDekhoPreBulkUploadStore";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

export async function promiseAllSetteled(promises: Promise<any>[]) {
  try {
    const promiseResults = await Promise.allSettled(promises);
    const failedPromise = promiseResults.find(
      (promiseResult) => promiseResult.status === "rejected"
    );

    if (failedPromise) {
      throw new Error("Error During Promise All Setteled: "+failedPromise.reason );
    }
  } catch (error) {
    throw error;
  }
}

export async function createVariantYearValues(
  dbVariant: ModelsVariants,
  vehicleType: ProductTypes,
  scrappedVariant: {
    price: number;
    desc: string;
    propCatWithProp: IPropCatWithProp[];
    imageUrl: string;
  },
  parsedSubType: {
    propCatHashInput: string;
    subTypeKeySpecs: string[];
    subTypeOuterSpecs: string[];
    subTypeKeyFeatures: string[];
  },
  yearColors: {
    name: string;
    color1: string;
    color2?: string;
    url: string;
  }[],
  yearImages?: {
    category: string;
    images: {
      url: string;
      caption: string;
    }[];
  }[]
) {
  try {
    // creating map of scrapped sub type for quick lookup
    const scrappedKeySpecsLookUp = new Set(parsedSubType.subTypeKeySpecs);
    const scrappedKeyFeaturesLookUp = new Set(parsedSubType.subTypeKeyFeatures);
    const scrappedOuterSpecsLookUp = new Set(parsedSubType.subTypeOuterSpecs);

    const md5Hash = crypto
      .createHash("md5")
      .update(parsedSubType.propCatHashInput.split("").sort().join(""))
      .digest("hex");

    const localSubType = await getOrCreateSubType(
      md5Hash,
      vehicleType,
      scrappedVariant.propCatWithProp
    );

    // after finding / creating the sub type we find all those
    // years which uses the same sub type we find it just before
    // creating the new year and linking it to the subtype
    const yearsUsingSameSubType = structuredClone(
      await getAllYearsUsingSubType({
        subTypeId: localSubType.product_sub_type_id,
        propCatHash: md5Hash,
      })
    );

    // creating maps of db subtype for quick lookup

    const subTypePropCatLookUp = localSubType.subTypePropCatLookUp;

    const propCatIntSpecLookUp = localSubType.propCatIntSpecLookUp;
    const propCatDecSpecLookUp = localSubType.propCatDecSpecLookUp;
    const propCatTextSpecLookUp = localSubType.propCatTextSpecLookUp;
    const propCatFeatureLookUp = localSubType.propCatFeatureLookUp;

    const copyPropCatIntSpecLookUp = structuredClone(
      localSubType.propCatIntSpecLookUp
    );
    const copyPropCatDecSpecLookUp = structuredClone(
      localSubType.propCatDecSpecLookUp
    );
    const copyPropCatTextSpecLookUp = structuredClone(
      localSubType.propCatTextSpecLookUp
    );
    const copyPropCatFeatureLookUp = structuredClone(
      localSubType.propCatFeatureLookUp
    );

    const subTypeKeyDecSpecLookUp = localSubType.subTypeKeyDecSpecLookUp;

    const subTypeKeyIntSpecLookUp = localSubType.subTypeKeyIntSpecLookUp;

    const subTypeKeyTextSpecLookUp = localSubType.subTypeKeyTextSpecLookUp;

    const subTypeKeyFeatureLookUp = localSubType.subTypeKeyFeatureLookUp;

    const subTypeOuterIntSpecLookUp = localSubType.subTypeOuterIntSpecLookUp;

    const subTypeOuterDecSpecLookUp = localSubType.subTypeOuterDecSpecLookUp;

    const subTypeOuterTextSpecLookUp = localSubType.subTypeOuterTextSpecLookUp;

    const copySubTypeOuterIntSpecLookUp = structuredClone(
      localSubType.subTypeOuterIntSpecLookUp
    );

    const copySubTypeOuterDecSpecLookUp = structuredClone(
      localSubType.subTypeOuterDecSpecLookUp
    );

    const copySubTypeOuterTextSpecLookUp = structuredClone(
      localSubType.subTypeOuterTextSpecLookUp
    );

    const yearWithValues = await getOrCreateLatestYear(
      dbVariant,
      localSubType.subType,
      scrappedVariant.price,
      scrappedVariant.imageUrl
    );

    localSubType.years.push(yearWithValues);
    // creating set look up for year values and outer spec values
    const yearIntSpecValuesLookUp = new Set<string>();

    yearWithValues?.yearIntSpecValues?.forEach((yearIntSpecValue) => {
      const intSpecName = yearIntSpecValue?.propCatIntSpec?.intSpec?.name;
      intSpecName && yearIntSpecValuesLookUp.add(intSpecName);
    });

    const yearDecSpecValuesLookUp = new Set<string>();

    yearWithValues?.yearDecimalSpecValues?.forEach((yearDecSpecValue) => {
      const decSpecName =
        yearDecSpecValue?.propCatDecimalSpec?.decimalSpec?.name;
      decSpecName && yearDecSpecValuesLookUp.add(decSpecName);
    });

    const yearTextSpecValuesLookUp = new Set<string>();

    yearWithValues?.yearTextSpecValues?.forEach((yearTextSpecValue) => {
      const textSpecName = yearTextSpecValue?.propCatTextSpec?.textSpec?.name;
      textSpecName && yearTextSpecValuesLookUp.add(textSpecName);
    });

    const yearFeatureValuesLookUp = new Set<string>();

    yearWithValues?.yearFeaturesValues?.forEach((yearFeatureValue) => {
      const featureName = yearFeatureValue?.propCatFeature?.feature?.name;
      featureName && yearFeatureValuesLookUp.add(featureName);
    });

    // year outer spec values lookup
    const yearOuterDecSpecValuesLookUp = new Set<string>();

    yearWithValues?.yearOuterDecimalSpecValues?.forEach(
      (yearOuterDecSpecValue) => {
        const decSpecName =
          yearOuterDecSpecValue?.outerDecSpec?.decimalSpec?.name;
        decSpecName && yearOuterDecSpecValuesLookUp.add(decSpecName);
      }
    );

    const yearOuterIntSpecValuesLookUp = new Set<string>();

    yearWithValues?.yearOuterIntSpecValues?.forEach((yearOuterIntSpecValue) => {
      const intSpecName = yearOuterIntSpecValue?.outerIntSpec?.intSpec?.name;
      intSpecName && yearOuterIntSpecValuesLookUp.add(intSpecName);
    });

    const yearOuterTextSpecValuesLookUp = new Set<string>();

    yearWithValues?.yearOuterTextSpecValues?.forEach(
      (yearOuterTextSpecValue) => {
        const textSpecName =
          yearOuterTextSpecValue?.outerTextSpec?.textSpec?.name;
        textSpecName && yearOuterTextSpecValuesLookUp.add(textSpecName);
      }
    );

    const queryRunner = AppDataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();

      let allPromises: Promise<any>[] = [];

      for (let propCatWithProp of scrappedVariant?.propCatWithProp) {
        const propCatName = propCatWithProp?.propertyCategory;
        const subTypePropCat = subTypePropCatLookUp.get(propCatName);

        for (let textSpecWithValue of propCatWithProp?.textSpecs) {
          const textSpecName = textSpecWithValue.name;
          const { textSpec, defaultTextSpecValue } =
            await getOrCreateTextSpecWithDefaultValue(textSpecName);

          const textSpecValue = await getOrCreateTextSpecValue(
            textSpec,
            textSpecWithValue.value as string
          );

          const existingYearTextSpecValue =
            yearTextSpecValuesLookUp.has(textSpecName);

          if (!existingYearTextSpecValue) {
            const propCatTextSpecKey = propCatName + ":" + textSpecName;

            const existingSubTypePropCatTextSpec =
              propCatTextSpecLookUp.get(propCatTextSpecKey);

            if (existingSubTypePropCatTextSpec) {
              allPromises.push(
                createYearTextSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  propCatTextSpec: existingSubTypePropCatTextSpec,
                  textSpecValue,
                  defaultValue: false,
                })
              );

              // removing form sub type prop cat text spec map lookup that
              // we have inserted the consisting property
              copyPropCatTextSpecLookUp.delete(propCatTextSpecKey);
            } else {
              const newSubTypePropCatTextSpec =
                await createSubTypePropCatTextSpec(subTypePropCat, textSpec);

              // inserting the actual value in the current year
              allPromises.push(
                createYearTextSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  propCatTextSpec: newSubTypePropCatTextSpec,
                  textSpecValue,
                  defaultValue: false,
                })
              );

              // inserting default values in other years which used the same subtype
              allPromises.push(
                ...addDefaultTextSpecValueToYears({
                  queryRunner,
                  years: yearsUsingSameSubType,
                  propCatTextSpec: newSubTypePropCatTextSpec,
                  defaultTextSpecValue,
                })
              );

              propCatTextSpecLookUp.set(
                propCatTextSpecKey,
                newSubTypePropCatTextSpec
              );
            }
          }

          // for outer spec values
          const isPropOuterSpec = scrappedOuterSpecsLookUp.has(textSpecName);

          const existingYearOuterTextSpecValue =
            yearOuterTextSpecValuesLookUp.has(textSpecName);

          if (isPropOuterSpec && !existingYearOuterTextSpecValue) {
            const existingSubTypeOuterTextSpec =
              subTypeOuterTextSpecLookUp.get(textSpecName);

            if (existingSubTypeOuterTextSpec) {
              allPromises.push(
                createYearOuterTextSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  outerTextSpec: existingSubTypeOuterTextSpec,
                  textSpecValue,
                  defaultValue: false,
                })
              );

              // removing form sub type prop cat text spec map lookup that
              // we have inserted the consisting property
              copySubTypeOuterTextSpecLookUp.delete(textSpecName);
            } else {
              // first inserting the text spec in the subtype
              const newSubTypeOuterTextSpec = await createSubTypeOuterTextSpec(
                localSubType.subType,
                textSpec
              );

              // inserting the actual outer spec value in the current year
              allPromises.push(
                createYearOuterTextSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  outerTextSpec: newSubTypeOuterTextSpec,
                  textSpecValue,
                  defaultValue: false,
                })
              );

              // inserting default outer text spec values in other years which used the same subtype
              allPromises.push(
                ...addDefaultOuterTextSpecValueToYears({
                  queryRunner,
                  years: yearsUsingSameSubType,
                  outerTextSpec: newSubTypeOuterTextSpec,
                  defaultTextSpecValue,
                })
              );

              subTypeOuterTextSpecLookUp.set(
                textSpecName,
                newSubTypeOuterTextSpec
              );
            }
          }

          const isPropKeySpec = scrappedKeySpecsLookUp.has(textSpecName);
          const existingSubTypeKeyTextSpec =
            subTypeKeyTextSpecLookUp.has(textSpecName);

          if (isPropKeySpec && !existingSubTypeKeyTextSpec) {
            // adding key text spec to the subtype
            await createKeyTextSpec(localSubType.subType, textSpec);
            subTypeKeyTextSpecLookUp.add(textSpecName);
          }
        }

        for (let intSpecWithValue of propCatWithProp?.intSpecs) {
          const intSpecName = intSpecWithValue.name;
          const intSpecValue = intSpecWithValue.value as number;

          const intSpec = await getOrCreateIntSpec({
            name: intSpecName,
            unit: intSpecWithValue?.unit,
          });

          const existingYearIntSpecValue =
            yearIntSpecValuesLookUp.has(intSpecName);

          if (!existingYearIntSpecValue) {
            const propCatIntSpecKey = propCatName + ":" + intSpecName;

            const existingSubTypePropCatIntSpec =
              propCatIntSpecLookUp.get(propCatIntSpecKey);

            if (existingSubTypePropCatIntSpec) {
              allPromises.push(
                createYearIntSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  propCatIntSpec: existingSubTypePropCatIntSpec,
                  intSpecValue,
                  defaultValue: false,
                })
              );

              // removing form sub type prop cat Int spec map lookup that
              // we have inserted the consisting property
              copyPropCatIntSpecLookUp.delete(propCatIntSpecKey);
            } else {
              const newSubTypePropCatIntSpec =
                await createSubTypePropCatIntSpec(subTypePropCat, intSpec);

              // inserting the actual value in the current year
              allPromises.push(
                createYearIntSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  propCatIntSpec: newSubTypePropCatIntSpec,
                  intSpecValue,
                  defaultValue: false,
                })
              );

              // inserting default values in other years which used the same subtype
              allPromises.push(
                ...addDefaultIntSpecValueToYears({
                  queryRunner,
                  years: yearsUsingSameSubType,
                  propCatIntSpec: newSubTypePropCatIntSpec,
                })
              );

              propCatIntSpecLookUp.set(
                propCatIntSpecKey,
                newSubTypePropCatIntSpec
              );
            }
          }

          // for outer spec values
          const isPropOuterSpec = scrappedOuterSpecsLookUp.has(intSpecName);

          const existingYearOuterIntSpecValue =
            yearOuterIntSpecValuesLookUp.has(intSpecName);

          if (isPropOuterSpec && !existingYearOuterIntSpecValue) {
            const existingSubTypeOuterIntSpec =
              subTypeOuterIntSpecLookUp.get(intSpecName);

            if (existingSubTypeOuterIntSpec) {
              allPromises.push(
                createYearOuterIntSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  outerIntSpec: existingSubTypeOuterIntSpec,
                  intSpecValue,
                  defaultValue: false,
                })
              );

              // removing form sub type prop cat Int spec map lookup that
              // we have inserted the consisting property
              copySubTypeOuterIntSpecLookUp.delete(intSpecName);
            } else {
              // first inserting the Int spec in the subtype
              const newSubTypeOuterIntSpec = await createSubTypeOuterIntSpec(
                localSubType.subType,
                intSpec
              );

              // inserting the actual outer spec value in the current year
              allPromises.push(
                createYearOuterIntSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  outerIntSpec: newSubTypeOuterIntSpec,
                  intSpecValue,
                  defaultValue: false,
                })
              );

              // inserting default outer Int spec values in other years which used the same subtype
              allPromises.push(
                ...addDefaultOuterIntSpecValueToYears({
                  queryRunner,
                  years: yearsUsingSameSubType,
                  outerIntSpec: newSubTypeOuterIntSpec,
                })
              );

              subTypeOuterIntSpecLookUp.set(
                intSpecName,
                newSubTypeOuterIntSpec
              );
            }
          }

          const isPropKeySpec = scrappedKeySpecsLookUp.has(intSpecName);
          const existingSubTypeKeyIntSpec =
            subTypeKeyIntSpecLookUp.has(intSpecName);

          if (isPropKeySpec && !existingSubTypeKeyIntSpec) {
            // adding key Int spec to the subtype
            await createKeyIntSpec(localSubType.subType, intSpec);
            subTypeKeyIntSpecLookUp.add(intSpecName);
          }
        }

        for (let decimalSpecWithValue of propCatWithProp?.decSpecs) {
          const decimalSpecName = decimalSpecWithValue.name;
          const decimalSpecValue = decimalSpecWithValue.value as number;

          const decimalSpec = await getOrCreateDecSpec({
            name: decimalSpecName,
            unit: decimalSpecWithValue?.unit,
          });

          const existingYearDecimalSpecValue =
            yearDecSpecValuesLookUp.has(decimalSpecName);

          if (!existingYearDecimalSpecValue) {
            const propCatDecimalSpecKey = propCatName + ":" + decimalSpecName;

            const existingSubTypePropCatDecimalSpec = propCatDecSpecLookUp.get(
              propCatDecimalSpecKey
            );

            if (existingSubTypePropCatDecimalSpec) {
              allPromises.push(
                createYearDecimalSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  propCatDecimalSpec: existingSubTypePropCatDecimalSpec,
                  decimalSpecValue,
                  defaultValue: false,
                })
              );

              // removing form sub type prop cat Decimal spec map lookup that
              // we have inserted the consisting property
              copyPropCatDecSpecLookUp.delete(propCatDecimalSpecKey);
            } else {
              const newSubTypePropCatDecimalSpec =
                await createSubTypePropCatDecimalSpec(
                  subTypePropCat,
                  decimalSpec
                );

              // inserting the actual value in the current year
              allPromises.push(
                createYearDecimalSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  propCatDecimalSpec: newSubTypePropCatDecimalSpec,
                  decimalSpecValue,
                  defaultValue: false,
                })
              );

              // inserting default values in other years which used the same subtype
              allPromises.push(
                ...addDefaultDecimalSpecValueToYears({
                  queryRunner,
                  years: yearsUsingSameSubType,
                  propCatDecimalSpec: newSubTypePropCatDecimalSpec,
                })
              );

              propCatDecSpecLookUp.set(
                propCatDecimalSpecKey,
                newSubTypePropCatDecimalSpec
              );
            }
          }

          // for outer spec values
          const isPropOuterSpec = scrappedOuterSpecsLookUp.has(decimalSpecName);

          const existingYearOuterDecimalSpecValue =
            yearOuterDecSpecValuesLookUp.has(decimalSpecName);

          if (isPropOuterSpec && !existingYearOuterDecimalSpecValue) {
            const existingSubTypeOuterDecimalSpec =
              subTypeOuterDecSpecLookUp.get(decimalSpecName);

            if (existingSubTypeOuterDecimalSpec) {
              allPromises.push(
                createYearOuterDecimalSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  outerDecimalSpec: existingSubTypeOuterDecimalSpec,
                  decimalSpecValue,
                  defaultValue: false,
                })
              );

              // removing form sub type prop cat Decimal spec map lookup that
              // we have inserted the consisting property
              copySubTypeOuterDecSpecLookUp.delete(decimalSpecName);
            } else {
              // first inserting the Decimal spec in the subtype
              const newSubTypeOuterDecimalSpec =
                await createSubTypeOuterDecimalSpec(
                  localSubType.subType,
                  decimalSpec
                );

              // inserting the actual outer spec value in the current year
              allPromises.push(
                createYearOuterDecimalSpecValue({
                  queryRunner,
                  year: yearWithValues,
                  outerDecimalSpec: newSubTypeOuterDecimalSpec,
                  decimalSpecValue,
                  defaultValue: false,
                })
              );

              // inserting default outer Decimal spec values in other years which used the same subtype
              allPromises.push(
                ...addDefaultOuterDecimalSpecValueToYears({
                  queryRunner,
                  years: yearsUsingSameSubType,
                  outerDecimalSpec: newSubTypeOuterDecimalSpec,
                })
              );

              subTypeOuterDecSpecLookUp.set(
                decimalSpecName,
                newSubTypeOuterDecimalSpec
              );
            }
          }

          const isPropKeySpec = scrappedKeySpecsLookUp.has(decimalSpecName);
          const existingSubTypeKeyDecimalSpec =
            subTypeKeyDecSpecLookUp.has(decimalSpecName);

          if (isPropKeySpec && !existingSubTypeKeyDecimalSpec) {
            // adding key Decimal spec to the subtype
            await createKeyDecimalSpec(localSubType.subType, decimalSpec);
            subTypeKeyDecSpecLookUp.add(decimalSpecName);
          }
        }

        for (let featureWithValue of propCatWithProp?.features) {
          const featureName = featureWithValue.name;
          const featureValue = featureWithValue.value;

          const feature = await getOrCreateFeature(featureName);

          const existingYearFeatureValue =
            yearFeatureValuesLookUp.has(featureName);

          if (!existingYearFeatureValue) {
            const propCatFeatureKey = propCatName + ":" + featureName;

            const existingSubTypePropCatFeature =
              propCatFeatureLookUp.get(propCatFeatureKey);

            if (existingSubTypePropCatFeature) {
              allPromises.push(
                createYearFeatureValue({
                  queryRunner,
                  year: yearWithValues,
                  propCatFeature: existingSubTypePropCatFeature,
                  featureValue,
                  defaultValue: false,
                })
              );

              // removing form sub type prop cat feature map lookup that
              // we have inserted the consisting property
              copyPropCatFeatureLookUp.delete(propCatFeatureKey);
            } else {
              const newSubTypePropCatFeature =
                await createSubTypePropCatFeature(subTypePropCat, feature);

              // inserting the actual value in the current year
              allPromises.push(
                createYearFeatureValue({
                  queryRunner,
                  year: yearWithValues,
                  propCatFeature: newSubTypePropCatFeature,
                  featureValue,
                  defaultValue: false,
                })
              );

              // inserting default values in other years which used the same subtype
              allPromises.push(
                ...addDefaultFeatureValueToYears({
                  queryRunner,
                  years: yearsUsingSameSubType,
                  propCatFeature: newSubTypePropCatFeature,
                })
              );

              propCatFeatureLookUp.set(
                propCatFeatureKey,
                newSubTypePropCatFeature
              );
            }
          }

          const isPropKeyFeature = scrappedKeyFeaturesLookUp.has(featureName);
          const existingSubTypeKeyFeature =
            subTypeKeyFeatureLookUp.has(featureName);

          if (isPropKeyFeature && !existingSubTypeKeyFeature) {
            // adding key feature to the subtype
            await createKeyFeature(localSubType.subType, feature);
            subTypeKeyFeatureLookUp.add(featureName);
          }
        }
      }

      // now adding default values for those sub type properties which weren't inserted
      copyPropCatDecSpecLookUp.forEach((unAddedSubTypePropCatDecSpec) => {
        allPromises.push(
          createYearDecimalSpecValue({
            queryRunner,
            year: yearWithValues,
            propCatDecimalSpec: unAddedSubTypePropCatDecSpec,
            decimalSpecValue: 0.1,
            defaultValue: true,
          })
        );
      });

      copyPropCatIntSpecLookUp.forEach((unAddedSubTypePropCatIntSpec) => {
        allPromises.push(
          createYearIntSpecValue({
            queryRunner,
            year: yearWithValues,
            propCatIntSpec: unAddedSubTypePropCatIntSpec,
            intSpecValue: 0,
            defaultValue: true,
          })
        );
      });

      copyPropCatTextSpecLookUp.forEach(
        async (unAddedSubTypePropCatTextSpec) => {
          const unAddedTextSpecName =
            unAddedSubTypePropCatTextSpec?.textSpec?.name;

          if (unAddedTextSpecName) {
            const defaultTextSpecValue = await getDefaultTextSpecValueByName(
              unAddedTextSpecName
            );
            allPromises.push(
              createYearTextSpecValue({
                queryRunner,
                year: yearWithValues,
                propCatTextSpec: unAddedSubTypePropCatTextSpec,
                textSpecValue: defaultTextSpecValue,
                defaultValue: true,
              })
            );
          }
        }
      );

      copyPropCatFeatureLookUp.forEach((unAddedSubTypePropCatFeature) => {
        allPromises.push(
          createYearFeatureValue({
            queryRunner,
            year: yearWithValues,
            propCatFeature: unAddedSubTypePropCatFeature,
            featureValue: false,
            defaultValue: true,
          })
        );
      });

      // outer specs
      copySubTypeOuterDecSpecLookUp.forEach(
        (unAddedSubTypeOuterDecimalSpec) => {
          allPromises.push(
            createYearOuterDecimalSpecValue({
              queryRunner,
              year: yearWithValues,
              outerDecimalSpec: unAddedSubTypeOuterDecimalSpec,
              decimalSpecValue: 0.1,
              defaultValue: true,
            })
          );
        }
      );

      copySubTypeOuterIntSpecLookUp.forEach((unAddedSubTypeOuterIntSpec) => {
        allPromises.push(
          createYearOuterIntSpecValue({
            queryRunner,
            year: yearWithValues,
            outerIntSpec: unAddedSubTypeOuterIntSpec,
            intSpecValue: 0,
            defaultValue: true,
          })
        );
      });

      copySubTypeOuterTextSpecLookUp.forEach(
        async (unAddedSubTypeOuterTextSpec) => {
          const unAddedTextSpecName =
            unAddedSubTypeOuterTextSpec?.textSpec?.name;
          if (unAddedTextSpecName) {
            const defaultTextSpecValue = await getDefaultTextSpecValueByName(
              unAddedTextSpecName
            );

            allPromises.push(
              createYearOuterTextSpecValue({
                queryRunner,
                year: yearWithValues,
                outerTextSpec: unAddedSubTypeOuterTextSpec,
                textSpecValue: defaultTextSpecValue,
                defaultValue: true,
              })
            );
          }
        }
      );

      allPromises.push(updateVariantDesc(dbVariant, scrappedVariant.desc));

      if (yearColors && yearColors.length > 0) {
        allPromises.push(insertBulkYearColors(yearWithValues, yearColors));
      }

      if (yearImages && yearImages.length > 0) {
        allPromises.push(
          insertBulkYearImages(vehicleType, yearWithValues, yearImages)
        );
      }
      await promiseAllSetteled(allPromises);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  } catch (error) {
    console.log("error on year bulk values is; ", error.message);
    throw error;
  }
}
