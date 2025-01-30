import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Provinces } from "./provinces";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";

@Entity()
export class Countries extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  country_id?: string;

  @Column({ unique: true })
  name?: string;

  @Column()
  code?: string;

  @OneToMany(() => Provinces, (province) => province.country)
  provinces: Provinces[];
}
