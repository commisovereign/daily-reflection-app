import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai"
import { Link } from "react-router-dom";
import { useState } from "react";
import "./MenuSideBar.css";



const MenuSideBar = ({setSide}) => {
    const [sideMenu,setSideMenu] = useState(false);
    const showSideMenu = () => setSideMenu(!sideMenu);

    
    return(
        <>
            {!sideMenu &&
                <div className="side-menu">
                <Link to = "#" className = "side-menu-bars">
                    <FaIcons.FaBars onClick={()=>{
                        showSideMenu()
                        setSide()
                    }
                    }/>
                </Link>
                </div>}
            <nav className={sideMenu ? "side-navbar active": "side-navbar"} >
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link to = "#" className="side-menu-bars">
                            <AiIcons.AiFillCloseSquare onClick={()=>{
                                showSideMenu()
                                setSide()
                            }
                            }/>
                        </Link>
                    </li>
                    <li className="nav-text">
                    <Link to = "/" onClick={()=>{
                            showSideMenu()
                            setSide()
                        }
                        }> Home</Link>
                    </li>
                    <li className="nav-text">
                        <Link to = "/Submissions" onClick={()=>{
                            showSideMenu()
                            setSide()
                        }
                        }> Submission Details</Link>
                    </li>
                    <li className="nav-text">
                        <Link to = "/TestChart" onClick={()=>{
                            showSideMenu()
                            setSide()
                        }
                        }> Test Chart</Link>
                    </li>
                    <li className="nav-text">
                        <Link to = "/About" onClick={()=>{
                            showSideMenu()
                            setSide()
                        }
                        }> About</Link>
                    </li>
                    <li className="nav-text">
                        <a href ="http://localhost:5001/reflections" target="_blank" >Raw Data</a>
                    </li>
                </ul>
            </nav>

        </>
    )
};
export default MenuSideBar;