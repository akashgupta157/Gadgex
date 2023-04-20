import React,  { createContext ,useState } from "react";
export const AuthContext=createContext()
export default function AuthProvider({children}) {
    const [auth,setAuth]=useState(false)
    const [user,setuser]=useState()
    const Login =(user)=>{
      setAuth(true)
      setuser(user)
    }
  return (
    <div>
        <AuthContext.Provider value={{auth,setAuth,Login,user}}>
            {children}
        </AuthContext.Provider>
    </div>
  )
}