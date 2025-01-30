import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { VEmployees } from "./vEmployees";
import { Showrooms } from "./showrooms";
import { Vendors } from "./vendor";

@Entity()
export class VContacts extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  contact_id?: string;

  @Column()
  value: string;

  @ManyToOne(() => VEmployees, (employee) => employee.contact)
  employee: VEmployees;

  @ManyToOne(() => Showrooms, (showroom) => showroom.contact)
  showroom: Showrooms;

  @ManyToOne(() => Vendors, (vendor) => vendor.contact)
  vendor: Vendors;
}
