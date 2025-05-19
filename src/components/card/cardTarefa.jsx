
import React, { useContext } from 'react'
import deleteIcon from "../../assets/deleteIcon.svg"
import { TarefaGlobal } from '../../context/tarefaContext'
import { ModalApresentarTarefa } from '../modal/modalApresentar'
const CardTarefa = ({nome,descricao,categoria, id, status,projeto, prioridade, dados, index, setDados}) => {
  const {AlterarTarefa, DeletarTarefa} = useContext(TarefaGlobal)
  const [openModal,setOpenModal] = React.useState(false)
  function handleChangeModal(){
    setOpenModal(!openModal)
  }
  async function HandleDeletarTarefa({target}) {
    try{
      console.log(target.name)
      console.log(dados)
      const Deletar = await DeletarTarefa(dados[index].projeto, dados[index]._id)
      console.log(Deletar)
      setDados(prev => prev.filter(tarefa => tarefa._id !== id));

      console.log(dados)
   
      
    }

    catch(error){

    }
  }
  async function handleChangeChecked({target}) {
    console.log(prioridade)
    try{
      const alterarStatusTarefa = await AlterarTarefa(target.name, target.id, {
      nome: nome,
      status: !status,
      prioridade: prioridade,
      descricao: descricao

    })
    
     setDados(prev =>
      prev.map(tarefa =>
        tarefa._id === target.id
          ? {
              ...tarefa,
              nome,
              status: !status,
              prioridade,
              descricao
            }
          : tarefa
      ))
      
    }

    catch(error){
      console.log(error)
    }
    
  }


  return (
    <>
    
    
    
      <ModalApresentarTarefa aberto={openModal} fechado={handleChangeModal} dados={dados} setDados={setDados} index={index}/>
    <div className='box-card-tarefa' >
        <input  type="checkbox" onChange={handleChangeChecked} name={dados[index].projeto} id={dados[index]._id} checked={dados[index].status} />
    
    <article onClick={handleChangeModal} className='box-card-tarefa-titulo'>
        <section className='checkNomeTarefa'>
          <h4 className={status ? "concluida" : "pendente"}>{dados[index].nome}</h4>
        </section>
        <section>
        </section>

    </article>
          <button className='deleteBotao' onClick={HandleDeletarTarefa}><img src={deleteIcon} alt="" /></button>
    
    </div>
    </>
  )
}

export default CardTarefa
