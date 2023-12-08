import React from "react"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const CardDesempenho = ({concluida, pendente,porcentagemC,porecentagemP,nome}) =>{
    // constantes de cores
    const baixo = "#F28F8F";
    const medio = "#EFE271";
    const alto = "#71EF76";

    function CalculoPorcen(tarefaConcluida,tarefaPendente){
        const resultadoC = (tarefaConcluida / (tarefaConcluida + tarefaPendente)) * 100
        if (resultadoC >= 70){
          return alto
        }
        else if (resultadoC >= 50){
          return medio
        } 

        else {
          return baixo
        }
        
    }
    
    
    const cor = CalculoPorcen(concluida,pendente)
  
    const data = {
     datasets: [
       {
         label: ['concluida', 'pendente'],
         data: [concluida,pendente],
         backgroundColor: [
          
           cor,
           '#2F2F2F'
         ],
        
         borderWidth: 1,
         borderColor: "#2F2F2F"
      
       },
     ],
   };

   return(
    <section className="box-card-desem"> 
        <div className="card-grafico-desem">
          <Doughnut  data={data}/>
        </div>
        <h3>{nome}</h3>
    </section>
   )
}

export default CardDesempenho;