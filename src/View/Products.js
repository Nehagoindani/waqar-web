import React,{ useState} from 'react';
import db from '../firebase.config.js';
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'

const Products=()=>{

const [name, setName] = useState('')
const [price, setPrice] = useState('')
const [count, setCount] = useState('')
const [description, setDescription] = useState('')
const [info, setInfo] = useState([])

const handleSubmit = (event)=> {
  event.preventDefault();
  db.collection('Products')
  .add({
    PName: name,
    price: price,
    count: count,
    Description: description,
  })
  .then(function () {
    console.log("products added successfully!");
    alert('product added')
  })
  .catch(function (error) {
    console.error("Error writing document: ", error);
  });

  
};

window.addEventListener('load', () => {
    getBookings()
})

const getBookings = () => {
    db.collection("Products").get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var data = {
            data: element.data()
        }

        setInfo(arr => [...arr, data]);
        });
    })
}

const updateBooking = (status, id) => {
  db.collection("Products").doc(id).update({ status: status })
  setInfo([])
  getBookings()

}

  return(
  <div className='col-md-8 offset-md-2'>
  <div class="jumbotron jumbotron-fluid md-2">
  <div class="container">
    <h1 class="display-4 text-center">Products</h1>
  </div>
  </div>
<div className='row'>
  <div className='col-md-4'>
  <div>Add Product</div>
  <form onSubmit={handleSubmit}>
  <div class="form-group">
    <label for="exampleFormControlInput1">Product Name</label>
    <input type="text" value={name}  class="form-control" id="exampleFormControlInput1" onChange={e=>setName(e.target.value)} name= 'name' />
    
  </div>
  <div class="form-row">
  
  <div class="form-group col-md-6">
      <label for="inputZip">Price</label>
      <input type="text" class="form-control"  value={price} onChange={e=>setPrice(e.target.value)} id="inputZip"/>
     
  </div>
  <div class="form-group col-md-6">
    <label for="exampleFormControlSelect1">Product Count</label>
    
    <select class="form-control" id="exampleFormControlSelect1" value={count} onChange={e=>setCount(e.target.value)}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
   
  </div>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Product Description</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" value={description} onChange={e=>setDescription(e.target.value)} rows="2"></textarea>
    
  </div>
  <button type="submit" onClick={handleSubmit} class="btn btn-primary btn-block">Submit</button> 
</form>
  </div>
  
  <div className='col-md-8'>
    <div>List of Products</div>
    <div>
    <Table striped bordered hover variant="dark">
                <thead>
                    <tr style={{textAlign: 'center'}} >
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        info.map((data) => (
                            <tr style={{ fontsize: 5 }}>
                                <td style={{ color: '#d6994b', fontsize: 3 }}  >
                                    {data.data.PName}
                                </td>
                                <td className='td' >
                                    {data.data.price}
                                </td>
                                <td style={{ color: '#d6994b', fontsize: 3 }} >
                                    {data.data.count}
                                </td>
                                <td style={{ color: '#d6994b', fontsize: 3 }} >
                                    {data.data.Description}
                                </td>
                                <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Button >Update</Button>

                                    <Button >Delete</Button>

                                </td>
                               
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
    </div>
  </div>
  
</div>



</div>
 
);
}

export default Products;