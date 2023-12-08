import React from 'react'

import Check from '../form/check'
const CardTarefas = ({dados,setDados,titulo,tamanhoTitulo,padding ,fundo}) => {

  function onChange({target}) {
    const {id} = target
    setDados(
        dados.map(item => {
            if (item.id == id)  return { ...item, check: !item.check };
            
            else {
             console.log("teste",item)
            return item; // Mantém os outros objetos inalterados
          }
        }))
   

}
  if (dados){
    return (
      <div>
         <h3 style={{fontSize: tamanhoTitulo}}>{titulo}</h3>
                  <article className='body-check' style={{backgroundColor : fundo, padding : padding}}>
                      {dados.map((t) =>{
                          return(
                              <Check
                                  key={t.id}
                                  id={t.id} 
                                  checked={t.check} 
                                  value={t.id} 
                                  label={t.desc} 
                                  f={onChange} 
                                  cor={'#FFFFFF '}
                                  seta={true}
                              />
                          )
                      })}
                  </article>
      </div>
    )
    
  }  

  else{
    return <div>Não há dados</div>
  }
}

export default CardTarefas


