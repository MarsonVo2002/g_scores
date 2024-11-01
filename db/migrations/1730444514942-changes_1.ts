import { MigrationInterface, QueryRunner } from "typeorm";

export class Changes11730444514942 implements MigrationInterface {
    name = 'Changes11730444514942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "toan" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "ngu_van" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "ngoai_ngu" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "vat_li" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "hoa_hoc" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "hoa_hoc" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "vat_li" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "ngoai_ngu" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "ngu_van" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "toan" SET NOT NULL`);
    }

}
