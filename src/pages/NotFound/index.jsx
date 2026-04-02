import Title from "../../components/Title"
import "./styles.scss"

export default function NotFound() {
    return (

        <main className="center">
            <div className="blur-404" />
            <Title />
            <div className="center g2 fade-anim">
                <div className="glitch-wrap">
                    <div className="num-404 font-title">404</div>
                </div>
                <div className="divider-line" />
                <h1 className="title">Página não encontrada.</h1>
                <p className="subtitle text-center">O endereço que você tentou acessar não existe<br />ou foi movido para outro lugar.</p>
                <div className="horizontal g2">
                    <button className="button" type="button">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        Ir para o início
                    </button>

                    <a className="button secondary" href="javascript:history.back()">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"></path></svg>
                        Voltar
                    </a>
                </div>
            </div>
        </main>
    )
}