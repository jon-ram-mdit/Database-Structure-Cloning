import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Point,
  PrimaryGeneratedColumn,
} from "typeorm";

import globalConstants from "../../../constant/constant";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { Logs } from "../../Information/entities/logs";
import { GENDER_ENUM } from "../schemas";
import { Avatar } from "./avatar";
import { VContacts } from "./contact";
import { Roles } from "./roles";
import { Showrooms } from "./showrooms";
import { VEmployees } from "./vEmployees";

export enum VendorRole {
  SA = "SuperAdmin",
  V = "Vendor",
}

@Entity()
export class Vendors extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  vendor_id?: string;

  @Column()
  firstname?: string;

  @Column()
  lastname?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ select: false })
  password?: string;

  @Column()
  company?: string;

  @Column()
  gender?: GENDER_ENUM;

  @Column()
  address_description?: string;

  @Column("geometry", {
    default: {
      type: "Point",
      coordinates: globalConstants.defaultLocation.coordinates,
    },
  })
  location_point: Point;

  @Column({ type: "enum", enum: VendorRole, default: VendorRole.V })
  role: VendorRole;

  // RELATIONS
  @OneToOne(() => Avatar)
  @JoinColumn()
  avatar?: Avatar;

  @OneToMany(() => Showrooms, (showroom) => showroom.vendor)
  showrooms: Showrooms[];

  @OneToMany(() => VEmployees, (employee) => employee.vendor)
  employees: VEmployees[];

  @OneToMany(() => Roles, (roles) => roles.vendor)
  roles: Roles[];

  @OneToMany(() => VContacts, (contact) => contact.vendor)
  contact: VContacts[];

  @OneToMany(() => Logs, (logs) => logs.vendor)
  logs: Logs[];
}
