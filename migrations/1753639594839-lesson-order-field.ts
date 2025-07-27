import { MigrationInterface, QueryRunner } from 'typeorm';

export class LessonOrderField1753639594839 implements MigrationInterface {
  name = 'LessonOrderField1753639594839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson" ADD "order" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "order" DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "order" SET DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "order"`);
  }
}
