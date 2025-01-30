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
import { YearOuterTextSpecValues } from "../../end-product/yearOuterValues/yearOuterTextSpecValues";
import { ImageUrlPrefixTransformer } from "../../../../../utils/entities/ImageUrlTransformer";

@Entity()
@Index("outer_spec_text_spec", ["subType", "textSpec"], { unique: true })
export class OuterTextSpecs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  sub_type_outer_spec_text_spec_id: string;

  @Column({ type: "text", transformer: new ImageUrlPrefixTransformer() })
  image_url: string;

  @Column({ type: "boolean", default: true })
  for_home_screen: boolean;

  @ManyToOne(
    () => ProductSubTypes,
    (productSubType) => productSubType.outerTextSpecs
  )
  subType: ProductSubTypes;

  @ManyToOne(
    () => ProductTextSpecs,
    (prodDecSpec) => prodDecSpec.subTypeOuterTextSpecs
  )
  textSpec: ProductTextSpecs;

  @OneToMany(
    () => YearOuterTextSpecValues,
    (yearOuterTextSpecValue) => yearOuterTextSpecValue.outerTextSpec
  )
  yearOuterValues: YearOuterTextSpecValues[];
}
