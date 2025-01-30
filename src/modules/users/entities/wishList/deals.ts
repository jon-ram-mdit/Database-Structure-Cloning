import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "../user";
import { InventoryProduct } from "../../../Vendor/entities/InventoryProduct";

@Entity()
export class UserShowroomDealsWishList {
  @PrimaryGeneratedColumn("uuid")
  detail_listing_wishlist_id: string;

  @CreateDateColumn()
  created_date: Date;

  @ManyToOne(() => Users, (user) => user.showroomDealWishLists)
  user: Users;

  @ManyToOne(
    () => InventoryProduct,
    (inventoryProduct) => inventoryProduct.inventoryWishList
  )
  showroomDeal: InventoryProduct;
}
