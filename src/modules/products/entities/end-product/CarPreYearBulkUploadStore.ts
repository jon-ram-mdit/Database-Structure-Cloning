import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ModelsVariants } from "./variants";
import { IPropCatWithProp } from "./BikeDekhoPreBulkUploadStore";

export interface IScrappedVariantDetail {
  scrappedVariant: {
    price: number;
    desc: string;
    propCatWithProp: IPropCatWithProp[];
    imageUrl: string;
  };
  subType: {
    propCatHashInput: string;
    subTypeKeySpecs: string[];
    subTypeOuterSpecs: string[];
    subTypeKeyFeatures: string[];
  };
  dbVariant: ModelsVariants;
  yearColors: {
    name: string;
    color1: string;
    color2?: string;
    url: string;
  }[];
}

@Entity()
export class CarPreYearBulkUploadStore {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "json" })
  data: IScrappedVariantDetail;

  @ManyToOne(() => ModelsVariants, (variant) => variant.store)
  variant: ModelsVariants;
}
