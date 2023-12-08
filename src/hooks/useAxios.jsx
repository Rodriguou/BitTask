import axios from "axios";


import React from 'react';

const useAxios = () => {
  const [dados, setDados] = React.useState(null);
  const [erro, setErro] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  let json;
  let res;
  const requisicao = React.useCallback(async (url,dados,metodo,headers) => {

    try {
      setErro(null);
      setLoading(true);
      res = await axios({
        method : metodo,
        url : url,
        data : dados,
        headers : headers
      })
      json = res.data
    } 
    catch (err) {
      json = null
      setErro(err.message);
    } 
    finally {
      setDados(res);
      setLoading(false);
      return { res,json};
    }
  }, []);
  return { dados, loading, erro, requisicao };

  
};


export default useAxios;