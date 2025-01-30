import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductTypes } from "../productType/productTypes";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { SubTypesPropCat } from "./property-category/subTypePropCat";
import { OuterDecimalSpecs } from "./outer-specs/outerDecimalSpecs";
import { OuterIntSpecs } from "./outer-specs/outerIntSpecs";
import { OuterTextSpecs } from "./outer-specs/outerTextSpecs";
import { KeyDecimalSpecs } from "./key-specs/keyDecimalSpecs";
import { KeyIntSpecs } from "./key-specs/keyIntSpecs";
import { KeyTextSpecs } from "./key-specs/keyTextSpecs";
import { KeyFeatures } from "./key-specs/keyFeatures";
import { VariantsYears } from "../end-product/year";

export enum SubTypeTypes {
  B = "Base SubType",
  NB = "Non Base SubType",
}

export enum SubTypeRelations {
  PT = "productType",
}

@Entity()
export class ProductSubTypes extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  product_sub_type_id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    type: "enum",
    enum: SubTypeTypes,
    default: SubTypeTypes.NB,
  })
  type: SubTypeTypes;

  @ManyToOne(() => ProductTypes, (productType) => productType.subTypes)
  productType: ProductTypes;

  @OneToMany(
    () => SubTypesPropCat,
    (prodSubTypePropCat) => prodSubTypePropCat.subType
  )
  propCat: SubTypesPropCat[];

  // Key specifications
  @OneToMany(
    () => KeyDecimalSpecs,
    (subTypeKeySpecsDecSpecs) => subTypeKeySpecsDecSpecs.subType
  )
  keyDecSpecs: KeyDecimalSpecs[];

  @OneToMany(
    () => KeyIntSpecs,
    (subTypeKeySpecsIntSpecs) => subTypeKeySpecsIntSpecs.subType
  )
  keyIntSpecs: KeyIntSpecs[];

  @OneToMany(
    () => KeyTextSpecs,
    (subTypeKeySpecsTextSpecs) => subTypeKeySpecsTextSpecs.subType
  )
  keyTextSpecs: KeyTextSpecs[];

  // key features
  @OneToMany(() => KeyFeatures, (keyFeature) => keyFeature.subType)
  keyFeatures: KeyFeatures[];

  // outer specifications
  @OneToMany(
    () => OuterDecimalSpecs,
    (subTypeOuterSpecsDecSpecs) => subTypeOuterSpecsDecSpecs.subType
  )
  outerDecSpecs: OuterDecimalSpecs[];

  @OneToMany(
    () => OuterIntSpecs,
    (subTypeOuterSpecsIntSpecs) => subTypeOuterSpecsIntSpecs.subType
  )
  outerIntSpecs: OuterIntSpecs[];

  @OneToMany(
    () => OuterTextSpecs,
    (subTypeOuterSpecsTextSpecs) => subTypeOuterSpecsTextSpecs.subType
  )
  outerTextSpecs: OuterTextSpecs[];

  // year end products
  @OneToMany(() => VariantsYears, (variantYear) => variantYear.subType)
  yearEndProducts: VariantsYears[];
}
