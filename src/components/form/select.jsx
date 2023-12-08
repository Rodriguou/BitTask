import React from 'react'

const SelectCompo = ({options,value,f,id,label, ...props}) => {
  return (
    <section className='box-select-compo'>
        <label htmlFor={id}>{label}</label>
        <select className='select-compo' value={value} onChange={f} id={id} {...props}>
            <option value="" disabled>Escolha uma opção</option>
        {options.map((item) =>{
            return(
                <option id={item} key={item} value={item}>{item}</option>
            )
        })}
        </select>

    </section>
  )
}

export default SelectCompo
