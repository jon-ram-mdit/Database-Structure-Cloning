import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Vendors } from "./vendor";
import { VEmployees } from "./vEmployees";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { Showrooms } from "./showrooms";
import { ImageUrlPrefixTransformer } from "../../../utils/entities/ImageUrlTransformer";

@Entity()
export class Avatar extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  avatar_id: string;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  image: string;

  @OneToOne(() => Vendors)
  showroom?: Showrooms;

  @OneToOne(() => Vendors)
  vendor?: Vendors;

  @OneToOne(() => VEmployees)
  employee?: VEmployees;
}
