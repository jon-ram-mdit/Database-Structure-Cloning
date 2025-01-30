import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTableConstraint1707907660518 implements MigrationInterface {
  name = "UserTableConstraint1707907660518";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry`
    );
    await queryRunner.query(
      `Alter table users ADD CONSTRAINT check_password_or_googleId CHECK (password IS NOT NULL OR google_user_id IS NOT NULL)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_detail_listings" ALTER COLUMN "location_point" TYPE geometry(GEOMETRY,0)`
    );
  }
}
