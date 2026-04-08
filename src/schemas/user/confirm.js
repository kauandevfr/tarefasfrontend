import * as yup from 'yup';

export const confirmSchema = yup.object({
    password: yup
        .string()
        .required('Senha obrigatória'),
});