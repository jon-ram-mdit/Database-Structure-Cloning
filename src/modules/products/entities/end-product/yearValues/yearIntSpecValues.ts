import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VariantsYears, YearValuesType } from "../year";
import { SubTypesPropCatIntSpecs } from "../../sub-type/property-category/propCatIntSpecs";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";

@Entity()
@Index("prop_cat_int_spec_value", ["variantYear", "propCatIntSpec"], { unique: true })
export class YearIntSpecValues extends DateTimeAbstract{
  @PrimaryGeneratedColumn("uuid")
  year_int_spec_value_id: string;

  @Column()
  value: number;

  @Column()
  value_type: YearValuesType = YearValuesType.D;

  @ManyToOne(
    () => VariantsYears,
    (variantYear) => variantYear.yearIntSpecValues
  )
  variantYear: VariantsYears;

  @ManyToOne(
    () => SubTypesPropCatIntSpecs,
    (subTypePropCatIntSpecs) => {
      subTypePropCatIntSpecs.yearValues;
    }
  )
  propCatIntSpec: SubTypesPropCatIntSpecs;
}
