import { uuidSchema } from "./../../../utils/typeBoxSchemas";
import { Static, Type } from "@sinclair/typebox";
import { ProductSpecDataTypes } from "../entities/properties/textSpecs";
import { dynamicPropSchema } from "./endProduct/variant";

const minLengthOfNames = 2;
const minLenString = Type.String({ minLength: minLengthOfNames });

export const reqBodyFile = Type.Object({
  fileBuffer: Type.Any(),
  fileType: Type.String(),
  fileExtension: Type.String(),
});

export type parsedFileType = Static<typeof reqBodyFile>;

export const reqBodyFileSchema = Type.Array(
  Type.Object({
    fileBuffer: Type.Any(),
    fileType: Type.String(),
    fileExtension: Type.String(),
  }),
  { minItems: 1 }
);

export type reqBodyFileType = Static<typeof reqBodyFileSchema>;

// single value name schema
export const createWithNameSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

export type createWithNameType = Static<typeof createWithNameSchema>;

export const multipleNameSchema = Type.Object({
  names: Type.Array(Type.String({ minLength: 1 })),
});
export type multipleNameType = Static<typeof multipleNameSchema>;

// product specification
export const productSpecSchema = Type.Object({
  name: minLenString,
  data_type: Type.Enum(ProductSpecDataTypes),
  unitId: Type.Optional(uuidSchema),
});

export type productSpecSchemaType = Static<typeof productSpecSchema>;

export const multipleSpecsSchema = Type.Object({
  specs: Type.Array(productSpecSchema),
});

export type multipleSpecsType = Static<typeof multipleSpecsSchema>;

export const deleteRestoreUnitSpecSchema = Type.Object({
  id: uuidSchema,
  type: Type.Enum(ProductSpecDataTypes),
});

export type deleteRestoreUnitSpecType = Static<
  typeof deleteRestoreUnitSpecSchema
>;

// end product schemas of models, variants
// where they have name and desc for creation
export const nameWithDescSchema = Type.Object({
  name: minLenString,
  description: Type.String({ minLength: 50 }),
});

export type nameWithDescType = Static<typeof nameWithDescSchema>;

export const multipleNameWithDescSchema = Type.Array(nameWithDescSchema);

export type multipleNameWithDescType = Static<
  typeof multipleNameWithDescSchema
>;

export enum globalFilterSortParameters {
  PLTH = "PriceLowToHigh",
  PHTL = "PriceHighToLow",
  RE = "Recent",
  MY = "MakeYear",
}

// global filter schema
export const globalFilterReqBodySchema = Type.Object({
  Brand: Type.Optional(uuidSchema),
  Model: Type.Optional(uuidSchema),
  Variant: Type.Optional(uuidSchema),
  dynamicProperties: dynamicPropSchema,
  Location: Type.Optional(
    Type.Object({
      latitude: Type.Number({ minimum: -90, maximum: 90 }),
      longitude: Type.Number({ minimum: -180, maximum: 180 }),
      radius: Type.Integer({ minimum: 1, maximum: 25 }),
    })
  ),
  District: Type.Optional(Type.String()),
  Price: Type.Optional(
    Type.Object({
      min: Type.Integer({ minimum: 1 }),
      max: Type.Integer({ minimum: 1, maximum: 999999999 }),
    })
  ),
  Year: Type.Optional(
    Type.Object({
      min: Type.Integer({ minimum: 1920 }),
      max: Type.Integer({ minimum: 1920 }),
    })
  ),
  sortBy: Type.Optional(Type.Enum(globalFilterSortParameters)),
});

export type globalFilterReqBodyType = Static<typeof globalFilterReqBodySchema>;

export default {
  productSpecificationSchema: productSpecSchema,
  endProductSchema: nameWithDescSchema,
};
