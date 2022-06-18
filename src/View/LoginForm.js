import React, { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';

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
         alert('username/ password incorrect')
      }
   }
   return (

      <>
         <div class="sidenav">
            <div class="login-main-text">
               <h1>Waqar Salon</h1>
               <h2>Admin<br /> Login Page</h2>
               <p>Login from here to access.</p>
            </div>
         </div>
         <div class="main">
            <div class="col-md-6 col-sm-12">
               <div class="login-form">
                  <form>
                     <div class="form-group">
                        <label>User Name</label>
                        <input type="text" class="form-control" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)} />
                     </div>
                     <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                     </div>
                     <button type="submit" class="btn btn-black"
                        onClick={() => {
                           if (username == 'admin' && password == 'abc') {
                              alert('login successful')
                              setLoggedIn(true)
                              localStorage.setItem('loggedIn', 'true')
                              navigate('/')

                           }
                           else {
                              alert('username/ password incorrect')
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
