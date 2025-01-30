import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductTextSpecs } from "./textSpecs";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { YearTextSpecValues } from "../end-product/yearValues/yearTextSpecValues";
import { YearOuterTextSpecValues } from "../end-product/yearOuterValues/yearOuterTextSpecValues";
import { HomePropertiesValues } from "../productType/homePropertiesValues";

export enum TextSpecValueTypes {
  D = "Default",
  N = "Non-Default",
}

@Entity()
export class ProductTextSpecsValues extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  text_spec_value_id: string;

  @Column()
  value: string;

  @Column({
    type: "enum",
    enum: TextSpecValueTypes,
    default: TextSpecValueTypes.D,
  })
  value_type: TextSpecValueTypes;

  @ManyToOne(
    () => ProductTextSpecs,
    (productTextSpec) => productTextSpec.values
  )
  textSpec: ProductTextSpecs;

  @OneToMany(
    () => YearTextSpecValues,
    (yearTextSpecValue) => yearTextSpecValue.value
  )
  yearValue: YearTextSpecValues[];

  @OneToMany(
    () => YearOuterTextSpecValues,
    (yearTextSpecValue) => yearTextSpecValue.value
  )
  yearOuterValue: YearOuterTextSpecValues[];

  @OneToMany(
    () => HomePropertiesValues,
    (homePropertyValue) => homePropertyValue.textSpecValue
  )
  homePropertyValues: HomePropertiesValues[];
}
