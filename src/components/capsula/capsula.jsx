import React from 'react'

const Capsula = ({texto, numero}) => {
  return (
    <article className='box-capsula'>
      <section className='texto-capsula'> <p>{texto}</p> </section>
      <section className='numero-capsula'><p>{numero}</p></section>
    </article>
  )
}

export default Capsula
