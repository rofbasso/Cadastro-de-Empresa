import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Company from '../models/Company';
import CompaniesRepository from '../repositories/CompaniesRepository';

interface RequestDTO {
    razao: string;
    cnpj: string;
    endereco: string;
    bairro: string;
    estado: string;
    cidade: string;
    cep: string;
    pais: string;
}

class CreateCompanyServices {
    public async execute({
        razao,
        cnpj,
        endereco,
        bairro,
        estado,
        cidade,
        cep,
        pais,
    }: RequestDTO): Promise<Company> {
        const companiesRepository = getCustomRepository(CompaniesRepository);

        const findCompanyInSameCNPJ = await companiesRepository.findByCNPJ(
            cnpj,
        );

        if (findCompanyInSameCNPJ) {
            throw new AppError('CNPJ já cadastrado');
        }

        const company = companiesRepository.create({
            razao,
            cnpj,
            endereco,
            bairro,
            estado,
            cidade,
            cep,
            pais,
        });

        await companiesRepository.save(company);

        return company;
    }
}

export default CreateCompanyServices;
