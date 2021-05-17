import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoringComments1621224448953 implements MigrationInterface {
    name = 'PostRefactoringComments1621224448953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "commentaries" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."tokenVersion" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "tokenVersion" SET DEFAULT 0`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updated_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "tokenVersion" SET DEFAULT '0'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."tokenVersion" IS NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "commentaries"`);
    }

}
