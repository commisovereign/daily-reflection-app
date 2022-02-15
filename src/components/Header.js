import { useLocation } from "react-router-dom";
import AccountButton from "./AccountButton";

const Header = ({title,account}) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname=== '/' && (<AccountButton/>) }

    </header>
  )
};

Header.defaultProps ={
  title: 'Daily Reflections'
}

export default Header;
