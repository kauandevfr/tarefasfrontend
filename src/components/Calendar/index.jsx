import "./styles.scss"

export default function Calendar() {
    return (
        <>

            <div class="content-width horizontal between">
                <div className="vertical g1">
                    <h1 className="title">Calendário</h1>
                    <p className="subtitle">visão mensal</p>
                </div>
                <button className="button" >
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
                    Nova Tarefa
                </button>
            </div>

            <section className="surface g4 vertical">
                <div className="horizontal ai-center between w100">
                    <div className="title" id="cal-month-label">Março de 2026</div>
                    <div className="horizontal g2">
                        <button className="button secondary">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path d="M15 18l-6-6 6-6"></path>
                            </svg>
                        </button>
                        <button className="button secondary" >Hoje</button>
                        <button className="button secondary">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path d="M9 18l6-6-6-6"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="cal-grid" id="cal-grid">
                    <div className="cal-dow">Dom</div>
                    <div className="cal-dow">Seg</div>
                    <div className="cal-dow">Ter</div>
                    <div className="cal-dow">Qua</div>
                    <div className="cal-dow">Qui</div>
                    <div className="cal-dow">Sex</div>
                    <div className="cal-dow">Sáb</div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                    <div className="cal-day">
                        <span className="cal-day-num">X</span>
                    </div>
                </div>
            </section>
        </>
    )
}