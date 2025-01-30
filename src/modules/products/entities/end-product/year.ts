import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ModelsVariants } from "./variants";
import { ProductSubTypes } from "../sub-type/subType";
import { YearTextSpecValues } from "./yearValues/yearTextSpecValues";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { YearIntSpecValues } from "./yearValues/yearIntSpecValues";
import {
  YearDecimalSpecValues,
  decimalTransformer,
} from "./yearValues/yearDecimalSpecValues";
import { YearFeaturesValues } from "./yearValues/yearFeaturesValues";
import { YearOuterTextSpecValues } from "./yearOuterValues/yearOuterTextSpecValues";
import { YearOuterIntSpecValues } from "./yearOuterValues/yearOuterIntSpecValues";
import { YearOuterDecimalSpecValues } from "./yearOuterValues/yearOuterDecimalSpecValues";
import { YearColors } from "./yearColors";
import { UserDetailListings } from "../../../users/entities/detailListing/detailListing";
import { InventoryProduct } from "../../../Vendor/entities/InventoryProduct";
import { UserVehicleInfoWishList } from "../../../users/entities/wishList/vehicleInfo";
import { YearImages } from "./yearImages";
import { ImageUrlPrefixTransformer } from "../../../../utils/entities/ImageUrlTransformer";

export enum YearValuesType {
  D = "Default Value",
  ND = "Non-Default Value",
}

export enum YearAddingValuesType {
  DS = "Decimal Specification",
  IS = "Int Specification",
  TS = "Text Specifications",
  F = "Feature",
}

@Entity()
export class VariantsYears extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  variant_year_id: string;

  @Column()
  year: number;

  @Column({ type: "decimal", transformer: decimalTransformer })
  actual_price: number;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  year_image_url: string;

  @Column({ type: "date", default: "2023-07-10" })
  year_release_date: Date;

  @ManyToOne(() => ModelsVariants, (modelVariant) => modelVariant.years)
  yearVariant: ModelsVariants;

  @ManyToOne(
    () => ProductSubTypes,
    (productSubType) => productSubType.yearEndProducts
  )
  subType: ProductSubTypes;

  // end year product
  // property category properties
  // actual values
  @OneToMany(
    () => YearTextSpecValues,
    (yearTextSpecValue) => yearTextSpecValue.variantYear
  )
  yearTextSpecValues: YearTextSpecValues[];

  @OneToMany(
    () => YearIntSpecValues,
    (yearIntSpecValue) => yearIntSpecValue.variantYear
  )
  yearIntSpecValues: YearIntSpecValues[];

  @OneToMany(
    () => YearDecimalSpecValues,
    (yearDecimalSpecValue) => yearDecimalSpecValue.variantYear
  )
  yearDecimalSpecValues: YearDecimalSpecValues[];

  @OneToMany(
    () => YearFeaturesValues,
    (yearFeaturesValue) => yearFeaturesValue.variantYear
  )
  yearFeaturesValues: YearFeaturesValues[];

  // year outer specs values

  @OneToMany(
    () => YearOuterTextSpecValues,
    (yearOuterTextSpecValue) => yearOuterTextSpecValue.variantYear
  )
  yearOuterTextSpecValues: YearOuterTextSpecValues[];

  @OneToMany(
    () => YearOuterIntSpecValues,
    (yearOuterIntSpecValue) => yearOuterIntSpecValue.variantYear
  )
  yearOuterIntSpecValues: YearOuterIntSpecValues[];

  @OneToMany(
    () => YearOuterDecimalSpecValues,
    (yearOuterDecimalSpecValue) => yearOuterDecimalSpecValue.variantYear
  )
  yearOuterDecimalSpecValues: YearOuterDecimalSpecValues[];

  // end year product color available
  @OneToMany(() => YearColors, (yearColor) => yearColor.variantYear)
  colors: YearColors[];

  // end year product image gallery
  @OneToMany(() => YearImages, (images) => images.endYearVehicle)
  images: YearImages[];

  @OneToMany(
    () => UserDetailListings,
    (userDetailListing) => userDetailListing.endYearVehicle
  )
  userDetailListing: UserDetailListings[];

  // Vendor Relation
  @OneToMany(
    () => InventoryProduct,
    (inventoryProduct) => inventoryProduct.vehicle
  )
  inventoryProducts: InventoryProduct[];

  // user vehicle information wishlist
  @OneToMany(
    () => UserVehicleInfoWishList,
    (vehicleInfoWishList) => vehicleInfoWishList.endYearVehicle
  )
  vehicleInfoWishList: UserVehicleInfoWishList[];
}
