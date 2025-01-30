import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { InventoryProduct } from "./InventoryProduct";
import { Users } from "../../users/entities/user";

@Entity()
export class NewInventoryEnquiries extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  listing_enquiry_id: string;

  @Column()
  subject: string;

  @Column({ type: "text" })
  message: string;

  @Column({ default: false })
  seen_status: boolean;

  @ManyToOne(() => InventoryProduct, (newInventory) => newInventory.enquiries)
  newInventory: InventoryProduct;

  @ManyToOne(() => Users, (user) => user.newInventoryEnquiries)
  user: Users;
}
