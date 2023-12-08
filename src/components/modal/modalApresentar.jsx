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

export const ModalApresentarP = ({aberto, fechado,dados,f}) => {
    const {EditarProj, DeletarProj} = useContext(ProjetoGlobal)
    const [desabilitado, setDesabilitado] = React.useState(true)

    // variaveis de controle de notificações
    const [suceso, setSucesso] = React.useState(false)
    const [erro, setErro] = React.useState(false)

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

    function onChange({target}){
        setForm({...form, [target.id] : target.value})
    }

    // dados ficticios para tarefa
    const [data,setData] = React.useState([
        {
        id : 1,
        desc : "tarefa",
        check : true
        },
        {
            id : 2,
            desc : "tarefa",
            check : true
        },
        {
            id : 3,
            desc : "tarefa",
            check : false
        }
    ])

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

                <InputComp f={onChange} state={form.nome} id="nome"  label={desabilitado ? '' : 'Nome'} disabled={desabilitado}  />

                    <TextArea f={onChange} id="descricao" disabled={desabilitado}  placeholder="descreva o projeto" label="Descrição" linhas={15} state={form.descricao}/>

                {!desabilitado && <RadioCompo f={onChange}  id="categoria" label="Categoria" options={ ["pessoal", "profissional", "acadêmico"]}  />}


                {desabilitado && 
                    <section >
                        <CardTarefas disabled={desabilitado} dados={data} setDados={setData} titulo="Tarefas" fundo="#F6F6F6" />
                    </section>
                }
                {!desabilitado && <BotaoEnviar f={handleEditar} texto='FINALIZAR'/>}

 

            </section>
        </Box>
    
    
    </Modal>

    </>
  )
}

