import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { ProductIntSpecs } from "../../properties/intSpecs";
import { ProductSubTypes } from "../subType";
import { YearOuterIntSpecValues } from "../../end-product/yearOuterValues/yearOuterIntSpecValues";
import { ImageUrlPrefixTransformer } from "../../../../../utils/entities/ImageUrlTransformer";

@Entity()
@Index("outer_spec_int_spec", ["subType", "intSpec"], { unique: true })
export class OuterIntSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  sub_type_outer_spec_int_spec_id: string;

  @Column({ type: "text", transformer: new ImageUrlPrefixTransformer() })
  image_url: string;

  @Column({ type: "boolean", default: true })
  for_home_screen: boolean;

  @ManyToOne(
    () => ProductSubTypes,
    (productSubType) => productSubType.outerIntSpecs
  )
  subType: ProductSubTypes;

  @ManyToOne(
    () => ProductIntSpecs,
    (prodDecSpec) => prodDecSpec.subTypeOuterIntSpecs
  )
  intSpec: ProductIntSpecs;

  @OneToMany(
    () => YearOuterIntSpecValues,
    (yearOuterIntSpecValue) => yearOuterIntSpecValue.outerIntSpec
  )
  yearOuterValues: YearOuterIntSpecValues[];
}
