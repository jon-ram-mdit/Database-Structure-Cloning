import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from "typeorm";
import { VariantsYears, YearValuesType } from "../year";
import { SubTypesPropCatDecimalSpecs } from "../../sub-type/property-category/propCatDecimalSpecs";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";

export const decimalTransformer: ValueTransformer = {
  from: (value: string) => parseFloat(value),
  to: (value: number) => value.toString(),
};

@Entity()
@Index("prop_cat_dec_spec_value", ["variantYear", "propCatDecimalSpec"], { unique: true })
export class YearDecimalSpecValues extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  year_decimal_spec_value_id: string;

  @Column({ type: "decimal", transformer: decimalTransformer })
  value: number;

  @Column()
  value_type: YearValuesType = YearValuesType.D;

  @ManyToOne(
    () => VariantsYears,
    (variantYear) => variantYear.yearDecimalSpecValues
  )
  variantYear: VariantsYears;

  @ManyToOne(
    () => SubTypesPropCatDecimalSpecs,
    (subTypePropCatDecimalSpecs) => {
      subTypePropCatDecimalSpecs.yearValues;
    }
  )
  propCatDecimalSpec: SubTypesPropCatDecimalSpecs;
}
