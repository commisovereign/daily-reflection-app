import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const CreateAccount = () => {
    const {setAuth} = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');
    const [confirmedPassword,setConfirmedPassword] = useState('');
    const [matchedPw, setMatchedPw] = useState(false);
    const [errMsg,setErrMsg] = useState('');
    const errRef = useRef();

    //const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const addAccount = async(e)=>{
        e.preventDefault();
        /*const v2 = PWD_REGEX.test(password);
        const v3 = PWD_REGEX.test(confirmedPassword);
        if((!v2 || !v3) || (password !== confirmedPassword)){
            setErrMsg("Passwords must match")
            return;
        }*/
        if(password !== confirmedPassword){
            setErrMsg("Passwords must match")
            return;
        }
        try{
            const res = await fetch('http://localhost:5002/api/accountcreation',{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body: JSON.stringify({email, password}),
                credentials: 'same-origin'
            });
            const data = await res.json();
            console.log(data.message);
            console.log(data);
            const accessToken = data?.token
            setAuth({email,password, accessToken});
            setEmail('');
            setPassword('');
            setConfirmedPassword('');
            navigate(from, {replace:true});
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div className='account-page'>
        <form onSubmit={addAccount}>
            <p ref={errRef}>{errMsg}</p>
            <h3>Create Account</h3>
            <input 
            type='email'
            value={email}
            placeholder='Add Email'
            onChange={(e)=>setEmail(e.target.value)}></input>
            <br/>
            <input
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e)=>setPassword(e.target.value)}>
            </input>
            <br/>
            <input
            type='password'
            value={confirmedPassword}
            placeholder='Confirm Password'
            onChange={(e)=>setConfirmedPassword(e.target.value)}>
            </input>
            <br/>
            <input type='submit'
            value='Create Account'></input>
        </form>
    </div>
  )
}

export default CreateAccount