import { Static, Type } from "@sinclair/typebox";
import {
  singleFileReqBodySchema,
  uuidSchema,
} from "../../../utils/typeBoxSchemas";
import { ProductSpecDataTypes } from "../entities/properties/textSpecs";

const uniqueUUIDArray = Type.Array(uuidSchema, { uniqueItems: true });
export const reqParamSubTypeIdSchema = Type.Object({
  subTypeId: uuidSchema,
});

export type reqParamSubTypeIdType = Static<typeof reqParamSubTypeIdSchema>;

export const addPropertyCategoryReqBodySchema = Type.Object({
  categories: Type.Array(uuidSchema),
});

export type addPropertyCategoryReqBodyType = Static<
  typeof addPropertyCategoryReqBodySchema
>;

export const subTypeKeySpecsSchema = Type.Object({
  intSpecs: uniqueUUIDArray,
  textSpecs: uniqueUUIDArray,
  decimalSpecs: uniqueUUIDArray,
});

export enum ISpecType {
  I = "Int",
  D = "Decimal",
  T = "Text",
}
// hide restore sub type spec req query
export const subTypeHideRestoreSpecReqQuerySchema = Type.Object({
  type: Type.Enum(ISpecType),
  id: uuidSchema,
});

export type subTypeHideRestoreSpecReqQueryType = Static<
  typeof subTypeHideRestoreSpecReqQuerySchema
>;

export type subTypeKeySpecsType = Static<typeof subTypeKeySpecsSchema>;

// sub type key features
export const subTypeKeyFeaturesSchema = Type.Object({
  features: uniqueUUIDArray,
});

export type subTypeKeyFeaturesType = Static<typeof subTypeKeyFeaturesSchema>;

// sub type outer specification
export const subTypeKeyOuterSpecSchema = Type.Object({
  specId: uuidSchema,
  specType: Type.Enum(ProductSpecDataTypes),
  image: singleFileReqBodySchema,
  forHomeScreen: Type.Boolean(),
});

export type subTypeKeyOuterSpecType = Static<typeof subTypeKeyOuterSpecSchema>;

export const updateSubTypeOuterSpecSchema = Type.Object({
  specType: Type.Enum(ProductSpecDataTypes),
  image: Type.Optional(singleFileReqBodySchema),
  forHomeScreen: Type.Boolean(),
});

export type updateSubTypeOuterSpecType = Static<
  typeof updateSubTypeOuterSpecSchema
>;
