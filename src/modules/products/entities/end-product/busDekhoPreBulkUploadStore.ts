import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ProductTypes } from "../productType/productTypes";
import { ModelsVariants } from "./variants";
import { IPropCatWithProp } from "./BikeDekhoPreBulkUploadStore";

export interface IBusDekhoPreBulkUploadStoreType {
  dbVariant: ModelsVariants;
  scrappedVariant: {
    price: number;
    imageUrl: string;
    desc: string;
    propCatWithProp: IPropCatWithProp[];
  };
  subType: {
    propCatHashInput: string;
    subTypeKeySpecs: string[];
    subTypeOuterSpecs: string[];
    subTypeKeyFeatures: string[];
  };
  yearColors: {
    name: string;
    color1: string;
    color2?: string;
    url: string;
  }[];
  categoricalImages: {
    category: string;
    images: {
      url: string;
      caption: string;
    }[];
  }[];
}
[];

@Entity()
export class BusDekhoPreBulkUploadStore extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "json" })
  data: IBusDekhoPreBulkUploadStoreType;

  @ManyToOne(
    () => ModelsVariants,
    (variant) => variant.busDekhoPreBulkUploadStore
  )
  variant: ModelsVariants;

  @ManyToOne(
    () => ProductTypes,
    (vehicleType) => vehicleType.busDekhoPreBulkUploadStore
  )
  vehicleType: ProductTypes;
}
