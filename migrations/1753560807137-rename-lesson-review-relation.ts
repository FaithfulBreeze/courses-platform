import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameLessonReviewRelation1753560807137 implements MigrationInterface {
  name = 'RenameLessonReviewRelation1753560807137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_a672fc6a88a987131b776593c94"`,
    );
    await queryRunner.query(`ALTER TABLE "review" RENAME COLUMN "lessonsId" TO "lessonId"`);
    await queryRunner.query(`ALTER TABLE "review" RENAME COLUMN "lessonId" TO "lessonsId"`);
    await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "lessonsId"`);
    await queryRunner.query(`ALTER TABLE "review" ADD "lessonId" integer`);
    await queryRunner.query(`ALTER TABLE "review" ADD "lessonsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_2c37ce20c032f7128487b9318e7" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_a672fc6a88a987131b776593c94" FOREIGN KEY ("lessonsId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_a672fc6a88a987131b776593c94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_2c37ce20c032f7128487b9318e7"`,
    );
    await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "lessonsId"`);
    await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "lessonId"`);
    await queryRunner.query(`ALTER TABLE "review" ADD "lessonsId" integer`);
    await queryRunner.query(`ALTER TABLE "review" RENAME COLUMN "lessonsId" TO "lessonId"`);
    await queryRunner.query(`ALTER TABLE "review" RENAME COLUMN "lessonId" TO "lessonsId"`);
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_a672fc6a88a987131b776593c94" FOREIGN KEY ("lessonsId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
