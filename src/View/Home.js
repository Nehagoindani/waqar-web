import React, { Component, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../Images/background.jpeg'

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
          <h1 style={{ color: '#d6994b', fontSize: '30', textAlign: 'center', position: 'relative', top: 120 }}>WaqarSalon Portal</h1>
        </div>

      </div>
    );
  }

export default Home