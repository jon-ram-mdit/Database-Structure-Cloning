// import { ModelsVariants } from "../../modules/products/entities/end-product/variants";
// import { ProductTypes } from "../../modules/products/entities/productType/productTypes";
// import { IPropCatWithProp } from "../cardekho/variantDetail";
// import { getOrCreateSubType } from "./subType";
// import { AppDataSource } from "../config/database";
// import { SubTypesPropCat } from "../../modules/products/entities/sub-type/property-category/subTypePropCat";
// import { SubTypesPropCatIntSpecs } from "../../modules/products/entities/sub-type/property-category/propCatIntSpecs";
// import { SubTypesPropCatDecimalSpecs } from "../../modules/products/entities/sub-type/property-category/propCatDecimalSpecs";
// import { SubTypesPropCatTextSpecs } from "../../modules/products/entities/sub-type/property-category/propCatTextSpecs";
// import { SubTypesPropCatFeatures } from "../../modules/products/entities/sub-type/property-category/propCatFeatures";
// import { KeyIntSpecs } from "../../modules/products/entities/sub-type/key-specs/keyIntSpecs";
// import { KeyTextSpecs } from "../../modules/products/entities/sub-type/key-specs/keyTextSpecs";
// import { KeyDecimalSpecs } from "../../modules/products/entities/sub-type/key-specs/keyDecimalSpecs";
// import { KeyFeatures } from "../../modules/products/entities/sub-type/key-specs/keyFeatures";
// import { OuterIntSpecs } from "../../modules/products/entities/sub-type/outer-specs/outerIntSpecs";
// import { OuterDecimalSpecs } from "../../modules/products/entities/sub-type/outer-specs/outerDecimalSpecs";
// import { OuterTextSpecs } from "../../modules/products/entities/sub-type/outer-specs/outerTextSpecs";
// import {
//   getDefaultTextSpecValueByName,
//   getOrCreateDecSpec,
//   getOrCreateFeature,
//   getOrCreateIntSpec,
//   getOrCreateTextSpecValue,
//   getOrCreateTextSpecWithDefaultValue,
// } from "./prop";
// import {
//   createYearDecimalSpecValue,
//   createYearFeatureValue,
//   createYearIntSpecValue,
//   createYearOuterDecimalSpecValue,
//   createYearOuterIntSpecValue,
//   createYearOuterTextSpecValue,
//   createYearTextSpecValue,
// } from "./yearValue";
// import {
//   createSubTypePropCatDecimalSpec,
//   createSubTypePropCatFeature,
//   createSubTypePropCatIntSpec,
//   createSubTypePropCatTextSpec,
// } from "./subTypePropCatProp";
// import { getAllYearsUsingSubType, getOrCreateLatestYear } from "./year";
// import {
//   addDefaultDecimalSpecValueToYears,
//   addDefaultFeatureValueToYears,
//   addDefaultIntSpecValueToYears,
//   addDefaultOuterDecimalSpecValueToYears,
//   addDefaultOuterIntSpecValueToYears,
//   addDefaultOuterTextSpecValueToYears,
//   addDefaultTextSpecValueToYears,
// } from "./yearBulkDefaultValues";
// import {
//   createSubTypeOuterDecimalSpec,
//   createSubTypeOuterIntSpec,
//   createSubTypeOuterTextSpec,
// } from "./outerIntSpecs";
// import {
//   createKeyDecimalSpec,
//   createKeyFeature,
//   createKeyIntSpec,
//   createKeyTextSpec,
// } from "./keyProps";
// import { promiseAllSetteled } from "../../utils/promise";
// import { insertBulkYearColors } from "./yearColors";

// export async function createVariantYearValues(
//   dbVariant: ModelsVariants,
//   vehicleType: ProductTypes,
//   scrappedVariant: {
//     price: number;
//     desc: string;
//     propCatWithProp: IPropCatWithProp[];
//     imageUrl: string;
//   },
//   parsedSubType: {
//     propCatHashInput: string;
//     subTypeKeySpecs: string[];
//     subTypeOuterSpecs: string[];
//     subTypeKeyFeatures: string[];
//   },
//   yearColors: {
//     name: string;
//     color1: string;
//     color2?: string;
//     url: string;
//   }[]
// ) {
//   try {
//     console.log("creating variant year values called");
//     console.log("parsed sub type is: ", parsedSubType);
//     console.log("year is: ", scrappedVariant);

//     // creating map of scrapped sub type for quick lookup
//     const scrappedKeySpecsLookUp = new Set(parsedSubType.subTypeKeySpecs);
//     console.log("created scrapped key specs lookup");
//     const scrappedKeyFeaturesLookUp = new Set(parsedSubType.subTypeKeyFeatures);
//     console.log("created scrapped key features lookup");
//     const scrappedOuterSpecsLookUp = new Set(parsedSubType.subTypeOuterSpecs);
//     console.log("created scrapped outer spec lookup");

//     const localSubType = await getOrCreateSubType(
//       parsedSubType.propCatHashInput,
//       vehicleType,
//       scrappedVariant.propCatWithProp
//     );

//     console.log("sub type is: ", localSubType);

//     // after finding / creating the sub type we find all those
//     // years which uses the same sub type we find it just before
//     // creating the new year and linking it to the subtype
//     const yearsUsingSameSubType = await getAllYearsUsingSubType(
//       localSubType.product_sub_type_id
//     );

//     // creating maps of db subtype for quick lookup

//     const subTypePropCatLookUp = localSubType.subTypePropCatLookUp;

//     const propCatIntSpecLookUp = localSubType.propCatIntSpecLookUp;
//     const propCatDecSpecLookUp = localSubType.propCatDecSpecLookUp;
//     const propCatTextSpecLookUp = localSubType.propCatTextSpecLookUp;
//     const propCatFeatureLookUp = localSubType.propCatFeatureLookUp;

//     // const subTypePropCatLookUp = new Map<string, number>();

//     // const propCatIntSpecLookUp = new Map<string, number>();
//     // const propCatDecSpecLookUp = new Map<string, number>();
//     // const propCatTextSpecLookUp = new Map<string, number>();
//     // const propCatFeatureLookUp = new Map<string, number>();

//     // subType?.propCat?.forEach((subTypePropCat, subTypePropCatIndex) => {
//     //   const propCatName = subTypePropCat?.propCat?.name;

//     //   if (propCatName) {
//     //     subTypePropCatLookUp.set(propCatName, subTypePropCatIndex);

//     //     subTypePropCat?.propCatIntSpecs?.forEach(
//     //       (propCatIntSpec, propCatIntSpecIndex) => {
//     //         const intSpecName = propCatIntSpec?.intSpec?.name;

//     //         intSpecName &&
//     //           propCatIntSpecLookUp.set(
//     //             propCatName + ":" + intSpecName,
//     //             propCatIntSpecIndex
//     //           );
//     //       }
//     //     );

//     //     subTypePropCat?.propCatDecimalSpecs?.forEach(
//     //       (propCatDecSpec, propCatDecSpecIndex) => {
//     //         const decSpecName = propCatDecSpec?.decimalSpec.name;

//     //         decSpecName &&
//     //           propCatDecSpecLookUp.set(
//     //             propCatName + ":" + decSpecName,
//     //             propCatDecSpecIndex
//     //           );
//     //       }
//     //     );

//     //     subTypePropCat?.propCatTextSpecs?.forEach(
//     //       (propCatTextSpec, propCatTextSpecIndex) => {
//     //         const textSpecName = propCatTextSpec?.textSpec.name;

//     //         textSpecName &&
//     //           propCatTextSpecLookUp.set(
//     //             propCatName + ":" + textSpecName,
//     //             propCatTextSpecIndex
//     //           );
//     //       }
//     //     );

//     //     subTypePropCat?.propCatFeatures?.forEach(
//     //       (propCatFeature, propCatFeatureIndex) => {
//     //         const featureName = propCatFeature?.feature?.name;

//     //         featureName &&
//     //           propCatFeatureLookUp.set(
//     //             propCatName + ":" + featureName,
//     //             propCatFeatureIndex
//     //           );
//     //       }
//     //     );
//     //   }
//     // });

//     console.log("assigned sub type prop cat and properties lookup ");

//     const subTypeKeyDecSpecLookUp = localSubType.subTypeKeyDecSpecLookUp;

//     // subType?.keyDecSpecs?.forEach((keyDecSpec) => {
//     //   const decSpecName = keyDecSpec?.decimalSpec?.name;
//     //   decSpecName && subTypeKeyDecSpecLookUp.add(decSpecName);
//     // });

//     const subTypeKeyIntSpecLookUp = localSubType.subTypeKeyIntSpecLookUp;

//     // subType?.keyIntSpecs?.forEach((keyIntSpec) => {
//     //   const intSpecName = keyIntSpec?.intSpec?.name;
//     //   intSpecName && subTypeKeyIntSpecLookUp.add(intSpecName);
//     // });

//     const subTypeKeyTextSpecLookUp = localSubType.subTypeKeyTextSpecLookUp;

//     // subType?.keyTextSpecs?.forEach((keyTextSpec) => {
//     //   const textSpecName = keyTextSpec?.textSpec?.name;
//     //   textSpecName && subTypeKeyTextSpecLookUp.add(textSpecName);
//     // });

//     const subTypeKeyFeatureLookUp = localSubType.subTypeKeyFeatureLookUp;

//     // subType?.keyFeatures?.forEach((keyFeature) => {
//     //   const featureName = keyFeature?.feature?.name;
//     //   featureName && subTypeKeyFeatureLookUp.add(featureName);
//     // });

//     console.log("created sub type key specs lookup");

//     const subTypeOuterIntSpecLookUp = localSubType.subTypeOuterIntSpecLookUp;
//     // const subTypeOuterIntSpecLookUp = new Map<string, number>();

//     // subType?.outerIntSpecs?.forEach((outerIntSpec, outerIntSpecIndex) => {
//     //   const intSpecName = outerIntSpec?.intSpec?.name;
//     //   intSpecName &&
//     //     subTypeOuterIntSpecLookUp.set(intSpecName, outerIntSpecIndex);
//     // });

//     const subTypeOuterDecSpecLookUp = localSubType.subTypeOuterDecSpecLookUp;
//     // const subTypeOuterDecSpecLookUp = new Map<string, number>();

//     // subType?.outerDecSpecs?.forEach((outerDecSpec, outerDecSpecIndex) => {
//     //   const decSpecName = outerDecSpec?.decimalSpec?.name;
//     //   decSpecName &&
//     //     subTypeOuterDecSpecLookUp.set(decSpecName, outerDecSpecIndex);
//     // });

//     const subTypeOuterTextSpecLookUp = localSubType.subTypeOuterTextSpecLookUp;
//     // const subTypeOuterTextSpecLookUp = new Map<string, number>();

//     // subType?.outerTextSpecs?.forEach((outerTextSpec, outerTextSpecIndex) => {
//     //   const textSpecName = outerTextSpec?.textSpec?.name;
//     //   textSpecName &&
//     //     subTypeOuterTextSpecLookUp.set(textSpecName, outerTextSpecIndex);
//     // });

//     console.log("created sub type outer specs look up");

//     const yearWithValues = await getOrCreateLatestYear(
//       dbVariant,
//       localSubType.subType,
//       scrappedVariant.price,
//       scrappedVariant.imageUrl
//     );

//     console.log("year with values is: ", yearWithValues);

//     // creating set look up for year values and outer spec values
//     const yearIntSpecValuesLookUp = new Set<string>();

//     yearWithValues?.yearIntSpecValues?.forEach((yearIntSpecValue) => {
//       const intSpecName = yearIntSpecValue?.propCatIntSpec?.intSpec?.name;
//       intSpecName && yearIntSpecValuesLookUp.add(intSpecName);
//     });

//     console.log("created year int spec values lookup");

//     const yearDecSpecValuesLookUp = new Set<string>();

//     yearWithValues?.yearDecimalSpecValues?.forEach((yearDecSpecValue) => {
//       const decSpecName =
//         yearDecSpecValue?.propCatDecimalSpec?.decimalSpec?.name;
//       decSpecName && yearDecSpecValuesLookUp.add(decSpecName);
//     });

//     console.log("created year decimal spec values lookup");

//     const yearTextSpecValuesLookUp = new Set<string>();

//     yearWithValues?.yearTextSpecValues?.forEach((yearTextSpecValue) => {
//       const textSpecName = yearTextSpecValue?.propCatTextSpec?.textSpec?.name;
//       textSpecName && yearTextSpecValuesLookUp.add(textSpecName);
//     });

//     console.log("created year text spec values lookup");

//     const yearFeatureValuesLookUp = new Set<string>();

//     yearWithValues?.yearFeaturesValues?.forEach((yearFeatureValue) => {
//       const featureName = yearFeatureValue?.propCatFeature?.feature?.name;
//       featureName && yearFeatureValuesLookUp.add(featureName);
//     });

//     console.log("created year features values lookup");

//     // year outer spec values lookup
//     const yearOuterDecSpecValuesLookUp = new Set<string>();

//     yearWithValues?.yearOuterDecimalSpecValues?.forEach(
//       (yearOuterDecSpecValue) => {
//         const decSpecName =
//           yearOuterDecSpecValue?.outerDecSpec?.decimalSpec?.name;
//         decSpecName && yearOuterDecSpecValuesLookUp.add(decSpecName);
//       }
//     );

//     console.log("created year outer decimal spec values lookup");

//     const yearOuterIntSpecValuesLookUp = new Set<string>();

//     yearWithValues?.yearOuterIntSpecValues?.forEach((yearOuterIntSpecValue) => {
//       const intSpecName = yearOuterIntSpecValue?.outerIntSpec?.intSpec?.name;
//       intSpecName && yearOuterIntSpecValuesLookUp.add(intSpecName);
//     });

//     console.log("created year int spec values lookup");

//     const yearOuterTextSpecValuesLookUp = new Set<string>();

//     yearWithValues?.yearOuterTextSpecValues?.forEach(
//       (yearOuterTextSpecValue) => {
//         const textSpecName =
//           yearOuterTextSpecValue?.outerTextSpec?.textSpec?.name;
//         textSpecName && yearOuterTextSpecValuesLookUp.add(textSpecName);
//       }
//     );

//     console.log("created year text spec values lookup");

//     const queryRunner = AppDataSource.createQueryRunner();

//     try {
//       await queryRunner.startTransaction();

//       let allPromises: Promise<any>[] = [];

//       for (let propCatWithProp of scrappedVariant?.propCatWithProp) {
//         const propCatName = propCatWithProp?.propertyCategory;
//         const subTypePropCat = subTypePropCatLookUp.get(propCatName);
//         console.log("lookup sub type prop cat is: ", subTypePropCat);

//         for (let textSpecWithValue of propCatWithProp?.textSpecs) {
//           const textSpecName = textSpecWithValue.name;
//           const { textSpec, defaultTextSpecValue } =
//             await getOrCreateTextSpecWithDefaultValue(textSpecName);

//           const textSpecValue = await getOrCreateTextSpecValue(
//             textSpec,
//             textSpecWithValue.value as string
//           );

//           const existingYearTextSpecValue =
//             yearTextSpecValuesLookUp.has(textSpecName);

//           if (!existingYearTextSpecValue) {
//             const propCatTextSpecKey = propCatName + ":" + textSpecName;

//             const existingSubTypePropCatTextSpec =
//               propCatTextSpecLookUp.get(propCatTextSpecKey);

//             if (existingSubTypePropCatTextSpec) {
//               allPromises.push(
//                 createYearTextSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   propCatTextSpec: existingSubTypePropCatTextSpec,
//                   textSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // removing form sub type prop cat text spec map lookup that
//               // we have inserted the consisting property
//               propCatTextSpecLookUp.delete(propCatTextSpecKey);
//             } else {
//               const newSubTypePropCatTextSpec =
//                 await createSubTypePropCatTextSpec(subTypePropCat, textSpec);
//               console.log(
//                 "new sub type prop cat text spec is: ",
//                 newSubTypePropCatTextSpec
//               );

//               // inserting the actual value in the current year
//               allPromises.push(
//                 createYearTextSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   propCatTextSpec: newSubTypePropCatTextSpec,
//                   textSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // inserting default values in other years which used the same subtype
//               await addDefaultTextSpecValueToYears({
//                 queryRunner,
//                 years: yearsUsingSameSubType,
//                 propCatTextSpec: newSubTypePropCatTextSpec,
//                 defaultTextSpecValue,
//               });
//             }
//           }

//           // for outer spec values
//           const isPropOuterSpec = scrappedOuterSpecsLookUp.has(textSpecName);

//           const existingYearOuterTextSpecValue =
//             yearOuterTextSpecValuesLookUp.has(textSpecName);

//           if (isPropOuterSpec && !existingYearOuterTextSpecValue) {
//             const existingSubTypeOuterTextSpec =
//               subTypeOuterTextSpecLookUp.get(textSpecName);

//             if (existingSubTypeOuterTextSpec) {
//               allPromises.push(
//                 createYearOuterTextSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   outerTextSpec: existingSubTypeOuterTextSpec,
//                   textSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // removing form sub type prop cat text spec map lookup that
//               // we have inserted the consisting property
//               subTypeOuterTextSpecLookUp.delete(textSpecName);
//             } else {
//               // first inserting the text spec in the subtype
//               const newSubTypeOuterTextSpec = await createSubTypeOuterTextSpec(
//                 localSubType.subType,
//                 textSpec
//               );

//               // inserting the actual outer spec value in the current year
//               allPromises.push(
//                 createYearOuterTextSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   outerTextSpec: newSubTypeOuterTextSpec,
//                   textSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // inserting default outer text spec values in other years which used the same subtype
//               await addDefaultOuterTextSpecValueToYears({
//                 queryRunner,
//                 years: yearsUsingSameSubType,
//                 outerTextSpec: newSubTypeOuterTextSpec,
//                 defaultTextSpecValue,
//               });
//             }
//           }

//           const isPropKeySpec = scrappedKeySpecsLookUp.has(textSpecName);
//           const existingSubTypeKeyTextSpec =
//             subTypeKeyTextSpecLookUp.has(textSpecName);

//           if (isPropKeySpec && !existingSubTypeKeyTextSpec) {
//             // adding key text spec to the subtype
//             await createKeyTextSpec(localSubType.subType, textSpec);
//           }
//         }

//         // console.log(
//         //   "text spec and outer text specs promises length is: ",
//         //   allPromises.length
//         // );
//         // await promiseAllSetteled(allPromises);

//         // allPromises = [];

//         for (let intSpecWithValue of propCatWithProp?.intSpecs) {
//           const intSpecName = intSpecWithValue.name;
//           const intSpecValue = intSpecWithValue.value as number;

//           const intSpec = await getOrCreateIntSpec({
//             name: intSpecName,
//             unit: intSpecWithValue?.unit,
//           });

//           const existingYearIntSpecValue =
//             yearIntSpecValuesLookUp.has(intSpecName);

//           if (!existingYearIntSpecValue) {
//             const propCatIntSpecKey = propCatName + ":" + intSpecName;

//             const existingSubTypePropCatIntSpec =
//               propCatIntSpecLookUp.get(propCatIntSpecKey);

//             if (existingSubTypePropCatIntSpec) {
//               allPromises.push(
//                 createYearIntSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   propCatIntSpec: existingSubTypePropCatIntSpec,
//                   intSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // removing form sub type prop cat Int spec map lookup that
//               // we have inserted the consisting property
//               propCatIntSpecLookUp.delete(propCatIntSpecKey);
//             } else {
//               const newSubTypePropCatIntSpec =
//                 await createSubTypePropCatIntSpec(subTypePropCat, intSpec);

//               console.log(
//                 "new sub type prop cat int spec is: ",
//                 newSubTypePropCatIntSpec
//               );

//               // inserting the actual value in the current year
//               allPromises.push(
//                 createYearIntSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   propCatIntSpec: newSubTypePropCatIntSpec,
//                   intSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // inserting default values in other years which used the same subtype
//               await addDefaultIntSpecValueToYears({
//                 queryRunner,
//                 years: yearsUsingSameSubType,
//                 propCatIntSpec: newSubTypePropCatIntSpec,
//               });
//             }
//           }

//           // for outer spec values
//           const isPropOuterSpec = scrappedOuterSpecsLookUp.has(intSpecName);

//           const existingYearOuterIntSpecValue =
//             yearOuterIntSpecValuesLookUp.has(intSpecName);

//           if (isPropOuterSpec && !existingYearOuterIntSpecValue) {
//             const existingSubTypeOuterIntSpec =
//               subTypeOuterIntSpecLookUp.get(intSpecName);

//             if (existingSubTypeOuterIntSpec) {
//               allPromises.push(
//                 createYearOuterIntSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   outerIntSpec: existingSubTypeOuterIntSpec,
//                   intSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // removing form sub type prop cat Int spec map lookup that
//               // we have inserted the consisting property
//               subTypeOuterIntSpecLookUp.delete(intSpecName);
//             } else {
//               // first inserting the Int spec in the subtype
//               const newSubTypeOuterIntSpec = await createSubTypeOuterIntSpec(
//                 localSubType.subType,
//                 intSpec
//               );

//               // inserting the actual outer spec value in the current year
//               allPromises.push(
//                 createYearOuterIntSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   outerIntSpec: newSubTypeOuterIntSpec,
//                   intSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // inserting default outer Int spec values in other years which used the same subtype
//               await addDefaultOuterIntSpecValueToYears({
//                 queryRunner,
//                 years: yearsUsingSameSubType,
//                 outerIntSpec: newSubTypeOuterIntSpec,
//               });
//             }
//           }

//           const isPropKeySpec = scrappedKeySpecsLookUp.has(intSpecName);
//           const existingSubTypeKeyIntSpec =
//             subTypeKeyIntSpecLookUp.has(intSpecName);

//           if (isPropKeySpec && !existingSubTypeKeyIntSpec) {
//             // adding key Int spec to the subtype
//             await createKeyIntSpec(localSubType.subType, intSpec);
//           }
//         }

//         // console.log(
//         //   "int spec and outer int specs promises length is: ",
//         //   allPromises.length
//         // );
//         // await promiseAllSetteled(allPromises);

//         // allPromises = [];

//         for (let decimalSpecWithValue of propCatWithProp?.decSpecs) {
//           const decimalSpecName = decimalSpecWithValue.name;
//           const decimalSpecValue = decimalSpecWithValue.value as number;

//           const decimalSpec = await getOrCreateDecSpec({
//             name: decimalSpecName,
//             unit: decimalSpecWithValue?.unit,
//           });

//           const existingYearDecimalSpecValue =
//             yearDecSpecValuesLookUp.has(decimalSpecName);

//           if (!existingYearDecimalSpecValue) {
//             const propCatDecimalSpecKey = propCatName + ":" + decimalSpecName;

//             const existingSubTypePropCatDecimalSpec = propCatDecSpecLookUp.get(
//               propCatDecimalSpecKey
//             );

//             if (existingSubTypePropCatDecimalSpec) {
//               allPromises.push(
//                 createYearDecimalSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   propCatDecimalSpec: existingSubTypePropCatDecimalSpec,
//                   decimalSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // removing form sub type prop cat Decimal spec map lookup that
//               // we have inserted the consisting property
//               propCatDecSpecLookUp.delete(propCatDecimalSpecKey);
//             } else {
//               const newSubTypePropCatDecimalSpec =
//                 await createSubTypePropCatDecimalSpec(
//                   subTypePropCat,
//                   decimalSpec
//                 );

//               console.log(
//                 "new sub type prop cat decimal spec is: ",
//                 newSubTypePropCatDecimalSpec
//               );

//               // inserting the actual value in the current year
//               allPromises.push(
//                 createYearDecimalSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   propCatDecimalSpec: newSubTypePropCatDecimalSpec,
//                   decimalSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // inserting default values in other years which used the same subtype
//               await addDefaultDecimalSpecValueToYears({
//                 queryRunner,
//                 years: yearsUsingSameSubType,
//                 propCatDecimalSpec: newSubTypePropCatDecimalSpec,
//               });
//             }
//           }

//           // for outer spec values
//           const isPropOuterSpec = scrappedOuterSpecsLookUp.has(decimalSpecName);

//           const existingYearOuterDecimalSpecValue =
//             yearOuterDecSpecValuesLookUp.has(decimalSpecName);

//           if (isPropOuterSpec && !existingYearOuterDecimalSpecValue) {
//             const existingSubTypeOuterDecimalSpec =
//               subTypeOuterDecSpecLookUp.get(decimalSpecName);

//             if (existingSubTypeOuterDecimalSpec) {
//               allPromises.push(
//                 createYearOuterDecimalSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   outerDecimalSpec: existingSubTypeOuterDecimalSpec,
//                   decimalSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // removing form sub type prop cat Decimal spec map lookup that
//               // we have inserted the consisting property
//               subTypeOuterDecSpecLookUp.delete(decimalSpecName);
//             } else {
//               // first inserting the Decimal spec in the subtype
//               const newSubTypeOuterDecimalSpec =
//                 await createSubTypeOuterDecimalSpec(
//                   localSubType.subType,
//                   decimalSpec
//                 );

//               // inserting the actual outer spec value in the current year
//               allPromises.push(
//                 createYearOuterDecimalSpecValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   outerDecimalSpec: newSubTypeOuterDecimalSpec,
//                   decimalSpecValue,
//                   defaultValue: false,
//                 })
//               );

//               // inserting default outer Decimal spec values in other years which used the same subtype
//               await addDefaultOuterDecimalSpecValueToYears({
//                 queryRunner,
//                 years: yearsUsingSameSubType,
//                 outerDecimalSpec: newSubTypeOuterDecimalSpec,
//               });
//             }
//           }

//           const isPropKeySpec = scrappedKeySpecsLookUp.has(decimalSpecName);
//           const existingSubTypeKeyDecimalSpec =
//             subTypeKeyDecSpecLookUp.has(decimalSpecName);

//           if (isPropKeySpec && !existingSubTypeKeyDecimalSpec) {
//             // adding key Decimal spec to the subtype
//             await createKeyDecimalSpec(localSubType.subType, decimalSpec);
//           }
//         }

//         // console.log(
//         //   "decimal spec and outer decimal specs promises length is: ",
//         //   allPromises.length
//         // );
//         // await promiseAllSetteled(allPromises);

//         // allPromises = [];

//         for (let featureWithValue of propCatWithProp?.features) {
//           const featureName = featureWithValue.name;
//           const featureValue = featureWithValue.value;

//           const feature = await getOrCreateFeature(featureName);

//           const existingYearFeatureValue =
//             yearFeatureValuesLookUp.has(featureName);

//           if (!existingYearFeatureValue) {
//             const propCatFeatureKey = propCatName + ":" + featureName;

//             const existingSubTypePropCatFeature =
//               propCatFeatureLookUp.get(propCatFeatureKey);

//             if (existingSubTypePropCatFeature) {
//               allPromises.push(
//                 createYearFeatureValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   propCatFeature: existingSubTypePropCatFeature,
//                   featureValue,
//                   defaultValue: false,
//                 })
//               );

//               // removing form sub type prop cat feature map lookup that
//               // we have inserted the consisting property
//               propCatFeatureLookUp.delete(propCatFeatureKey);
//             } else {
//               const newSubTypePropCatFeature =
//                 await createSubTypePropCatFeature(subTypePropCat, feature);

//               console.log(
//                 "new sub type prop cat feature is: ",
//                 newSubTypePropCatFeature
//               );

//               // inserting the actual value in the current year
//               allPromises.push(
//                 createYearFeatureValue({
//                   queryRunner,
//                   year: yearWithValues,
//                   propCatFeature: newSubTypePropCatFeature,
//                   featureValue,
//                   defaultValue: false,
//                 })
//               );

//               // inserting default values in other years which used the same subtype
//               await addDefaultFeatureValueToYears({
//                 queryRunner,
//                 years: yearsUsingSameSubType,
//                 propCatFeature: newSubTypePropCatFeature,
//               });
//             }
//           }

//           const isPropKeyFeature = scrappedKeyFeaturesLookUp.has(featureName);
//           const existingSubTypeKeyFeature =
//             subTypeKeyFeatureLookUp.has(featureName);

//           if (isPropKeyFeature && !existingSubTypeKeyFeature) {
//             // adding key feature to the subtype
//             await createKeyFeature(localSubType.subType, feature);
//           }
//         }

//         // console.log("features promises length is: ", allPromises.length);
//         // await promiseAllSetteled(allPromises);

//         // allPromises = [];
//       }

//       // now adding default values for those sub type properties which weren't inserted
//       propCatDecSpecLookUp.forEach((unAddedSubTypePropCatDecSpec, key) => {
//         // const propCatName = key.split(":")[0];
//         // const subTypePropCatIndex = subTypePropCatLookUp.get(propCatName);
//         // const subTypePropCat = subType.propCat[subTypePropCatIndex];
//         // const unAddedSubTypePropCatDecSpec =
//         //   subTypePropCat.propCatDecimalSpecs[unAddedSubTypePropCatDecSpecIndex];

//         allPromises.push(
//           createYearDecimalSpecValue({
//             queryRunner,
//             year: yearWithValues,
//             propCatDecimalSpec: unAddedSubTypePropCatDecSpec,
//             decimalSpecValue: 0.1,
//             defaultValue: true,
//           })
//         );
//       });

//       // console.log(
//       //   "default sub type decimal spec promises length is: ",
//       //   allPromises.length
//       // );
//       // await promiseAllSetteled(allPromises);

//       // allPromises = [];

//       propCatIntSpecLookUp.forEach((unAddedSubTypePropCatIntSpec, key) => {
//         // const propCatName = key.split(":")[0];
//         // const subTypePropCatIndex = subTypePropCatLookUp.get(propCatName);
//         // const subTypePropCat = subType.propCat[subTypePropCatIndex];
//         // const unAddedSubTypePropCatIntSpec =
//         //   subTypePropCat.propCatIntSpecs[unAddedSubTypePropCatIntSpecIndex];

//         allPromises.push(
//           createYearIntSpecValue({
//             queryRunner,
//             year: yearWithValues,
//             propCatIntSpec: unAddedSubTypePropCatIntSpec,
//             intSpecValue: 0,
//             defaultValue: true,
//           })
//         );
//       });

//       // console.log(
//       //   "default sub type int spec promises length is: ",
//       //   allPromises.length
//       // );
//       // await promiseAllSetteled(allPromises);

//       // allPromises = [];

//       propCatTextSpecLookUp.forEach(
//         async (unAddedSubTypePropCatTextSpec, key) => {
//           // const propCatName = key.split(":")[0];
//           // const subTypePropCatIndex = subTypePropCatLookUp.get(propCatName);
//           // const subTypePropCat = subType.propCat[subTypePropCatIndex];

//           // const unAddedSubTypePropCatTextSpec =
//           //   subTypePropCat.propCatTextSpecs[unAddedSubTypePropCatTextSpecIndex];
//           const unAddedTextSpecName =
//             unAddedSubTypePropCatTextSpec?.textSpec?.name;

//           if (unAddedTextSpecName) {
//             const defaultTextSpecValue = await getDefaultTextSpecValueByName(
//               unAddedTextSpecName
//             );
//             allPromises.push(
//               createYearTextSpecValue({
//                 queryRunner,
//                 year: yearWithValues,
//                 propCatTextSpec: unAddedSubTypePropCatTextSpec,
//                 textSpecValue: defaultTextSpecValue,
//                 defaultValue: true,
//               })
//             );
//           }
//         }
//       );

//       // console.log(
//       //   "default sub type text spec promises length is: ",
//       //   allPromises.length
//       // );

//       // await promiseAllSetteled(allPromises);

//       // allPromises = [];

//       propCatFeatureLookUp.forEach((unAddedSubTypePropCatFeature, key) => {
//         // const propCatName = key.split(":")[0];
//         // const subTypePropCatIndex = subTypePropCatLookUp.get(propCatName);
//         // const subTypePropCat = subType.propCat[subTypePropCatIndex];
//         // const unAddedSubTypePropCatFeature =
//         //   subTypePropCat.propCatFeatures[unAddedSubTypePropCatFeatureIndex];

//         allPromises.push(
//           createYearFeatureValue({
//             queryRunner,
//             year: yearWithValues,
//             propCatFeature: unAddedSubTypePropCatFeature,
//             featureValue: false,
//             defaultValue: true,
//           })
//         );
//       });

//       // console.log(
//       //   "default sub type features spec promises length is: ",
//       //   allPromises.length
//       // );

//       // await promiseAllSetteled(allPromises);

//       // allPromises = [];

//       // outer specs
//       subTypeOuterDecSpecLookUp.forEach(
//         (unAddedSubTypeOuterDecimalSpec) => {
//           // const unAddedSubTypeOuterDecimalSpec =
//           //   subType.outerDecSpecs[unAddedSubTypeOuterDecimalSpecIndex];

//           allPromises.push(
//             createYearOuterDecimalSpecValue({
//               queryRunner,
//               year: yearWithValues,
//               outerDecimalSpec: unAddedSubTypeOuterDecimalSpec,
//               decimalSpecValue: 0.1,
//               defaultValue: true,
//             })
//           );
//         }
//       );

//       // console.log(
//       //   "default sub type outer dec spec promises length is: ",
//       //   allPromises.length
//       // );
//       // await promiseAllSetteled(allPromises);

//       // allPromises = [];

//       subTypeOuterIntSpecLookUp.forEach((unAddedSubTypeOuterIntSpec) => {
//         // const unAddedSubTypeOuterIntSpec =
//         //   subType.outerIntSpecs[unAddedSubTypeOuterIntSpecIndex];

//         allPromises.push(
//           createYearOuterIntSpecValue({
//             queryRunner,
//             year: yearWithValues,
//             outerIntSpec: unAddedSubTypeOuterIntSpec,
//             intSpecValue: 0,
//             defaultValue: true,
//           })
//         );
//       });

//       // console.log(
//       //   "default sub type outer int spec promises length is: ",
//       //   allPromises.length
//       // );
//       // await promiseAllSetteled(allPromises);

//       // allPromises = [];

//       subTypeOuterTextSpecLookUp.forEach(
//         async (unAddedSubTypeOuterTextSpec) => {
//           // const unAddedSubTypeOuterTextSpec =
//           //   subType.outerTextSpecs[unAddedSubTypeOuterTextSpecIndex];

//           const unAddedTextSpecName =
//             unAddedSubTypeOuterTextSpec?.textSpec?.name;
//           if (unAddedTextSpecName) {
//             const defaultTextSpecValue = await getDefaultTextSpecValueByName(
//               unAddedTextSpecName
//             );

//             allPromises.push(
//               createYearOuterTextSpecValue({
//                 queryRunner,
//                 year: yearWithValues,
//                 outerTextSpec: unAddedSubTypeOuterTextSpec,
//                 textSpecValue: defaultTextSpecValue,
//                 defaultValue: true,
//               })
//             );
//           }
//         }
//       );

//       // console.log(
//       //   "default sub type outer text spec promises length is: ",
//       //   allPromises.length
//       // );

//       await promiseAllSetteled(allPromises);

//       await insertBulkYearColors(yearWithValues, yearColors);
//       await queryRunner.commitTransaction();
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   } catch (error) {
//     throw error;
//   }
// }
