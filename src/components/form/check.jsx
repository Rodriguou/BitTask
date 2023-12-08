import React from 'react'
import Seta from '../seta/seta'

const Check = ({id,label,value, checked, f,cor,seta, ...props}) => {
  
  return (
    <section className='box-check' {...props}>
      <label className={checked ? 'completo' : ''} id='label-check' htmlFor={id} style={{backgroundColor:cor }}>
        <input type="checkbox" value={value} checked={checked} onChange={f} id={id} />
        {label}
        {seta && <Seta  />}
      </label>
    </section>
  )
}

export default Check

