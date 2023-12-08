import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxios from "../hooks/useAxios";
import { base } from "../server/server";
export const UserGlobal = createContext();


export const UserProvider = ({children}) =>{
    // variaveis globais para consulta
	const navegar = useNavigate();
    const [data, setData]       =   React.useState(null)
    const [login, setLogin]     =   React.useState(null)
    const [loading, setLoading] =   React.useState(false)
    const [nome,setNome] = React.useState()
    const [user, setUser] = React.useState()
    const [token, setToken] = React.useState('')
	const [erro,setErro] = React.useState(null)
	const axios = useAxios()
	
	const endpoint = '/login'
    // função de login 
    async function userLogin(data){
		setErro(null)
		setLogin(null)
		setLoading(true)
		
		
		try {
			const req = await axios.requisicao(`${base}/login`,data,"POST")

			window.localStorage.setItem('token',req.res.data.token)
			
			if ( req.res.status == 200){
				setToken(req.res.data.token)
				setLogin(true)
				setUser(req.res.data.usuario)
				setData(req.res)
				window.localStorage.setItem('usuario',req.res.data.usuario)
				return true

			}
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setLogin(false)
				setErro(error.response.data.message);
				return false
			}
		}

		finally{
			setLoading(false)
		}
    }

    return(
        <UserGlobal.Provider value={{data,login,loading,nome,user,userLogin,token,erro}}>
            {children}
        </UserGlobal.Provider>
        
    )

	}
