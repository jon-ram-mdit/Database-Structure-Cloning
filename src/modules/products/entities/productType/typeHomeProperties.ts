import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductTextSpecs } from "../properties/textSpecs";
import { ProductTypes } from "./productTypes";
import { HomePropertiesValues } from "./homePropertiesValues";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ImageUrlPrefixTransformer } from "../../../../utils/entities/ImageUrlTransformer";

@Entity()
@Index("type_home_property", ["productType", "homeProperty"], { unique: true })
export class TypeHomeProperties extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  home_property_id: string;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  image_url: string;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  default_value_image_url: string;

  @ManyToOne(() => ProductTypes, (productType) => productType.homeProperties)
  productType: ProductTypes;

  @ManyToOne(() => ProductTextSpecs, (textSpec) => textSpec.homeProperties)
  homeProperty: ProductTextSpecs;

  @OneToMany(
    () => HomePropertiesValues,
    (homePropertyValues) => homePropertyValues.homeProperty
  )
  homePropertyValues: HomePropertiesValues[];
}
