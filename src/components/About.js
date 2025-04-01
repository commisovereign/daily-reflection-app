import { Link } from "react-router-dom"
import BearPicture from '../images/appleBear.jpg';
const About = () => {
    return(
        <div>
            <img src={BearPicture} className="App-logo" alt="logo" />
            Creator: Zaid Nolley
            <br/>
            &copy;2025 Version 0.0.10
            <br/>
            <Link to="/">Return to Menu</Link>
        </div>
    )
}

export default About;
