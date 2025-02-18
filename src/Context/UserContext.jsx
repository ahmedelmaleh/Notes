import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null); // Create context

export function UserProvider({ children }) {
    const[token,setToken]=useState(localStorage.getItem('userToken'))


    function logOut(){
        localStorage.removeItem('userToken')
        setToken(null)
    }

  return (
    <UserContext.Provider value={{ logOut,token,setToken }}>
      {children}
    </UserContext.Provider>
  );
}
