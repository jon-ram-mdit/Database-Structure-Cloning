import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ProductTypes } from "../productType/productTypes";
import { ProductBrands } from "./brands";
import { ImageUrlPrefixTransformer } from "../../../../utils/entities/ImageUrlTransformer";

@Entity()
export class BrandsVehicleTypeImageUrl extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  brand_vehicle_type_logo_id: string;

  @ManyToOne(
    () => ProductTypes,
    (productType) => productType.brandVehicleTypeImage
  )
  productType: ProductTypes;

  @ManyToOne(() => ProductBrands, (brand) => brand.vehicleTypeImageUrls)
  brand: ProductBrands;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  imageUrl: string;
}
