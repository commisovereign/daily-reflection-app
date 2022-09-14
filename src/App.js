
import BearPicture from './images/appleBear.jpg';
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from './components/Footer';
import About from "./components/About";
import Header from "./components/Header"
import AddReflection from './components/AddReflection/AddReflection';
import Chart1 from './components/Graphics/DayScoreGraphics/DayScoreChart';
import MenuSideBar from './components/MenuSideBar';

function App() {
  const [toggleAddReflection, setToggleAddReflection]= useState(false);
  const [reflections,setReflections] = useState([]);

  const addReflection = async(x) =>{
    const res = await fetch ('http://localhost:5001/reflections',{
      method: 'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify(x)

    })
    const data = await res.json()
    setReflections([...reflections,data])
  }
  

  return (
    <Router>
    <div className="container">
    <Header
      setToggle={() => setToggleAddReflection(!toggleAddReflection) }
      toggle={toggleAddReflection}
    />
    

    
    <Routes>
      <Route 
        path='/'
        element ={
          <>
          {toggleAddReflection && <AddReflection onAdd={addReflection}/>}
          {toggleAddReflection && <img src={BearPicture} className="App-logo" alt="logo" />}
          {<Chart1/>}
          </>
          }/>
      <Route path='/about' element ={<About/>}/>

      </Routes>

      <Footer/>

    </div>
    </Router>
  ); 
}

export default App;
