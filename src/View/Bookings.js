import React, { useState, useEffect } from 'react';
import '../Images/background.jpeg'
import db from '../firebase.config.js';
import Table from 'react-bootstrap/Table'
import Axios from 'axios';
import { Button } from 'react-bootstrap'
import { UserCheck } from 'react-feather'


const Bookings = () => {

    const [info, setInfo] = useState([])

    window.addEventListener('load', () => {
        getBookings()
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
        <div className='bg'>
            <div class="jumbotron jumbotron-fluid md-5">
                <div class="container">
                    <h1 class="display-4 text-center">Bookings</h1>
                </div>
            </div>

            <Table class="table table-hover">
                <thead>
                    <tr style={{ textAlign: 'center' }} >
                    <th scope="col">#</th>
                        <th>Name</th>
                        <th>Service</th>
                        <th>TimeSlot</th>
                        <th>Date</th>
                        <th>Actions</th>
                        <th>Status</th>
                        <th>Arrived</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        info.map((data) => (
                            <tr style={{ fontsize: 5 }}>
                                <td>
                                    1
                                </td>
                                <td style={{ color: 'brown', fontsize: 3 }}  >
                                    {data.data.uName}
                                </td>
                                <td className='td' >
                                    {data.data.services.map((item, index) => (
                                        <p>{item.name}</p>
                                    ))}
                                </td>
                                <td style={{ color: '#d6994b', fontsize: 3 }} >
                                    {data.data.timeSlot}
                                </td>
                                <td style={{ color: '#d6994b', fontsize: 3 }} >
                                    {data.data.date}
                                </td>
                                <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Button variant='primary' disabled={data.data.status !== "Pending" ? true : false} onClick={() => {
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

                                    <Button variant='primary' disabled={data.data.status !== "Pending" ? true : false} onClick={() => {
                                        Axios.post('http://server-deploy-bikefinity.herokuapp.com/bikefinity/user/message',
                                            {
                                                message: 'Your booking is Denied on ' + data.data.date + 'please book for another day',
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