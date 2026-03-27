import * as yup from 'yup';

export const updateUserSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(3, 'O nome precisa ter no mínimo 3 caracteres')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'O nome deve conter apenas letras e espaços')
        .optional(),

    email: yup
        .string()
        .trim()
        .email('Informe um e-mail válido')
        .optional(),

    phonenumber: yup
        .string()
        .trim()
        .transform(value => value === '' ? null : value)
        .nullable()
        .matches(/^\d{10,11}$/, 'Informe apenas números, com DDD (ex: 11987654321)')
        .optional(),
});

export const updatePasswordSchema = yup.object({
    currentPassword: yup
        .string()
        .required('Senha atual obrigatória'),

    newPassword: yup
        .string()
        .min(8, 'A senha precisa ter no mínimo 8 caracteres')
        .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
        .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
        .matches(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial')
        .required('Nova senha obrigatória'),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'As senhas não coincidem')
        .required('Confirmação de senha obrigatória'),
});