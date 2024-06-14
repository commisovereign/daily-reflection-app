import React from 'react'
import { useState, useEffect, useRef } from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import useAuth from '../../hooks/useAuth';



const AccountPage = ({setLoggedInOnApp, setUserId }) => {
  const {setAuth} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();
  const [loggedIn,setLoggedIn] = useState(false);
  const [email,setEmail] = useState('');
  const [pw,setPw] = useState('');
  const [errMsg,setErrMsg]= useState('');

  const LogOut = () => setLoggedIn(false);

  useEffect(()=>{
    setErrMsg('');
  },[loggedIn])

  useEffect(()=>{
    userRef.current.focus();
  },[])


  const onLoginAttempt = async (e) =>{
    e.preventDefault();
    if (!email || !pw) {
        setErrMsg("Invalid Entry");
        return;
    }

    const response = await fetch ('http://localhost:5002/api/users',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify({email, pw}),
      //credentials should be changed to 'include'
      credentials: 'same-origin'
    });
    const data = await response.json()
    console.log(data)
    if(!data.message){
      //localStorage.setItem("token", data.token);
      //localStorage.setItem("userid", data.idusers);

      const accessToken = data?.token;
      setAuth({email,pw, accessToken});
      setLoggedIn(true);
      setUserId(data.result[0].idusers);
      setLoggedInOnApp(true);
      setEmail('');
      setPw('');
      //navigates to previous page that user attempted to access or home page
      navigate(from, {replace:true});
    }
    else{
      setErrMsg(data.message);
      errRef.current.focus();
    }

  }

 const userAuthenticated = async() =>{
    const response = await fetch('http://localhost:5002/userAuthInfo',{
      headers:{
        'x-access-token': localStorage.getItem("token"),},
    })
    const data = await response.json();
    console.log(data);
  }

  return (//the <p errRef> needs to be updated with css funct.
  <div className='login-page'>
    <form onSubmit={onLoginAttempt}>
    <p ref={errRef}>{errMsg}</p>
      {!loggedIn &&<div>
        <h3>Please Log In</h3>
        <input placeholder='Email'
        type='email'
        id='email'
        autoComplete='off'
        value = {email}
        ref ={userRef}
        onChange={(e)=>setEmail(e.target.value)}>
        </input>
        <br/>
        <input placeholder='Password' 
        type='password'
        id='password'
        value={pw}
        onChange={(e)=>setPw(e.target.value)}>
        </input>
        <br/>
        <input
        type = 'submit'
        value='Log In'>
        </input>
      </div>}

    </form>
  {loggedIn &&<div>
    <h3>You're Logged In</h3>
      <button onClick={LogOut}>Log Out</button>
      <button onClick={userAuthenticated}>Check if authenticated</button>
  </div>}
  
  <p>
    Don't have an account yet?
    <br/>
    <span className='line'>
    <Link to='/CreateAccount'><button>{"Create Account"}</button></Link>
    </span>
  </p>
  </div>


  )
}

export default AccountPage