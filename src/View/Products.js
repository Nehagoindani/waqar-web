import React, { useState } from 'react';
import db from '../firebase.config.js';
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const Products = () => {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [count, setCount] = useState('')
  const [description, setDescription] = useState('')
  const [pID, setPID] = useState('')
  const [info, setInfo] = useState([])
  const [image, setImage] = useState()

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   if (image == null)
  //     return;
  //   db.ref(`/images/${image.name}`).put(image)
  //     .on("state_changed", alert("success"), alert);
  // }

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(image)

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'products');
    data.append('cloud_name', 'drl9yz7sz');

    fetch("https://api.cloudinary.com/v1_1/drl9yz7sz/image/upload", {

      method: 'POST',
      body: data

    })
      .then((res) => res.json())
      .then((data) => {
        const url = data.url
        console.log("chek", data.url)
        db.collection('products')
          .add({
            pID: pID,
            pName: name,
            price: price,
            count: count,
            description: description,
            image: url,
          })
          .then(function () {
            console.log("products added successfully!");
            alert('product added')
            setName(null)
            setInfo([])
            getBookings()
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch((err) => {
        console.log('An error has occured while uploading the image.', err);
      });
  };

  window.addEventListener('load', () => {
    if (localStorage.getItem('loggedIn') === 'false') {
      navigate('/login')
    } else {
      getBookings()
    }
  })

  const getBookings = () => {
    db.collection("products").get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var data = {
          id: element.id,
          data: element.data()
        }
        setInfo(arr => [...arr, data]);
        setPID(data.id)
      });

    })

  }

  const getProductById = (id) => {
    db.collection("Products").doc(id).get().then((querySnapshot) => {
      //   console.log(q)

    })
    // setInfo([])
    // getBookings()

  }

  const deleteProduct = (id) => {
    db.collection('products').doc(id).delete()
    setInfo([])
    getBookings()
  }

  return (
    <div className='col-md-8 offset-md-2'>
      <div style={{padding:20}}>
        <div class="container">
          <h1 class="display-5 text-center" style={{ fontWeight: 'bold', color:'#d6994b' }}>Inventory</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-3'>
          <div style={{ fontWeight: 'bold', color:'#d6994b' }}><h4>Add Product</h4></div>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleFormControlInput1">Product Name</label>
              <input type="text" value={name} class="form-control" id="exampleFormControlInput1" onChange={e => setName(e.target.value)} name='name' />

            </div>
            <div class="form-row">

              <div class="form-group col-md-6">
                <label for="inputZip">Price</label>
                <input type="text" class="form-control" value={price} onChange={e => setPrice(e.target.value)} id="inputZip" />

              </div>
              <div class="form-group col-md-6">
                <label for="inputZip">Quantity</label>
                <input type="text" class="form-control" value={count} onChange={e => setCount(e.target.value)} id="inputZip" />

              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Product Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" value={description} onChange={e => setDescription(e.target.value)} rows="2"></textarea>

            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Product Image</label>
              <input type="file" onChange={e => setImage(e.target.files[0])} />
              {/* <textarea class="form-control" id="exampleFormControlTextarea1" value={description} onChange={e => setDescription(e.target.value)} rows="2"></textarea> */}
            </div>

            <button type="submit" onClick={handleSubmit} class="btn btn-black" style={{backgroundColor:'#d6994b', color:'white',}}>Submit</button>
          </form>
        </div>

        <div className='col-md-8'>
          <div style={{ fontWeight: 'bold', color:'#d6994b', paddingLeft:50}}><h4>Product List</h4></div>
          <div>
            <Table className='table table-hover'>
              <thead>
                <tr style={{ textAlign: 'center' }} >
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Actions</th>

                </tr>
              </thead>
              <tbody>
                {
                  info.map((data) => (
                    <tr style={{ fontsize: 5 , textAlign:'center'}}>
                      <td style={{ color:'#d6994b', fontsize: 3 }}  >
                        {data.data.pName}
                      </td>
                      <td className='td' >
                        {data.data.price}
                      </td>
                      <td style={{  fontsize: 3 }} >
                        {data.data.count}
                      </td>
                      <td style={{  fontsize: 3 }} >
                        {data.data.description}
                      </td>
                      <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button style={{backgroundColor: 'black', borderColor:'black'}}
                          onClick={() => { getProductById(data.id) }}
                        >Update</Button>
                        <text style={{ color:'white'}}> -- </text>
                        <Button  style={{backgroundColor: 'black', borderColor:'black'}}
                          onClick={() => { deleteProduct(data.id) }}
                        >Delete</Button>

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