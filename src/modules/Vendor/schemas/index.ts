import { Static, Type } from "@sinclair/typebox";
import { reqBodyFileSchema } from "../../products/schemas";
import { uuidSchema } from "../../../utils/typeBoxSchemas";

export enum GENDER_ENUM {
  male = "male",
  female = "female",
  other = "other",
}

export enum ACCESS_LEVEL_ENUM {
  admin = "admin",
  user = "user",
}

export enum OPERATION_LEVEL_ENUM {
  create = "create",
  read = "read",
  update = "update",
  delete = "delete",
}

export enum SERVICES_ENUM {
  inventory = "inventory",
  information = "information",
  employee = "employee",
  showrooms = "showrooms",
}

export const registerVendorSchema = Type.Object({
  vendor_id: Type.Optional(Type.String({ format: "uuid" })),
  firstname: Type.String(),
  lastname: Type.String(),
  email: Type.String({ format: "email" }),
  company: Type.String(),
  contact: Type.Array(Type.String({ maxLength: 20, minLength: 8 })),
  gender: Type.Enum(GENDER_ENUM),
  address_description: Type.String(),
  address: Type.Object({
    longitude: Type.Number(),
    latitude: Type.Number(),
  }),
});

export type registerVendorType = Static<typeof registerVendorSchema>;

const vendorSchema = Type.Object({
  ...registerVendorSchema.properties,
  password: Type.String({ minLength: 7 }),
});

export type vendorType = Static<typeof vendorSchema>;

const createShowroomSchema = Type.Object({
  name: Type.String(),
  address_description: Type.String(),
  contact: Type.Array(Type.String({ minLength: 6 })),
  district_id: Type.String({ format: "uuid" }),
  longitude: Type.Number(),
  latitude: Type.Number(),
  files: reqBodyFileSchema,
});

export type createShowroomType = Static<typeof createShowroomSchema>;

const showroomSchema = Type.Object({
  showroom_id: Type.Optional(Type.String()),
  name: Type.String(),
  address_description: Type.String(),
  contact: Type.Array(Type.String({ minLength: 6 })),
  district_id: Type.String({ format: "uuid" }),
  address: Type.Object({
    longitude: Type.Number(),
    latitude: Type.Number(),
  }),
});
export type showroomSchemaType = Static<typeof showroomSchema>;

export const updateShowroomVerificationSchema = Type.Object({
  showroom_id: uuidSchema,
  name: Type.String(),
  address_description: Type.String(),
  contact: Type.Array(Type.String({ minLength: 6 })),
  district_id: Type.String({ format: "uuid" }),
  longitude: Type.Number(),
  latitude: Type.Number(),
  oldFiles: Type.String(),
  newFiles: Type.Optional(reqBodyFileSchema),
});

export type updateShowroomVerificationType = Static<
  typeof updateShowroomVerificationSchema
>;

export const supportMessageSchema = Type.Object({
  message: Type.String({ minLength: 10 }),
});

export type supportMessageType = Static<typeof supportMessageSchema>;

const roleSchema = Type.Object({
  role_id: Type.Optional(Type.String({ format: "uuid" })),
  name: Type.String(),
  rolesMapper: Type.Array(
    Type.Object({
      service: Type.Enum(SERVICES_ENUM),
      access_level: Type.Enum(ACCESS_LEVEL_ENUM),
      operation_levels: Type.Array(Type.Enum(OPERATION_LEVEL_ENUM)),
    })
  ),
});
export type roleSchemaType = Static<typeof roleSchema>;

const employeeSchema = Type.Object({
  employee_id: Type.Optional(Type.String({ format: "uuid" })),
  firstname: Type.String(),
  lastname: Type.String(),
  email: Type.String({ format: "email" }),
  password: Type.Optional(Type.String({ minLength: 7 })),
  contact: Type.Array(Type.String({ maxLength: 20, minLength: 8 })),
  gender: Type.Enum(GENDER_ENUM),
  role_id: Type.Optional(Type.String({ format: "uuid" })),
});
export type vendorEmployeeType = Static<typeof employeeSchema>;

// Prams with id

export const paramsWithId = Type.Object({
  id: Type.String(),
});

export type paramsWithId = Static<typeof paramsWithId>;

const showroomEmployeeSchema = Type.Object({
  employee_id: Type.String({ format: "uuid" }),
});

export type showroomEmployeeSchemaType = Static<typeof showroomEmployeeSchema>;

const AvatarSchema = Type.Object({
  image: reqBodyFileSchema,
  id: Type.String({ format: "uuid" }),
});

export type avatarBodyType = Static<typeof AvatarSchema>;

const InventoryProductSchema = Type.Object({
  price: Type.Integer({
    minimum: 10000,
    maximum: 999999999,
  }),
  description: Type.String(),
  vehicle_id: Type.String({ format: "uuid" }),
  showroom_id: Type.String({ format: "uuid" }),
  isDraft: Type.Boolean(),
  expiry: Type.String({ format: "date" }),
  isFinance: Type.Boolean(),
  colors: Type.Optional(Type.String()),
});

const InventoryProductUpdateSchema = Type.Object({
  price: Type.Optional(
    Type.Integer({
      minimum: 5000,
      maximum: 999999999,
    })
  ),
  description: Type.Optional(Type.String()),
  expiry: Type.Optional(Type.String({ format: "date" })),
  colors: Type.Optional(Type.String()),
  isFinance: Type.Optional(Type.Boolean()),
  // For Update
  inventoryProduct_id: Type.String({ format: "uuid" }),
  offerDiscount: Type.Optional(Type.Boolean()),
});

export type inventoryProductSchemaType = Static<typeof InventoryProductSchema>;
export type inventoryProductUpdateSchemaType = Static<
  typeof InventoryProductUpdateSchema
>;

export default {
  registerVendorSchema,
  vendorSchema,
  showroomSchema,
  createShowroomSchema,
  roleSchema,
  employeeSchema,
  showroomEmployeeSchema,
  AvatarSchema,
  InventoryProductSchema,
  InventoryProductUpdateSchema,
};
