import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const AccountPage = () => {
  const [loggedIn,setLoggedIn] = useState(true);
  const LogOut = () => setLoggedIn(false);
  return (
  <div>
    {!loggedIn &&<div>
      <h3>Log In</h3>
      <input placeholder='Email'>
      </input>
      <input placeholder='Password' type='password'>
      </input>
    </div>}
    {loggedIn &&<div>
      <button onClick={LogOut}>Log Out</button>
      </div>
      }
  </div>
  


  )
}

export default AccountPage