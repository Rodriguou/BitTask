import  React, { useContext }                                       from 'react'
import { Box, Modal }                               from "@mui/material"
import Tag                                          from '../tag/tag'
import TextArea                                     from '../form/textArea'
import DropMenu                                     from '../menu/dropMenu'
import { InputComp } from '../form/input'
import CardTarefas from '../card/cardTarefas'
import { ProjetoGlobal } from '../../context/projetoContext'
import { BotaoEnviar } from '../button/botao'
import RadioCompo from '../form/radio'
import { ErroNotifi, SucessNotifi } from '../notificacao/notificacao'
import { TarefaGlobal } from '../../context/tarefaContext'

export const ModalApresentarP = ({aberto, fechado,dados,f}) => {
    const {EditarProj, DeletarProj} = useContext(ProjetoGlobal)
    const {ObterTudoPorProjeto, AlterarTarefa} = useContext(TarefaGlobal)
    const [desabilitado, setDesabilitado] = React.useState(true)
    const [tarefasDoProjeto, setTarefasDoProjeto] = React.useState()
    // variaveis de controle de notificações
    const [suceso, setSucesso] = React.useState(false)
    const [erro, setErro] = React.useState(false)

    const [nomeErro, setNomeErro] = React.useState(false)
        const [descricaoErro,setDescricaoErro] = React.useState(false)
    console.log(dados)

    React.useEffect(() =>{
        async function ObterTarefas(){
            const req = await ObterTudoPorProjeto(dados.id)
            setTarefasDoProjeto(req?.json)
        }

        ObterTarefas()
    },[])

    // requisição 
    async function handleEditar(){
        const req = await EditarProj(form, dados.id)
        console.log(req.res)
        if (req.res.status == 200){
            setSucesso(true)
            setDesabilitado(true)
        }

        else {
            setErro(true)
        }
    }

    //habilita a edição 
    function UseEditar (event){
        event.preventDefault()
        setDesabilitado(!desabilitado)
    }
    // exclui um projeto
    async function UseExcluir(event){
        event.preventDefault()
        const req = await DeletarProj(dados.id)
        if (req.res.status == 200){
            setSucesso(true)
            setTimeout(() =>{
                fechado()
            }, 500)

        } else{
            setErro(true)
        }
        
        
    }

    // informações do formulario
    const [form,setForm] = React.useState({
        nome : dados.nome,
        descricao : dados.descricao,
        categoria : dados.categoria
    })

   function onChangeNome({target}){
        console.log(target.value.length)
       	if (target.value.length >= 30){
			setNomeErro("Respeite o limite máximo de 30 caracteres")
		}
        else if(target.value == ""){
            setNomeErro("Por favor, preencha o nome da tarefa")
            setForm({...form, [target.id] : target.value})
        }
        else{
            setNomeErro(false)
            setForm({...form, [target.id] : target.value})

        }
    }

    function onChangeDescricao({target}){
        if (target.value.length >= 250){
			setDescricaoErro("Respeite o limite máximo de 250 caracteres")
		}
        else{
            setDescricaoErro(false)
            setForm({...form, [target.id] : target.value})
        }
    }

    function onChange({target}){
        setDados({...form, [target.id] : target.value})
        console.log(form)
    }

    // dados ficticios para tarefa
    

  return (
    <>

    <SucessNotifi sucess={suceso} setSucess={setSucesso} texto="Ação concluida" time={500}/>
    <ErroNotifi error={erro} setError={setErro} texto='Ocorreu algum erro' time={500} /> 
    <Modal className="modal" open={aberto} onClose={fechado}>
        <Box className="box-modal">
            <section className='inner-modal'>
                <section className='tag-menu'>
                    <Tag nome={form.categoria} cor="#3D77FB" corLetra="#fff" padding="0.8rem 1.3rem" />
                    <DropMenu editar={UseEditar} deletar={UseExcluir} />
                </section>

                <InputComp error={nomeErro ? nomeErro : false} f={onChangeNome} state={form.nome} id="nome"  label={desabilitado ? '' : 'Nome'} disabled={desabilitado}  />

                    <TextArea error={descricaoErro ? descricaoErro : false} f={onChangeDescricao} id="descricao" disabled={desabilitado}  placeholder="descreva o projeto" label="Descrição" linhas={15} state={form.descricao}/>

                {!desabilitado && <RadioCompo f={onChange}  id="categoria" label="Categoria" options={ ["pessoal", "profissional", "acadêmico"]}  />}


                {desabilitado && 
                    <section >
                        <CardTarefas disabled={desabilitado} dados={tarefasDoProjeto} setDados={setTarefasDoProjeto} titulo="Tarefas" fundo="#F6F6F6" />

                    </section>
                }
                {!desabilitado && <BotaoEnviar disabled={dados.nome == ""? true : false} f={handleEditar} texto='FINALIZAR'/>}

 

            </section>
        </Box>
    
    
    </Modal>

    </>
  )
}


export const ModalApresentarTarefa = ({aberto, fechado,dados,setDados, index}) => {
    const {AlterarTarefa, DeletarTarefa} = useContext(TarefaGlobal)
    const [desabilitado, setDesabilitado] = React.useState(true)
    const [tarefasDoProjeto, setTarefasDoProjeto] = React.useState()
    // variaveis de controle de notificações
    const [suceso, setSucesso] = React.useState(false)
    const [erro, setErro] = React.useState(false)

    const [nomeErro, setNomeErro] = React.useState(false)
    const [descricaoErro,setDescricaoErro] = React.useState(false)
    

   

    // requisição 
    async function handleEditar(){
    
    try{
      const alterarStatusTarefa = await AlterarTarefa(dados[index]?.projeto, dados[index]?._id, {
      nome: form.nome,
      status: form.status,
      prioridade: form.prioridade,
      descricao: form.descricao

    })
    console.log(alterarStatusTarefa)
    
     setDados(prev =>
      prev.map(tarefa =>
        tarefa._id === dados[index]._id
          ? {
              ...tarefa,
              form
            }
          : tarefa
      ))
      setSucesso("Tarefa editada com sucesso")
      
    }

    catch(error){
     setErro()
    }
    }

    //habilita a edição 
    function UseEditar (event){
        event.preventDefault()
        setDesabilitado(!desabilitado)
    }
    // exclui um projeto
    async function HandleExcluirTarefa(event){
        event.preventDefault()
        try{
      
        console.log(dados)
         const Deletar = await DeletarTarefa(dados[index]?.projeto, dados[index]?._id)
      setDados(prev => prev.filter(tarefa => tarefa._id !== dados[index]._id));
      
    }

    catch(error){

    }
        
        
    }

    // informações do formulario
    const [form,setForm] = React.useState({
        nome : dados[index]?.nome,
        status : dados[index]?.status,
        prioridade : dados[index]?.prioridade,
        descricao: dados[index]?.descricao

    })

   function onChangeNome({target}){
       	if (target.value.length >= 30){
			setNomeErro("Respeite o limite máximo de 30 caracteres")
		}
        else if(target.value == ""){
            setNomeErro("Por favor, preencha o nome da tarefa")
            setForm({...form, [target.id] : target.value})
        }
        else{
            setNomeErro(false)
            setForm({...form, [target.id] : target.value})

        }
    }

    function onChangeDescricao({target}){
        if (target.value.length >= 250){
			setDescricaoErro("Respeite o limite máximo de 250 caracteres")
		}
        else{
            setDescricaoErro(false)
            setForm({...form, [target.id] : target.value})
        }
    }

    function onChange({target}){
        console.log(target)
        setForm({...form, [target.id] : target.value})
    }

    // dados ficticios para tarefa
    

  return (
    <>

    <SucessNotifi sucess={suceso} setSucess={setSucesso} texto="Ação concluida" time={500}/>
    <ErroNotifi error={erro} setError={setErro} texto='Ocorreu algum erro' time={500} /> 
    <Modal className="modal" open={aberto} onClose={fechado}>
        <Box className="box-modal">
            <section className='inner-modal'>
                <section className='tag-menu'>
                    <Tag nome={form.prioridade} cor="#3D77FB" corLetra="#fff" padding="0.8rem 1.3rem" />
                    <DropMenu editar={UseEditar} deletar={HandleExcluirTarefa} />
                </section>

                <InputComp error={nomeErro ? nomeErro : false} f={onChangeNome} state={form.nome} id="nome"  label={desabilitado ? '' : 'Nome'} disabled={desabilitado}  />

                <TextArea error={descricaoErro ? descricaoErro : false} f={onChangeDescricao} id="descricao" disabled={desabilitado}  placeholder="descreva o projeto" label="Descrição" linhas={15} state={form.descricao}/>

                {!desabilitado && <RadioCompo f={onChange}  id="prioridade" label="Prioridade" options={ ["baixa", "média", "alta"]}  />}

                {!desabilitado && <BotaoEnviar disabled={dados.nome == ""? true : false} f={handleEditar} texto='FINALIZAR'/>}

 

            </section>
        </Box>
    
    
    </Modal>

    </>
  )
}
