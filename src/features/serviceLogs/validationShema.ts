import * as yup from 'yup';
import type { ServiceType } from './types';

export const serviceLogShema = yup.object({
    providerId: yup.string().required('Provider ID is required'),
    serviceOrder: yup.string().required('Service Order is required'),
    carId: yup.string().required('Car ID is required'),
    odometr: yup
        .number()
        .typeError('Odometer must be a number')
        .required('Odometer is required')
        .min(0),
    engineHours: yup
        .number()
        .typeError('Engine Hours must be a number')
        .required('Engine Hours is required')
        .min(0),
    startDate: yup.string().required('Start Date is required'),
    endDate: yup.string().required('End Date is required'),

    type: yup.mixed<ServiceType>().oneOf(['planned', 'unplanned', 'emergency']).required(),
    serviceDescription: yup.string().required('Description is required'),
});