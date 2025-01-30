import { MigrationInterface, QueryRunner } from "typeorm";

export class InventoryChanges1713179343459 implements MigrationInterface {
    name = 'InventoryChanges1713179343459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventory_product_colors_year_colors" ("inventoryProductInventoryProductId" uuid NOT NULL, "yearColorsYearColorId" uuid NOT NULL, CONSTRAINT "PK_fc4209c7abdc06bb10004c603df" PRIMARY KEY ("inventoryProductInventoryProductId", "yearColorsYearColorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3bfedcb98e262d3da96f821bcc" ON "inventory_product_colors_year_colors" ("inventoryProductInventoryProductId") `);
        await queryRunner.query(`CREATE INDEX "IDX_25a3e7e1da13e1b500863e2f96" ON "inventory_product_colors_year_colors" ("yearColorsYearColorId") `);
        await queryRunner.query(`ALTER TABLE "showrooms" DROP COLUMN "display_address"`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP COLUMN "originalPrice"`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP COLUMN "sellingPrice"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "location_address"`);
        await queryRunner.query(`ALTER TABLE "showrooms" ADD "display_district" character varying NOT NULL DEFAULT 'Bhaktapur'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ADD "display_local" character varying NOT NULL DEFAULT 'Sallaghari'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ADD "districtDistrictId" uuid`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD "expiry" TIMESTAMP NOT NULL DEFAULT '"2024-04-29T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD "edited_price" integer NOT NULL DEFAULT '1000000'`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD "price" integer NOT NULL DEFAULT '500000'`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD "isFinance" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`CREATE TYPE "public"."inventory_product_status_enum" AS ENUM('Running', 'Hold', 'Sold', 'Expired', 'Deleted', 'Draft')`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD "status" "public"."inventory_product_status_enum" NOT NULL DEFAULT 'Running'`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "display_district" character varying NOT NULL DEFAULT 'Bhaktapur'`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "display_local" character varying NOT NULL DEFAULT 'Sallaghari'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TYPE "public"."user_detail_listings_status_enum" RENAME TO "user_detail_listings_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_status_enum" AS ENUM('Draft', 'Running', 'Hold', 'Sold', 'Expired', 'Deleted')`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" TYPE "public"."user_detail_listings_status_enum" USING "status"::"text"::"public"."user_detail_listings_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" SET DEFAULT 'Running'`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "display_picture_url" SET DEFAULT 'https://mdit-automobile-project-s3-bucket.s3.ap-south-1.amazonaws.com/static-image-contents/home-page-logos/DefaultDP.jpg'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ADD CONSTRAINT "FK_3a6be8f3489bbaf8b09d7061eca" FOREIGN KEY ("districtDistrictId") REFERENCES "districts"("district_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_product_colors_year_colors" ADD CONSTRAINT "FK_3bfedcb98e262d3da96f821bcc6" FOREIGN KEY ("inventoryProductInventoryProductId") REFERENCES "inventory_product"("inventoryProduct_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "inventory_product_colors_year_colors" ADD CONSTRAINT "FK_25a3e7e1da13e1b500863e2f965" FOREIGN KEY ("yearColorsYearColorId") REFERENCES "year_colors"("year_color_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_product_colors_year_colors" DROP CONSTRAINT "FK_25a3e7e1da13e1b500863e2f965"`);
        await queryRunner.query(`ALTER TABLE "inventory_product_colors_year_colors" DROP CONSTRAINT "FK_3bfedcb98e262d3da96f821bcc6"`);
        await queryRunner.query(`ALTER TABLE "showrooms" DROP CONSTRAINT "FK_3a6be8f3489bbaf8b09d7061eca"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "display_picture_url" SET DEFAULT 'https://mdit-automobile-project-s3-bucket.s3.ap-south-1.amazonaws.com/static-image-contents/home-page-logos/userProfilePicture.png'`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_status_enum_old" AS ENUM('Running', 'Hold', 'Sold', 'Expired', 'Deleted')`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" TYPE "public"."user_detail_listings_status_enum_old" USING "status"::"text"::"public"."user_detail_listings_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "status" SET DEFAULT 'Running'`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_detail_listings_status_enum_old" RENAME TO "user_detail_listings_status_enum"`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "display_local"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "display_district"`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_product_status_enum"`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP COLUMN "isFinance"`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP COLUMN "edited_price"`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP COLUMN "expiry"`);
        await queryRunner.query(`ALTER TABLE "showrooms" DROP COLUMN "districtDistrictId"`);
        await queryRunner.query(`ALTER TABLE "showrooms" DROP COLUMN "display_local"`);
        await queryRunner.query(`ALTER TABLE "showrooms" DROP COLUMN "display_district"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "location_address" character varying NOT NULL DEFAULT 'Nepal'`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD "sellingPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD "originalPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "showrooms" ADD "display_address" character varying NOT NULL DEFAULT 'Display Address'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25a3e7e1da13e1b500863e2f96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bfedcb98e262d3da96f821bcc"`);
        await queryRunner.query(`DROP TABLE "inventory_product_colors_year_colors"`);
    }

}
