import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTableMigration1699265246097 implements MigrationInterface {
    name = 'UserTableMigration1699265246097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "detail_listing_images" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "detail_deal_image_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image_url" character varying NOT NULL, "detailListingUserDetailUsedDealId" uuid, CONSTRAINT "PK_6f22bc92f79bea4cb84c4efaf3d" PRIMARY KEY ("detail_deal_image_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_ad_status_enum" AS ENUM('Running', 'Hold', 'Sold')`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_ownership_type_enum" AS ENUM('First Owner', 'Second Owner', 'Third Owner', 'Four & Above')`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_condition_enum" AS ENUM('Brand New', 'Like New', 'Used', 'Now Working')`);
        await queryRunner.query(`CREATE TABLE "user_detail_listings" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "user_detail_used_deal_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ad_title" character varying NOT NULL, "ad_description" character varying NOT NULL DEFAULT 'Sample Ad Description', "ad_status" "public"."user_detail_listings_ad_status_enum" NOT NULL DEFAULT 'Running', "price" numeric NOT NULL, "purchase_year" integer NOT NULL, "tax_clearance_year" integer NOT NULL, "kilometer_driven" integer NOT NULL, "location_point" geometry NOT NULL, "location_details" character varying NOT NULL, "ownership_type" "public"."user_detail_listings_ownership_type_enum" NOT NULL, "condition" "public"."user_detail_listings_condition_enum" NOT NULL, "endYearVehicleVariantYearId" uuid, "userUserId" uuid, CONSTRAINT "PK_221b0d9e89da1b95f1d2c51d462" PRIMARY KEY ("user_detail_used_deal_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "display_picture_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "display_picture_url" SET DEFAULT 'https://mdit-automobile-project-s3-bucket.s3.ap-south-1.amazonaws.com/static-image-contents/home-page-logos/profile_10302971.png'`);
        await queryRunner.query(`ALTER TABLE "detail_listing_images" ADD CONSTRAINT "FK_359661f761cf8a93e10e34bfc6f" FOREIGN KEY ("detailListingUserDetailUsedDealId") REFERENCES "user_detail_listings"("user_detail_used_deal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD CONSTRAINT "FK_674b11f0311b3724860cc6f88f0" FOREIGN KEY ("endYearVehicleVariantYearId") REFERENCES "variants_years"("variant_year_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD CONSTRAINT "FK_696168abcc0e5b47cf9e59b681a" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP CONSTRAINT "FK_696168abcc0e5b47cf9e59b681a"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP CONSTRAINT "FK_674b11f0311b3724860cc6f88f0"`);
        await queryRunner.query(`ALTER TABLE "detail_listing_images" DROP CONSTRAINT "FK_359661f761cf8a93e10e34bfc6f"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "display_picture_url" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "display_picture_url" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "user_detail_listings"`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_condition_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_ownership_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_ad_status_enum"`);
        await queryRunner.query(`DROP TABLE "detail_listing_images"`);
    }

}
