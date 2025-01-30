import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { UserDetailListings } from "./detailListing";
import { Users } from "../user";

@Entity()
export class DetailListingEnquiries extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  listing_enquiry_id: string;

  @Column()
  subject: string;

  @Column({ type: "text" })
  message: string;

  @Column({ default: false })
  seen_status: boolean;

  @ManyToOne(
    () => UserDetailListings,
    (detailListing) => detailListing.enquiries
  )
  detailListing: UserDetailListings;

  @ManyToOne(() => Users, (user) => user)
  user: Users;
}
