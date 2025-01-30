import { Static, Type } from "@sinclair/typebox";
import {
  singleFileReqBodySchema,
  uuidSchema,
} from "../../../../utils/typeBoxSchemas";

export const brandIdParamSchema = Type.Object({
  brandId: uuidSchema,
});

export type brandIdParamType = Static<typeof brandIdParamSchema>;

export const reqBrandImageQuerySchema = Type.Object({
  brandId: uuidSchema,
  action: Type.Union([Type.Literal("edit"), Type.Literal("restore")]),
});

export type reqBrandImageQueryType = Static<typeof reqBrandImageQuerySchema>;

export const brandVehicleImageBodySchema = Type.Object({
  typeId: uuidSchema,
  image: Type.Optional(singleFileReqBodySchema),
});

export type brandVehicleImageBodyType = Static<
  typeof brandVehicleImageBodySchema
>;

export default {
  brandIdParamSchema,
};
