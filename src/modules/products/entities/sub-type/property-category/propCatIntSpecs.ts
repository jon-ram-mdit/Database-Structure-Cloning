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
import { ProductIntSpecs } from "../../properties/intSpecs";
import { YearIntSpecValues } from "../../end-product/yearValues/yearIntSpecValues";


enum propertyType {
  B = "Base",
  D = "Derived",
}
@Entity()
@Index("subtype_property_category_int_spec", ["subTypePropCat", "intSpec"], { unique: true })
export class SubTypesPropCatIntSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  subtype_prop_cat_int_spec_id: string;

  @Column({
    type: "enum",
    enum: propertyType,
    default: propertyType.B,
  })
  type: propertyType;

  @OneToMany(
    () => YearIntSpecValues,
    (yearIntSpecValue) => yearIntSpecValue.propCatIntSpec
  )
  yearValues: YearIntSpecValues[];

  @ManyToOne(
    () => SubTypesPropCat,
    (subTypePropCat) => subTypePropCat.propCatIntSpecs
  )
  subTypePropCat: SubTypesPropCat;

  @ManyToOne(
    () => ProductIntSpecs,
    (productIntSpecs) => productIntSpecs.subTypePropCatIntSpecs
  )
  intSpec: ProductIntSpecs;
}
