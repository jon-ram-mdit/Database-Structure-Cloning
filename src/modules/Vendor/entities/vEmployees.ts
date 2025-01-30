import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { GENDER_ENUM } from "../schemas";
import { Showrooms } from "./showrooms";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { Vendors } from "./vendor";
import { Roles } from "./roles";
import { VContacts } from "./contact";
import { Avatar } from "./avatar";

@Entity()
export class VEmployees extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  employee_id?: string;

  @Column({ unique: true })
  login_id: string;

  @Column({ select: false })
  password?: string;

  @Column()
  firstname?: string;

  @Column()
  lastname?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column()
  gender?: GENDER_ENUM;

  // RELATIONS
  @OneToOne(() => Avatar)
  @JoinColumn()
  avatar?: Avatar;

  @OneToMany(() => VContacts, (contact) => contact.employee)
  contact: VContacts[];

  @ManyToOne(() => Vendors, (vendor) => vendor.employees)
  vendor: Vendors;

  @ManyToOne(() => Roles, (role) => role.employees)
  role: Roles;

  @ManyToMany(() => Showrooms, (showroom) => showroom.employees)
  showrooms?: Showrooms[];
}
