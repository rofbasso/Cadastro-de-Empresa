import { toDate } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    provider_id: string;
    company_id: string;
    date: Date;
    notes: string;
}

class UpdateAppointmentService {
    public async execute(
        id: string,
        { provider_id, company_id, date, notes }: RequestDTO,
    ): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        let findAppointment = await appointmentsRepository.findOne({
            where: { id },
        });

        if (!findAppointment) {
            throw new AppError('Agendamento não encontrado', 400);
        }

        const updateInfoAppointment = {
            id: findAppointment.id,
            provider_id,
            company_id,
            provider: findAppointment.provider,
            company: findAppointment.company,
            date,
            notes,
            updated_at: toDate(Date.now()),
            created_at: findAppointment.created_at,
        };

        findAppointment = updateInfoAppointment;

        await appointmentsRepository.save(findAppointment);

        return findAppointment;
    }
}

export default UpdateAppointmentService;
