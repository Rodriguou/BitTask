import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { InputComp } from "../../components/form/input";
import login from "../../assets/Login.gif"
import { BotaoEnviar } from "../../components/button/botao";
import { Link, useNavigate } from "react-router-dom";
import { UserGlobal } from "../../context/userContext";


// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErroNotifi } from "../../components/notificacao/notificacao";

const Login = () => {
	const contextUser = useContext(UserGlobal)
	const navegar = useNavigate();
	const [data, setData] = useState({ email: "", senha: "" });
	const [erro,setErro] = React.useState(false);
	const logado = () => toast.success('Sucesso no login', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        })

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.id]: input.value });
	};
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();

		const logar = await contextUser.userLogin(data)
		console.log(logar)

		if (logar){
			logado()
			setTimeout(() =>{
				navegar("/home")
				
			},800)
		}
		 else {
			setErro(true)
		}
			
	
	};
	
    return(
		<>

			<ErroNotifi texto="erro" error={erro} setError={setErro} />
			{contextUser.login &&
			
				<ToastContainer 
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
						limit={1}>

				</ToastContainer>
			}
			
			
		
        <div className="box-login">
            <section className="box-gif-login">
                <img src={login} alt="imagem de login" />
            </section>

			<section className="box-form-login">
				<h2>Login</h2>
				<form className="form-input-login" onSubmit={handleSubmit}>
					<InputComp label={"Email"} id={"email"} type={"email"} value={data.email} onChange={handleChange} required />
					<InputComp label={"Senha"} id={"senha"} type={"password"} value={data.senha} onChange={handleChange} required />
					<aside className="redirecionamento"> {/*Link que redireciona pra pagina de cadastro*/}
						<p>Novo aqui ?</p>
						<Link to="/cadastro" target="blank">Cadastre-se</Link>
					</aside>
					{contextUser.erro && <p>{contextUser.erro}</p>}
					{ contextUser.loading && <BotaoEnviar texto="carregando" />}
					<BotaoEnviar type='submit' texto="ENTRAR" />
				</form>
			</section>


        </div>

		</>
    )
}

export default Login;