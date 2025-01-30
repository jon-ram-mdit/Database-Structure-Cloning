import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Point,
  PrimaryGeneratedColumn,
} from "typeorm";

import globalConstants from "../../../constant/constant";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { InventoryProduct } from "./InventoryProduct";
import { Avatar } from "./avatar";
import { VContacts } from "./contact";
import { VEmployees } from "./vEmployees";
import { Vendors } from "./vendor";
import { UserDetailListings } from "../../users/entities/detailListing/detailListing";
import { DetailListingComments } from "../../users/entities/detailListing/comments";
import { Districts } from "../../Address/entities/district";
import { ShowroomVerificationFiles } from "./showroomVerificationAssets";
import { ShowroomVerificationAdminMessages } from "./showroomVerificationMessages";

export enum ShowroomTypes {
  V = "Verified",
  NV = "Not Verified",
  S = "Suspended",
  R = "Rejected",
}

@Entity()
export class Showrooms extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  showroom_id?: string;

  @Column()
  name?: string;

  @Column()
  address_description?: string;

  @Column({ default: "Bhaktapur" })
  display_district: string;

  @Column({ default: "Sallaghari" })
  display_local: string;

  @Column("geometry", {
    default: {
      type: "Point",
      coordinates: globalConstants.defaultLocation.coordinates,
    },
  })
  location_point: Point;

  @Column({ type: "enum", enum: ShowroomTypes, default: ShowroomTypes.NV })
  type: ShowroomTypes;

  @Column({ nullable: true, type: "text" })
  notice: string;

  // RELATIONS
  @OneToOne(() => Avatar)
  @JoinColumn()
  avatar?: Avatar;

  @OneToMany(() => VContacts, (contact) => contact.showroom)
  contact: VContacts[];

  @ManyToOne(() => Vendors, (vendor) => vendor.showrooms)
  vendor: Vendors;

  @ManyToMany(() => VEmployees, (employee) => employee.showrooms)
  @JoinTable()
  employees: VEmployees[];

  @OneToMany(
    () => InventoryProduct,
    (inventoryProduct) => inventoryProduct.showroom
  )
  inventoryProducts: InventoryProduct[];

  @OneToMany(
    () => UserDetailListings,
    (detailListing) => detailListing.showroom
  )
  usedInventories: UserDetailListings[];

  @OneToMany(() => DetailListingComments, (comment) => comment.showroom)
  detailListingComments: DetailListingComments[];

  @ManyToOne(() => Districts, (district) => district.showrooms)
  district: Districts;

  @OneToMany(() => ShowroomVerificationFiles, (svf) => svf.showroom)
  verificationFiles: ShowroomVerificationFiles[];

  @OneToMany(() => ShowroomVerificationAdminMessages, (svam) => svam.showroom)
  verificationAdminMessages: ShowroomVerificationAdminMessages[];
}
