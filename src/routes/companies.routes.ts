import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CompaniesRepository from '../repositories/CompaniesRepository';
import CreateCompanyService from '../services/CreateCompanyService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import DeleteCompanyService from '../services/DeleteCompanyService';

const companiesRouter = Router();

companiesRouter.use(ensureAuthenticated);

companiesRouter.get('/', async (request, response) => {
    const companiesRepository = getCustomRepository(CompaniesRepository);
    const companies = await companiesRepository.find();

    return response.json(companies);
});

companiesRouter.post('/', async (request, response) => {
    const {
        razao,
        cnpj,
        endereco,
        bairro,
        estado,
        cidade,
        cep,
        pais,
    } = request.body;

    const createCompany = new CreateCompanyService();

    const company = await createCompany.execute({
        razao,
        cnpj,
        endereco,
        bairro,
        estado,
        cidade,
        cep,
        pais,
    });

    return response.json(company);
});

companiesRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    const deleteCompany = new DeleteCompanyService();

    const company = await deleteCompany.execute(id);

    return response.json(`Empresa ${company.razao} foi deletada`);
});

export default companiesRouter;
