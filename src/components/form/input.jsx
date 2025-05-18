

export const InputComp = ({label,type,id,state,f,error,...props}) =>{
    return(
      
            <section  className="box-input" aria-label={label}>
                <label htmlFor={id}>{label}</label>
                <input type={type}  value={state}  id={id} onChange={f} className="input" {...props} />
                 {error &&
                <p className="text-erro">{error}</p>
            }
            </section>
           
     

    )
   
}