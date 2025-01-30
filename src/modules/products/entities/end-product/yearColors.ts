import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VariantsYears } from "./year";
import { InventoryProduct } from "../../../Vendor/entities/InventoryProduct";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ImageUrlPrefixTransformer } from "../../../../utils/entities/ImageUrlTransformer";

@Entity()
export class YearColors extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  year_color_id: string;

  @Column()
  color_code: string;

  @Column({ nullable: true })
  seconday_color_code: string;

  @Column()
  color_name: string;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  vehicle_color_image_url: string;

  @ManyToOne(() => VariantsYears, (variantYear) => variantYear.colors)
  variantYear: VariantsYears;

  @OneToMany(() => InventoryProduct, (IP) => IP.color)
  inventoryProduct: InventoryProduct[];
}
