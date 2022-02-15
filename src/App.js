
import logo from './images/appleBear.jpg';
import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from './components/Footer';
import About from "./components/About";
import Header from "./components/Header"
import AddReflection from './components/AddReflection';

function App() {
  
   return (
     <Router>
    <div className="container">
    <Header

    />
    <AddReflection/>
    <Routes>
      <Route 
        path='/'
        element ={
          
        <img src={logo} className="App-logo" alt="logo" />

          
        }
        />
      <Route path='/About' element ={<About/>}/>
      </Routes>
      <Footer/>
    </div>
    </Router>
  ); 
}

export default App;
