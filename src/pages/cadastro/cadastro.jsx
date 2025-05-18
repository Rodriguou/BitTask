import axios from "axios";
import React from "react";
import { InputComp } from "../../components/form/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import cadastro from "../../assets/cadastro.gif"
import { BotaoEnviar } from "../../components/button/botao";
import useForm from "../../hooks/useForm";
import { base } from "../../server/server";

const Cadastro = () =>{
	const nome = useForm(null);
	const email = useForm('email');
	const senha = useForm('senha');
	const [senhaRepetida, setSenhaRepetida] = React.useState("")
	const [senhaEstaDiferente, setSenhaEstaDiferente] = React.useState(false)
    const [data, setData] = useState({
        nome : '',
        email : '',
        senha : ''
    })

    const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.id]: input.value });
		if(input.value != senhaRepetida){
			console.log(data.senha , senhaRepetida)
			setSenhaEstaDiferente(true)
		}else{
		
			setSenhaEstaDiferente(false)
		}
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
				setTimeout(() =>{

				},800)
				navigate("/login");
				console.log(res.message);
			} catch (error) {
				setTimeout()
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
        <div className="body-login">
            <article className="box-gif-cadastro">
                <img src={cadastro} alt="gif animado de um personagem" />
            </article>
           

            <form  className="form-input-cadastro" aria-labelledby="form-cadastro" onSubmit={handleSubmit}>
                <div></div>
                <h2 id="form-cadastro">Cadastro</h2>
                <InputComp label="Nome" type="text" id="nome" value={data.nome} onChange={handleChange} placeholder="Digite o seu nome" required />
                <InputComp label="Email" type="email" id="email" value={data.email}  onChange={handleChange} placeholder="ex: ryan@gmail.com" required/>
                <InputComp label="Senha" type="password" id="senha" value={data.senha}  onChange={handleChange} placeholder="ex: A2@a2354" required/>
                <InputComp label="Confirmar senha" type="password" id="senha" value={senhaRepetida}  onChange={handleChangeSenhaRepetida} error={senhaEstaDiferente ? "Por favor, digite a mesma senha para os campos" : false} />
				<aside className="redirecionamento"> {/*Link que redireciona pra pagina de login*/}
					<p>Já tem uma conta?</p>
					<Link to="/login" target="blank">Entrar</Link>
				</aside>
                <BotaoEnviar disabled={data.email == "" || data.nome == "" || data.senha == "" || senhaEstaDiferente == true || senhaRepetida =="" ? true : false } texto="CADASTRAR" type="submit" />

              
            </form>

           
        
        </div>
    )
}

export default Cadastro;