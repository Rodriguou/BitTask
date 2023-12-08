import React from 'react'
import { useNavigate } from 'react-router-dom'
const validacao = {
    email : {
        regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        message : 'preencha o email corretamente'
    }
}
const useForm = (validacao) => {
    const [valor, setValor] = React.useState('')
    const [error, setError] = React.useState(null);

	function validar(valor,id){
        if (validacao === false)  true
        else if (valor[id].length === 0)  setError("preencha os valores")
    }

    function onChange({target}){
        if (target.valor.length == 0) return setError("preencha o campo")
        setValor({...valor, [target.id] : target.valor})
    }

  return {onChange, valor, setValor, error}
}

export default useForm
