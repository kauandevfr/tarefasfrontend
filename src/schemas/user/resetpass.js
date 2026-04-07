import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
    password: yup
        .string()
        .min(8, 'A senha precisa ter no mínimo 8 caracteres')
        .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
        .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
        .matches(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial')
        .required('Senha obrigatória'),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas não coincidem')
        .required('Confirmação de senha obrigatória'),
});