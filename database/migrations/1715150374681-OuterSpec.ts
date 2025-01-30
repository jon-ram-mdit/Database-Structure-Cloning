import { MigrationInterface, QueryRunner } from "typeorm";

export class OuterSpec1715150374681 implements MigrationInterface {
    name = 'OuterSpec1715150374681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "outer_int_specs" ADD "for_home_screen" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "outer_decimal_specs" ADD "for_home_screen" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "outer_text_specs" ADD "for_home_screen" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "outer_text_specs" DROP COLUMN "for_home_screen"`);
        await queryRunner.query(`ALTER TABLE "outer_decimal_specs" DROP COLUMN "for_home_screen"`);
        await queryRunner.query(`ALTER TABLE "outer_int_specs" DROP COLUMN "for_home_screen"`);
    }

}
