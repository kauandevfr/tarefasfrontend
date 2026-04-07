import * as yup from 'yup';

export const forgotPassSchema = yup.object({
    email: yup
        .string()
        .trim()
        .email('Informe um e-mail válido')
        .required('E-mail obrigatório')
});