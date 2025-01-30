import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductDecimalSpecs } from "../../properties/decimalSpecs";
import { SubTypesPropCat } from "./subTypePropCat";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { YearDecimalSpecValues } from "../../end-product/yearValues/yearDecimalSpecValues";


enum propertyType {
  B = "Base",
  D = "Derived",
}
@Entity()
@Index("subtype_property_category_decimal_spec", ["subTypePropCat", "decimalSpec"], { unique: true })
export class SubTypesPropCatDecimalSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  subtype_prop_cat_decimal_spec_id: string;

  @Column({
    type: "enum",
    enum: propertyType,
    default: propertyType.B,
  })
  type: propertyType;

  @ManyToOne(
    () => SubTypesPropCat,
    (subTypePropCat) => subTypePropCat.propCatDecimalSpecs
  )
  subTypePropCat: SubTypesPropCat;

  @ManyToOne(
    () => ProductDecimalSpecs,
    (prodDecSpec) => prodDecSpec.subTypePropCatDecSpecs
  )
  decimalSpec: ProductDecimalSpecs;

  @OneToMany(
    () => YearDecimalSpecValues,
    (yearDecimalSpecValue) => yearDecimalSpecValue.propCatDecimalSpec
  )
  yearValues: YearDecimalSpecValues[];
}
