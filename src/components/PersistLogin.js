import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
//import useRefreshToken from '/useRefreshToken'
import useAuth from '../hooks/useAuth'

const PersistLogin = ()=>{
    const[isLoading, setIsLoading] = useState(true);
    //const refresh = useRefreshToken();
    const {auth} = useAuth();


    useEffect(()=>{
        const verifyRefreshToken = async () =>{
            try{
                await refresh();
            }
            catch (err){
                console.log(err);
            }
            finally{
                setIsLoading(false);
            }
        }
        //We only want to run this effect when when we lack an access token
        !auth?.accessToken ? verifyRefreshToken(): setIsLoading(false)
    },[])

    useEffect(()=>{
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    },[isLoading])

    return(
        <>
            {isLoading
                ?<p>Loading...</p>
                //Outlet represents all child routes that are inside of persistLogin route
                :<Outlet />
                
            }
        </>
    )
}
export default PersistLogin