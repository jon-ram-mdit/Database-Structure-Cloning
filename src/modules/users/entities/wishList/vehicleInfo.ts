import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "../user";
import { VariantsYears } from "../../../products/entities/end-product/year";

@Entity()
export class UserVehicleInfoWishList {
  @PrimaryGeneratedColumn("uuid")
  vehicle_info_wishlist_id: string;

  @CreateDateColumn()
  created_date: Date;

  @ManyToOne(() => Users, (user) => user.vehicleInfoWishLists)
  user: Users;

  @ManyToOne(
    () => VariantsYears,
    (variantYear) => variantYear.vehicleInfoWishList
  )
  endYearVehicle: VariantsYears;
}
