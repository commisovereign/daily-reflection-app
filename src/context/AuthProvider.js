import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children})=>{
    const [ auth, setAuth] = useState({});
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
//AuthProvider wraps <App/> in ./src/index.js
export default AuthContext;