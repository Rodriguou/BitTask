import React from 'react'

const TextArea = ({label,id,state,f,colunas=10,linhas=6, error, ...props}) => {
  return (
    <section className={error ? "box-text-area-erro" :'box-text-area'}>
    <label htmlFor={id}>{label}</label>
      <textarea  className={error ? "textarea-compo-erro" :"textarea-compo"}  id={id} value={state} onChange={f} {...props}  cols={colunas} rows={linhas}></textarea>
      {error &&
        <p>{error}</p>
      }
    </section>
  )
}

export default TextArea
