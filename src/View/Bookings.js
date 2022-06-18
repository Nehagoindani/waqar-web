import React, { useState, useEffect } from 'react';
import '../Images/background.jpeg'
import db from '../firebase.config.js';
import Table from 'react-bootstrap/Table'
import Axios from 'axios';
import { Button } from 'react-bootstrap'
import { UserCheck } from 'react-feather'
import { useNavigate } from 'react-router-dom';


const Bookings = () => {

    const navigate = useNavigate()

    const [info, setInfo] = useState([])

    window.addEventListener('load', () => {
        if (localStorage.getItem('loggedIn') === 'false') {
            navigate('/login')
          } else {
            getBookings()
          }
    })

    const getBookings = () => {
        db.collection("bookings").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = {
                    id: element.id,
                    data: element.data()
                }

                setInfo(arr => [...arr, data]);

            });
        })
    }

    const updateBooking = (status, id) => {
        db.collection("bookings").doc(id).update({ status: status })
        setInfo([])
        getBookings()

    }
    const arrivedStatus = (status, id) => {
        db.collection("bookings").doc(id).update({ arrived: status })
        setInfo([])
        getBookings()

    }

    return (
        // <div className='bg'>
        //     <div class="jumbotron jumbotron-fluid md-5">
        //         <div class="container">
        //             <h1 class="display-5 text-center">Bookings</h1>
        //         </div>
        //     </div>

        <div className='col-md-8 offset-md-2'>
        <div style={{padding:20}}>
          <div class="container">
            <h1 class="display-5 text-center" style={{ fontWeight: 'bold', color:'#d6994b' }}>Bookings</h1>
          </div>
        </div>

            <Table class="table table-hover">
                <thead>
                    <tr style={{ textAlign: 'center' }} >
                    <th scope="col">S#</th>
                        <th>Name</th>
                        <th>Services</th>
                        <th>Time Slot</th>
                        <th>Date</th>
                        <th>Actions</th>
                        <th>Status</th>
                        <th>Arrived</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        info.map((data, index) => (
                            <tr style={{ fontsize: 5 }}>
                                <td>
                                    {index + 1}
                                </td>
                                <td style={{ color: '#d6994b', fontsize: 3 }}  >
                                    {data.data.uName}
                                </td>
                                <td className='td' >
                                    {data.data.services.map((item, index) => (
                                        <p>{item.name}</p>
                                    ))}
                                </td>
                                <td style={{ fontsize: 3 }} >
                                    {data.data.timeSlot}
                                </td>
                                <td style={{ fontsize: 3 }} >
                                    {data.data.date}
                                </td>
                                <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Button style={{backgroundColor: 'black', borderColor:'black'}} variant='primary' disabled={data.data.status !== "Pending" ? true : false} onClick={() => {
                                        Axios.post('http://server-deploy-bikefinity.herokuapp.com/bikefinity/user/message',
                                            {
                                                message: 'Your booking is confirmed on ' + data.data.date,
                                                to: data.data.uPhone

                                            })

                                            .then((res) => {
                                                console.log(res.data)
                                                updateBooking('Accepted', data.id)

                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    }}>Accept</Button>
                                     <text style={{ color:'white'}}> -- </text>
                                    <Button style={{backgroundColor: 'black', borderColor:'black'}} variant='primary' disabled={data.data.status !== "Pending" ? true : false} onClick={() => {
                                        Axios.post('http://server-deploy-bikefinity.herokuapp.com/bikefinity/user/message',
                                            {
                                                message: 'Your Booking has been Denied for ' + data.data.date + '. Please choose another day',
                                                to: data.data.uPhone

                                            })

                                            .then((res) => {
                                                console.log(res.data)
                                                updateBooking('Declined', data.id)

                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    }}>Decline</Button>

                                </td>
                                <td style={{ color: '#d6994b', fontsize: 3 }} >
                                    {data.data.status}
                                </td>
                                <td style={{ alignItems: "center", }}>
                                    <UserCheck color={data.data.arrived === true ? 'green' : 'red'} disabled={data.data.arrived === true ? true : false} onClick={() => arrivedStatus(true, data.id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Bookings;