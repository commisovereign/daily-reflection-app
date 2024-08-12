import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () =>{
    const {auth} = useAuth();
    const location = useLocation();
    console.log("auth.email: ",auth.email)
    
    return (
        //sends user to Account Page if theyre not authorized
        auth?.email
            ? <Outlet/>
            : <Navigate to="/AccountPage" state={{from: location}} replace />
    );
}

export default RequireAuth;