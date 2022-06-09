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
        const Products = db.collection("bookings").where("arrived", "==", true)
            .get().then((querySnapshot) => {
                querySnapshot.forEach(element => {
                    var data = {
                        data: element.data()
                    }

                    setInfo(arr => [...arr, data]);
                });
            })
    }
    const totalCost = () => {
        setCount(count, +Cost)
        console.log(setCount)
    }



    return (
        <div className='col-md-8 offset-md-2'>

            <Table striped bordered hover variant="dark">
                <thead>
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
                                        //                                                                                                                       setTemp(...temp, item.price)
                                       
                                       
                                        return(
                                            <p key={index}>{item.price}</p>
                                        )
                                    })}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        
               
        
            
                

        </div>
        

    )
                
   
}





export default Salesheet;