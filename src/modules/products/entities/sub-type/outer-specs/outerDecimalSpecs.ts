import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { ProductDecimalSpecs } from "../../properties/decimalSpecs";
import { ProductSubTypes } from "../subType";
import { YearOuterDecimalSpecValues } from "../../end-product/yearOuterValues/yearOuterDecimalSpecValues";
import { ImageUrlPrefixTransformer } from "../../../../../utils/entities/ImageUrlTransformer";

@Entity()
@Index("outer_spec_dec_spec", ["subType", "decimalSpec"], { unique: true })
export class OuterDecimalSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  sub_type_outer_spec_decimal_spec_id: string;

  @Column({ type: "text", transformer: new ImageUrlPrefixTransformer() })
  image_url: string;

  @Column({ type: "boolean", default: true })
  for_home_screen: boolean;

  @ManyToOne(
    () => ProductSubTypes,
    (productSubType) => productSubType.outerDecSpecs
  )
  subType: ProductSubTypes;

  @ManyToOne(
    () => ProductDecimalSpecs,
    (prodDecSpec) => prodDecSpec.subTypeOuterDecSpecs
  )
  decimalSpec: ProductDecimalSpecs;

  @OneToMany(
    () => YearOuterDecimalSpecValues,
    (yearOuterDecimalSpecValue) => yearOuterDecimalSpecValue.outerDecSpec
  )
  yearOuterValues: YearOuterDecimalSpecValues[];
}
