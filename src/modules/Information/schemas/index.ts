import { SERVICES_ENUM } from "../../Vendor/schemas";

export enum LOG_OPERATIONS {
  read = "read",
  update = "update",
  delete = "delete",
  create = "create",
  login = "login",
}

export enum EXTRA_SERVICE_ENUM {
  roles = "roles",
  auth = "auth",
}

export type LOG_SERVICE_ENUM = SERVICES_ENUM | EXTRA_SERVICE_ENUM;

export default {};
