import React, { useEffect } from "react"

import { Box, Modal, Radio, Select, Typography } from "@mui/material"
import { InputComp } from "../form/input"

import TextArea from "../form/textArea"
import SelectCompo from "../form/select"
import { BotaoEnviar } from "../button/botao"
import RadioCompo from "../form/radio"
import useAxios from "../../hooks/useAxios"
import axios from "axios";
import { ProjetoGlobal } from "../../context/projetoContext"
import { UserGlobal } from '../../context/userContext';
import { ErroNotifi, SucessNotifi } from "../notificacao/notificacao"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { TarefaGlobal } from "../../context/tarefaContext"


export const ModalEnviarProjeto = ({aberto, sair}) =>{
    // variaveis de estado para a notificação
    const [sucess, setSucess] = React.useState(false)
    const [error, setError] = React.useState(false)
    // dados do usuário
    const {data,login,loading,nome,user,Login,erro} = React.useContext(UserGlobal)
    const {CriarProj} = React.useContext(ProjetoGlobal)
    // função post de projeto

    
    async function handleSubmit(event){
        event.preventDefault()
        const req = await CriarProj(dados)
      
        if (req.res.status == 201){
            setSucess(true)
            setTimeout(() =>{
                sair()

            }, 800)
           
        }
        else{
            setError(true)
        }

    }

    // dados do formulário
    const [dados, setDados] = React.useState({
        nome : "",
        descricao : "",
        categoria : ""
    })

    function onChange({target}){
        setDados({...dados, [target.id] : target.value})
    }

    const opcoesCategoria = ["pessoal", "academico", "profissional"]
    
    return(
       
        <Modal  open={aberto} onClose={sair}  className="modal">
            <Box className="box-modal">
            <ErroNotifi texto="Erro ao criar o projeto" error={error} setError={setError}/>
            <SucessNotifi texto="Projeto criado!" sucess={sucess} setSucess={setSucess} />

                <section id={aberto ? "" : "sair"} className="inner-modal">
                    <header>
                        <h3 className="titulo-modal-criar">Criar projeto</h3>
                        <button onClick={(() => sair)}></button>
                    </header>
                    <form className="form-modal" onSubmit={handleSubmit}>
                        <InputComp
                            label="Nome"
                            type="text" 
                            id="nome"
                            placeholder="Digite o nome da projeto"
                            f={onChange} 
                            required
                        />
                        <TextArea
                            label="Descricao" 
                            id="descricao" 
                            placeholder="Digite uma breve descrição da tarefa"
                            f={onChange} 
                        />
                        <RadioCompo 
                            options={opcoesCategoria} 
                            nome="categoria"
                            id="categoria"
                            label="Categoria"
                            f={onChange}/>
                        <BotaoEnviar type="submit" />
                    </form>
                    

                </section>
            </Box>
            
        </Modal>
      
    )
}


export const ModalEnviarTarefa = ({ aberto,sair}) =>{
    const {ObterProj} = React.useContext(ProjetoGlobal)
    const {CriarTarefa} = React.useContext(TarefaGlobal)
    const [listaProjetos, setListaProjetos] = React.useState()
    React.useEffect(() =>{
        async function requisicaoObterProjeto(){
            console.log("requisição")
            const req = await ObterProj()
            setListaProjetos(req)
            console.log(listaProjetos?.json[0].nome)
        }

       requisicaoObterProjeto()
        console.log(listaProjetos)

       
    },[])

    async function handleSubmit(event){
        event.preventDefault()
        const req = await CriarTarefa(selectProject,dados)
        console.log(req)
        
    }
    const [selectProject, setSelectProject] = React.useState()
    // dados do formulário
    const [dados, setDados] = React.useState({
        nome : "",
        status:false,
        descricao : "",
        prioridade: ""
    })

    function onChange({target}){
        setDados({...dados, [target.id] : target.value})
        console.log(dados)
    }

    function OnChangeProject({target}){
        setSelectProject(target.value)
        console.log(target.value)
    }

    const opcoesProjeto = ["senai", "escola", "pessoal"]
    const opcoesPrioridade = ["baixa", "média", "alta"]
    
    return(
        <Modal open={aberto} onClose={sair}  className="modal">
            <Box className="box-modal">
                <section className="inner-modal">
                    <h3 className="titulo-modal-criar">Criar tarefa</h3>
                    <form className="form-modal" onSubmit={handleSubmit}>
                        <InputComp
                            label="Nome"
                            type="text" 
                            id="nome"
                            f={onChange} 
                            placeholder="Digite o nome da tarefa"
                            required
                        />
                        <TextArea
                            label="Descricao" 
                            id="descricao" 
                            placeholder="Digite uma breve descrição da tarefa"
                            f={onChange} 
                        />
                        {listaProjetos &&
                             <section className="data-opcoes">
                            {/* <InputComp 
                                label="Data" 
                                type="date"
                                id="data"
                                required
                                f={onChange}
                            /> */}
                            <SelectCompo options={listaProjetos?.json} 
                                label="Projeto"
                                required
                                id="projeto"
                                f={OnChangeProject}
                            />

                        </section>
                        
                        }
                       
                        <RadioCompo 
                            options={opcoesPrioridade} 
                            nome="prioridade"
                            id="prioridade"
                            label="Nível de prioridade"
                            f={onChange}/>
                        <BotaoEnviar type="submit" />
                    </form>
                    

                </section>
            </Box>
            
        </Modal>
    )
}