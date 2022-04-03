import React, { useState, useEffect } from 'react';
import '../Images/background.jpeg'
import db from '../firebase.config.js';
import Table from 'react-bootstrap/Table'
import Axios from 'axios';
import { Button } from 'react-bootstrap'


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

    }

    return (
        <div>
            <div>
                <h1 style={{color: '#d6994b', textAlign:'center', backgroundColor:'black', padding:10 }}>Bookings</h1>
            </div>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr style={{textAlign: 'center'}} >
                        <th>Name</th>
                        <th>Service</th>
                        <th>TimeSlot</th>
                        <th>Date</th>
                        <th>Actions</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        info.map((data) => (
                            <tr style={{ fontsize: 5 }}>
                                <td style={{ color: '#d6994b', fontsize: 3 }}  >
                                    {data.data.uName}
                                </td>
                                <td className='td' >
                                    {data.data.services}
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
                                                message: 'Your booking is confirmed on ' + data.data.date,
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
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Bookings;