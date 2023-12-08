import React from "react";
import { BotaoCriar } from "../button/botao";


const CardCriar = ({img,fundo,titulo,descricao,open,setOpen }) =>{
    
    return(
        <section className="box-card-criar" aria-labelledby="">
            <img src={img} alt="imagem ilustrativa de um personagem" />
            <article>
                <div>
                    <h3 >{titulo}</h3>
                    <p>{descricao}</p>

                </div>

                <BotaoCriar setValue={setOpen} value={open} /> 
                 
            </article>
            

            
        </section>

    )
}

export default CardCriar;