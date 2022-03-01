
import logo from './images/appleBear.jpg';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from './components/Footer';
import About from "./components/About";
import Header from "./components/Header"
import AddReflection from './components/AddReflection/AddReflection';

function App() {
  const [toggleAddReflection, setToggleAddReflection]= useState(false)
  const addReflection = async(x) =>{
    console.log(x)
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
          <img src={logo} className="App-logo" alt="logo" />
          </>
          }/>
      <Route path='/About' element ={<About/>}/>
      </Routes>
      <Footer/>
    </div>
    </Router>
  ); 
}

export default App;
