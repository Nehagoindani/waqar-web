import React, { Component } from 'react';
import '../Images/background.jpeg'
import logo from '../Images/3waq.png'
import { useNavigate } from 'react-router-dom';

function Navbar (){
  const navigate = useNavigate()

function Logout(){
 
    localStorage.setItem('loggedIn', 'false')
   navigate('/login')
      


}

    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light ">
          {/* <a class="navbar-brand" href="#">WaqarSalon</a> */}
          <img src={logo} style={{ height:50, width:140 }} />
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only"></span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/bookings">Bookings</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/Products">Inventory</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/Salesheet">Salesheet</a>

              </li>
              <li class="nav-item">
               <a class="nav-link" href="" onClick={Logout} >Logout</a>
               
              </li>
            </ul>
          </div>
         
        </nav>

      </div>
    );
  }

export default Navbar