


export const BotaoCriar = ({setValue,value,cor,fundo}) =>{
    function handleClick(){
        setValue(true)
    }
    return(

        <button onClick={handleClick} className="botao-criar" >CRIAR</button>
    )
}
// botao de enviara para o servidor
export const BotaoEnviar = ({f,texto = "CRIAR", ...props} ) =>{
    return(
        <button {...props} aria-label={texto} onClick={f} className="botao-enviar" >{texto}</button>

    )
}
