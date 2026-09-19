import { MigrationInterface, QueryRunner } from "typeorm";

export class Clicks1789650511649 implements MigrationInterface {
    name = 'Clicks1789650511649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" ADD "clicks" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "clicks"`);
    }

}
