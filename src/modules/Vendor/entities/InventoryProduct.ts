import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { VariantsYears } from "../../products/entities/end-product/year";
import { Showrooms } from "./showrooms";
import { UserShowroomDealsWishList } from "../../users/entities/wishList/deals";
import { YearColors } from "../../products/entities/end-product/yearColors";
import { NewInventoryEnquiries } from "./InventoryEnquiries";

export enum ListingStatus {
  R = "Running",
  H = "Hold",
  S = "Sold",
  E = "Expired",
  D = "Deleted",
  DF = "Draft",
}

export enum ListingStatusActions {
  MAS = "Mark As Sold",
  RL = "Resume Listing",
  HL = "Hold Listing",
  DL = "Delete Listing",
  SAD = "Save As Draft",
}

@Entity()
export class InventoryProduct extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid") inventoryProduct_id?: string;
  @Column() description?: string;

  @Column() expiry: Date;

  @Column() inStock?: boolean = true;

  @Column() edited_price?: number;

  @Column() price?: number;

  @Column({ default: true }) isFinance: boolean;

  @Column({ type: "enum", enum: ListingStatus, default: ListingStatus.R })
  status: ListingStatus;

  @ManyToOne(() => VariantsYears, (variant) => variant.inventoryProducts)
  vehicle: VariantsYears;

  @ManyToOne(() => Showrooms, (showroom) => showroom.inventoryProducts)
  showroom: Showrooms;

  @OneToMany(
    () => UserShowroomDealsWishList,
    (dealWishList) => dealWishList.showroomDeal
  )
  inventoryWishList: UserShowroomDealsWishList[];

  @ManyToOne(() => YearColors, (yearColor) => yearColor.inventoryProduct)
  color?: YearColors;

  @OneToMany(() => NewInventoryEnquiries, (enquiry) => enquiry.newInventory)
  enquiries: NewInventoryEnquiries[];
}
