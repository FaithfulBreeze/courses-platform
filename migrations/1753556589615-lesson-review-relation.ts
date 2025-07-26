import { MigrationInterface, QueryRunner } from 'typeorm';

export class LessonReviewRelation1753556589615 implements MigrationInterface {
  name = 'LessonReviewRelation1753556589615';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lesson_reviews_review" ("lessonId" integer NOT NULL, "reviewId" integer NOT NULL, CONSTRAINT "PK_50d59749f138829b3a38650c2ee" PRIMARY KEY ("lessonId", "reviewId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0b34918bed0dbf41b290d6817d" ON "lesson_reviews_review" ("lessonId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6d4d3be4ad580de244ceff6b0a" ON "lesson_reviews_review" ("reviewId") `,
    );
    await queryRunner.query(`ALTER TABLE "review" ADD "lessonsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_a672fc6a88a987131b776593c94" FOREIGN KEY ("lessonsId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_reviews_review" ADD CONSTRAINT "FK_0b34918bed0dbf41b290d6817d8" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_reviews_review" ADD CONSTRAINT "FK_6d4d3be4ad580de244ceff6b0ad" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson_reviews_review" DROP CONSTRAINT "FK_6d4d3be4ad580de244ceff6b0ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_reviews_review" DROP CONSTRAINT "FK_0b34918bed0dbf41b290d6817d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_a672fc6a88a987131b776593c94"`,
    );
    await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "lessonsId"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6d4d3be4ad580de244ceff6b0a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0b34918bed0dbf41b290d6817d"`);
    await queryRunner.query(`DROP TABLE "lesson_reviews_review"`);
  }
}
