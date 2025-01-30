import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ProductTypes } from "../productType/productTypes";
import { SubTypesPropCat } from "../sub-type/property-category/subTypePropCat";
import { ImageUrlPrefixTransformer } from "../../../../utils/entities/ImageUrlTransformer";

@Entity()
export class ProductPropCat extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  product_prop_cat_id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    default: `https://d1nfarxkt267md.cloudfront.net/development/propertyCategory/testPropCat.svg`,
    transformer: new ImageUrlPrefixTransformer(),
  })
  image_url: string;

  @ManyToMany(() => ProductTypes, (productType) => productType.propCat)
  productTypes: ProductTypes[];

  @OneToMany(() => SubTypesPropCat, (subTypePropCat) => subTypePropCat.propCat)
  propCatProp: SubTypesPropCat[];
}
