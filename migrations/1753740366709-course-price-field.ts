import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoursePriceField1753740366709 implements MigrationInterface {
  name = 'CoursePriceField1753740366709';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" ADD "price" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "order" SET DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "order" SET DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "order" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "order" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "price"`);
  }
}
