import React, { useContext } from 'react'
import BarraNavegacao from '../../components/barraNavegacao'
import Header from '../../components/header/header'
import { ModalEnviarTarefa } from '../../components/modal/modal'
import SelectCompo from '../../components/form/select'
import CardTarefa from '../../components/card/cardTarefa'
import { TarefaGlobal } from '../../context/tarefaContext'

const Tarefa = () => {
  const {ObterTudo} = useContext(TarefaGlobal)
  const [todasAsTarefas, setTodasAsTarefas] = React.useState()
  const [abrir, setAbrir] = React.useState(false)
  const handleClose = (() => setAbrir(false))

  React.useEffect(() =>{
    async function ObterTodasAsTarefas(){
      try{
        const fetch = await ObterTudo()
        console.log(fetch)
        setTodasAsTarefas(fetch.json)

      }
      catch(error){
        console.log(error)
      }
    }
    ObterTodasAsTarefas()
  },[])
  
  

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

    <section className='todas-tarefas' aria-labelledby='todas-tarefas'>
      <section className='titulo-select-tarefa'>
              <h3 id='todas-tarefas'>Todas as tarefas</h3> 
          </section>


          <section className='lista-tarefas'>
            {console.log(todasAsTarefas)}
            {todasAsTarefas?.map((item,index) =>{
              return(
                <CardTarefa index={index} dados={todasAsTarefas} setDados={setTodasAsTarefas} status={item.status} projeto={item.projeto} nome={item.nome} descricao={item.descricao} prioridade={item.prioridade} id={item._id}/>

              )
            })}
            {todasAsTarefas?.length == 0 && <section className='tarefa-nenhuma'><p>Nenhuma tarefa</p></section>
            }
          </section>

        </section>

      </main>
    </div>
  )
}

export default Tarefa
