
import logo from './images/appleBear.jpg';
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from './components/Footer';
import About from "./components/About";
import Header from "./components/Header"
import AddReflection from './components/AddReflection/AddReflection';

import Chartjs from 'chart.js/auto';
import ChartConfig1 from './components/Graphics/ChartConfig1'

//probably will use useEffect() to update charts right after a submission
function App() {
  const [toggleAddReflection, setToggleAddReflection]= useState(false)
  const [reflections,setReflections] = useState([])
  const reflects = useRef(null);
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const fetchDataForGraph = async () =>{
    const res = await fetch('http://localhost:5001/reflections');
    const data = await res.json();
    reflects.current = await data;
    console.log(data)
    console.log(reflects.current)
    return data
  }
  const getDaysForGraph = async () =>{
    await fetchDataForGraph()
    const a = reflects.current.map((x)=>x.day);
    console.log(a);
    return a;
  }
  

  const addReflection = async(x) =>{
    const res = await fetch ('http://localhost:5001/reflections',{
      method: 'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify(x)

    })
    const data = await res.json()
    setReflections([...reflections,data])
  }
 

    useEffect(() => { 
      const makeChart = async () =>{
        if (chartContainer && chartContainer.current) {
          const days = await getDaysForGraph()
          const chartConfig = ChartConfig1(days)
          const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
          setChartInstance(newChartInstance);
        }
      }
      makeChart()
    }, [chartContainer])
  
  
  

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
      <div>
        <canvas ref={chartContainer} />
      </div>

      <Footer/>

    </div>
    </Router>
  ); 
}

export default App;
