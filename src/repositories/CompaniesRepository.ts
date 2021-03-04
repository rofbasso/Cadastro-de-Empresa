import { EntityRepository, Repository } from 'typeorm';

import Company from '../models/Company';

@EntityRepository(Company)
class CompaniesRepository extends Repository<Company> {
    public async findByCNPJ(cnpj: string): Promise<Company | null> {
        const findCompany = await this.findOne({
            where: { cnpj },
        });

        return findCompany || null;
    }
}

export default CompaniesRepository;
