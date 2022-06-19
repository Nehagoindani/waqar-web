import React, { useState } from 'react';
import db from '../firebase.config.js';
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
const moment = require('moment')

const Salesheet = () => {

    const navigate = useNavigate()


    const [price, setPrice] = useState([])
    const [count, setCount] = useState('')
    const [temp, setTemp] = useState([])

    const [info, setInfo] = useState([])
    const [date, setDate] = useState(new Date())

    var Cost = [price]

    window.addEventListener('load', () => {
        if (localStorage.getItem('loggedIn') === 'false') {
            navigate('/login')
        } else {
            getBookings(date)
        }
    })

    const getBookings = (datee) => {

        setTemp([])

        const d = moment(datee).format('DD-M-YYYY')

        const Products = db.collection("bookings").where("arrived", "==", true).where("date", "==", d)
            .get().then((querySnapshot) => {
                let arr = []
                querySnapshot.forEach(element => {
                    var data = {
                        data: element.data()
                    }

                    data.data.services.map((item, index) => {
                        return arr.push(parseInt(item.price))
                    })

                    setTemp(arr)

                    setInfo(arr => [...arr, data]);
                });
            })
    }

    return (
        // <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <div className='col-md-8 offset-md-2'>
            <div style={{ padding: 20 }}>
                <div class="container">
                    <h1 class="display-5 text-center" style={{ fontWeight: 'bold', color: '#d6994b' }}>Sales Sheet</h1>
                </div>
            </div>
            <div style={{ display: 'flex', flex: 0.3, alignItems: 'center', justifyContent:'center' }}>
                <h5 style={{  fontWeight:'bold' }} >Select Date</h5>
                <input type="date"  style={{ marginLeft: 30, marginBottom:13  }}  onChange={(e) => {
                    setDate(new Date(e.target.value))
                    setInfo([])
                    console.log("before get booking hittt", new Date(e.target.value))
                    getBookings(e.target.value)
                }}></input>
            </div>
            <div style={{ display: 'flex', flex: 0.5, margin: 10 }}>
                <div className='col-md-8 offset-md-2'>

                    <Table table table-bordered>
                        <thead>
                            <tr style={{ textAlign: 'left'}} >
                                <th>Service Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                info.map((data) => (
                                    <tr style={{ fontsize: 5 }}>
                                        <td className='td' >
                                            {data.data.services.map((item, index) => (
                                                <p key={index}>{item.name}</p>
                                            ))}
                                        </td>
                                        <td className='td' >

                                            {data.data.services.map((item, index) => {
                                                // setTemp(temp.concat(item.price))
                                                return (
                                                    <p key={index}>{item.price}</p>
                                                )
                                            })}
                                        </td>
                                    </tr>

                                ))
                            }
                            {
                                <tr style={{ fontsize: 5, color:'#d6994b', fontWeight:'bold' }}>
                                    <td className='td'>Total</td>
                                    <td className='td'>
                                        {
                                            temp.reduce(
                                                (a, b) => {
                                                    return a + b
                                                }, 0
                                            )
                                        }
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}





export default Salesheet;