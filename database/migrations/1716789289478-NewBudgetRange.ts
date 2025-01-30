import { MigrationInterface, QueryRunner } from "typeorm";

export class NewBudgetRange1716789289478 implements MigrationInterface {
    name = 'NewBudgetRange1716789289478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_type_budget_ranges" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "budget_range_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startPrice" integer NOT NULL, "endPrice" integer NOT NULL, "rank" integer NOT NULL, "productTypeProductTypeId" uuid, CONSTRAINT "PK_9f1c53fc6f3735357714b2cd906" PRIMARY KEY ("budget_range_id"))`);
        await queryRunner.query(`CREATE TABLE "new_inventory_enquiries" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "listing_enquiry_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subject" character varying NOT NULL, "message" text NOT NULL, "seen_status" boolean NOT NULL DEFAULT false, "newInventoryInventoryProductId" uuid, "userUserId" uuid, CONSTRAINT "PK_9cf07196404cc292d856a08dcb1" PRIMARY KEY ("listing_enquiry_id"))`);
        await queryRunner.query(`CREATE TABLE "detail_listing_enquiries" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "listing_enquiry_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subject" character varying NOT NULL, "message" text NOT NULL, "seen_status" boolean NOT NULL DEFAULT false, "detailListingUserDetailListingId" uuid, "userUserId" uuid, CONSTRAINT "PK_c40ec8c69f737b55cc7131348ae" PRIMARY KEY ("listing_enquiry_id"))`);
        await queryRunner.query(`ALTER TABLE "product_brands" DROP COLUMN "brand_description"`);
        await queryRunner.query(`ALTER TABLE "product_type_image_property_categories" ADD "created_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_type_image_property_categories" ADD "deleted_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "product_type_image_property_categories" ADD "updated_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "product_type_budget_ranges" ADD CONSTRAINT "FK_108139d073070094eccdb4dea98" FOREIGN KEY ("productTypeProductTypeId") REFERENCES "product_types"("product_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "new_inventory_enquiries" ADD CONSTRAINT "FK_9dbfe9a4d23fb7f0e9835f864b8" FOREIGN KEY ("newInventoryInventoryProductId") REFERENCES "inventory_product"("inventoryProduct_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "new_inventory_enquiries" ADD CONSTRAINT "FK_b4ee2faf41638541fb18d9f7d0d" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detail_listing_enquiries" ADD CONSTRAINT "FK_8fa3e930c2fc061364c19eede86" FOREIGN KEY ("detailListingUserDetailListingId") REFERENCES "user_detail_listings"("user_detail_listing_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detail_listing_enquiries" ADD CONSTRAINT "FK_329bf08461e4a07d5fcb13efeed" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detail_listing_enquiries" DROP CONSTRAINT "FK_329bf08461e4a07d5fcb13efeed"`);
        await queryRunner.query(`ALTER TABLE "detail_listing_enquiries" DROP CONSTRAINT "FK_8fa3e930c2fc061364c19eede86"`);
        await queryRunner.query(`ALTER TABLE "new_inventory_enquiries" DROP CONSTRAINT "FK_b4ee2faf41638541fb18d9f7d0d"`);
        await queryRunner.query(`ALTER TABLE "new_inventory_enquiries" DROP CONSTRAINT "FK_9dbfe9a4d23fb7f0e9835f864b8"`);
        await queryRunner.query(`ALTER TABLE "product_type_budget_ranges" DROP CONSTRAINT "FK_108139d073070094eccdb4dea98"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "product_type_image_property_categories" DROP COLUMN "updated_date"`);
        await queryRunner.query(`ALTER TABLE "product_type_image_property_categories" DROP COLUMN "deleted_date"`);
        await queryRunner.query(`ALTER TABLE "product_type_image_property_categories" DROP COLUMN "created_date"`);
        await queryRunner.query(`ALTER TABLE "product_brands" ADD "brand_description" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "detail_listing_enquiries"`);
        await queryRunner.query(`DROP TABLE "new_inventory_enquiries"`);
        await queryRunner.query(`DROP TABLE "product_type_budget_ranges"`);
    }

}
