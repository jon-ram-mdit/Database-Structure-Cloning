import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { Showrooms } from "./showrooms";

@Entity()
export class ShowroomVerificationAdminMessages extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  verifying_admin_message_id: string;

  @Column({ type: "text" })
  message: string;

  @ManyToOne(() => Showrooms, (showroom) => showroom.verificationAdminMessages)
  showroom: Showrooms;
}
