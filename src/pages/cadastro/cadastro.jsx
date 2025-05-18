import axios from "axios";
import React from "react";
import { InputComp } from "../../components/form/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import cadastro from "../../assets/cadastro.gif"
import { BotaoEnviar } from "../../components/button/botao";
import useForm from "../../hooks/useForm";
import { base } from "../../server/server";
import { ErroNotifi, SucessNotifi } from "../../components/notificacao/notificacao";
import { ToastContainer } from "react-toastify";

const Cadastro = () =>{
	const nome = useForm(null);
	const email = useForm('email');
	const senha = useForm('senha');
	const [senhaRepetida, setSenhaRepetida] = React.useState("")
	const [senhaEstaDiferente, setSenhaEstaDiferente] = React.useState(false)
	const [nomeErro, setNomeErro] = React.useState(false)
	const [senhaError, setSenhaErro] = React.useState(false)
	const [submitErro, setSubmitErro] = React.useState(false)
	const [submitSucesso, setSubmitSucesso] = React.useState(false)
    const [data, setData] = useState({
        nome : '',
        email : '',
        senha : ''
    })

    const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChangeNome = ({ currentTarget: input }) =>{
		console.log(input.value.length)
		if (input.value.length >= 30){
			setNomeErro("Respeite o limite máximo de 30 caracteres, utilize abreviações como 'Ryan N. Santos'")
		}
		else{
			setData({ ...data, [input.id]: input.value });
			setNomeErro(false)
		}
	}
	const handleChangeSenha = ({ currentTarget: input }) =>{
		console.log(input.value.length)
		if (input.value.length >= 16){
			setSenhaErro("Por favor, utilize uma senha com no máximo 16 caracteres")
		}
		else if (input.value.length < 8){
			setSenhaErro("Por favor, utilize uma senha com no mínimo 8 caracteres")
			setData({ ...data, [input.id]: input.value });
		}
		else{
			setSenhaErro(false)
			setData({ ...data, [input.id]: input.value });

		}
	}

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.id]: input.value });
		
	};

	function handleChangeSenhaRepetida({target}){
		setSenhaRepetida(target.value)
		console.log(senhaRepetida)
		if(data.senha != target.value){
			console.log(data.senha , senhaRepetida)
			setSenhaEstaDiferente(true)
		}else{
		
			setSenhaEstaDiferente(false)
		}
	}
	console.log(senhaEstaDiferente)

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (data.senha == senhaRepetida){
			try {
				const url = `${base}/cadastro`; //Mudar a rota da API quando for hospedada 😒
				const { data: res } = await axios.post(url, data);
				setSubmitSucesso(res.message)
				setTimeout(() =>{
					navigate("/login");
					console.log(res.message);
				},1800)
			} catch (error) {
				console.log(error)
				setSubmitErro(error.response.data.message)
				
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}
			
		}
	};


    return(
		<>
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
				<ErroNotifi texto={submitErro ? submitErro : ""} error={submitErro} setError={setSubmitErro} />
				<SucessNotifi texto={submitSucesso ? submitSucesso : ""} sucess={submitSucesso} setSucess={setSubmitSucesso}/>
			<div className="body-login">
				<article className="box-gif-cadastro">
					<img src={cadastro} alt="gif animado de um personagem" />
				</article>

				<form  className="form-input-cadastro" aria-labelledby="form-cadastro" onSubmit={handleSubmit}>
					<div></div>
					<h2 id="form-cadastro">Cadastro</h2>
					<InputComp label="Nome" type="text" id="nome" value={data.nome} onChange={handleChangeNome} placeholder="Digite o seu nome" error={nomeErro ? nomeErro : false} required />
					<InputComp label="Email" type="email" id="email" value={data.email}  onChange={handleChange} placeholder="ex: ryan@gmail.com" required/>
					<InputComp label="Senha" type="password" id="senha" value={data.senha}  onChange={handleChangeSenha} placeholder="ex: A2@a2354" error={senhaError} required/>
					<InputComp label="Confirmar senha" type="password" id="senha" value={senhaRepetida}  onChange={handleChangeSenhaRepetida} error={senhaEstaDiferente ? "Por favor, digite a mesma senha para os campos" : false} />
					<aside className="redirecionamento"> {/*Link que redireciona pra pagina de login*/}
						<p>Já tem uma conta?</p>
						<Link to="/login" target="blank">Entrar</Link>
					</aside>
					<BotaoEnviar disabled={data.email == "" || data.nome == "" || data.senha == "" || senhaEstaDiferente == true || senhaRepetida =="" ? true : false } texto="CADASTRAR" type="submit" />

				
				</form>

			
			
			</div>
		
		
		
		</>
				
    )
}

export default Cadastro;