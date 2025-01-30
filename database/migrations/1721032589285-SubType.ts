import { MigrationInterface, QueryRunner } from "typeorm";

export class SubType1721032589285 implements MigrationInterface {
    name = 'SubType1721032589285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nested_dummy" ("pk" uuid NOT NULL DEFAULT uuid_generate_v4(), "dummy_booelan" boolean NOT NULL, "dummyNumberPk" uuid, CONSTRAINT "PK_5dd710b224b1bb18f0fde3d0d32" PRIMARY KEY ("pk"))`);
        await queryRunner.query(`CREATE TABLE "dummy_number" ("pk" uuid NOT NULL DEFAULT uuid_generate_v4(), "dummy_number" integer NOT NULL, CONSTRAINT "PK_da848e3ad46e55178da6972f4d4" PRIMARY KEY ("pk"))`);
        await queryRunner.query(`CREATE TABLE "dummy_text" ("pk" uuid NOT NULL DEFAULT uuid_generate_v4(), "dummy_text" character varying NOT NULL, CONSTRAINT "PK_9aac6f0ad4bfce199a80c069074" PRIMARY KEY ("pk"))`);
        await queryRunner.query(`CREATE TYPE "public"."sub_types_prop_cat_int_specs_type_enum" AS ENUM('Base', 'Derived')`);
        await queryRunner.query(`ALTER TABLE "sub_types_prop_cat_int_specs" ADD "type" "public"."sub_types_prop_cat_int_specs_type_enum" NOT NULL DEFAULT 'Base'`);
        await queryRunner.query(`CREATE TYPE "public"."sub_types_prop_cat_decimal_specs_type_enum" AS ENUM('Base', 'Derived')`);
        await queryRunner.query(`ALTER TABLE "sub_types_prop_cat_decimal_specs" ADD "type" "public"."sub_types_prop_cat_decimal_specs_type_enum" NOT NULL DEFAULT 'Base'`);
        await queryRunner.query(`CREATE TYPE "public"."sub_types_prop_cat_text_specs_type_enum" AS ENUM('Base', 'Derived')`);
        await queryRunner.query(`ALTER TABLE "sub_types_prop_cat_text_specs" ADD "type" "public"."sub_types_prop_cat_text_specs_type_enum" NOT NULL DEFAULT 'Base'`);
        await queryRunner.query(`CREATE TYPE "public"."sub_types_prop_cat_features_type_enum" AS ENUM('Base', 'Derived')`);
        await queryRunner.query(`ALTER TABLE "sub_types_prop_cat_features" ADD "type" "public"."sub_types_prop_cat_features_type_enum" NOT NULL DEFAULT 'Base'`);
        await queryRunner.query(`CREATE TYPE "public"."sub_types_prop_cat_type_enum" AS ENUM('Base', 'Derived')`);
        await queryRunner.query(`ALTER TABLE "sub_types_prop_cat" ADD "type" "public"."sub_types_prop_cat_type_enum" NOT NULL DEFAULT 'Base'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`CREATE UNIQUE INDEX "prop_cat_int_spec_value" ON "year_int_spec_values" ("variantYearVariantYearId", "propCatIntSpecSubtypePropCatIntSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "subtype_property_category_int_spec" ON "sub_types_prop_cat_int_specs" ("subTypePropCatSubtypePropertyCategoryId", "intSpecProductIntSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "prop_cat_dec_spec_value" ON "year_decimal_spec_values" ("variantYearVariantYearId", "propCatDecimalSpecSubtypePropCatDecimalSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "subtype_property_category_decimal_spec" ON "sub_types_prop_cat_decimal_specs" ("subTypePropCatSubtypePropertyCategoryId", "decimalSpecProductDecimalSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "subtype_property_category_text_spec" ON "sub_types_prop_cat_text_specs" ("subTypePropCatSubtypePropertyCategoryId", "textSpecProductTextSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "prop_cat_text_spec_value" ON "year_text_spec_values" ("variantYearVariantYearId", "propCatTextSpecSubtypePropCatTextSpecId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "prop_cat_feature_value" ON "year_features_values" ("variantYearVariantYearId", "propCatFeatureSubtypePropCatFeatureId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "subtype_property_category_feature" ON "sub_types_prop_cat_features" ("subTypePropCatSubtypePropertyCategoryId", "featureProductFeatureId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "subtype_property_category" ON "sub_types_prop_cat" ("subTypeProductSubTypeId", "propCatProductPropCatId") `);
        await queryRunner.query(`ALTER TABLE "nested_dummy" ADD CONSTRAINT "FK_e11236c9eabf7a75a9e9c839b47" FOREIGN KEY ("dummyNumberPk") REFERENCES "dummy_number"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nested_dummy" DROP CONSTRAINT "FK_e11236c9eabf7a75a9e9c839b47"`);
        await queryRunner.query(`DROP INDEX "public"."subtype_property_category"`);
        await queryRunner.query(`DROP INDEX "public"."subtype_property_category_feature"`);
        await queryRunner.query(`DROP INDEX "public"."prop_cat_feature_value"`);
        await queryRunner.query(`DROP INDEX "public"."prop_cat_text_spec_value"`);
        await queryRunner.query(`DROP INDEX "public"."subtype_property_category_text_spec"`);
        await queryRunner.query(`DROP INDEX "public"."subtype_property_category_decimal_spec"`);
        await queryRunner.query(`DROP INDEX "public"."prop_cat_dec_spec_value"`);
        await queryRunner.query(`DROP INDEX "public"."subtype_property_category_int_spec"`);
        await queryRunner.query(`DROP INDEX "public"."prop_cat_int_spec_value"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "sub_types_prop_cat" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."sub_types_prop_cat_type_enum"`);
        await queryRunner.query(`ALTER TABLE "sub_types_prop_cat_features" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."sub_types_prop_cat_features_type_enum"`);
        await queryRunner.query(`ALTER TABLE "sub_types_prop_cat_text_specs" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."sub_types_prop_cat_text_specs_type_enum"`);
        await queryRunner.query(`ALTER TABLE "sub_types_prop_cat_decimal_specs" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."sub_types_prop_cat_decimal_specs_type_enum"`);
        await queryRunner.query(`ALTER TABLE "sub_types_prop_cat_int_specs" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."sub_types_prop_cat_int_specs_type_enum"`);
        await queryRunner.query(`DROP TABLE "dummy_text"`);
        await queryRunner.query(`DROP TABLE "dummy_number"`);
        await queryRunner.query(`DROP TABLE "nested_dummy"`);
    }

}
