import { Static, Type } from "@sinclair/typebox";
import { uniqueUUIDArray, uuidSchema } from "../../../../utils/typeBoxSchemas";

export const dynamicPropSchema = Type.Optional(
  Type.Record(Type.String(), uniqueUUIDArray)
);

export const BuildYearSchema = Type.Optional(
  Type.Object({
    min: Type.Integer({ minimum: 1920 }),
    max: Type.Integer({ minimum: 1920 }),
  })
);

export enum sortParameters {
  PLTH = "PriceLowToHigh",
  PHTL = "PriceHighToLow",
  RE = "Recent",
}

export const filterVariantReqBodySchema = Type.Object({
  Brand: Type.Optional(uuidSchema),
  Model: Type.Optional(uuidSchema),
  Variant: Type.Optional(uuidSchema),
  Budget: Type.Optional(uuidSchema),
  Price: Type.Optional(
    Type.Object({
      min: Type.Integer({ minimum: 1 }),
      max: Type.Integer({ minimum: 1, maximum: 999999999 }),
    })
  ),
  Year: BuildYearSchema,
  dynamicProperties: dynamicPropSchema,
  sortBy: Type.Optional(Type.Enum(sortParameters)),
});

export type filterVariantReqBodyType = Static<
  typeof filterVariantReqBodySchema
>;
