import { Link } from "react-router-dom";


export const BotaoCadastro = () =>{
    return(
        <Link className="botao-cadastro" to={"cadastro"}>COMEÇAR</Link> 

    )
  

}

export const BotaoLogin = () =>{
    return(
        <Link className="botao-login" to={"login"}>ENTRAR</Link>     
    )

}