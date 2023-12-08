import axios from "axios";
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
    const [data, setData] = useState({
        nome : '',
        email : '',
        senha : ''
    })

    const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.id]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {

			const url = `${base}/cadastro`; //Mudar a rota da API quando for hospedada 😒
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
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
                <InputComp label="Confirmar senha" type="password" id="senha" value={data.senha}  onChange={handleChange} />
				<aside className="redirecionamento"> {/*Link que redireciona pra pagina de login*/}
					<p>Já tem uma conta?</p>
					<Link to="/login" target="blank">Entrar</Link>
				</aside>
                <BotaoEnviar texto="CADASTRAR" type="submit" />

              
            </form>

           
        
        </div>
    )
}

export default Cadastro;