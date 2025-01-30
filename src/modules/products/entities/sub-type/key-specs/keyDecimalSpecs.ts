import { Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { ProductDecimalSpecs } from "../../properties/decimalSpecs";
import { ProductSubTypes } from "../subType";

@Entity()
@Index("subtype_key_decimal_spec", ["subType", "decimalSpec"], { unique: true })
export class KeyDecimalSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  sub_type_key_spec_decimal_spec_id: string;

  @ManyToOne(
    () => ProductSubTypes,
    (productSubType) => productSubType.keyDecSpecs
  )
  subType: ProductSubTypes;

  @ManyToOne(
    () => ProductDecimalSpecs,
    (prodDecSpec) => prodDecSpec.subTypeKeyDecSpecs
  )
  decimalSpec: ProductDecimalSpecs;
}
