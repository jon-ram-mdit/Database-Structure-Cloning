import { IPropCatWithProp } from "../modules/products/entities/end-product/BikeDekhoPreBulkUploadStore";
import { ModelsVariants } from "../modules/products/entities/end-product/variants";

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
