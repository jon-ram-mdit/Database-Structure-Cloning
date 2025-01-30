import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VariantsYears, YearValuesType } from "../year";
import { SubTypesPropCatFeatures } from "../../sub-type/property-category/propCatFeatures";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";

@Entity()
@Index("prop_cat_feature_value", ["variantYear", "propCatFeature"], { unique: true })
export class YearFeaturesValues extends DateTimeAbstract{
  @PrimaryGeneratedColumn("uuid")
  year_feature_value_id: string;

  @Column()
  value: boolean;

  @Column()
  value_type: YearValuesType = YearValuesType.D;

  @ManyToOne(
    () => VariantsYears,
    (variantYear) => variantYear.yearFeaturesValues
  )
  variantYear: VariantsYears;

  @ManyToOne(
    () => SubTypesPropCatFeatures,
    (subTypePropCatFeatures) => {
      subTypePropCatFeatures.yearValues;
    }
  )
  propCatFeature: SubTypesPropCatFeatures;
}
