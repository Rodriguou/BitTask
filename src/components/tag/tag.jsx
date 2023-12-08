import React from 'react'

const Tag = ({nome, cor,corLetra,padding}) => {
  return (
    <section className='box-tag' aria-label='tag' style={{backgroundColor: cor, padding : padding}}>
      <p style={{color : corLetra}}>{nome}</p>
    </section>
  )
}

export default Tag
