import { MigrationInterface, QueryRunner } from "typeorm";

export class ExpiresAt1789648648278 implements MigrationInterface {
    name = 'ExpiresAt1789648648278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" ADD "expiresAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "expiresAt"`);
    }

}
