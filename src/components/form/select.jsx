import React from 'react'

const SelectCompo = ({options,value,f,id,label, ...props}) => {
  console.log("opcoes")
  console.log(options)
  return (
    <section className='box-select-compo'>
        <label htmlFor={id}>{label}</label>
        <select className='select-compo' value={value} onChange={f} id={id} {...props}>
            <option value="" disabled>Escolha uma opção</option>
        {options?.map((item) =>{
          console.log("dentro das opcoes")
          console.log(item)
            return(
                <option id={item?._id} key={item} value={item?._id}>{item?.nome}</option>
            )
        })}
       
       
        </select>

    </section>
  )
}

export default SelectCompo
