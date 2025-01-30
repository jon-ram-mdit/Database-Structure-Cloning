import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ValueTransformer } from "typeorm";
import { VariantsYears, YearValuesType } from "../year";
import { OuterDecimalSpecs } from "../../sub-type/outer-specs/outerDecimalSpecs";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { decimalTransformer } from "../yearValues/yearDecimalSpecValues";

@Entity()
export class YearOuterDecimalSpecValues extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  year_outer_decimal_spec_value_id: string;

  @Column({ type: "decimal", transformer: decimalTransformer })
  value: number;

  @Column()
  value_type: YearValuesType = YearValuesType.D;

  @ManyToOne(
    () => VariantsYears,
    (variantYear) => variantYear.yearOuterDecimalSpecValues
  )
  variantYear: VariantsYears;

  @ManyToOne(
    () => OuterDecimalSpecs,
    (OuterSpecDecSpec) => OuterSpecDecSpec.yearOuterValues
  )
  outerDecSpec: OuterDecimalSpecs;
}
