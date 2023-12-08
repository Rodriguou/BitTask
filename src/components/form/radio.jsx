import React from 'react'

const RadioCompo = ({options,id,label,f}) => {
  return (
    <section>
      <label className='labelRadio'>{label}</label>
      <section className='box-radio' >
          {options.map((item,index) =>{  
              return(
                <section key={index} className='inner-radio'>
                  <input className='radio-input'  type='radio' value={item}  onChange={f} name={id}  id={id}/>
                  
                  <label htmlFor={item} className='item-radio' >
                      {item}
                  </label>
    
                </section>
              )
          })}
        
      </section>
    
    </section>
  )
}

export default RadioCompo
