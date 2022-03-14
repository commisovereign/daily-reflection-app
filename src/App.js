
import logo from './images/appleBear.jpg';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from './components/Footer';
import About from "./components/About";
import Header from "./components/Header"
import AddReflection from './components/AddReflection/AddReflection';
import Chart from './components/Graphics/Chart1';
import LineChart from './components/Graphics/LineChart';


function App() {
  const [toggleAddReflection, setToggleAddReflection]= useState(false)
  const addReflection = async(x) =>{
    console.log(x)
    const res = await fetch ('http://localhost:5001/reflections',{
      method: 'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify(x)

    })
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
          {toggleAddReflection && <img src={logo} className="App-logo" alt="logo" />}
          </>
          }/>
      <Route path='/about' element ={<About/>}/>

      </Routes>
      <Chart/>
      <Footer/>

    </div>
    </Router>
  ); 
}

export default App;
