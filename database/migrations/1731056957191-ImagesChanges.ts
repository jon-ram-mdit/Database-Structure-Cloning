import { MigrationInterface, QueryRunner } from "typeorm";

export class ImagesChanges1731056957191 implements MigrationInterface {
    name = 'ImagesChanges1731056957191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "year_images" ADD "created_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "year_images" ADD "deleted_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "year_images" ADD "updated_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE TYPE "public"."vendors_role_enum" AS ENUM('SuperAdmin', 'Vendor')`);
        await queryRunner.query(`ALTER TABLE "vendors" ADD "role" "public"."vendors_role_enum" NOT NULL DEFAULT 'Vendor'`);
        await queryRunner.query(`ALTER TABLE "year_colors" ADD "created_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "year_colors" ADD "deleted_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "year_colors" ADD "updated_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "year_colors" ADD "seconday_color_code" character varying`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`CREATE UNIQUE INDEX "outer_spec_int_spec" ON "outer_int_specs" ("subTypeProductSubTypeId", "intSpecProductIntSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "subtype_key_int_spec" ON "key_int_specs" ("subTypeProductSubTypeId", "intSpecProductIntSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "subtype_key_decimal_spec" ON "key_decimal_specs" ("subTypeProductSubTypeId", "decimalSpecProductDecimalSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "outer_spec_dec_spec" ON "outer_decimal_specs" ("subTypeProductSubTypeId", "decimalSpecProductDecimalSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "type_home_property" ON "type_home_properties" ("productTypeProductTypeId", "homePropertyProductTextSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "subtype_key_text_spec" ON "key_text_specs" ("subTypeProductSubTypeId", "textSpecProductTextSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "outer_spec_text_spec" ON "outer_text_specs" ("subTypeProductSubTypeId", "textSpecProductTextSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "subtype_key_feature" ON "key_features" ("subTypeProductSubTypeId", "featureProductFeatureId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."subtype_key_feature"`);
        await queryRunner.query(`DROP INDEX "public"."outer_spec_text_spec"`);
        await queryRunner.query(`DROP INDEX "public"."subtype_key_text_spec"`);
        await queryRunner.query(`DROP INDEX "public"."type_home_property"`);
        await queryRunner.query(`DROP INDEX "public"."outer_spec_dec_spec"`);
        await queryRunner.query(`DROP INDEX "public"."subtype_key_decimal_spec"`);
        await queryRunner.query(`DROP INDEX "public"."subtype_key_int_spec"`);
        await queryRunner.query(`DROP INDEX "public"."outer_spec_int_spec"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "year_colors" DROP COLUMN "seconday_color_code"`);
        await queryRunner.query(`ALTER TABLE "year_colors" DROP COLUMN "updated_date"`);
        await queryRunner.query(`ALTER TABLE "year_colors" DROP COLUMN "deleted_date"`);
        await queryRunner.query(`ALTER TABLE "year_colors" DROP COLUMN "created_date"`);
        await queryRunner.query(`ALTER TABLE "vendors" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."vendors_role_enum"`);
        await queryRunner.query(`ALTER TABLE "year_images" DROP COLUMN "updated_date"`);
        await queryRunner.query(`ALTER TABLE "year_images" DROP COLUMN "deleted_date"`);
        await queryRunner.query(`ALTER TABLE "year_images" DROP COLUMN "created_date"`);
    }

}
