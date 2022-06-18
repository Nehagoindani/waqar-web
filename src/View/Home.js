import React, { Component, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../Images/background.jpeg'
import logo from '../Images/icon.png'

function Home (){

  const navigate = useNavigate()

  // localStorage.setItem('loggedIn', 'false')
  // navigate('/login')

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'false') {
      navigate('/login')
    }
  }, [])
  
    return (
      <div className='container1'>
        <div>
        {/* <img src={logo} style={{ height: 70, width: 90, opacity:1, position: 'relative', justifyContent:'center', alignItems:'center', alignSelf:'center', alignContent: 'center', top: 20 }} /> */}
        <h3 style={{ color: '#d6994b', fontWeight:'bold', textAlign: 'center', fontSize: '12', position: 'relative', top: 100, opacity:1 }}> Welcome To</h3>
          <h1 style={{ color: 'white', fontWeight:'bold', fontSize: '33', textAlign: 'center', position: 'relative', top: 100,  opacity:1  }}>Waqar's Salon Portal</h1>
        </div>

      </div>
    );
  }

export default Home