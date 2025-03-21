import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ProductPropCat } from "../properties/propCat";
import { ProductSubTypes } from "../sub-type/subType";
import { BrandsModels } from "../end-product/models";
import { TypeHomeProperties } from "./typeHomeProperties";
import { BrandsVehicleTypeImageUrl } from "../end-product/brandVehicleTypeLogos";
import { ProductTypesPricingRanges } from "./productTypesPriceRange";
import { ProductTypeImagePropertyCategories } from "./productTypeImagePropCat";
import { ProductTypeBudgetRanges } from "./typeBudgetRange";
import { ImageUrlPrefixTransformer } from "../../../../utils/entities/ImageUrlTransformer";
import { BikeDekhoPreBulkUploadStore } from "../end-product/BikeDekhoPreBulkUploadStore";

export enum ProductTypeRelations {
  PC = "propCat",
  ST = "subType",
  HP = "homeProperties",
  BR = "budgetRanges",
  IPC = "imagePropertyCategories",
}

@Entity()
export class ProductTypes extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  product_type_id: string;

  @Column({ unique: true })
  product_type_name: string;

  @Column({
    default: "default image url",
    transformer: new ImageUrlPrefixTransformer(),
  })
  product_type_image_url: string;

  @OneToMany(
    () => BrandsVehicleTypeImageUrl,
    (brandVehicleTypeImageUrl) => brandVehicleTypeImageUrl.productType
  )
  brandVehicleTypeImage: BrandsVehicleTypeImageUrl[];

  @OneToMany(() => BrandsModels, (brandModel) => brandModel.productType)
  brandModels: BrandsModels[];

  @ManyToMany(() => ProductPropCat, (proSpecCat) => proSpecCat.productTypes)
  @JoinTable()
  propCat: ProductPropCat[];

  @OneToMany(
    () => ProductSubTypes,
    (productSubType) => productSubType.productType
  )
  subTypes: ProductSubTypes[];

  @OneToMany(
    () => TypeHomeProperties,
    (typeHomeProperties) => typeHomeProperties.productType
  )
  homeProperties: TypeHomeProperties[];

  @OneToMany(
    () => ProductTypesPricingRanges,
    (pricingRange) => pricingRange.productType
  )
  pricingRanges: ProductTypesPricingRanges[];

  @OneToMany(
    () => ProductTypeBudgetRanges,
    (budgetRange) => budgetRange.productType
  )
  budgetRanges: ProductTypeBudgetRanges[];

  @OneToMany(
    () => ProductTypeImagePropertyCategories,
    (imagePropCat) => imagePropCat.productType
  )
  imagePropertyCategories: ProductTypeImagePropertyCategories[];

  @OneToMany(() => BikeDekhoPreBulkUploadStore, (store) => store.productType)
  bikeDekhoUploadStore: BikeDekhoPreBulkUploadStore[];
}
