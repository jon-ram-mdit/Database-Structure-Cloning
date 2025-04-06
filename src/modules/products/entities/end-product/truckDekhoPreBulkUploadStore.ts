import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ProductTypes } from "../productType/productTypes";
import { ModelsVariants } from "./variants";
import { IPropCatWithProp } from "./BikeDekhoPreBulkUploadStore";

export interface ITruckDekhoPreBulkUploadStoreType {
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
export class TruckDekhoPreBulkUploadStore extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "json" })
  data: ITruckDekhoPreBulkUploadStoreType;

  @ManyToOne(
    () => ModelsVariants,
    (variant) => variant.truckDekhoPreBulkUploadStore
  )
  variant: ModelsVariants;

  @ManyToOne(
    () => ProductTypes,
    (vehicleType) => vehicleType.busDekhoPreBulkUploadStore
  )
  vehicleType: ProductTypes;
}
