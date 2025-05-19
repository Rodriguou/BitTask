import React, { useContext } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { SucessNotifi, ErroNotifi } from './notificacao/notificacao';
import logout from "../assets/logout.svg"
// imagens 
import botaoHome from "../assets/botao-home.svg"
import botaoProjeto from "../assets/botao-projeto.svg"
import botaoTarefa from "../assets/botao-tarefa.svg"
import { UserGlobal } from '../context/userContext';
import { ToastContainer } from 'react-toastify';

const BarraNavegacao = ({cor,ariaLabel,fundo,itemSelec}) => {
  const local = useLocation().pathname;
  const [logoutSucces, setLogoutSucces] = React.useState(false)
  const [logoutError, setLogoutError] = React.useState(false)
  const navegarParaLogin = useNavigate()
  const {userLogout} = useContext(UserGlobal)
  const token = window.localStorage.getItem('token');
  const home = local == "/home"
  const tarefa = local == "/tarefa"
  const projeto = local == "/projeto"


  async function handleLogout(){
    try{
      const logout = await userLogout(token)
      console.log(logout)
      setLogoutSucces(logout.json.message)
      window.localStorage.clear()
				setTimeout(() =>{
					navegarParaLogin("/");
					console.log(res.message);
				},1800)

    }


    catch(error){
     console.log(error)
      setLogoutError("Erro ao sair, tente novamente")
    }
  }

  return (
    <>
      <ToastContainer
      position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					limit={1}
      
      ></ToastContainer>

      <ErroNotifi texto={logoutError ? logoutError : false} error={logoutError} setError={setLogoutError} />
      <SucessNotifi texto={logoutSucces ? logoutSucces : false} sucess={logoutSucces} setSucess={setLogoutSucces}/>
      <nav  className='box-barra-nav'>
        <ul className='inner-barra-nav' style={{backgroundColor : fundo}}>
          <li className='paginas'> 
             <li>
            <Link className='item-nav' to={"/home"} id={home ? 'selecionado' : ''} >
              <img src={botaoHome} alt='botao para home'/>
              <p>Home</p>
            </Link>

          </li>

          
          <li>
            <Link className='item-nav' to={"/projeto"} id={projeto ? 'selecionado' : ''}>
              <img src={botaoTarefa} alt='botao para home'/>
              <p>Projetos</p>
            </Link>
          </li>
          <li>
            <Link className='item-nav' to={"/tarefa"} id={tarefa ? 'selecionado' : ''}>
              <img src={botaoProjeto} alt='botao para tarefa'/>
              <p>Tarefas</p>
            </Link>

          </li>

          </li>
         

          <li className='logout'>
            <button className='item-nav' onClick={handleLogout}>
              <img src={logout} alt="" />
              <p>Sair</p>
            </button>
          </li>

        </ul>
      </nav>
    </>
  )
}

export default BarraNavegacao;