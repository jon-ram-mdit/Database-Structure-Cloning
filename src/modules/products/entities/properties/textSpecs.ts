import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductTextSpecsValues } from "./textSpecsValues";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { SubTypesPropCatTextSpecs } from "../sub-type/property-category/propCatTextSpecs";
import { OuterTextSpecs } from "../sub-type/outer-specs/outerTextSpecs";
import { KeyTextSpecs } from "../sub-type/key-specs/keyTextSpecs";
import { TypeHomeProperties } from "../productType/typeHomeProperties";

export enum ProductSpecDataTypes {
  Number = "Int",
  Text = "Text",
  Decimal = "Decimal",
}

@Entity()
export class ProductTextSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  product_text_spec_id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => ProductTextSpecsValues,
    (productTextSpecValue) => productTextSpecValue.textSpec
  )
  values: ProductTextSpecsValues[];

  @OneToMany(
    () => SubTypesPropCatTextSpecs,
    (subTypePropCatTextSpec) => subTypePropCatTextSpec.textSpec
  )
  subTypePropCatTextSpec: SubTypesPropCatTextSpecs[];

  @OneToMany(
    () => OuterTextSpecs,
    (subTypeOuterTextSpec) => subTypeOuterTextSpec.textSpec
  )
  subTypeOuterTextSpecs: OuterTextSpecs[];

  @OneToMany(
    () => KeyTextSpecs,
    (subTypeKeyTextSpec) => subTypeKeyTextSpec.textSpec
  )
  subTypeKeyTextSpecs: KeyTextSpecs[];

  @OneToMany(() => TypeHomeProperties, (homeProps) => homeProps.homeProperty)
  homeProperties: TypeHomeProperties[];
}
