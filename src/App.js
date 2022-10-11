
import BearPicture from './images/appleBear.jpg';
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from './components/Footer';
import About from "./components/About";
import Header from "./components/Header"
import AddReflection from './components/AddReflection/AddReflection';
import DayScoreChart from './components/Graphics/DayScoreGraphics/DayScoreChart';
import MenuSideBar from './components/MenuSideBar';
import ProductivityChart from './components/Graphics/ProductivityLineChart';

function App() {
  const [toggleAddReflection, setToggleAddReflection]= useState(false);
  const [reflections,setReflections] = useState([]);
  const [style,setStyle] = useState(false);

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
    <MenuSideBar
      setSide ={() => setStyle(!style)}
    />
    <Routes>
      <Route 
        path='/'
        element ={
          <>
          {toggleAddReflection && <AddReflection onAdd={addReflection} sideStyle = {style ? "add-reflection-side-bar":"add-reflection"} />}
          {toggleAddReflection && <img src={BearPicture} className="App-logo" alt="logo" />}
          {<DayScoreChart/>}
          {<ProductivityChart/>}
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
