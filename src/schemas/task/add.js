import * as yup from 'yup'

export const taskSchema = yup.object({
    title: yup
        .string()
        .required('Título é obrigatório')
        .min(3, 'Título deve ter pelo menos 3 caracteres'),

    description: yup
        .string()
        .max(280, 'Descrição deve ter no máximo 280 caracteres'),

    priority: yup
        .string()
        .oneOf(['high', 'medium', 'low'], 'Prioridade inválida')
        .required('Selecione uma prioridade'),

    createdat: yup
        .string()
        .required('Data é obrigatória'),

    completed: yup
        .boolean()
        .required()
        .default(false),
})