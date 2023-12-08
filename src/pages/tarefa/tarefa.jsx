import React from 'react'
import BarraNavegacao from '../../components/barraNavegacao'
import Header from '../../components/header/header'
import { ModalEnviarTarefa } from '../../components/modal/modal'
import CardTarefas from '../../components/card/cardTarefas'
import SelectCompo from '../../components/form/select'
import CardTarefa from '../../components/card/cardTarefa'

const Tarefa = () => {
  const [abrir, setAbrir] = React.useState(false)
  const handleClose = (() => setAbrir(false))
  const [data,setData] = React.useState([
    {
      id : 1,
      nome : "nome",
      desc : "tarefa",
      proj : "teste",
      prioridade : 1,
      check : true
    },
    {
      id : 2,
      nome : "nome",
      desc : "tarefa",
      proj : "teste",
      prioridade : 1,
      check : true
    },
    {
      id : 3,
      nome : "nome",
    desc : "tarefa",
    proj : "teste",
    prioridade : 1,
    check : false
    }
])

  return (
    <div className='body-home'>

      <header>
       <BarraNavegacao fundo="#F0F5FF"  />
      </header>

      <main className='box-tarefa'>
        <Header 
          titulo="Tarefa"
          abrir={abrir}
          setAbrir={setAbrir}

        />
        <ModalEnviarTarefa aberto={abrir} sair={handleClose} />

        <section className='geral-tarefa' >
            <CardTarefas titulo="Prioridades"
              dados={data}
              fundo="#F5F8FF"
              tamanhoTitulo="2rem" 
              padding="1.5rem"
              />
            <CardTarefas 
              titulo="Para hoje"
              dados={data}
              tamanhoTitulo="2rem"
              fundo="#E7EDFC"
              padding="1.5rem"
              
              />
        </section>


        <section className='todas-tarefas' aria-labelledby='todas-tarefas'>
          <section className='titulo-select-tarefa'>
              <h3 id='todas-tarefas'>Todas as tarefas</h3>
              <SelectCompo  options={["padrão","por data"]}/>
          </section>


          <section>
            {data.map((item) =>{
              return(
                <CardTarefa nome={item.nome} descricao={item.desc} categoria={item.proj} id={item.id}/>

              )
            })}
          </section>

        </section>

      </main>
    </div>
  )
}

export default Tarefa
