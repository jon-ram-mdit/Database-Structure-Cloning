import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { UserDetailListings } from "./detailListing";
import { Users } from "../user";
import { Showrooms } from "../../../Vendor/entities/showrooms";

@Entity()
export class DetailListingComments extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  comment_id: string;

  @ManyToOne(
    () => UserDetailListings,
    (detailListing) => detailListing.comments
  )
  detailListing: UserDetailListings;

  @ManyToOne(() => Users, (user) => user.detailListingComments)
  user: Users;

  @ManyToOne(() => Showrooms, (showroom) => showroom.detailListingComments)
  showroom: Showrooms;

  @OneToMany(() => DetailListingComments, (reply) => reply.parentComment)
  replies: DetailListingComments[];

  @ManyToOne(
    () => DetailListingComments,
    (parentComment) => parentComment.replies,
    { nullable: true, onDelete: "CASCADE" }
  )
  parentComment: DetailListingComments | null;

  @Column({ type: "text" })
  comment: string;
}
