import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../../utils/entities/DateTimeAbstract";
import { ProductPropCat } from "../../properties/propCat";
import { SubTypesPropCatFeatures } from "./propCatFeatures";
import { SubTypesPropCatIntSpecs } from "./propCatIntSpecs";
import { SubTypesPropCatDecimalSpecs } from "./propCatDecimalSpecs";
import { SubTypesPropCatTextSpecs } from "./propCatTextSpecs";
import { ProductSubTypes } from "../subType";

export enum propertyType {
  B = "Base",
  D = "Derived",
}

@Entity()
@Index("subtype_property_category", ["subType", "propCat"], { unique: true })
export class SubTypesPropCat extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  subtype_property_category_id: string;

  @Column({
    type: "enum",
    enum: propertyType,
    default: propertyType.B,
  })
  type: propertyType;

  @ManyToOne(() => ProductSubTypes, (prodSubType) => prodSubType.propCat)
  subType: ProductSubTypes;

  @ManyToOne(() => ProductPropCat, (prodPropCat) => prodPropCat.propCatProp)
  propCat: ProductPropCat;

  @OneToMany(
    () => SubTypesPropCatFeatures,
    (subTypePropCatFeatures) => subTypePropCatFeatures.subTypePropCat
  )
  propCatFeatures: SubTypesPropCatFeatures[];

  @OneToMany(
    () => SubTypesPropCatIntSpecs,
    (subTypePropCatIntSpecs) => subTypePropCatIntSpecs.subTypePropCat
  )
  propCatIntSpecs: SubTypesPropCatIntSpecs[];

  @OneToMany(
    () => SubTypesPropCatDecimalSpecs,
    (subTypePropCatDecSpec) => subTypePropCatDecSpec.subTypePropCat
  )
  propCatDecimalSpecs: SubTypesPropCatDecimalSpecs[];

  @OneToMany(
    () => SubTypesPropCatTextSpecs,
    (subTypePropCatTextSpec) => subTypePropCatTextSpec.subTypePropCat
  )
  propCatTextSpecs: SubTypesPropCatTextSpecs[];
}
