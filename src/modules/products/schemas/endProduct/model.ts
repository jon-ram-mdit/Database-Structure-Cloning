import { Type, Static } from "@sinclair/typebox";
import { uuidSchema } from "../../../../utils/typeBoxSchemas";

export const modelReqBodySchema = Type.Object({
  name: Type.String({ minLength: 2 }),
  description: Type.String({ minLength: 50 }),
  typeId: uuidSchema,
});

export type modelReqBodyType = Static<typeof modelReqBodySchema>;

export const createMultipleModelReqBodySchema = Type.Object({
  models: Type.Array(
    Type.Object({
      name: Type.String({ minLength: 2 }),
      description: Type.String({ minLength: 50 }),
    })
  ),
  typeId: uuidSchema,
});

export type createMultipleModelReqBodyType = Static<
  typeof createMultipleModelReqBodySchema
>;
