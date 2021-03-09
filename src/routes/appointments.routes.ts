import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import DeleteAppointmentService from '../services/DeleteAppointmentService';
import UpdateAppointmentService from '../services/UpdateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, company_id, date, notes } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        provider_id,
        company_id,
        date: parsedDate,
        notes,
    });

    return response.json(appointment);
});

appointmentsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    const deleteAppointment = new DeleteAppointmentService();

    const appointment = deleteAppointment.execute(id);

    return response.json(
        `Não foi possivel deletar o agendamento ${appointment}`,
    );
});

appointmentsRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { provider_id, company_id, date, notes } = request.body;

    const updateAppointment = new UpdateAppointmentService();

    const appointment = await updateAppointment.execute(id, {
        provider_id,
        company_id,
        date,
        notes,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
