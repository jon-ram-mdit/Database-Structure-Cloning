import { MigrationInterface, QueryRunner } from "typeorm";

export class WishListAndInventory1704276687145 implements MigrationInterface {
    name = 'WishListAndInventory1704276687145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_vehicle_info_wish_lists_variants_years" ("usersUserId" uuid NOT NULL, "variantsYearsVariantYearId" uuid NOT NULL, CONSTRAINT "PK_68b0d89e056290e4d191ce24ac0" PRIMARY KEY ("usersUserId", "variantsYearsVariantYearId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0a941261edd0299ee736368782" ON "users_vehicle_info_wish_lists_variants_years" ("usersUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_722333fbb589c6654b518dcb7f" ON "users_vehicle_info_wish_lists_variants_years" ("variantsYearsVariantYearId") `);
        await queryRunner.query(`CREATE TABLE "users_detail_listing_wish_lists_user_detail_listings" ("usersUserId" uuid NOT NULL, "userDetailListingsUserDetailListingId" uuid NOT NULL, CONSTRAINT "PK_2d78c52595c7df834b6eab37610" PRIMARY KEY ("usersUserId", "userDetailListingsUserDetailListingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bbbf1137edc20be9d031549b7a" ON "users_detail_listing_wish_lists_user_detail_listings" ("usersUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce633e51a75e9ea4efdaf1a558" ON "users_detail_listing_wish_lists_user_detail_listings" ("userDetailListingsUserDetailListingId") `);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD "inStock" boolean NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."user_detail_listings_status_enum" RENAME TO "user_detail_listings_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_status_enum" AS ENUM('Running', 'Hold', 'Sold', 'Expired', 'Deleted')`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" TYPE "public"."user_detail_listings_status_enum" USING "status"::"text"::"public"."user_detail_listings_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" SET DEFAULT 'Running'`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "users_vehicle_info_wish_lists_variants_years" ADD CONSTRAINT "FK_0a941261edd0299ee7363687822" FOREIGN KEY ("usersUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_vehicle_info_wish_lists_variants_years" ADD CONSTRAINT "FK_722333fbb589c6654b518dcb7fe" FOREIGN KEY ("variantsYearsVariantYearId") REFERENCES "variants_years"("variant_year_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_detail_listing_wish_lists_user_detail_listings" ADD CONSTRAINT "FK_bbbf1137edc20be9d031549b7a2" FOREIGN KEY ("usersUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_detail_listing_wish_lists_user_detail_listings" ADD CONSTRAINT "FK_ce633e51a75e9ea4efdaf1a5583" FOREIGN KEY ("userDetailListingsUserDetailListingId") REFERENCES "user_detail_listings"("user_detail_listing_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`CREATE VIEW "model_latest_release_year" AS SELECT "model"."brand_model_id" AS "modelId", MAX("endYear"."year_release_date") AS "latestReleaseDate" FROM "brands_models" "model" INNER JOIN "models_variants" "variant" ON  "model"."brand_model_id" = "variant"."brandModelBrandModelId" AND "variant"."deleted_date" IS NULL  INNER JOIN "variants_years" "endYear" ON  "variant"."model_variant_id"= "endYear"."yearVariantModelVariantId" AND "endYear"."deleted_date" IS NULL WHERE "model"."deleted_date" IS NULL GROUP BY "model"."brand_model_id"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","model_latest_release_year","SELECT \"model\".\"brand_model_id\" AS \"modelId\", MAX(\"endYear\".\"year_release_date\") AS \"latestReleaseDate\" FROM \"brands_models\" \"model\" INNER JOIN \"models_variants\" \"variant\" ON  \"model\".\"brand_model_id\" = \"variant\".\"brandModelBrandModelId\" AND \"variant\".\"deleted_date\" IS NULL  INNER JOIN \"variants_years\" \"endYear\" ON  \"variant\".\"model_variant_id\"= \"endYear\".\"yearVariantModelVariantId\" AND \"endYear\".\"deleted_date\" IS NULL WHERE \"model\".\"deleted_date\" IS NULL GROUP BY \"model\".\"brand_model_id\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","model_latest_release_year","public"]);
        await queryRunner.query(`DROP VIEW "model_latest_release_year"`);
        await queryRunner.query(`ALTER TABLE "users_detail_listing_wish_lists_user_detail_listings" DROP CONSTRAINT "FK_ce633e51a75e9ea4efdaf1a5583"`);
        await queryRunner.query(`ALTER TABLE "users_detail_listing_wish_lists_user_detail_listings" DROP CONSTRAINT "FK_bbbf1137edc20be9d031549b7a2"`);
        await queryRunner.query(`ALTER TABLE "users_vehicle_info_wish_lists_variants_years" DROP CONSTRAINT "FK_722333fbb589c6654b518dcb7fe"`);
        await queryRunner.query(`ALTER TABLE "users_vehicle_info_wish_lists_variants_years" DROP CONSTRAINT "FK_0a941261edd0299ee7363687822"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_status_enum_old" AS ENUM('Running', 'Hold', 'Sold', 'Expired')`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" TYPE "public"."user_detail_listings_status_enum_old" USING "status"::"text"::"public"."user_detail_listings_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" SET DEFAULT 'Running'`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_detail_listings_status_enum_old" RENAME TO "user_detail_listings_status_enum"`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP COLUMN "inStock"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce633e51a75e9ea4efdaf1a558"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bbbf1137edc20be9d031549b7a"`);
        await queryRunner.query(`DROP TABLE "users_detail_listing_wish_lists_user_detail_listings"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_722333fbb589c6654b518dcb7f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a941261edd0299ee736368782"`);
        await queryRunner.query(`DROP TABLE "users_vehicle_info_wish_lists_variants_years"`);
    }

}
