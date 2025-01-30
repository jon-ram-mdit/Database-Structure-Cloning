import { Static, Type } from "@sinclair/typebox";
import { filterVariantReqBodySchema } from "./endProduct/variant";
import { locationSchema } from "../../users/schemas/detailListing";

export enum dealSortParameters {
  PLTH = "PriceLowToHigh",
  PHTL = "PriceHighToLow",
  RE = "Recent",
  MY = "MakeYear",
}

export const filterDealReqBodySchema = Type.Object({
  ...filterVariantReqBodySchema.properties,
  Price: Type.Optional(
    Type.Object({
      min: Type.Integer({ minimum: 1 }),
      max: Type.Integer({ minimum: 1, maximum: 999999999 }),
    })
  ),
  sortBy: Type.Optional(Type.Enum(dealSortParameters)),
  Location: locationSchema,
  District: Type.Optional(Type.String()),
});

export type filterDealReqBodyType = Static<typeof filterDealReqBodySchema>;
