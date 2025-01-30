import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProfile1707214960782 implements MigrationInterface {
    name = 'UserProfile1707214960782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "altContact" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "display_picture_url" SET DEFAULT 'https://mdit-automobile-project-s3-bucket.s3.ap-south-1.amazonaws.com/static-image-contents/home-page-logos/userProfilePicture.png'`);
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "display_picture_url" SET DEFAULT 'https://mdit-automobile-project-s3-bucket.s3.ap-south-1.amazonaws.com/static-image-contents/home-page-logos/profile_10302971.png'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "altContact"`);
    }

}
