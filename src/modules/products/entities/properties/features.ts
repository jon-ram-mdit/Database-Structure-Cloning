import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { SubTypesPropCatFeatures } from "../sub-type/property-category/propCatFeatures";
import { KeyFeatures } from "../sub-type/key-specs/keyFeatures";

@Entity()
export class ProductFeatures extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  product_feature_id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => SubTypesPropCatFeatures,
    (subTypePropCatFeature) => subTypePropCatFeature.feature
  )
  subTypePropCatFeatures: SubTypesPropCatFeatures[];

  @OneToMany(
    () => KeyFeatures,
    (subTypeKeyFeature) => subTypeKeyFeature.feature
  )
  subTypeKeyFeatures: KeyFeatures[];
}
