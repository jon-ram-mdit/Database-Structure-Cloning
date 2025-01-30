import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VariantsYears, YearValuesType } from "../year";
import { OuterIntSpecs } from "../../sub-type/outer-specs/outerIntSpecs";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";

@Entity()
export class YearOuterIntSpecValues extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  year_Outer_int_spec_value_id: string;

  @Column()
  value: number;

  @Column()
  value_type: YearValuesType = YearValuesType.D;

  @ManyToOne(
    () => VariantsYears,
    (variantYear) => variantYear.yearOuterIntSpecValues
  )
  variantYear: VariantsYears;

  @ManyToOne(
    () => OuterIntSpecs,
    (OuterSpecIntSpec) => OuterSpecIntSpec.yearOuterValues
  )
  outerIntSpec: OuterIntSpecs;
}
