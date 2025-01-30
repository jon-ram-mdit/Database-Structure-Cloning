import { MigrationInterface, QueryRunner } from "typeorm";

export class ListingAndInventory1702374533733 implements MigrationInterface {
    name = 'ListingAndInventory1702374533733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detail_listing_images" DROP CONSTRAINT "FK_359661f761cf8a93e10e34bfc6f"`);
        await queryRunner.query(`ALTER TABLE "detail_listing_images" RENAME COLUMN "detailListingUserDetailUsedDealId" TO "detailListingUserDetailListingId"`);
        await queryRunner.query(`CREATE TABLE "avatar" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "avatar_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, CONSTRAINT "PK_b0a7c4b8416c74a3f74dd02c797" PRIMARY KEY ("avatar_id"))`);
        await queryRunner.query(`CREATE TABLE "inventory_product" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "inventoryProduct_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "originalPrice" integer NOT NULL, "sellingPrice" integer NOT NULL, "description" character varying NOT NULL, "vehicleVariantYearId" uuid, "showroomShowroomId" uuid, CONSTRAINT "PK_271a12b27152dc0de3d6c23b657" PRIMARY KEY ("inventoryProduct_id"))`);
        await queryRunner.query(`CREATE TABLE "constants" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "constant_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_8a5e5d1177294808eaf55adcb7b" PRIMARY KEY ("constant_id"))`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP CONSTRAINT "PK_221b0d9e89da1b95f1d2c51d462"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "user_detail_used_deal_id"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "location_details"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "ad_title"`);
        await queryRunner.query(`ALTER TABLE "product_prop_cat" ADD "image_url" character varying NOT NULL DEFAULT 'https://mdit-automobile-project-s3-bucket.s3.ap-south-1.amazonaws.com/development/propertyCategory/testPropCat.svg'`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "user_detail_listing_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD CONSTRAINT "PK_7ae0327996a88534e362a32763d" PRIMARY KEY ("user_detail_listing_id")`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "ad_expiry" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "edited_price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "negotiable" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "vehicle_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD CONSTRAINT "UQ_6888990d154b983f5c2eda3a62a" UNIQUE ("vehicle_number")`);
        await queryRunner.query(`ALTER TABLE "v_employees" ADD "avatarAvatarId" uuid`);
        await queryRunner.query(`ALTER TABLE "v_employees" ADD CONSTRAINT "UQ_8d44b905e68b87b0962db14b758" UNIQUE ("avatarAvatarId")`);
        await queryRunner.query(`ALTER TABLE "showrooms" ADD "avatarAvatarId" uuid`);
        await queryRunner.query(`ALTER TABLE "showrooms" ADD CONSTRAINT "UQ_670e32ebf446d6bff2686fef895" UNIQUE ("avatarAvatarId")`);
        await queryRunner.query(`ALTER TABLE "vendors" ADD "avatarAvatarId" uuid`);
        await queryRunner.query(`ALTER TABLE "vendors" ADD CONSTRAINT "UQ_261fa3baa6ec7f69ac2ca52404a" UNIQUE ("avatarAvatarId")`);
        await queryRunner.query(`ALTER TYPE "public"."user_detail_listings_ad_status_enum" RENAME TO "user_detail_listings_ad_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_ad_status_enum" AS ENUM('Running', 'Hold', 'Sold', 'Expired')`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "ad_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "ad_status" TYPE "public"."user_detail_listings_ad_status_enum" USING "ad_status"::"text"::"public"."user_detail_listings_ad_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "ad_status" SET DEFAULT 'Running'`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_ad_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TYPE "public"."user_detail_listings_condition_enum" RENAME TO "user_detail_listings_condition_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_condition_enum" AS ENUM('Brand New', 'Like New', 'Used', 'Not Working')`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "condition" TYPE "public"."user_detail_listings_condition_enum" USING "condition"::"text"::"public"."user_detail_listings_condition_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_condition_enum_old"`);
        await queryRunner.query(`ALTER TABLE "roles_mapper" ALTER COLUMN "access_level" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "v_employees" ADD CONSTRAINT "UQ_f1715a85c46d7b210b074cdf641" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "vendors" ADD CONSTRAINT "UQ_3fe1343dbf2a7d9b7be1c27725a" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "detail_listing_images" ADD CONSTRAINT "FK_9f55ef2e98ffb6c8238953a0840" FOREIGN KEY ("detailListingUserDetailListingId") REFERENCES "user_detail_listings"("user_detail_listing_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "v_employees" ADD CONSTRAINT "FK_8d44b905e68b87b0962db14b758" FOREIGN KEY ("avatarAvatarId") REFERENCES "avatar"("avatar_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "showrooms" ADD CONSTRAINT "FK_670e32ebf446d6bff2686fef895" FOREIGN KEY ("avatarAvatarId") REFERENCES "avatar"("avatar_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD CONSTRAINT "FK_3746f9d14e0e1f411d2852e8e62" FOREIGN KEY ("vehicleVariantYearId") REFERENCES "variants_years"("variant_year_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD CONSTRAINT "FK_7476fe8037f3d784401877e8b55" FOREIGN KEY ("showroomShowroomId") REFERENCES "showrooms"("showroom_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendors" ADD CONSTRAINT "FK_261fa3baa6ec7f69ac2ca52404a" FOREIGN KEY ("avatarAvatarId") REFERENCES "avatar"("avatar_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "constants"("name","value") values('max_user_listing_day',90)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendors" DROP CONSTRAINT "FK_261fa3baa6ec7f69ac2ca52404a"`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP CONSTRAINT "FK_7476fe8037f3d784401877e8b55"`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP CONSTRAINT "FK_3746f9d14e0e1f411d2852e8e62"`);
        await queryRunner.query(`ALTER TABLE "showrooms" DROP CONSTRAINT "FK_670e32ebf446d6bff2686fef895"`);
        await queryRunner.query(`ALTER TABLE "v_employees" DROP CONSTRAINT "FK_8d44b905e68b87b0962db14b758"`);
        await queryRunner.query(`ALTER TABLE "detail_listing_images" DROP CONSTRAINT "FK_9f55ef2e98ffb6c8238953a0840"`);
        await queryRunner.query(`ALTER TABLE "vendors" DROP CONSTRAINT "UQ_3fe1343dbf2a7d9b7be1c27725a"`);
        await queryRunner.query(`ALTER TABLE "v_employees" DROP CONSTRAINT "UQ_f1715a85c46d7b210b074cdf641"`);
        await queryRunner.query(`ALTER TABLE "roles_mapper" ALTER COLUMN "access_level" SET DEFAULT 'admin'`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_condition_enum_old" AS ENUM('Brand New', 'Like New', 'Used', 'Now Working')`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "condition" TYPE "public"."user_detail_listings_condition_enum_old" USING "condition"::"text"::"public"."user_detail_listings_condition_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_condition_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_detail_listings_condition_enum_old" RENAME TO "user_detail_listings_condition_enum"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`CREATE TYPE "public"."user_detail_listings_ad_status_enum_old" AS ENUM('Running', 'Hold', 'Sold')`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "ad_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "ad_status" TYPE "public"."user_detail_listings_ad_status_enum_old" USING "ad_status"::"text"::"public"."user_detail_listings_ad_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "ad_status" SET DEFAULT 'Running'`);
        await queryRunner.query(`DROP TYPE "public"."user_detail_listings_ad_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_detail_listings_ad_status_enum_old" RENAME TO "user_detail_listings_ad_status_enum"`);
        await queryRunner.query(`ALTER TABLE "vendors" DROP CONSTRAINT "UQ_261fa3baa6ec7f69ac2ca52404a"`);
        await queryRunner.query(`ALTER TABLE "vendors" DROP COLUMN "avatarAvatarId"`);
        await queryRunner.query(`ALTER TABLE "showrooms" DROP CONSTRAINT "UQ_670e32ebf446d6bff2686fef895"`);
        await queryRunner.query(`ALTER TABLE "showrooms" DROP COLUMN "avatarAvatarId"`);
        await queryRunner.query(`ALTER TABLE "v_employees" DROP CONSTRAINT "UQ_8d44b905e68b87b0962db14b758"`);
        await queryRunner.query(`ALTER TABLE "v_employees" DROP COLUMN "avatarAvatarId"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP CONSTRAINT "UQ_6888990d154b983f5c2eda3a62a"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "vehicle_number"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "negotiable"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "edited_price"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "ad_expiry"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP CONSTRAINT "PK_7ae0327996a88534e362a32763d"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" DROP COLUMN "user_detail_listing_id"`);
        await queryRunner.query(`ALTER TABLE "product_prop_cat" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "ad_title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "location_details" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD "user_detail_used_deal_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ADD CONSTRAINT "PK_221b0d9e89da1b95f1d2c51d462" PRIMARY KEY ("user_detail_used_deal_id")`);
        await queryRunner.query(`DROP TABLE "constants"`);
        await queryRunner.query(`DROP TABLE "inventory_product"`);
        await queryRunner.query(`DROP TABLE "avatar"`);
        await queryRunner.query(`ALTER TABLE "detail_listing_images" RENAME COLUMN "detailListingUserDetailListingId" TO "detailListingUserDetailUsedDealId"`);
        await queryRunner.query(`ALTER TABLE "detail_listing_images" ADD CONSTRAINT "FK_359661f761cf8a93e10e34bfc6f" FOREIGN KEY ("detailListingUserDetailUsedDealId") REFERENCES "user_detail_listings"("user_detail_used_deal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
