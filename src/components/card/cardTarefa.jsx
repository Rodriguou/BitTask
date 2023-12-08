import React from 'react'
import Tag from '../tag/tag'
const CardTarefa = ({nome,descricao,categoria,nivel,id,fundo}) => {
  return (
    <article className='box-card-tarefa'>
        <section>
            <h4>{nome}</h4>
            <section></section>
        </section>

        <aside>
            <p>{descricao}</p>
        </aside>

        <footer>
           <Tag nome={categoria} />
           <Tag nome={categoria}/>
        </footer>
    </article>
  )
}

export default CardTarefa
