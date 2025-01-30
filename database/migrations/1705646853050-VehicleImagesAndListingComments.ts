import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleImagesAndListingComments1705646853050 implements MigrationInterface {
    name = 'VehicleImagesAndListingComments1705646853050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "year_images" ("year_image_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image_url" character varying NOT NULL, "caption" character varying NOT NULL, "imagePropertyCategoryProductTypeImagePropCatId" uuid, "endYearVehicleVariantYearId" uuid, CONSTRAINT "PK_d67d74ddbf2f0fecaa7af49ad9c" PRIMARY KEY ("year_image_id"))`);
        await queryRunner.query(`CREATE TABLE "product_type_image_property_categories" ("product_type_image_prop_cat_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "productTypeProductTypeId" uuid, CONSTRAINT "PK_a2f3ebb843e2cc08854edfca13e" PRIMARY KEY ("product_type_image_prop_cat_id"))`);
        await queryRunner.query(`CREATE TABLE "detail_listing_comments" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "detailListingUserDetailListingId" uuid, "userUserId" uuid, "parentCommentCommentId" uuid, CONSTRAINT "PK_8dd5b617bb69e29c7a3d0e61594" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "year_images" ADD CONSTRAINT "FK_4888f3352dd6ab37cd1931b8594" FOREIGN KEY ("imagePropertyCategoryProductTypeImagePropCatId") REFERENCES "product_type_image_property_categories"("product_type_image_prop_cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "year_images" ADD CONSTRAINT "FK_c6277ef8ae4c53ce3cf4a1007ad" FOREIGN KEY ("endYearVehicleVariantYearId") REFERENCES "variants_years"("variant_year_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_type_image_property_categories" ADD CONSTRAINT "FK_a338a371be1bdd1854336232976" FOREIGN KEY ("productTypeProductTypeId") REFERENCES "product_types"("product_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detail_listing_comments" ADD CONSTRAINT "FK_bf37f69eb7cbbb46a7a08048b0c" FOREIGN KEY ("detailListingUserDetailListingId") REFERENCES "user_detail_listings"("user_detail_listing_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detail_listing_comments" ADD CONSTRAINT "FK_17a6aaa4c35d68a75a8fa6e7e0a" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detail_listing_comments" ADD CONSTRAINT "FK_b97438184573916dfb80bb245ec" FOREIGN KEY ("parentCommentCommentId") REFERENCES "detail_listing_comments"("comment_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detail_listing_comments" DROP CONSTRAINT "FK_b97438184573916dfb80bb245ec"`);
        await queryRunner.query(`ALTER TABLE "detail_listing_comments" DROP CONSTRAINT "FK_17a6aaa4c35d68a75a8fa6e7e0a"`);
        await queryRunner.query(`ALTER TABLE "detail_listing_comments" DROP CONSTRAINT "FK_bf37f69eb7cbbb46a7a08048b0c"`);
        await queryRunner.query(`ALTER TABLE "product_type_image_property_categories" DROP CONSTRAINT "FK_a338a371be1bdd1854336232976"`);
        await queryRunner.query(`ALTER TABLE "year_images" DROP CONSTRAINT "FK_c6277ef8ae4c53ce3cf4a1007ad"`);
        await queryRunner.query(`ALTER TABLE "year_images" DROP CONSTRAINT "FK_4888f3352dd6ab37cd1931b8594"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`DROP TABLE "detail_listing_comments"`);
        await queryRunner.query(`DROP TABLE "product_type_image_property_categories"`);
        await queryRunner.query(`DROP TABLE "year_images"`);
    }

}
