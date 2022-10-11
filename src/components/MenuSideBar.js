import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai"
import { Link } from "react-router-dom";
import { useState } from "react";
import "./MenuSideBar.css";



const MenuSideBar = ({setSide}) => {
    const [sideMenu,setSideMenu] = useState(false);
    const showSideMenu = () => setSideMenu(!sideMenu);

    
    return(
        <div className="side-menu" >
            {!sideMenu && <div>
                <Link to = "#" className = "side-menu-bars">
                    <FaIcons.FaBars onClick={()=>{
                        showSideMenu()
                        setSide()
                    }
                    }/>
                </Link>
            </div>}
            {sideMenu && <nav className="side-navbar" >                
                <Link to = "#" className="side-menu-bars">
                    <AiIcons.AiFillCloseSquare onClick={()=>{
                        showSideMenu()
                        setSide()
                    }
                    }/>
                </Link>
                <ul>
                <Link to = "/" className="nav-text" onClick={()=>{
                        showSideMenu()
                        setSide()
                    }
                    }> Home</Link>
                </ul>
                <ul>
                    <Link to = "/About" className="nav-text" onClick={()=>{
                        showSideMenu()
                        setSide()
                    }
                    }> About</Link>
                </ul>
                <ul>
                    <a href ="http://localhost:5001/reflections" target="_blank" className="nav-text">Raw Data</a>
                </ul>

            </nav>}

        </div>
    )
};
export default MenuSideBar;