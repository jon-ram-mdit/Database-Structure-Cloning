import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SubTypesPropCat } from "./subTypePropCat";
import { ProductTextSpecs } from "../../properties/textSpecs";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { YearTextSpecValues } from "../../end-product/yearValues/yearTextSpecValues";

enum propertyType {
  B = "Base",
  D = "Derived",
}

@Entity()
@Index("subtype_property_category_text_spec", ["subTypePropCat", "textSpec"], { unique: true })
export class SubTypesPropCatTextSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  subtype_prop_cat_text_spec_id: string;

  @Column({
    type: "enum",
    enum: propertyType,
    default: propertyType.B,
  })
  type: propertyType;

  @ManyToOne(
    () => SubTypesPropCat,
    (subTypePropCat) => subTypePropCat.propCatTextSpecs
  )
  subTypePropCat: SubTypesPropCat;

  @ManyToOne(
    () => ProductTextSpecs,
    (prodDecSpec) => prodDecSpec.subTypePropCatTextSpec
  )
  textSpec: ProductTextSpecs;

  @OneToMany(
    () => YearTextSpecValues,
    (yearTextSpecValue) => yearTextSpecValue.propCatTextSpec
  )
  yearValues: YearTextSpecValues[];
}
