
import BearPicture from './images/appleBear.jpg';
import { useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from './components/Footer';
import About from "./components/About";
import Header from "./components/Header"
import AddReflection from './components/AddReflection/AddReflection';
import DayScoreChart from './components/Graphics/DayScoreGraphics/DayScoreChart';
import MenuSideBar from './components/MenuSideBar';
import ProductivityChart from './components/Graphics/ProductivityLineChart';
import AccountPage from './components/AccountPage';
import MapReflections from './components/MapReflectionList';

function App() {
  const [toggleAddReflection, setToggleAddReflection]= useState(false);
  const [reflections,setReflections] = useState([]);
  const [style,setStyle] = useState(false);

  useEffect(()=>{
    const getReflections = async () =>{
      const reflectionsfromServer = await fetchReflections()
      setReflections(reflectionsfromServer)
    }
    getReflections()
  },[])

  const fetchReflections = async () =>{
    const res = await fetch ('http://localhost:5002/api/get');
    const data = await res.json();
    return data
  }
  const addReflection = async(x) =>{
    const res = await fetch ('http://localhost:5002/api/insert',{
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
          {<DayScoreChart/>}
          {<ProductivityChart/>}
          </>
          }/>
      <Route path='/about' element ={<About/>}/>
      <Route path ='/AccountPage' element={<AccountPage/>}/>
      <Route path ='/Submissions' element={
        <MapReflections reflections={reflections}/>}
      />
      </Routes>

      <Footer/>

    </div>
    </Router>
  ); 
}

export default App;
