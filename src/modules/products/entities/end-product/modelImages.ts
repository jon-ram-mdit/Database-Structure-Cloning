import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductTypeImagePropertyCategories } from "../productType/productTypeImagePropCat";
import { BrandsModels } from "./models";

@Entity()
export class ModelImages {
  @PrimaryGeneratedColumn("uuid")
  model_image_id: string;

  @Column()
  url: string;

  @Column()
  caption: string;

  @ManyToOne(
    () => ProductTypeImagePropertyCategories,
    (imagePropCat) => imagePropCat.modelImages
  )
  imagePropertyCategory: ProductTypeImagePropertyCategories;

  @ManyToOne(() => BrandsModels, (model) => model.modelImages)
  model: BrandsModels;
}
