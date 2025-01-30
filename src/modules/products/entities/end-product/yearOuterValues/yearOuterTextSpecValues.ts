import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VariantsYears, YearValuesType } from "../year";
import { ProductTextSpecsValues } from "../../properties/textSpecsValues";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { OuterTextSpecs } from "../../sub-type/outer-specs/outerTextSpecs";

@Entity()
export class YearOuterTextSpecValues extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  year_outer_text_spec_value_id: string;

  @ManyToOne(
    () => ProductTextSpecsValues,
    (productTextSpecValue) => productTextSpecValue.yearOuterValue
  )
  value: ProductTextSpecsValues;

  @Column()
  value_type: YearValuesType = YearValuesType.D;

  @ManyToOne(
    () => VariantsYears,
    (variantYear) => variantYear.yearOuterTextSpecValues
  )
  variantYear: VariantsYears;

  @ManyToOne(
    () => OuterTextSpecs,
    (outerTextSpec) => outerTextSpec.yearOuterValues
  )
  outerTextSpec: OuterTextSpecs;
}
