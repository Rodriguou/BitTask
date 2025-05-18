


export const BotaoCriar = ({setValue,value,cor,fundo}) =>{
    function handleClick(){
        setValue(true)
    }
    return(

        <button onClick={handleClick} className="botao-criar" >CRIAR</button>
    )
}
// botao de enviara para o servidor
export const BotaoEnviar = ({f,texto = "CRIAR", disabled, ...props} ) =>{
    return(
        <button {...props} disabled={disabled} aria-label={texto} onClick={f} className={disabled ? "botao-enviar-hover" : "botao-enviar"} >{texto}</button>

    )
}
