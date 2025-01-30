import { Static, Type } from "@sinclair/typebox";
import {
  reqBodyFileSchema,
  singleFileReqBodySchema,
  uuidSchema,
} from "../../../../utils/typeBoxSchemas";

const createEndYearSchema = Type.Object({
  year: Type.Integer({ minimum: 1000, maximum: 9999 }),
  actualPrice: Type.Number({ minimum: 1 }),
  releaseDate: Type.String({ format: "date" }),
  image: reqBodyFileSchema,
});

export type createEndYearType = Static<typeof createEndYearSchema>;

const createEndYearReqQuerySchema = Type.Object({
  variantId: uuidSchema,
  copyFormExistingYear: Type.Boolean(),
  id: uuidSchema,
});

export type createEndYearReqQueryType = Static<
  typeof createEndYearReqQuerySchema
>;

const updateEndYearSchema = Type.Object({
  year: Type.Integer({ minimum: 1000, maximum: 9999 }),
  actualPrice: Type.Number({ minimum: 1 }),
  releaseDate: Type.String({ format: "date" }),
  image: Type.Optional(reqBodyFileSchema),
});

export type updateEndYearType = Static<typeof updateEndYearSchema>;

export enum updatingPropertyType {
  I = "Int",
  D = "Dec",
  T = "Text",
  B = "Boolean",
}

export const updateEndYearValuesSchema = Type.Array(
  Type.Object({
    yearValueId: uuidSchema,
    updatingValue: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
    restoreToDefault: Type.Boolean(),
    type: Type.Enum(updatingPropertyType),
  })
);
export type updateEndYearValuesType = Static<typeof updateEndYearValuesSchema>;

// end year vehicle various color available schemas
const hexColorRegex = Type.RegEx(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
const addYearColorSchema = Type.Object({
  colorCode1: hexColorRegex,
  colorCode2: Type.Optional(hexColorRegex),
  colorName: Type.String(),
  colorVehicleImage: singleFileReqBodySchema,
});

export type addYearColorType = Static<typeof addYearColorSchema>;

const addYearColorsSchema = Type.Array(addYearColorSchema);
export type addYearColorsType = Static<typeof addYearColorsSchema>;

const updateYearColorSchema = Type.Object({
  colorCode1: hexColorRegex,
  colorCode2: Type.Optional(hexColorRegex),
  colorName: Type.String(),
  colorVehicleImage: Type.Optional(singleFileReqBodySchema),
});

export type updateYearColorType = Static<typeof updateYearColorSchema>;

export const yearColorsSchema = {
  addYearColorsSchema,
  updateYearColorSchema,
};

// end year vehicle various images schemas
const reqParamYearImageIdSchema = Type.Object({
  yearImageId: uuidSchema,
});

export type reqParamYearImageIdType = Static<typeof reqParamYearImageIdSchema>;

const addYearImageReqQuerySchema = Type.Object({
  endYearId: uuidSchema,
  imgPropCatId: uuidSchema,
});

export type addYearImageReqQueryType = Static<
  typeof addYearImageReqQuerySchema
>;

const addYearImageReqBodySchema = Type.Object({
  image: singleFileReqBodySchema,
  caption: Type.String({ minLength: 5 }),
});

export type addYearImageSchemaType = Static<typeof addYearImageReqBodySchema>;

const addYearImagesReqBodySchema = Type.Array(addYearImageReqBodySchema);

export type addYearImagesReqBodyType = Static<
  typeof addYearImagesReqBodySchema
>;

const updateYearImageReqBodySchema = Type.Object({
  image: Type.Optional(singleFileReqBodySchema),
  caption: Type.String({ minLength: 5 }),
});

export type updateYearImageReqBodyType = Static<
  typeof updateYearImageReqBodySchema
>;

export const yearImagesSchema = {
  reqParamYearImageIdSchema,
  addYearImageReqQuerySchema,
  addYearImagesReqBodySchema,
  updateYearImageReqBodySchema,
};

export const getVariantYearReqQuerySchema = Type.Object({
  variantId: uuidSchema,
  yearId: uuidSchema,
});

export type getVariantYearReqQueryType = Static<
  typeof getVariantYearReqQuerySchema
>;

// client schemas
export const reqParamYearIdSchema = Type.Object({
  yearId: uuidSchema,
});

export type reqParamYearIdType = Static<typeof reqParamYearIdSchema>;

export default {
  createEndYearSchema,
  updateEndYearSchema,
  createEndYearReqQuerySchema,
};
