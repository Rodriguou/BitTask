import React from "react"
import CardDesempenho from "../card/cardDesempenho"

const Desempenho = () => {
    const [dados, setDados] = React.useState([
        {
            nome: 'Senai',
            pendente: 3,
            tarefaC: 10,
            porcenC : 50,
            porcenp : 50
        },
        {
            nome: 'Senai',
            pendente: 4,
            tarefaC: 8,
            porcenc : 30,
            porcenP :  70 
        },
        {
            nome: 'Senai',
            pendente: 6,
            tarefaC: 3,
            porcenC : 80,
            porcenP : 20
        }
    ]) 


  return (
    <section className="box-desempenho">
        <h3 id="titulo-desempenho">Desempenho</h3>
        <article className="inner-desempenho">
            {dados.map((item,index) =>{
                return(
                    <CardDesempenho
                        key={index}
                        nome={item.nome}
                        concluida={item.tarefaC}
                        pendente={item.pendente}
                        porcentagemC={item.porcenC}
                        porecentagemP={item.porcenP}
                    />

                )

            })}
        </article>  

    </section>
  )
}

export default Desempenho
