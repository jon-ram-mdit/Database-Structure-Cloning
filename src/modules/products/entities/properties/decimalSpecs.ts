import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductUnits } from "./unit";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { SubTypesPropCatDecimalSpecs } from "../sub-type/property-category/propCatDecimalSpecs";
import { OuterDecimalSpecs } from "../sub-type/outer-specs/outerDecimalSpecs";
import { KeyDecimalSpecs } from "../sub-type/key-specs/keyDecimalSpecs";

@Entity()
export class ProductDecimalSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  product_decimal_spec_id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => ProductUnits, (productUnit) => productUnit.decSpecs)
  unit: ProductUnits;

  @OneToMany(
    () => SubTypesPropCatDecimalSpecs,
    (subTypePropCatDecSpec) => subTypePropCatDecSpec.decimalSpec
  )
  subTypePropCatDecSpecs: SubTypesPropCatDecimalSpecs[];

  @OneToMany(
    () => OuterDecimalSpecs,
    (subTypeOuterDecSpec) => subTypeOuterDecSpec.decimalSpec
  )
  subTypeOuterDecSpecs: OuterDecimalSpecs[];

  @OneToMany(
    () => KeyDecimalSpecs,
    (subTypeKeyDecSpec) => subTypeKeyDecSpec.decimalSpec
  )
  subTypeKeyDecSpecs: KeyDecimalSpecs[];
}
