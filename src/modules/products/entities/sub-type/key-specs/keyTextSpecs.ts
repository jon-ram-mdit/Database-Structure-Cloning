import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { ProductTextSpecs } from "../../properties/textSpecs";
import { ProductSubTypes } from "../subType";

@Entity()
@Index("subtype_key_text_spec", ["subType", "textSpec"], { unique: true })
export class KeyTextSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  sub_type_key_spec_text_spec_id: string;

  @ManyToOne(
    () => ProductSubTypes,
    (productSubType) => productSubType.keyTextSpecs
  )
  subType: ProductSubTypes;

  @ManyToOne(
    () => ProductTextSpecs,
    (prodDecSpec) => prodDecSpec.subTypeKeyTextSpecs
  )
  textSpec: ProductTextSpecs;

}
