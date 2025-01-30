import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "../user";
import { UserDetailListings } from "../detailListing/detailListing";

@Entity()
export class UserDetailListingWishList {
  @PrimaryGeneratedColumn("uuid")
  detail_listing_wishlist_id: string;

  @CreateDateColumn()
  created_date: Date;

  @ManyToOne(() => Users, (user) => user.detailListingWishLists)
  user: Users;

  @ManyToOne(
    () => UserDetailListings,
    (detailListing) => detailListing.detailListingWishList
  )
  detailListing: UserDetailListings;
}
