import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children})=>{
    const [auth, setAuth] = useState(()=>{
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : {};
    });

    useEffect(()=>{
        if(auth?.email){
            localStorage.setItem('auth', JSON.stringify(auth));
        }
        else{
            localStorage.removeItem('auth');
        }
    }, [auth]);
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
//AuthProvider wraps <App/> in ./src/index.js
export default AuthContext;