import { getCustomRepository, Not } from 'typeorm';
import CompaniesRepository from '../repositories/CompaniesRepository';
import Company from '../models/Company';
import AppError from '../errors/AppError';

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

class UpdateCompanyService {
    public async execute(
        id: string,
        {
            razao,
            cnpj,
            endereco,
            bairro,
            estado,
            cidade,
            cep,
            pais,
        }: RequestDTO,
    ): Promise<Company> {
        const companiesRepository = getCustomRepository(CompaniesRepository);

        let findCompany = await companiesRepository.findOne({
            where: { id },
        });

        if (!findCompany) {
            throw new AppError('Empresa não encontrada', 400);
        }

        const findCompanyInSameCNPJ = await companiesRepository.findOne({
            where: { cnpj, id: Not(id) },
        });

        if (findCompanyInSameCNPJ) {
            throw new AppError('CNPJ já cadastrado');
        }

        const updateInfoCompany = {
            id: findCompany.id,
            razao,
            cnpj,
            endereco,
            bairro,
            estado,
            cidade,
            cep,
            pais,
            updated_at: findCompany.updated_at,
            created_at: findCompany.created_at,
        };

        findCompany = updateInfoCompany;

        await companiesRepository.save(findCompany);

        return findCompany;
    }
}

export default UpdateCompanyService;
