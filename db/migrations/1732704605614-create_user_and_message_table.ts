import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndMessageTable1732704605614 implements MigrationInterface {
    name = 'CreateUserAndMessageTable1732704605614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."message" ("id" SERIAL NOT NULL, "content" character varying(255) NOT NULL, "user" integer NOT NULL, "friend" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "core"."message"`);
        await queryRunner.query(`DROP TABLE "core"."user"`);
    }

}
