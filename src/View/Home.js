import React, { Component } from 'react';
import '../Images/background.jpeg'





class Home extends React.Component {
  render() {
    return (
      <div className='container1' style={{backgroundColor: 'red'}}>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">WaqarSalon</a>
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
                <a class="nav-link" href="/Products">Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <h1 style={{ color: '#d6994b', fontSize: '30', textAlign: 'center', position: 'relative', top: 120 }}>WaqarSalon Portal</h1>
        </div>

      </div>
    );
  }
}
export default Home