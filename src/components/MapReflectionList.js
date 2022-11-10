import ReflectionList from "./ReflectionList";
//Maps reflections from the server onto the template in ReflectionList.js
const MapReflections = ({reflections}) =>{
    return(
        <>
        {
            reflections.map((reflection) =>(
                <ReflectionList reflection={reflection}/>
            ))
        }
        </>
    )
}
export default MapReflections;