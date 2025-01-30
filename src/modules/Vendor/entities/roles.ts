import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { RolesMapper } from "./rolesMapper";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { Vendors } from "./vendor";
import { VEmployees } from "./vEmployees";

@Entity()
export class Roles extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  role_id?: string;

  @Column()
  name?: string;

  @OneToMany(() => VEmployees, (employee) => employee.role)
  employees: VEmployees[];

  @OneToMany(() => RolesMapper, (rolesMapper) => rolesMapper.role)
  rolesMapper: RolesMapper[];

  @ManyToOne(() => Vendors, (vendor) => vendor.roles)
  vendor: Vendors;
}
