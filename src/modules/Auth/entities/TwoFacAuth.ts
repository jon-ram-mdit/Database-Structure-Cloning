import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";

@Entity()
export class TwoFacAuth extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  twoFacAuth_id: string;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column()
  verificationCode: string;
}
