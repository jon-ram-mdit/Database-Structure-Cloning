import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { SubTypesPropCat } from "./subTypePropCat";
import { ProductFeatures } from "../../properties/features";
import { YearFeaturesValues } from "../../end-product/yearValues/yearFeaturesValues";


enum propertyType {
  B = "Base",
  D = "Derived",
}

@Entity()
@Index("subtype_property_category_feature", ["subTypePropCat", "feature"], { unique: true })
export class SubTypesPropCatFeatures extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  subtype_prop_cat_feature_id: string;

  @Column({
    type: "enum",
    enum: propertyType,
    default: propertyType.B,
  })
  type: propertyType;

  @ManyToOne(
    () => SubTypesPropCat,
    (subTypePropCat) => subTypePropCat.propCatFeatures
  )
  subTypePropCat: SubTypesPropCat;

  @ManyToOne(
    () => ProductFeatures,
    (productFeatures) => productFeatures.subTypePropCatFeatures
  )
  feature: ProductFeatures;

  @OneToMany(
    () => YearFeaturesValues,
    (yearFeatureValue) => yearFeatureValue.propCatFeature
  )
  yearValues: YearFeaturesValues[];
}
