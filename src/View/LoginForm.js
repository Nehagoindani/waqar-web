import React, { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/waqarlogo.png'
function Login() {

   const navigate = useNavigate()

   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [loggedIn, setLoggedIn] = useState(false)

   window.addEventListener('load', () => {
      if (localStorage.getItem('loggedIn') === 'true') {
        navigate('/')
      }
    })


   const submit = () => {
      if (username == 'admin' && password == 'abc') {
         localStorage.setItem('loggedIn', 'true')

      }
      else {
         alert('Invalid Credentials. Please Try Again.')
      }
   }
   return (

      <>
         <div class="sidenav">
            <div class="login-main-text">
            <img src={logo} style={{ height: 100, width: 250 }} />
               <h2 style={{ fontWeight: 'bold', paddingLeft: 20 }}>Staff Dashboard</h2>
               <p style={{ paddingLeft: 20 }}>Login from here to access.</p>
            </div>
         </div>
         <div class="main">
            <div class="col-md-3 col-md-2">
               <div class="login-form">
                  <form>
                     <div class="form-group">
                        <label style={{color:'#d6994b', fontWeight:'bold'}}>User Name</label>
                        <input type="text" class="form-control" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)} />
                     </div>
                     <div class="form-group">
                     <label style={{color:'#d6994b', fontWeight:'bold'}}>Password</label>
                        <input type="password" class="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                     </div>
                     <button type="submit" class="btn btn-black"
                        onClick={() => {
                           if (username == 'admin' && password == 'abc') {
                              alert('Login Successful!')
                              setLoggedIn(true)
                              localStorage.setItem('loggedIn', 'true')
                              navigate('/')

                           }
                           else {
                              alert('Invalid Credentials. Please Try Again.')
                           }
                        }}
                     >Login</button>
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}
export default Login
