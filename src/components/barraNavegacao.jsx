import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';

// imagens 
import botaoHome from "../assets/botao-home.svg"
import botaoProjeto from "../assets/botao-projeto.svg"
import botaoTarefa from "../assets/botao-tarefa.svg"

const BarraNavegacao = ({cor,ariaLabel,fundo,itemSelec}) => {
  const local = useLocation().pathname;
  const home = local == "/home"
  const tarefa = local == "/tarefa"
  const projeto = local == "/projeto"

  return (
    <nav  className='box-barra-nav'>
      <ul className='inner-barra-nav' style={{backgroundColor : fundo}}>
        <li>
          <Link className='item-nav' to={"/home"} id={home ? 'selecionado' : ''} >
            <img src={botaoHome} alt='botao para home'/>
            <p>Home</p>
          </Link>

        </li>

        <li>
          <Link className='item-nav' to={"/tarefa"} id={tarefa ? 'selecionado' : ''}>
            <img src={botaoProjeto} alt='botao para tarefa'/>
            <p>Tarefas</p>
          </Link>

        </li>
        
        <li>
          <Link className='item-nav' to={"/projeto"} id={projeto ? 'selecionado' : ''}>
            <img src={botaoTarefa} alt='botao para home'/>
            <p>Projetos</p>
          </Link>
        </li>

      </ul>
    </nav>
  )
}

export default BarraNavegacao;