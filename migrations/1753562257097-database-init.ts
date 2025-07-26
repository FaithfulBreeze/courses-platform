import { MigrationInterface, QueryRunner } from 'typeorm';

export class DatabaseInit1753562257097 implements MigrationInterface {
  name = 'DatabaseInit1753562257097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "review" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "rate" integer NOT NULL DEFAULT '1', "reviewerId" integer, "courseId" integer, "lessonId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "thumbnail" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "duration" character varying, "courseId" integer NOT NULL, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_purchase" ("id" SERIAL NOT NULL, "purchasedAt" TIMESTAMP NOT NULL, "userId" integer, "courseId" integer, CONSTRAINT "PK_80eebff7166650425394e9d50bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "thumbnail" character varying NOT NULL, "trailer" character varying, "trailerDuration" integer, "duration" character varying, "ownerId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "avatar" character varying, "accessToken" character varying, "lastWatchedLessonId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_e5a6d8703375cce8e269c11baf" UNIQUE ("lastWatchedLessonId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_purchased_courses_course" ("userId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_009c8cd105e5ef08e8a2d1146bf" PRIMARY KEY ("userId", "courseId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1fb5a122088f22c52ef847f2be" ON "user_purchased_courses_course" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_001240e1fee7fb596bbdd3c636" ON "user_purchased_courses_course" ("courseId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_completed_lessons_lesson" ("userId" integer NOT NULL, "lessonId" integer NOT NULL, CONSTRAINT "PK_3b174a0037e7f09c77f11c785a7" PRIMARY KEY ("userId", "lessonId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06da3a48a35c52e7a6dfd03ea5" ON "user_completed_lessons_lesson" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8679bd991e0e54252591608d35" ON "user_completed_lessons_lesson" ("lessonId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_34413365b39e3bf5bea866569b4" FOREIGN KEY ("reviewerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_a5db1fc5911a8cbe6d7570ea50c" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_2c37ce20c032f7128487b9318e7" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson" ADD CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_purchase" ADD CONSTRAINT "FK_1fe6dc410c2de1f40984d785cc8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_purchase" ADD CONSTRAINT "FK_f1fa0a77f6f6e170121ed836318" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ADD CONSTRAINT "FK_ebf0ff6d5d6aeaa87d9b4b29c0c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e5a6d8703375cce8e269c11bafd" FOREIGN KEY ("lastWatchedLessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_purchased_courses_course" ADD CONSTRAINT "FK_1fb5a122088f22c52ef847f2bef" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_purchased_courses_course" ADD CONSTRAINT "FK_001240e1fee7fb596bbdd3c6364" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_completed_lessons_lesson" ADD CONSTRAINT "FK_06da3a48a35c52e7a6dfd03ea57" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_completed_lessons_lesson" ADD CONSTRAINT "FK_8679bd991e0e54252591608d359" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_completed_lessons_lesson" DROP CONSTRAINT "FK_8679bd991e0e54252591608d359"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_completed_lessons_lesson" DROP CONSTRAINT "FK_06da3a48a35c52e7a6dfd03ea57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_purchased_courses_course" DROP CONSTRAINT "FK_001240e1fee7fb596bbdd3c6364"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_purchased_courses_course" DROP CONSTRAINT "FK_1fb5a122088f22c52ef847f2bef"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e5a6d8703375cce8e269c11bafd"`);
    await queryRunner.query(
      `ALTER TABLE "course" DROP CONSTRAINT "FK_ebf0ff6d5d6aeaa87d9b4b29c0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_purchase" DROP CONSTRAINT "FK_f1fa0a77f6f6e170121ed836318"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_purchase" DROP CONSTRAINT "FK_1fe6dc410c2de1f40984d785cc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson" DROP CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_2c37ce20c032f7128487b9318e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_a5db1fc5911a8cbe6d7570ea50c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_34413365b39e3bf5bea866569b4"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_8679bd991e0e54252591608d35"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_06da3a48a35c52e7a6dfd03ea5"`);
    await queryRunner.query(`DROP TABLE "user_completed_lessons_lesson"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_001240e1fee7fb596bbdd3c636"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_1fb5a122088f22c52ef847f2be"`);
    await queryRunner.query(`DROP TABLE "user_purchased_courses_course"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TABLE "course_purchase"`);
    await queryRunner.query(`DROP TABLE "lesson"`);
    await queryRunner.query(`DROP TABLE "review"`);
  }
}
