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
  const [email,setEmail] = useState('');
  const [pw,setPw] = useState('');
  const [errMsg,setErrMsg]= useState('');
  //checks whether user has already logged in when accessing this page 
  const [loggedIn,setLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  //Ensures that setAuth is properly initialized when the user is already logged in
  useEffect(() => {
    if (loggedIn) {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth));
        }
    }
}, [loggedIn, setAuth]);

  const LogOut = () => {
    setLoggedIn(false);
    setAuth({});
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('auth');
    setEmail('');  // Clear email
    setPw('');     // Clear password
    setUserId(''); // Clear userid
    setLoggedInOnApp(false);
  };
  useEffect(()=>{
    setErrMsg('');
  },[loggedIn])
/*
  useEffect(()=>{
    userRef.current.focus();
  },[])
*/
  const onLoginAttempt = async (e) =>{
    e.preventDefault();
    console.log('Before login:', { email, pw });
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
    console.log('Login response:',data)
    if(!data.message){
      const accessToken = data?.token;
      console.log("email on loginAttempt: ",email)
      setAuth({email, pw,  accessToken});
      setLoggedIn(true);
      setUserId(data.result[0].idusers);

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userid', data.result[0].idusers);

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
    console.log('After login:', { email, pw });
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
      <br/>
      <button onClick={userAuthenticated}>Check if authenticated</button>
  </div>}
  {!loggedIn &&
  <p>
    Don't have an account yet?
    <br/>
    <span className='line'>
    <Link to='/CreateAccount'><button>{"Create Account"}</button></Link>
    </span>
  </p>
  }
  {!loggedIn &&
  <form onSubmit={onLoginAttempt}>
    <p>Automatic Login for development/testing:
    <br/>
    <input
        type = 'submit'
        onClick={(e)=>{
          setEmail('johnsmith@gmail.com'); 
          setPw('password');
        }}
        value='Login automatically as johnsmith@gmail.com'>
    </input>
    </p>
  </form>}
  
  </div>

    

  )
}

export default AccountPage