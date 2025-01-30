import { DataSource, ViewColumn, ViewEntity } from "typeorm";
import { VariantsYears } from "./year";
import { ModelsVariants } from "./variants";

// @ViewEntity({
//   expression: `
//   WITH RankedYears AS (
//     SELECT
//         variant.model_variant_id,
//         endYear.variant_year_id,
//         endYear.year_release_date,
//         endYear.actual_price,
//         ROW_NUMBER() OVER (
//             PARTITION BY variant.model_variant_id
//             ORDER BY
//                 endYear.year_release_date DESC
//         ) AS row_num
//     FROM
//         models_variants AS variant
//         INNER JOIN variants_years AS endYear ON variant.model_variant_id = endYear."yearVariantModelVariantId"
// )
// SELECT
// model_variant_id as variantId,
// variant_year_id as yearId,
// year_release_date as releaseDate,
// actual_price as price
// FROM RankedYears
// WHERE row_num = 1
//     `,
// })

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('"year"."model_variant_id"', "variantId")
      .addSelect('"year"."variant_year_id"', "yearId")
      .addSelect('"year"."year_release_date"', "releaseDate")
      .addSelect('"year"."actual_price"', "price")
      .from(
        (subQuery) =>
          subQuery
            .addSelect([
              '"variant"."model_variant_id"',
              '"endYear"."variant_year_id"',
              '"endYear"."year_release_date"',
              '"endYear"."actual_price"',
              'ROW_NUMBER() OVER (PARTITION BY variant.model_variant_id ORDER BY "endYear"."year_release_date" DESC) AS row_num',
            ])
            .from(ModelsVariants, "variant")
            .innerJoin(
              VariantsYears,
              "endYear",
              "variant.model_variant_id = endYear.yearVariantModelVariantId"
            ),
        "year"
      )
      .where('"year"."row_num" = 1'),
})
export class VariantLatestYear {
  @ViewColumn()
  variantId: string;

  @ViewColumn()
  yearId: string;

  @ViewColumn()
  releaseDate: Date;

  @ViewColumn()
  price: number;
}
