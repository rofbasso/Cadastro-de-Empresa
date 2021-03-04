import {
    MigrationInterface,
    QueryRunner,
    TableForeignKey,
    TableColumn,
} from 'typeorm';

export default class AlterFieldToProviderId1613090437728
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('companys', 'provider');
        await queryRunner.addColumn(
            'companys',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'companys',
            new TableForeignKey({
                name: 'CompanyProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('companys', 'CompanyProvider');

        await queryRunner.dropColumn('companys', 'provider_id');

        await queryRunner.addColumn(
            'companys',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }
}
