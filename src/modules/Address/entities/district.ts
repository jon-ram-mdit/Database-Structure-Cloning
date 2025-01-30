import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { Users } from "../../users/entities/user";
import { Provinces } from "./provinces";
import { Showrooms } from "../../Vendor/entities/showrooms";

@Entity()
export class Districts extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  district_id?: string;

  @Column({ unique: true })
  name?: string;

  @ManyToOne(() => Provinces, (province) => province.districts)
  province: Provinces;

  // @OneToMany(() => Vendors, (vendor) => vendor.district)
  // vendors: Vendors[];

  @OneToMany(() => Showrooms, (showroom) => showroom.district)
  showrooms: Showrooms[];

  @OneToMany(() => Users, (user) => user.district)
  users: Users[];
}
