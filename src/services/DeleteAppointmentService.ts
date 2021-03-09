import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface AppointmentReturn {
    date: Date;
}

class DeleteAppointmentService {
    public async execute(id: string): Promise<AppointmentReturn> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentRemove = await appointmentsRepository.findOne({
            where: { id },
        });

        if (!appointmentRemove) {
            throw new AppError('Agendamento não encontrada', 400);
        }

        const appointmentReturn = {
            date: appointmentRemove.date,
        };

        await appointmentsRepository.remove(appointmentRemove);

        return appointmentReturn;
    }
}

export default DeleteAppointmentService;
