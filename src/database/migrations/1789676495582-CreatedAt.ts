import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedAt1789676495582 implements MigrationInterface {
    name = 'CreatedAt1789676495582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "createdAt"`);
    }

}
