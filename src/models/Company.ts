import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    razao: string;

    @Column()
    cnpj: string;

    @Column()
    endereco: string;

    @Column()
    bairro: string;

    @Column()
    estado: string;

    @Column()
    cidade: string;

    @Column()
    cep: string;

    @Column()
    pais: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Company;
