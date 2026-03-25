import { Link, useNavigate } from "react-router-dom"
import Title from "../../components/Title"
import { useForm } from "react-hook-form";
import instance from "../../services/instance";
import { loginSchema } from "../../schemas/user/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";

export default function Login() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({ resolver: yupResolver(loginSchema) });
    const [error, setError] = useState(null)

    const handleLogin = async data => {
        try {
            setError(null)
            await instance.post('/user/login', data);

            navigate(`/dashboard`);
        } catch (error) {
            setError(error.response.data.message)
        }
    };

    return (
        <main className="center">
            <div className="blur" />
            <div className="wrapper">
                <form className="panel-left p4" onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-header">
                        <h1 className="title">Bem vindo<br /><span className="text-yellow-800">de volta.</span></h1>
                        <h2 className="subtitle">Entre com suas credenciais para continuar.</h2>
                    </div>
                    <div className="vertical w100 g2">
                        <div className="field-group">
                            <label className="label" htmlFor="email">E-mail</label>
                            <input className={`input ${errors.email && 'error'}`}
                                autoFocus
                                type="text"
                                id="email"
                                placeholder="seu@email.com"
                                {...register('email')}
                            />
                            <ErrorMessage message={errors.email?.message} />
                        </div>
                        <div className="field-group">
                            <div className="horizontal between">
                                <label className="label" htmlFor="password">Senha</label>
                                <Link className="link" to='forgot-pass'>Esqueceu a senha?</Link>
                            </div>
                            <input className={`input ${errors.password && 'error'}`}
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                {...register('password')}
                            />
                            <ErrorMessage message={errors.password?.message} />
                        </div>
                    </div>
                    <div className="vertical g2 ai-center">
                        <ErrorMessage message={error} />
                        <button className="button w100 jc-center"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Iniciar sessão
                        </button>
                        <span className="span horizontal g1 jc-center">
                            Não tem uma conta?
                            <Link className="link" to='/register'>
                                Criar conta
                            </Link>
                        </span>
                    </div>
                </form>
                <div className="panel-right vertical p4 between">
                    <div className="brand">
                        <Title />
                        <h2 className="subtitle">Seu gerenciador pessoal.</h2>
                    </div>

                    <div className="footer">
                        <h3 className="text-3xl font-title">
                            "Organize o que<br />
                            <span className="text-yellow-800">
                                realmente importa.
                            </span>
                            "
                        </h3>
                    </div>
                </div>
            </div>
        </main >
    )
}