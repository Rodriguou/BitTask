import React from 'react';
// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const SucessNotifi =  ({texto="sucess", sucess, setSucess, time=5000}) => {
    const suceso = () => toast.success(texto ,{ 
		position: "top-right",
		autoClose: time,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
        onClose : () => setSucess(false),
		theme: "light",})
    
    if (sucess){
        suceso()
    }

    return(
        <ToastContainer 
						position="top-right"
						autoClose={2000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
                        limit={1}

						>

		</ToastContainer>
    )
}

export const ErroNotifi = ({texto="erro", error,setError, time=5000}) => {
    const erro = () => toast.error(texto ,{ 
		position: "top-right",
		autoClose: time,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
        onClose : () =>  setError(false),
		theme: "light",})
    
    if (error){
        erro()
    }
    
  return (
   <>
        {error && 
            
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
				limit={1}
              
                >

			</ToastContainer>
            
            
            
            }
   
   </>
  )
}

