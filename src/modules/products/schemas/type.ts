import { Static, Type } from "@sinclair/typebox";
import {
  singleFileReqBodySchema,
  uuidSchema,
} from "../../../utils/typeBoxSchemas";
import { FullPricingUnits, PricingUnits } from "../../../constant/constant";

const minLengthOfNames = 2;
const minLenString = Type.String({ minLength: minLengthOfNames });

const createProductTypeSchema = Type.Object({
  name: minLenString,
  typeImage: singleFileReqBodySchema,
});

export type createProductTypeType = Static<typeof createProductTypeSchema>;

export const typeIdParamSchema = Type.Object({
  typeId: uuidSchema,
});

export type typeIdParamType = Static<typeof typeIdParamSchema>;

// product type pricing interval
export const createBudgetRangeSchema = Type.Object({
  unit: Type.Enum(PricingUnits),
  amount: Type.Number(),
});

export type createBudgetRangeType = Static<typeof createBudgetRangeSchema>;

export const budgetRangeSchema = Type.Object({
  unit: Type.Enum(FullPricingUnits),
  amount: Type.Number(),
});

export type budgetRangeType = Static<typeof budgetRangeSchema>;

// product type home screen properties
const createHomeScreenPropSchema = Type.Object({
  propertyId: uuidSchema,
  propertyImage: singleFileReqBodySchema,
  defaultValueImage: singleFileReqBodySchema,
});

export type createHomeScreenPropType = Static<
  typeof createHomeScreenPropSchema
>;

export const updateHomePropValueBodySchema = Type.Object({
  propertyImage: Type.Optional(singleFileReqBodySchema),
  defaultValueImage: Type.Optional(singleFileReqBodySchema),
});

export type updateHomeHomePropValueType = Static<
  typeof updateHomePropValueBodySchema
>;

const updateHomePropValueReqBodySchema = Type.Object({
  image: singleFileReqBodySchema,
});

export type updateHomePropValueReqBodyType = Static<
  typeof updateHomePropValueReqBodySchema
>;

export default {
  createHomeScreenPropSchema,
  createPricingIntervalSchema: createBudgetRangeSchema,
  createProductTypeSchema,
  typeIdParamSchema,
  updateHomePropValueBody: updateHomePropValueBodySchema,
  updateHomePropValueReqBodySchema
};
