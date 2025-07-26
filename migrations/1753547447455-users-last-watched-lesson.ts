import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersLastWatchedLesson1753547447455 implements MigrationInterface {
  name = 'UsersLastWatchedLesson1753547447455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "lastWatchedLessonId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e5a6d8703375cce8e269c11bafd" UNIQUE ("lastWatchedLessonId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e5a6d8703375cce8e269c11bafd" FOREIGN KEY ("lastWatchedLessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e5a6d8703375cce8e269c11bafd"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e5a6d8703375cce8e269c11bafd"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastWatchedLessonId"`);
  }
}
