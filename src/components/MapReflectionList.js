import Reflection from "./ReflectionList";
//Maps reflections from the server onto the template in ReflectionList.js
const MapReflections = ({reflections, onDelete}) =>{
    return(
        <>
        {
            reflections.map((reflection) =>(
                <Reflection 
                //each child in the list should have a unique key prop
                key = {reflection.idreflections}
                reflection={reflection}
                onDelete ={onDelete}/>
            ))
        }
        </>
    )
}
export default MapReflections;