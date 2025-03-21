import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BrandsModels } from "./models";
import { VariantsYears } from "./year";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { BikeDekhoPreBulkUploadStore } from "./BikeDekhoPreBulkUploadStore";
import { CarPreYearBulkUploadStore } from "./CarPreYearBulkUploadStore";

export enum VariantsRelations {
  M = "brandModel",
  Y = "years",
}

@Entity()
export class ModelsVariants extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  model_variant_id: string;

  @Column()
  variant_name: string;

  @Column()
  variant_description: string;

  @ManyToOne(
    () => BrandsModels,
    (productBrandModel) => productBrandModel.variants
  )
  brandModel: BrandsModels;

  @OneToMany(() => VariantsYears, (variantYear) => variantYear.yearVariant)
  years: VariantsYears[];

  @OneToMany(
    () => CarPreYearBulkUploadStore,
    (preBulkUpload) => preBulkUpload.variant
  )
  store: CarPreYearBulkUploadStore[];

  @OneToMany(
    () => BikeDekhoPreBulkUploadStore,
    (preBulkUpload) => preBulkUpload.variant
  )
  bikeDekhoStore: BikeDekhoPreBulkUploadStore[];
}
