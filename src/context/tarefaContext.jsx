import React, { createContext } from 'react'
import useAxios from '../hooks/useAxios';
import { base } from '../server/server';

export const TarefaGlobal = createContext()

export const TarefaContext = ({children}) => {
  const {requisicao} = useAxios();
  const [dados, setDados] = React.useState()
  const [erro, setErro] = React.useState()
  const [loading, setLoading] = React.useState()
  const token = window.localStorage.getItem('token');


  async function CriarTarefa(url,dados){

  }  

  async function ObterTudo(url,projeto){

  }

  async function  ObterEspecifico(url,id){

  }

  async function AlterarTarefa(url,id){

  }  

  async function DeletarTarefa(url,id){

  }

  return(
    <TarefaGlobal.Provider value={{dados, loading, erro, CriarTarefa, ObterTudo, ObterEspecifico, AlterarTarefa, DeletarTarefa}}>
        {children}
    </TarefaGlobal.Provider>

  ) 
}


