import { Static, Type } from "@sinclair/typebox";

// number
export const positiveInteger = Type.Integer({ minimum: 1 });

// strings format
export const uuidSchema = Type.String({ format: "uuid" });

export const uniqueUUIDArray = Type.Array(uuidSchema, { uniqueItems: true });

// global params id
export const reqParamIdSchema = Type.Object({
  id: uuidSchema,
});

export type reqParamIdType = Static<typeof reqParamIdSchema>;

// pagination
export const paginationSchema = Type.Object({
  page: Type.Integer({ minimum: 1 }),
  limit: Type.Integer({ minimum: 1 }),
});

// home page pagination schema
export const homePagePaginationSchema = Type.Object({
  typeId: uuidSchema,
  ...paginationSchema.properties,
});

export type homePagePaginationType = Static<typeof homePagePaginationSchema>;

// for multipart request body form
export const reqBodyFile = Type.Object({
  fileBuffer: Type.Any(),
  fileType: Type.String(),
  fileExtension: Type.String(),
});

export const singleFileReqBodySchema = Type.Array(reqBodyFile, {
  minItems: 1,
  maxItems: 1,
});

export type singleReqBodyFileType = Static<typeof singleFileReqBodySchema>;

export const reqBodyFileSchema = Type.Array(reqBodyFile, { minItems: 1 });

export type reqBodyFileType = Static<typeof reqBodyFileSchema>;

// name with image schema
export const nameWithImageSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  image: singleFileReqBodySchema,
});

export type nameWithImageType = Static<typeof nameWithImageSchema>;

export const multipleNameAndImageSchema = Type.Array(nameWithImageSchema);

export type multipleNameAndImageType = Static<
  typeof multipleNameAndImageSchema
>;

export const updateNameWithImageSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  image: Type.Optional(singleFileReqBodySchema),
});

export type updateNameWithImageType = Static<typeof updateNameWithImageSchema>;
