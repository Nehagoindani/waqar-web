import React, { useState } from 'react';
import db from '../firebase.config.js';
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'


const Salesheet = () => {


    const [price, setPrice] = useState('')
    const [count, setCount] = useState('')
    const [temp, setTemp] = useState([])

    const [info, setInfo] = useState([])

    var Cost = [price]

    window.addEventListener('load', () => {
        getBookings()
    })

    const getBookings = () => {
        const today = new Date();
        console.log(today)
        const Products = db.collection("bookings").where("arrived", "==", true ).where("date", "==", today )
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
        <div className='col-md-8 offset-md-2'>

            <Table striped bordered hover>
                <thead class="thead-dark">
                    <tr style={{ textAlign: 'center' }} >
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
                        <tr style={{ fontsize: 5 }}>
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
    )
}





export default Salesheet;