import { useLocation } from "react-router-dom";

const SecondHeader = () => {
    const location = useLocation();

  return (
    <div>
    <h2>SecondHeader</h2>
    {location.pathname === '/' && (<button>Your Progress</button>)}
    
    </div>
  )
}

export default SecondHeader