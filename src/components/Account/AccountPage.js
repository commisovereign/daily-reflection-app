import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types';
import AuthContext from '../../context/AuthProvider';

/*async function loginUser(credentials){
  return fetch('http://localhost:5002/AccountPage',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}*/


const AccountPage = ({setToken}) => {
  const {setAuth} = useContext(AuthContext)
  const userRef = useRef();
  const errRef = useRef();
  const [loggedIn,setLoggedIn] = useState(false);
  const [email,setEmail] = useState('');
  const [pw,setPw] = useState('');
  const [errMsg,setErrMsg]= useState('');

  const LogOut = () => setLoggedIn(false);

  useEffect(()=>{
    setErrMsg('');
  },[email,pw])
  useEffect(()=>{
    userRef.current.focus();
  },[])


  const onLoginAttempt = async (e) =>{
    e.preventDefault();

    const response = await fetch ('http://localhost:5002/api/users',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify({email, pw}),
      //credentials should be changed to 'include'
      credentials: 'same-origin'
    });
    const data = await response.json()
    console.log(data)
    const accessToken = data?.accessToken;
    setAuth({email,pw, accessToken})
    setEmail('')
    setPw('')
    if(!data.message){
      setLoggedIn(true);
    }
    else{
      errRef.current.focus();
    }

    //const token = await loginUser({email, pw});
    //setToken(token);
  }
  return (//the <p errRef> needs to be updated with css funct.
  <div className='login-page'>
    <p ref={errRef}>{errMsg}</p>
    <form onSubmit={onLoginAttempt}>
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
      </div>
      }
  </div>


  )
}
/*AccountPage.propTypes ={
  setToken:PropTypes.func.isRequired
}*/
export default AccountPage