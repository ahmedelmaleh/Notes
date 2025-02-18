import { createContext, useState } from "react";

export const noteContext=createContext(0)
export default function NoteContextProvider({children}){
    const[notes,setNotes]=useState(null)
    return <noteContext.Provider value={{notes,setNotes}}>
        {children}
    </noteContext.Provider>
}