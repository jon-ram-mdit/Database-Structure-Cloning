import { MigrationInterface, QueryRunner } from "typeorm";

export class Filter1704778530037 implements MigrationInterface {
    name = 'Filter1704778530037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","variant_latest_year","public"]);
        await queryRunner.query(`DROP VIEW "variant_latest_year"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`CREATE VIEW "variant_latest_year" AS SELECT "year"."model_variant_id" AS "variantId", "year"."variant_year_id" AS "yearId", "year"."year_release_date" AS "releaseDate", "year"."actual_price" AS "price" FROM (SELECT "variant"."model_variant_id", "endYear"."variant_year_id", "endYear"."year_release_date", "endYear"."actual_price", ROW_NUMBER() OVER (PARTITION BY "variant"."model_variant_id" ORDER BY "endYear"."year_release_date" DESC) AS row_num FROM "models_variants" "variant" INNER JOIN "variants_years" "endYear" ON  "variant"."model_variant_id" = "endYear"."yearVariantModelVariantId" AND "endYear"."deleted_date" IS NULL WHERE "variant"."deleted_date" IS NULL) "year" WHERE "year"."row_num" = 1`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","variant_latest_year","SELECT \"year\".\"model_variant_id\" AS \"variantId\", \"year\".\"variant_year_id\" AS \"yearId\", \"year\".\"year_release_date\" AS \"releaseDate\", \"year\".\"actual_price\" AS \"price\" FROM (SELECT \"variant\".\"model_variant_id\", \"endYear\".\"variant_year_id\", \"endYear\".\"year_release_date\", \"endYear\".\"actual_price\", ROW_NUMBER() OVER (PARTITION BY \"variant\".\"model_variant_id\" ORDER BY \"endYear\".\"year_release_date\" DESC) AS row_num FROM \"models_variants\" \"variant\" INNER JOIN \"variants_years\" \"endYear\" ON  \"variant\".\"model_variant_id\" = \"endYear\".\"yearVariantModelVariantId\" AND \"endYear\".\"deleted_date\" IS NULL WHERE \"variant\".\"deleted_date\" IS NULL) \"year\" WHERE \"year\".\"row_num\" = 1"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","variant_latest_year","public"]);
        await queryRunner.query(`DROP VIEW "variant_latest_year"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`CREATE VIEW "variant_latest_year" AS WITH RankedYears AS (
    SELECT
        variant.model_variant_id,
        endYear.variant_year_id,
        endYear.year_release_date,
        endYear.actual_price,
        ROW_NUMBER() OVER (
            PARTITION BY variant.model_variant_id
            ORDER BY
                endYear.year_release_date DESC
        ) AS row_num
    FROM
        models_variants AS variant
        INNER JOIN variants_years AS endYear ON variant.model_variant_id = endYear."yearVariantModelVariantId"
)
SELECT
model_variant_id as variantId,
variant_year_id as yearId,
year_release_date as releaseDate,
actual_price as price
FROM RankedYears
WHERE row_num = 1`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","variant_latest_year","WITH RankedYears AS (\n    SELECT\n        variant.model_variant_id,\n        endYear.variant_year_id,\n        endYear.year_release_date,\n        endYear.actual_price,\n        ROW_NUMBER() OVER (\n            PARTITION BY variant.model_variant_id\n            ORDER BY\n                endYear.year_release_date DESC\n        ) AS row_num\n    FROM\n        models_variants AS variant\n        INNER JOIN variants_years AS endYear ON variant.model_variant_id = endYear.\"yearVariantModelVariantId\"\n)\nSELECT\nmodel_variant_id as variantId,\nvariant_year_id as yearId,\nyear_release_date as releaseDate,\nactual_price as price\nFROM RankedYears\nWHERE row_num = 1"]);
    }

}
