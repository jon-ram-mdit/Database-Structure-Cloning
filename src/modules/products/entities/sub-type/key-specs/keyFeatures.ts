import { Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { ProductSubTypes } from "../subType";
import { ProductFeatures } from "../../properties/features";

@Entity()
@Index("subtype_key_feature", ["subType", "feature"], { unique: true })
export class KeyFeatures extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  sub_type_key_feature_id: string;

  @ManyToOne(
    () => ProductSubTypes,
    (productSubType) => productSubType.keyFeatures
  )
  subType: ProductSubTypes;

  @ManyToOne(
    () => ProductFeatures,
    (prodFeature) => prodFeature.subTypeKeyFeatures
  )
  feature: ProductFeatures;
}
