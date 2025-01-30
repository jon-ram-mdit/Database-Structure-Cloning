import { ViewEntity, ViewColumn, DataSource } from "typeorm";
import { BrandsModels } from "./models";
import { VariantsYears } from "./year";
import { ModelsVariants } from "./variants";

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("model.brand_model_id","modelId")
      .addSelect("MAX(endYear.year_release_date)", "latestReleaseDate")
      .from(BrandsModels, "model")
      .innerJoin(
        ModelsVariants,
        "variant",
        "model.brand_model_id = variant.brandModelBrandModelId"
      )
      .innerJoin(
        VariantsYears,
        "endYear",
        "variant.model_variant_id= endYear.yearVariantModelVariantId"
      )
      .groupBy("model.brand_model_id")
})
export class ModelLatestReleaseYear {
  @ViewColumn()
  modelId: string;

  @ViewColumn()
  latestReleaseDate: Date;
}
