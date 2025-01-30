import {
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { ProductIntSpecs } from "../../properties/intSpecs";
import { ProductSubTypes } from "../subType";

@Entity()
@Index("subtype_key_int_spec", ["subType", "intSpec"], { unique: true })
export class KeyIntSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  sub_type_key_spec_dec_spec_id: string;

  @ManyToOne(
    () => ProductSubTypes,
    (productSubType) => productSubType.keyIntSpecs
  )
  subType: ProductSubTypes;

  @ManyToOne(
    () => ProductIntSpecs,
    (prodDecSpec) => prodDecSpec.subTypeKeyIntSpecs
  )
  intSpec: ProductIntSpecs;
}
