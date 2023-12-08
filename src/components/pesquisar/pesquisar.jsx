import React from 'react';
import pesquisar from "../../assets/pesquisar.svg"
const Pesquisar = () => {
  return (
    <article id="pesquisar" aria-label='pesquisar'>
      <button className='botao-pesquisar'>
        <img src={pesquisar} alt="botao pesquisar" />
      </button>
    </article>
  )
}

export default Pesquisar
