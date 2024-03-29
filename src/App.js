
import { useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from './components/Footer';
import About from "./components/About";
import Header from "./components/Header"
import AddReflection from './components/AddReflection/AddReflection';
import DayScoreChart from './components/Graphics/DayScoreGraphics/DayScoreChart';
import MenuSideBar from './components/MenuSideBar';
import ProductivityChart from './components/Graphics/ProductivityLineChart';
import AccountPage from './components/Account/AccountPage';
import CreateAccount from './components/Account/CreateAccount';
import MapReflections from './components/MapReflectionList';
import TestChart from './components/Graphics/TestChart';
import RequireAuth from './components/RequireAuth';

//import AuthContext from './context/AuthProvider';

function App() {
  const [toggleAddReflection, setToggleAddReflection]= useState(false);
  const [reflections,setReflections] = useState([]);
  const [style,setStyle] = useState(false);


  useEffect(()=>{
    const getReflections = async () =>{
      const reflectionsfromServer = await fetchReflections()
      setReflections(reflectionsfromServer)
      //console.log(reflectionsfromServer)
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
    const post = await res.json();
    const data = await fetchReflections();
    console.log(data);
    setReflections([]);
    setReflections(data);
  }
  const deleteReflection = async(id) =>{

    await fetch (`http://localhost:5002/api/delete/${id}`, {method: 'DELETE'});
    setReflections(reflections.filter((ref)=>ref.idreflections !== id));
  }
  console.log("rendered");
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
      {/*Protected route(s)*/}
      <Route element={<RequireAuth/>}>
        <Route 
          path='/'
          element ={
            <div className='main-page'>
            <AddReflection onAdd={addReflection} toggle = {toggleAddReflection} sideStyle = {style ? "add-reflection-side-bar":"add-reflection"} />
            {(reflections.length > 0) && <DayScoreChart  reflections={reflections}/>}
            {(reflections.length > 0) && <ProductivityChart reflections={reflections}/>}
            {<TestChart/>}
            </div>
          }/>
      </Route>
      <Route path='/about' element ={<About/>}/>
      <Route path ='/AccountPage' element={<AccountPage/>}/>
      <Route path ='/CreateAccount' element={<CreateAccount/>}/>
      <Route path ='/Submissions' element={
        <MapReflections reflections={reflections} onDelete ={deleteReflection}/>}
      />
      
      </Routes>

      <Footer/>
    </div>
    </Router>
  ); 
}

export default App;
