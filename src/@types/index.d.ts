import "fastify";
import { DoneFuncWithErrOrRes } from "fastify";

import { OPERATION_LEVEL_ENUM, SERVICES_ENUM } from "../modules/Vendor/schemas";
import { AccessIdentifierType } from "../plugins/auth/accessIdentifier";
import { Users } from "../modules/users/entities/user";
export interface IRequestUser {
  employee_id?: string;
  vendor_id: string;
  role: string;
  role_id?: string;
  isVendor?: boolean;
  isFromInternalPlatform?: boolean;
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      response: FastifyReply,
      done: DoneFuncWithErrOrRes
    ) => void;
    authenticateInternalPlatform: (
      request: FastifyRequest,
      response: FastifyReply,
      done: DoneFuncWithErrOrRes
    ) => void;
    accessIdentifier: (option: AccessIdentifierType) => Promise<boolean>;
  }
  interface FastifyRequest {
    user: IRequestUser;
    clientUser: Users;
  }
}
