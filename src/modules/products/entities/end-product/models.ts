import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductBrands } from "./brands";
import { ModelsVariants } from "./variants";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ProductTypes } from "../productType/productTypes";

export enum ModelRelations {
  PT = "productType",
  B = "brand",
  V = "variants",
}

@Entity()
export class BrandsModels extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  brand_model_id: string;

  @Column()
  model_name: string;

  @Column()
  model_description: string;

  // a model should be attached to a particular vehicle type
  /// such that any yearly end product belonging to the vehicle type
  // should be of sub type belonging to the same sub type
  @ManyToOne(() => ProductTypes, (productType) => productType.brandModels)
  productType: ProductTypes;

  @ManyToOne(() => ProductBrands, (productBrand) => productBrand.models)
  brand: ProductBrands;

  @OneToMany(
    () => ModelsVariants,
    (modelsVariants) => modelsVariants.brandModel
  )
  variants: ModelsVariants[];
}
