import React from "react";
import { Link } from "react-router-dom";

import { BotaoCadastro,BotaoLogin } from "../../components/button/botaoInicial";

import linhaDireita from  "../../assets/linhaDireita.svg"
import linhaEsquerda from  "../../assets/linhaEsquerda.svg"


const TelaIncial = () =>{


    return(
        <article className="body-iniciar">

       
            <article className="box-inicial">

                <header className="box-logo">
                    <span id="logo">BitTask</span>
                </header>

                <main className="box-main">
                    <article >
                        <h1 id="slogan"> <span>Organize, </span> <span>planeje </span> <span> e desenvolva </span></h1>
                        <p>Oferecemos recursos para o seu planejamento diário.</p>
                    </article>

                    <nav className="navegacao-inicial" aria-label="navegação-primária">

                            <img src={linhaEsquerda} alt="decorador" id="deco-esquerda" />
                            <BotaoCadastro className="botao-cadas" />
                            <BotaoLogin className="botao-log" />           
                            <img src={linhaDireita} alt="decorador" id="deco-direita" />
                        
                    </nav>

                    <aside className="navegacao-aux" aria-label="navegação secundária">
                       
                    </aside>

                </main>

            </article>
        </article>
       
        
    )
}

export default TelaIncial;