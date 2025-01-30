import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Roles } from "./roles";
import {
  ACCESS_LEVEL_ENUM,
  OPERATION_LEVEL_ENUM,
  SERVICES_ENUM,
} from "../schemas";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";

@Entity()
export class RolesMapper extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  roles_mapper_id?: string;

  @Column()
  service?: SERVICES_ENUM;

  @Column()
  access_level: ACCESS_LEVEL_ENUM = ACCESS_LEVEL_ENUM.admin;

  @Column("varchar", { array: true })
  operation_levels: OPERATION_LEVEL_ENUM[];

  @ManyToOne(() => Roles, (roles) => roles.rolesMapper, {
    cascade: true,
  })
  role: Roles;
}
