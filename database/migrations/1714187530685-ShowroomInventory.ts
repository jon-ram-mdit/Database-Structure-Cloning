import { MigrationInterface, QueryRunner } from "typeorm";

export class ShowroomInventory1714187530685 implements MigrationInterface {
    name = 'ShowroomInventory1714187530685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD "colorYearColorId" uuid`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ALTER COLUMN "expiry" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ALTER COLUMN "edited_price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ALTER COLUMN "price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ADD CONSTRAINT "FK_9c49475fdecb825a527777773c4" FOREIGN KEY ("colorYearColorId") REFERENCES "year_colors"("year_color_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP CONSTRAINT "FK_9c49475fdecb825a527777773c4"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ALTER COLUMN "price" SET DEFAULT '500000'`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ALTER COLUMN "edited_price" SET DEFAULT '1000000'`);
        await queryRunner.query(`ALTER TABLE "inventory_product" ALTER COLUMN "expiry" SET DEFAULT '2024-04-29 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "inventory_product" DROP COLUMN "colorYearColorId"`);
    }

}
