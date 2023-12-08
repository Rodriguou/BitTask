import React, { useContext } from 'react'
import { UserGlobal } from '../../context/userContext'

import { Navigate, useNavigate } from 'react-router-dom'
const ProtectRouter = ({children}) => {
  const token = window.localStorage.getItem('token')
  return token  ? children : <Navigate  to="/login"/>
}
export default ProtectRouter;
