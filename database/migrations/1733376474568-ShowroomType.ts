import { MigrationInterface, QueryRunner } from "typeorm";

export class ShowroomType1733376474568 implements MigrationInterface {
    name = 'ShowroomType1733376474568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."showroom_verification_files_type_enum" AS ENUM('Image', 'Pdf')`);
        await queryRunner.query(`CREATE TABLE "showroom_verification_files" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "verifying_file_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "type" "public"."showroom_verification_files_type_enum" NOT NULL DEFAULT 'Image', "showroomShowroomId" uuid, CONSTRAINT "PK_be08fd762d1b2d85146e2a28a34" PRIMARY KEY ("verifying_file_id"))`);
        await queryRunner.query(`CREATE TABLE "showroom_verification_admin_messages" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "verifying_admin_message_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" text NOT NULL, "showroomShowroomId" uuid, CONSTRAINT "PK_9f486f5111363dbe3e1655a880a" PRIMARY KEY ("verifying_admin_message_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."showrooms_type_enum" AS ENUM('Verified', 'Not Verified', 'Suspended', 'Rejected')`);
        await queryRunner.query(`ALTER TABLE "showrooms" ADD "type" "public"."showrooms_type_enum" NOT NULL DEFAULT 'Not Verified'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ADD "notice" text`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '{"type":"Point","coordinates":[27.7172,85.324]}'`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "showroom_verification_files" ADD CONSTRAINT "FK_46eb962f9dc8c6e3cc9adeb36ee" FOREIGN KEY ("showroomShowroomId") REFERENCES "showrooms"("showroom_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "showroom_verification_admin_messages" ADD CONSTRAINT "FK_218ec99a526b9dde23e2b4a5606" FOREIGN KEY ("showroomShowroomId") REFERENCES "showrooms"("showroom_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showroom_verification_admin_messages" DROP CONSTRAINT "FK_218ec99a526b9dde23e2b4a5606"`);
        await queryRunner.query(`ALTER TABLE "showroom_verification_files" DROP CONSTRAINT "FK_46eb962f9dc8c6e3cc9adeb36ee"`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "showrooms" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "vendors" ALTER COLUMN "location_point" SET DEFAULT '0101000000F2B0506B9AB73B40DBF97E6ABC545540'`);
        await queryRunner.query(`ALTER TABLE "showrooms" DROP COLUMN "notice"`);
        await queryRunner.query(`ALTER TABLE "showrooms" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."showrooms_type_enum"`);
        await queryRunner.query(`DROP TABLE "showroom_verification_admin_messages"`);
        await queryRunner.query(`DROP TABLE "showroom_verification_files"`);
        await queryRunner.query(`DROP TYPE "public"."showroom_verification_files_type_enum"`);
    }

}
