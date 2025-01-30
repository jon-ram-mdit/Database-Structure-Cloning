import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Countries } from "./country";
import { Districts } from "./district";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";

@Entity()
export class Provinces extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  province_id?: string;

  @Column({ unique: true })
  name?: string;

  @Column()
  state_no?: number;

  @ManyToOne(() => Countries, (country) => country.provinces)
  country: Countries;

  @OneToMany(() => Districts, (district) => district.province)
  districts: Districts[];
}
