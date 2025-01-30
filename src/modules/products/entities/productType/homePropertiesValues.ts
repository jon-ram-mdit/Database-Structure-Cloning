import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductTextSpecsValues } from "../properties/textSpecsValues";
import { TypeHomeProperties } from "./typeHomeProperties";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ImageUrlPrefixTransformer } from "../../../../utils/entities/ImageUrlTransformer";

export enum HomePropImageType {
  D = "Default",
  ND = "Non Default",
}

@Entity()
export class HomePropertiesValues extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  home_property_value_id: string;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  image_url: string;

  @Column({
    type: "enum",
    enum: HomePropImageType,
    default: HomePropImageType.D,
  })
  image_type: HomePropImageType;

  @ManyToOne(
    () => TypeHomeProperties,
    (homeProperties) => homeProperties.homePropertyValues
  )
  homeProperty: TypeHomeProperties;

  @ManyToOne(
    () => ProductTextSpecsValues,
    (textSpecValue) => textSpecValue.homePropertyValues
  )
  textSpecValue: ProductTextSpecsValues;
}
