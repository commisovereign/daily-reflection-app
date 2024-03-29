import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="footer">
      {location.pathname === '/' && (<Link to ="/About">About</Link>)}
    </footer>
  )
};

export default Footer;
