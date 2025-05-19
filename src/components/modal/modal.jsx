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

    // variaveis de estado forms
    const [nomeErro, setNomeErro] = React.useState(false)
    const [descricaoErro,setDescricaoErro] = React.useState(false)


    // variaveis de estado para a notificação
    const [sucess, setSucess] = React.useState(false)
    const [error, setError] = React.useState(false)
    // dados do usuário
    const {data,login,loading,nome,user,Login,erro} = React.useContext(UserGlobal)

    const {CriarProj} = React.useContext(ProjetoGlobal)
    // função post de projeto

    
    async function handleSubmit(event){
        event.preventDefault()
        try{
            const req = await CriarProj(dados)
            if (req.res.status == 201){
            setSucess(true)
            setTimeout(() =>{
                sair()

            }, 800)
           
            }
            else{
                throw new error
            }
        }
       
        catch(error){
            console.log(error.response.data.message)
            setError(true)
        }

    }

    // dados do formulário
    const [dados, setDados] = React.useState({
        nome : "",
        descricao : "",
        categoria : ""
    })

    function onChangeNome({target}){
        console.log(target.value.length)
       	if (target.value.length >= 30){
			setNomeErro("Respeite o limite máximo de 30 caracteres")
		}
        else if(target.value == ""){
            setNomeErro("Por favor, preencha o nome da tarefa")
            setDados({...dados, [target.id] : target.value})
        }
        else{
            setNomeErro(false)
            setDados({...dados, [target.id] : target.value})

        }
    }
    function onChangeDescricao({target}){
        if (target.value.length >= 250){
			setDescricaoErro("Respeite o limite máximo de 250 caracteres")
		}
        else{
            setDescricaoErro(false)
            setDados({...dados, [target.id] : target.value})
        }
    }
    function onChange({target}){

        setDados({...dados, [target.id] : target.value})
    }

    const opcoesCategoria = ["pessoal", "acadêmico", "profissional"]
    
    return(
       <>
            <ErroNotifi texto="Erro ao criar o projeto" error={error} setError={setError}/>
            <SucessNotifi texto="Projeto criado!" sucess={sucess} setSucess={setSucess} />
       
       
        <Modal  open={aberto} onClose={sair}  className="modal">
            <Box className="box-modal">

                <section id={aberto ? "" : "sair"} className="inner-modal">
                    <header>
                        <h3 className="titulo-modal-criar">Criar projeto</h3>
                        
                    </header>
                    <form className="form-modal" onSubmit={handleSubmit}>
                        <InputComp
                            label="Nome"
                            type="text" 
                            id="nome"
                            placeholder="Digite o nome da projeto"
                            value={dados.nome}
                            error={nomeErro ? nomeErro : false}
                            f={onChangeNome} 
                            required
                        />
                        <TextArea
                            label="Descricao" 
                            id="descricao" 
                            value={dados.descricao}
                            error={descricaoErro ? descricaoErro : false}
                            placeholder="Digite uma breve descrição da tarefa"
                            f={onChangeDescricao} 
                        />
                        <RadioCompo 
                            options={opcoesCategoria} 
                            nome="categoria"
                            id="categoria"
                            label="Categoria"
                          
                            f={onChange}/>
                        <BotaoEnviar disabled={dados.nome == "" || descricaoErro || dados.categoria == "" ? true : false } type="submit" />
                    </form>
                    

                </section>
            </Box>
            
        </Modal>
       </>
      
    )
}


export const ModalEnviarTarefa = ({ aberto,sair}) =>{
    const {ObterProj} = React.useContext(ProjetoGlobal)
    const {CriarTarefa} = React.useContext(TarefaGlobal)
    const [listaProjetos, setListaProjetos] = React.useState()
    const [nomeErro, setNomeErro] = React.useState(false)
    const [descricaoErro,setDescricaoErro] = React.useState(false)
    const [submitSucces, setSubmitSucces] = React.useState(false)
    const [submitError, setSubmitError] = React.useState(false)
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
        try{
            const req = await CriarTarefa(selectProject,dados)
            console.log(req)
            setSubmitSucces("Tarefa Criada com sucesso")

        }

        catch(error){
            setSubmitError(error.response.data.message)
        }
        
    }
    const [selectProject, setSelectProject] = React.useState()
    // dados do formulário
    const [dados, setDados] = React.useState({
        nome : "",
        status:false,
        descricao : "",
        prioridade: ""
    })

    function onChangeNome({target}){
        console.log(target.value.length)
       	if (target.value.length >= 30){
			setNomeErro("Respeite o limite máximo de 30 caracteres")
		}
        else if(target.value == ""){
            setNomeErro("Por favor, preencha o nome da tarefa")
            setDados({...dados, [target.id] : target.value})
        }
        else{
            setNomeErro(false)
            setDados({...dados, [target.id] : target.value})

        }
    }

    function onChangeDescricao({target}){
        if (target.value.length >= 250){
			setDescricaoErro("Respeite o limite máximo de 250 caracteres")
		}
        else{
            setDescricaoErro(false)
            setDados({...dados, [target.id] : target.value})
        }
    }

    function onChange({target}){
        setDados({...dados, [target.id] : target.value})
        console.log(dados)
    }

    function OnChangeProject({target}){
        setSelectProject(target.value)
        console.log(target.value)
    }

    const opcoesPrioridade = ["baixa", "média", "alta"]
    
    return(
        <>
                <ErroNotifi texto={submitError ? submitError : false} error={submitError} setError={setSubmitError}/>
                <SucessNotifi texto={submitSucces ? submitSucces : false} sucess={submitSucces} setSucess={setSubmitSucces} />
    
            <Modal open={aberto} onClose={sair}  className="modal">
                <Box className="box-modal">
                    <section className="inner-modal">
                        <h3 className="titulo-modal-criar">Criar tarefa</h3>
                        <form className="form-modal" onSubmit={handleSubmit}>
                            <InputComp
                                label="Nome"
                                type="text" 
                                id="nome"
                                value={dados.nome}
                                error={nomeErro ? nomeErro : false}
                                f={onChangeNome} 
                                placeholder="Digite o nome da tarefa"
                                required
                            />
                            <TextArea
                                label="Descricao" 
                                id="descricao" 
                                value={dados.descricao}
                                error={descricaoErro ? descricaoErro : false}
                                placeholder="Digite uma breve descrição da tarefa"
                                f={onChangeDescricao} 
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
                            <BotaoEnviar type="submit" disabled={dados.nome == "" || descricaoErro || dados.prioridade == "" ? true : false} />
                        </form>
                        

                    </section>
                </Box>
                
            </Modal>
        </>
    )
}