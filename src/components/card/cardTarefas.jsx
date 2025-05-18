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
                        console.log(t)
                          return(
                              <Check
                                  key={t._id}
                                  id={t._id} 
                                  checked={t.status} 
                                  value={t._id} 
                                  label={t.nome} 
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


