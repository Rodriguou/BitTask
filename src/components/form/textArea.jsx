import React from 'react'

const TextArea = ({label,id,state,f,colunas=10,linhas=13,...props}) => {
  return (
    <section className='box-text-area'>
    <label htmlFor={id}>{label}</label>
      <textarea  className="textarea-compo"  id={id} value={state} onChange={f} {...props}  cols={colunas} rows={linhas}></textarea>
    
    </section>
  )
}

export default TextArea
