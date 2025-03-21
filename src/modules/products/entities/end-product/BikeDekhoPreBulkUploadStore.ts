import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ModelsVariants } from "./variants";
import { ProductTypes } from "../productType/productTypes";

interface ISpec {
  name: string;
  value: string | number;
  unit?: string;
}

interface IFeature {
  name: string;
  value: boolean;
}

export interface IPropCatWithProp {
  propertyCategory: string;
  intSpecs: ISpec[];
  decSpecs: ISpec[];
  textSpecs: ISpec[];
  features: IFeature[];
}

export interface IBikeDekhoScrappedVariantDetail {
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
  categoricalImages: {
    category: string;
    images: {
      url: string;
      caption: string;
    }[];
  }[];
}

@Entity()
export class BikeDekhoPreBulkUploadStore {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "json" })
  data: IBikeDekhoScrappedVariantDetail;

  @ManyToOne(() => ModelsVariants, (variant) => variant.bikeDekhoStore)
  variant: ModelsVariants;

  @ManyToOne(() => ProductTypes, (productType) => productType.bikeDekhoUploadStore)
  productType: ProductTypes;
}
