import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

import BarraNavegacao       from '../../components/barraNavegacao'
import CardCriar            from '../../components/card/cardCriar';
import ilustracaoTarefa     from '../../assets/ilustracaoTarefa.svg';
import ilustracaoProjeto    from "../../assets/ilustracaoProj.svg";
import Container            from '../../components/containers/container';
import { ModalEnviarProjeto,ModalEnviarTarefa } from '../../components/modal/modal';
import Desempenho from '../../components/desempenho/desempenho';
import { UserGlobal } from '../../context/userContext';



const Home = () => {
    // dados do usuario
    const {data,login,loading,userLogin,erro} = React.useContext(UserGlobal)
    const nome = window.localStorage.getItem('usuario')
    // variavel de estado que altera o estado do modal
    const [tarefa, setTarefa] = React.useState(false)
    const [projeto, setProjeto] = React.useState(false)
    // função para sair ao cliccar fora do modal
    const handleCloseTarefa = () => setTarefa(false);
    const handleCloseProjeto = () => setProjeto(false);
  return (
    <>
    
    
    <div className='body-home'>
        
        <header className='box-nav'>
            <BarraNavegacao ariaLabel={"navegação primária"} fundo="#F0F5FF"/>
        </header>

        <div>
            <header className='box-header-secun'>
                <p>Olá, {nome} </p>
                <section aria-label='dia de hoje' id='dia'>
                    <p>{moment().format('DD-MM-YYYY')}</p>
            
                </section>
            </header>

            <main id='box-main-home'>
                <section className='card-criar'>
                    <div>
                    <CardCriar 
                        titulo="Criar Projeto"
                        descricao={"Crie novos projetos e organize-os por categoria: pessoal, acadêmico ou profissional."}
                        img={ilustracaoProjeto}
                        open={tarefa}
                        setOpen={setProjeto} 
                        />
                    <ModalEnviarProjeto aberto={projeto} sair={handleCloseProjeto} />

                    </div>

                    <div>
                    <CardCriar
                        titulo="Criar Tarefa"
                        descricao={"Crie novas tarefas e organize-as por nível de prioridade. "}
                        img={ilustracaoTarefa}
                        open={projeto}
                        setOpen={setTarefa} 
                        />
                    <ModalEnviarTarefa aberto={tarefa} sair={handleCloseTarefa}/>

                    </div>
                </section>

            </main>

        </div>
      
    </div>
    </>
  )
}

export default Home
