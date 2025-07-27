import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseAndLessonIntDuration1753633492982 implements MigrationInterface {
  name = 'CourseAndLessonIntDuration1753633492982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "duration"`);
    await queryRunner.query(`ALTER TABLE "lesson" ADD "duration" integer`);
    await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "thumbnail" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "duration"`);
    await queryRunner.query(`ALTER TABLE "course" ADD "duration" integer`);
    await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "thumbnail" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "thumbnail" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "duration"`);
    await queryRunner.query(`ALTER TABLE "course" ADD "duration" character varying`);
    await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "thumbnail" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "duration"`);
    await queryRunner.query(`ALTER TABLE "lesson" ADD "duration" character varying`);
  }
}
