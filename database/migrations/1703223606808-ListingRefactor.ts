import { MigrationInterface, QueryRunner } from "typeorm";

export class ListingRefactor1703223606808 implements MigrationInterface {
    name = 'ListingRefactor1703223606808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detail_listing_images" RENAME COLUMN "detail_deal_image_id" TO "detail_listing_image_id"`);
        await queryRunner.query(`ALTER TABLE "detail_listing_images" RENAME CONSTRAINT "PK_6f22bc92f79bea4cb84c4efaf3d" TO "PK_0dfcbee8cbf7dff99759ac2cebf"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "ad_status"`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_ad_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "ad_expiry"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "ad_description"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "description" character varying NOT NULL DEFAULT 'Sample Ad Description'`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_status_enum" AS ENUM('Running', 'Hold', 'Sold', 'Expired')`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "status" "public"."user_detail_listings_status_enum" NOT NULL DEFAULT 'Running'`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "expiry" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "location_address" character varying NOT NULL DEFAULT 'Nepal'`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "edited_price"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "edited_price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP CONSTRAINT "UQ_6888990d154b983f5c2eda3a62a"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD CONSTRAINT "UQ_6888990d154b983f5c2eda3a62a" UNIQUE ("vehicle_number")`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "edited_price"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "edited_price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "location_address"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "expiry"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "ad_description" character varying NOT NULL DEFAULT 'Sample Ad Description'`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "ad_expiry" date NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_ad_status_enum" AS ENUM('Running', 'Hold', 'Sold', 'Expired')`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "ad_status" "public"."user_detail_listings_ad_status_enum" NOT NULL DEFAULT 'Running'`);
        await queryRunner.query(`ALTER TABLE "detail_listing_images" RENAME CONSTRAINT "PK_0dfcbee8cbf7dff99759ac2cebf" TO "PK_6f22bc92f79bea4cb84c4efaf3d"`);
        await queryRunner.query(`ALTER TABLE "detail_listing_images" RENAME COLUMN "detail_listing_image_id" TO "detail_deal_image_id"`);
    }

}
