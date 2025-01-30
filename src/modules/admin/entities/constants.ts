import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";

export enum constantTypes {
  muld = "Max Used Vehicle Listing Days",
  mnid = "Max New Vehicle Listing Days",
}

@Entity()
export class Constants extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  constant_id: string;

  @Column()
  name: string;

  @Column()
  value: number;
}
