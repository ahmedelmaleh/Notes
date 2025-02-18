import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function ProtectedRouter(props) {
      const {token}=useContext(UserContext)
    if (token){
        return props.children
    }
    else{
        return <Navigate to={'/login'}/>
        
    }
}
