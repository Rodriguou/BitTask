import Capsula from "../capsula/capsula";
import Carrousel from "../carrousel/carrousel";

const Container = () =>{
    return(
        <article className="body-container" >
            <section id="overview" aria-labelledby="titulo-overview">
                <h3 id="titulo-overview">Overview</h3>
                <article className="inner-overview">
                    <section className="section-overview">
                        <Capsula texto="Projeto" numero="10" />
                        <Capsula texto="Tarefas" numero="10" />

                    </section>

                    <section className="section-overview">
                        <section>
                            <Capsula texto="Atrasado" numero="10" />
                            <Capsula texto="Concluido" numero="10" />

                        </section>

                    </section>

                    <section className="section-concluido">
                        <p>Parabens você concluiu <span>10</span> tarefas</p>
                    </section>

                </article>

            </section>

            <section className="box-carrousel-home">
                <Carrousel />

            </section>
        </article>
    )
}

export default Container;