import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BrandsModels } from "./models";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { BrandsVehicleTypeImageUrl } from "./brandVehicleTypeLogos";
import { ImageUrlPrefixTransformer } from "../../../../utils/entities/ImageUrlTransformer";

export enum ProductBrandRelations {
  M = "models",
  IU = "vehicleTypeImageUrls",
}
@Entity()
export class ProductBrands extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  product_brand_id: string;

  @Column({ unique: true })
  brand_name: string;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  brand_image_url: string;

  // @Column()
  // brand_description: string;

  @OneToMany(() => BrandsModels, (prodBrandModel) => prodBrandModel.brand)
  models: BrandsModels[];

  @OneToMany(
    () => BrandsVehicleTypeImageUrl,
    (brandVehicleTypeImageUrl) => brandVehicleTypeImageUrl.brand
  )
  vehicleTypeImageUrls: BrandsVehicleTypeImageUrl[];
}
