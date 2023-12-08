import React, { useContext, useEffect } from 'react'
import useAxios from "../../hooks/useAxios";
import Seta from '../seta/seta';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination }          from 'swiper/modules';
import Check                   from '../form/check';
import { ProjetoGlobal } from '../../context/projetoContext.jsx';


const Carrousel = () => {
    // dados ficticios para teste
    const context = useContext(ProjetoGlobal)
    const [data,setData] = React.useState([
        {
        id : 1,
        desc : "tarefa",
        check : true
        },
        {
            id : 2,
            desc : "tarefa",
            check : true
        },
        {
            id : 3,
            desc : "tarefa",
            check : false
        }
    ])

    function teste(){
        const t = context;
    }

    teste()
   

    function onChange({target}) {
        const {id} = target
        setData(
            data.map(item => {
                if (item.id == id)  return { ...item, check: !item.check };
                
                else {
                 console.log("teste",item)
                return item; // Mantém os outros objetos inalterados
              }
            }))
       

    }
    console.log(data)
  return (
    <div className="box-carrousel">
         <Swiper pagination={true} modules={[Pagination]} >
            <SwiperSlide id='tarefa'>
                <h3>Tarefas de hoje</h3>
                <article className='body-check'>
                    {data.map((t) =>{
                        return(
                            <Check
                                key={t.id}
                                id={t.id} 
                                checked={t.check} 
                                value={t.id} 
                                label={t.desc} 
                                f={onChange} 
                                cor={'#FFFFFF '}
                                seta={true}
                            />
                        )
                    })}
                </article>

            </SwiperSlide>

            <SwiperSlide id='projeto'>
                <h3 id='projetos'>Projetos</h3>
                <ul className='box-projeto-card' aria-labelledby='projetos'>
                 
                            <li className='card-projeto-container'>
                                <div className='titulo-seta-projeto'>
                                    <h4></h4>
                                    <Seta />

                                </div>
                                <p></p>
                            </li>
                    
                </ul>
            </SwiperSlide>
            
      </Swiper>
      
    </div>
  )
}

export default Carrousel
