import { MigrationInterface, QueryRunner } from 'typeorm';

export class LessonsNullableThumbnailAndUrl1753593385875 implements MigrationInterface {
  name = 'LessonsNullableThumbnailAndUrl1753593385875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "url" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "thumbnail" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "url" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "thumbnail" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "thumbnail" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "url" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "thumbnail" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "url" SET NOT NULL`);
  }
}
