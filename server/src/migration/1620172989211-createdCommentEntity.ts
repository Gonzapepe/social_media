import {MigrationInterface, QueryRunner} from "typeorm";

export class createdCommentEntity1620172989211 implements MigrationInterface {
    name = 'createdCommentEntity1620172989211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "creatorId" character varying NOT NULL, "postId" uuid NOT NULL, "userId" uuid, CONSTRAINT "PK_f685613ae59fda2ac1e490c9189" PRIMARY KEY ("id", "postId"))`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."tokenVersion" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "tokenVersion" SET DEFAULT 0`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "tokenVersion" SET DEFAULT '0'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."tokenVersion" IS NULL`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
