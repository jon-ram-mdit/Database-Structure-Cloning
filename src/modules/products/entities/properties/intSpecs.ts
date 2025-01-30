import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductUnits } from "./unit";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { SubTypesPropCatIntSpecs } from "../sub-type/property-category/propCatIntSpecs";
import { OuterIntSpecs } from "../sub-type/outer-specs/outerIntSpecs";
import { KeyIntSpecs } from "../sub-type/key-specs/keyIntSpecs";

@Entity()
export class ProductIntSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  product_int_spec_id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => ProductUnits, (productUnit) => productUnit.intSpecs)
  unit: ProductUnits;

  @OneToMany(
    () => SubTypesPropCatIntSpecs,
    (subTypePropCatIntSpec) => subTypePropCatIntSpec.intSpec
  )
  subTypePropCatIntSpecs: SubTypesPropCatIntSpecs[];

  @OneToMany(
    () => OuterIntSpecs,
    (subTypeOuterIntSpec) => subTypeOuterIntSpec.intSpec
  )
  subTypeOuterIntSpecs: OuterIntSpecs[];

  @OneToMany(
    () => KeyIntSpecs,
    (subTypeKeyIntSpec) => subTypeKeyIntSpec.intSpec
  )
  subTypeKeyIntSpecs: KeyIntSpecs[];
}
