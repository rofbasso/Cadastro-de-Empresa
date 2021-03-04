import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import CompaniesRepository from '../repositories/CompaniesRepository';

interface CompanyReturn {
    razao: string;
}

class DeleteCompanyService {
    public async execute(id: string): Promise<CompanyReturn> {
        const companiesRepository = getCustomRepository(CompaniesRepository);

        const companyRemove = await companiesRepository.findOne({
            where: { id },
        });

        if (!companyRemove) {
            throw new AppError('Empresa não encontrada', 400);
        }

        const companyReturn = {
            razao: companyRemove.razao,
        };

        await companiesRepository.remove(companyRemove);

        return companyReturn;
    }
}

export default DeleteCompanyService;
