import { MigrationInterface, QueryRunner } from "typeorm";

export class DealsWishList1704607120679 implements MigrationInterface {
    name = 'DealsWishList1704607120679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_vehicle_info_wish_list" ("vehicle_info_wishlist_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, "endYearVehicleVariantYearId" uuid, CONSTRAINT "PK_c51cc5c8ca8aa1257dd2477f9f5" PRIMARY KEY ("vehicle_info_wishlist_id"))`);
        await queryRunner.query(`CREATE TABLE "user_detail_listing_wish_list" ("detail_listing_wishlist_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, "detailListingUserDetailListingId" uuid, CONSTRAINT "PK_fae77efbe665536d8e159fc4b57" PRIMARY KEY ("detail_listing_wishlist_id"))`);
        await queryRunner.query(`CREATE TABLE "user_showroom_deals_wish_list" ("detail_listing_wishlist_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, "showroomDealInventoryProductId" uuid, CONSTRAINT "PK_ff4668df32aaad3878faca98572" PRIMARY KEY ("detail_listing_wishlist_id"))`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "user_vehicle_info_wish_list" ADD CONSTRAINT "FK_ad422899ed4d2370d1b57eb2fed" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_vehicle_info_wish_list" ADD CONSTRAINT "FK_9b5835fffff5c8fda6be93c3520" FOREIGN KEY ("endYearVehicleVariantYearId") REFERENCES "variants_years"("variant_year_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_detail_listing_wish_list" ADD CONSTRAINT "FK_8af8fdf59fd7620260ad26f8ac9" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_detail_listing_wish_list" ADD CONSTRAINT "FK_f92b7df78d2da0372367da3ab01" FOREIGN KEY ("detailListingUserDetailListingId") REFERENCES "user_detail_listings"("user_detail_listing_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_showroom_deals_wish_list" ADD CONSTRAINT "FK_be08bf69aaf13bd190a441847a7" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_showroom_deals_wish_list" ADD CONSTRAINT "FK_c52a58368cf2e6a9b022a4d6b03" FOREIGN KEY ("showroomDealInventoryProductId") REFERENCES "inventory_product"("inventoryProduct_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE VIEW "variant_latest_year" AS 
  WITH RankedYears AS (
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
WHERE row_num = 1
    `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","variant_latest_year","WITH RankedYears AS (\n    SELECT\n        variant.model_variant_id,\n        endYear.variant_year_id,\n        endYear.year_release_date,\n        endYear.actual_price,\n        ROW_NUMBER() OVER (\n            PARTITION BY variant.model_variant_id\n            ORDER BY\n                endYear.year_release_date DESC\n        ) AS row_num\n    FROM\n        models_variants AS variant\n        INNER JOIN variants_years AS endYear ON variant.model_variant_id = endYear.\"yearVariantModelVariantId\"\n)\nSELECT\nmodel_variant_id as variantId,\nvariant_year_id as yearId,\nyear_release_date as releaseDate,\nactual_price as price\nFROM RankedYears\nWHERE row_num = 1"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","variant_latest_year","public"]);
        await queryRunner.query(`DROP VIEW "variant_latest_year"`);
        await queryRunner.query(`ALTER TABLE "user_showroom_deals_wish_list" DROP CONSTRAINT "FK_c52a58368cf2e6a9b022a4d6b03"`);
        await queryRunner.query(`ALTER TABLE "user_showroom_deals_wish_list" DROP CONSTRAINT "FK_be08bf69aaf13bd190a441847a7"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listing_wish_list" DROP CONSTRAINT "FK_f92b7df78d2da0372367da3ab01"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listing_wish_list" DROP CONSTRAINT "FK_8af8fdf59fd7620260ad26f8ac9"`);
        await queryRunner.query(`ALTER TABLE "user_vehicle_info_wish_list" DROP CONSTRAINT "FK_9b5835fffff5c8fda6be93c3520"`);
        await queryRunner.query(`ALTER TABLE "user_vehicle_info_wish_list" DROP CONSTRAINT "FK_ad422899ed4d2370d1b57eb2fed"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`DROP TABLE "user_showroom_deals_wish_list"`);
        await queryRunner.query(`DROP TABLE "user_detail_listing_wish_list"`);
        await queryRunner.query(`DROP TABLE "user_vehicle_info_wish_list"`);
    }

}
