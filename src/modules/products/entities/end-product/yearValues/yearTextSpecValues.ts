import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VariantsYears, YearValuesType } from "../year";
import { SubTypesPropCatTextSpecs } from "../../sub-type/property-category/propCatTextSpecs";
import { ProductTextSpecsValues } from "../../properties/textSpecsValues";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";

@Entity()
@Index("prop_cat_text_spec_value", ["variantYear", "propCatTextSpec"], { unique: true })
export class YearTextSpecValues extends DateTimeAbstract{
  @PrimaryGeneratedColumn("uuid")
  year_text_spec_value_id: string;

  @ManyToOne(
    () => ProductTextSpecsValues,
    (productTextSpecValue) => productTextSpecValue.yearValue
  )
  value: ProductTextSpecsValues;

  @Column()
  value_type: YearValuesType = YearValuesType.D;

  @ManyToOne(
    () => VariantsYears,
    (variantYear) => variantYear.yearTextSpecValues
  )
  variantYear: VariantsYears;

  @ManyToOne(
    () => SubTypesPropCatTextSpecs,
    (subTypePropCatTextSpecs) => {
      subTypePropCatTextSpecs.yearValues;
    }
  )
  propCatTextSpec: SubTypesPropCatTextSpecs;
}
