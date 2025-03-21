import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductTypes } from "./productTypes";
import { YearImages } from "../end-product/yearImages";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ModelImages } from "../end-product/modelImages";

@Entity()
export class ProductTypeImagePropertyCategories extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  product_type_image_prop_cat_id: string;

  @Column()
  name: string;

  @ManyToOne(
    () => ProductTypes,
    (productType) => productType.imagePropertyCategories
  )
  productType: ProductTypes;

  @OneToMany(
    () => YearImages,
    (endYearImage) => endYearImage.imagePropertyCategory
  )
  endYearImages: YearImages[];

  @OneToMany(
    () => ModelImages,
    (modelImage) => modelImage.imagePropertyCategory
  )
  modelImages: ModelImages[];
}
