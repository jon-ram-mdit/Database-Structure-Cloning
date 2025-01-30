import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from "typeorm";
import globalConstants, { imageUrlPrefix } from "../../../constant/constant";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { Districts } from "../../Address/entities/district";
import { DetailListingComments } from "./detailListing/comments";
import { UserDetailListings } from "./detailListing/detailListing";
import { UserShowroomDealsWishList } from "./wishList/deals";
import { UserDetailListingWishList } from "./wishList/detailListing";
import { UserVehicleInfoWishList } from "./wishList/vehicleInfo";
import { NewInventoryEnquiries } from "../../Vendor/entities/InventoryEnquiries";
import { DetailListingEnquiries } from "./detailListing/enquiry";

class UserImageUrlPrefixTransformer implements ValueTransformer {
  // No transformation when saving data to the database
  to(value: string): string {
    return value; // Return the original value (no transformation)
  }

  // Add the prefix when retrieving data from the database
  from(value: string): string {
    if (
      value?.includes("googleusercontent") ||
      value === globalConstants.defaultProfileLogo
    ) {
      return value;
    } else {
      return `${imageUrlPrefix}${value}`;
    }
  }
}

@Entity()
export class Users extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({ unique: true, nullable: true })
  google_user_id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  contact: string;

  @Column({ nullable: true })
  altContact: string;

  @Column({
    default: globalConstants.defaultProfileLogo,
    transformer: new UserImageUrlPrefixTransformer(),
  })
  display_picture_url: string;

  @ManyToOne(() => Districts, (district) => district.users)
  district: Districts;

  @Column()
  address_detail: string;

  // @Column({ type: "boolean", default: false })
  // profile_verified: boolean;

  // deals of the user
  @OneToMany(() => UserDetailListings, (detailUsedDeal) => detailUsedDeal.user)
  detailUsedDeals: UserDetailListings[];

  // end year vehicle information wishlist
  @OneToMany(
    () => UserVehicleInfoWishList,
    (vehicleInfoWishList) => vehicleInfoWishList.user
  )
  vehicleInfoWishLists: UserVehicleInfoWishList[];

  @OneToMany(
    () => UserDetailListingWishList,
    (detailListingWishList) => detailListingWishList.user
  )
  detailListingWishLists: UserDetailListingWishList[];

  @OneToMany(
    () => UserShowroomDealsWishList,
    (showroomDealWishList) => showroomDealWishList.user
  )
  showroomDealWishLists: UserShowroomDealsWishList[];

  @OneToMany(() => DetailListingComments, (comment) => comment.user)
  detailListingComments: DetailListingComments[];

  @OneToMany(() => NewInventoryEnquiries, (enquiry) => enquiry.user)
  newInventoryEnquiries: NewInventoryEnquiries[];

  @OneToMany(() => DetailListingEnquiries, (enquiry) => enquiry.user)
  usedInventoryEnquiries: DetailListingEnquiries[];
}
