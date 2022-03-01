import { useLocation } from "react-router-dom";
import AccountButton from "./AccountButton";
import ToggleAdd from "./ToggleAdd";

const Header = ({title,account,toggle,setToggle}) => {
  const location = useLocation();
  
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname=== '/' && (<AccountButton/>) }
      {location.pathname=== '/' && (<ToggleAdd text={toggle ? 'Minimize':'Add a reflection'} onClick={setToggle}/>) }
    </header>
  )
};

Header.defaultProps ={
  title: 'Daily Reflections'
}

export default Header;
