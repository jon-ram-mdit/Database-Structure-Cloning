import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductTypeImagePropertyCategories } from "../productType/productTypeImagePropCat";
import { VariantsYears } from "./year";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ImageUrlPrefixTransformer } from "../../../../utils/entities/ImageUrlTransformer";

@Entity()
export class YearImages extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  year_image_id: string;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  image_url: string;

  @Column()
  caption: string;

  @Column({default: 0})
  rank: number;

  @ManyToOne(
    () => ProductTypeImagePropertyCategories,
    (imagePropCat) => imagePropCat.endYearImages
  )
  imagePropertyCategory: ProductTypeImagePropertyCategories;

  @ManyToOne(() => VariantsYears, (endYear) => endYear.images)
  endYearVehicle: VariantsYears;
}
