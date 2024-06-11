
import { useEffect, useState } from "react";

const UserTrends = ({trends})=>{
    const [avgProd,setAvgProd] = useState(0);
    const getTrends = async()=>{
        const data = await trends;
        return data;
    }
    const userAvgProd = async()=>{
        const userData = await getTrends();
        const prod = await userData.map((a)=> a.productivityScore);
        const prodSum = prod.reduce((a,b)=>a+b);
        return prodSum/prod.length;
    }
    useEffect(()=>{    
        const getUserAvgProd = async()=>{
            const userData = await userAvgProd();
            await setAvgProd(userData);

        }
        getUserAvgProd();
    },[])


    return(
        <div>
            <a>
                {"Average productivity over all time: "}{avgProd}
            </a>
        </div>
    );
}

export default UserTrends;