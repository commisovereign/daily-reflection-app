import { useState } from "react";

//Currently not in use
const Radio = () => {
    const [dayScore,setDayScore] = useState(0)
    const onSubmit = (e) => {

        console.log(dayScore)
        setDayScore(0)
    }
    return (
        <div className='day-score' onSubmit={onSubmit}>
            <input type ="radio" name = "m"
            value = {0}
            onChange={(e)=> setDayScore(e.currentTarget.value)}
            />
            <input type ="radio" name = "m"
            value = {1}
            onChange={(e)=> setDayScore(e.currentTarget.value)}
            />
            <input type ="radio" name = "m"
            value = {2}
            onChange={(e)=> setDayScore(e.currentTarget.value)}
            />
        </div>
    )   
};



export default Radio;
