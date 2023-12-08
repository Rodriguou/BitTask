import React from 'react'
import caneta from "../../assets/caneta.svg"
import lixeira from "../../assets/lixeira.svg"


const DropMenu = ({deletar, editar}) => {
  const [aberto, setAberto] = React.useState(false)
  function handleClick(event){
    event.preventDefault()
    setAberto(!aberto)
  }
  return (
    <article className='body-drop-menu'>
      <button id='box-drop-menu' onClick={handleClick}  onChange={handleClick}></button>
          {aberto && 
          <ul className='inner-drop animacao-drop '>
            <div className='lista-drop-menu'>
              <li className='botao-menu-drop'>
                  <button onClick={editar} id='editar'>
                    <div className='caneta-editar'>
                      <img src={caneta} alt="imagem de caneta" />
                    </div>
                    <p>{ editar ? "editar" : "voltar"}</p>
                  </button>
              </li>

              <li className='botao-menu-drop'>
                  <button onClick={deletar} id='excluir'>
                    <div className='lixeira-apagar'> 
                      <img src={lixeira} alt="imagem de uma lixeira" />

                    </div>
                    <p> excluir</p> 
                   
                  </button>
              </li>

            </div>
          
          </ul>
          }


    </article>
  )
}

export default DropMenu
