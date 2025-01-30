import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { DetailListingImages } from "./images";
import { Users } from "../user";
import { VariantsYears } from "../../../products/entities/end-product/year";
import { UserDetailListingWishList } from "../wishList/detailListing";
import { DetailListingComments } from "./comments";
import { Showrooms } from "../../../Vendor/entities/showrooms";
import { DetailListingEnquiries } from "./enquiry";

export enum ListingStatus {
  DR = "Draft",
  R = "Running",
  H = "Hold",
  S = "Sold",
  E = "Expired",
  D = "Deleted",
}

export enum ListingStatusActions {
  MAS = "Mark As Sold",
  RL = "Resume Listing",
  HL = "Hold Listing",
  DL = "Delete Listing",
  PL = "Publish Listing",
}

export enum OwnerShipType {
  FO = "First Owner",
  SO = "Second Owner",
  TO = "Third Owner",
  FA = "Four & Above",
}

export enum Condition {
  BN = "Brand New",
  LN = "Like New",
  U = "Used",
  NW = "Not Working",
}

@Entity()
export class UserDetailListings extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  user_detail_listing_id: string;

  @Column({ default: "Sample Ad Description" })
  description: string;

  @Column({ type: "enum", enum: ListingStatus, default: ListingStatus.R })
  status: ListingStatus;

  @Column({ type: "date" })
  expiry: Date;

  // @Column({ type: "decimal", transformer: decimalTransformer })
  @Column()
  price: number;

  @Column()
  edited_price: number;

  @Column({ default: true })
  negotiable: boolean;

  // @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  // location_point: string;

  @Column("geometry")
  location_point: Point;

  @Column({ default: "Bhaktapur" })
  display_district: string;

  @Column({ default: "Sallaghari" })
  display_local: string;

  // @Column("double precision")
  // latitude: number;

  // @Column("double precision")
  // longitude: number;

  // vehicle descriptions
  @Column()
  vehicle_number: string;

  @Column()
  purchase_year: number;

  @Column()
  tax_clearance_year: number;

  @Column()
  kilometer_driven: number;

  @Column({ type: "enum", enum: OwnerShipType })
  ownership_type: OwnerShipType;

  @Column({ type: "enum", enum: Condition })
  condition: Condition;

  @Column({ type: "boolean", nullable: true })
  finance_available: boolean;

  @ManyToOne(
    () => VariantsYears,
    (variantYear) => variantYear.userDetailListing
  )
  endYearVehicle: VariantsYears;

  @ManyToOne(() => Users, (user) => user.detailUsedDeals)
  user: Users;

  @ManyToOne(() => Showrooms, (showroom) => showroom.usedInventories)
  showroom: Showrooms;

  @OneToMany(
    () => DetailListingImages,
    (detailDealImages) => detailDealImages.detailListing
  )
  detailListingImages: DetailListingImages[];

  @OneToMany(
    () => UserDetailListingWishList,
    (detailListingWishList) => detailListingWishList.detailListing
  )
  detailListingWishList: UserDetailListingWishList[];

  @OneToMany(() => DetailListingComments, (comment) => comment.detailListing)
  comments: DetailListingComments[];

  @OneToMany(() => DetailListingEnquiries, (enquiry) => enquiry.detailListing)
  enquiries: DetailListingEnquiries[];
}
