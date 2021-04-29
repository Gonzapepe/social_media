import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedVoteStatusAndVotes1619132167287 implements MigrationInterface {
    name = 'AddedVoteStatusAndVotes1619132167287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "votes" integer NOT NULL DEFAULT '0'`);
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
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "votes"`);
    }

}
