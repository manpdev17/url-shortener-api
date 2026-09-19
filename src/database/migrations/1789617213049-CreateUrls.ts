import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUrls1789617213049 implements MigrationInterface {
    name = 'CreateUrls1789617213049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "urls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "originalUrl" text NOT NULL, "shortCode" character varying(21) NOT NULL, CONSTRAINT "UQ_34ced802e4a45bf6a6346f2eb97" UNIQUE ("shortCode"), CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "urls"`);
    }

}
