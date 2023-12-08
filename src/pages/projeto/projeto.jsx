import React from 'react'
import { useState, useEffect } from 'react'
import BarraNavegacao from '../../components/barraNavegacao'
import Header from '../../components/header/header'
import Container from '../../components/containers/container'
import CardProjeto from '../../components/card/cardProjeto'
import useAxios from "../../hooks/useAxios";
import { UserGlobal } from '../../context/userContext';
import { ModalEnviarProjeto } from '../../components/modal/modal'
import { base } from '../../server/server'

const Projeto = () => {
  const {data,loading,erro} = React.useContext(UserGlobal);
  const {requisicao} = useAxios();


  const [projetos, setProjetos] = React.useState();

  const token = window.localStorage.getItem('token');

  useEffect(()=>{
    async function res(){
      const req = await requisicao(`${base}/projetos/`,null, "GET", {Authorization : `Bearer ${token}`})
      setProjetos(req.res.data)
    }
    
    res()

  }, [])

  const [abrir, setAbrir] = React.useState(false)
  const handleClose = (() => setAbrir(false))


  if (projetos){

    return (
      <div className='body-home'>
        <header>
          <BarraNavegacao  fundo="#F0F5FF"/>
        </header>
        <section className='box-projeto'>
          <header>
            <Header titulo="Projetos" abrir={abrir} setAbrir={setAbrir} />
            <ModalEnviarProjeto aberto={abrir} sair={handleClose} />
          </header>
  
          <main className='main-projeto' aria-label=''>
  
          {projetos.length > 0 && projetos.map((item,index) => {
            return(
              <CardProjeto
                key={index} 
                nome={item.nome}
                decricao={item.descricao}
                categoria={item.categoria}
                fundo="#2F2F2F"
                corTexto="#FFFFFF"
                id={item._id}
              />
            )
          })}
          </main>
  
        </section>
      </div>
    )
  }

  else return <div>Carregando...</div>
}

export default Projeto;
