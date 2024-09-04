import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './AddProduct.css'
const AddProduct = () => {

    const [image,setImage] = useState(false)
    const [image2,setImage2] = useState(false)
    const [image3,setImage3] = useState(false)
     const [productDetails ,setProductDetails]= useState({
      name: '',
      price: '',
      description: '',
      category:'men',
      subCategory:'topwear'
     })
     const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
     }

    const imageHandler =(e) =>{
        setImage(e.target.files[0]); 
    }
    const imageHandler2 =(e) =>{
      setImage2(e.target.files[0]); 
  }
  const imageHandler3 =(e) =>{
    setImage3(e.target.files[0]); 
}
  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/addproduct',{
      method :'POST',
      headers:{
        Accept:'application/json'
      },
      body:formData,
    }).then((resp) => resp.json()).then((data)=>{responseData=data})
    if (responseData.success) {
      product.image = responseData.image_url;
    }
  }
 

  return (
    <div className='add_product'>
      <div className="product-info">
        <p>Upload Image</p>
        <div className='images-section'>
            <div>
                 <label htmlFor="file-input1"><img src={image? URL.createObjectURL(image): assets.upload_area} className='img-upld' alt="" /></label> 
                 <input onChange={imageHandler} type="file" name='image1' id='file-input1' hidden/>
            </div> 
            <div>
                 <label htmlFor="file-input2"><img  src={image2? URL.createObjectURL(image2): assets.upload_area} className='img-upld' alt="" /></label> 
                 <input onChange={imageHandler2} type="file" name='image2' id='file-input2' hidden/>
            </div> 
            <div>
                 <label htmlFor="file-input3"><img  src={image3? URL.createObjectURL(image3): assets.upload_area} className='img-upld' alt="" /></label> 
                 <input onChange={imageHandler3} type="file" name='image3' id='file-input3' hidden/>
            </div> 
        </div>
      </div>
      <div className="product-info">
        <p>Product name</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="product-info">
        <p>Product description</p>
        <textarea value={productDetails.description} onChange={changeHandler}   style={{height:'100px'}} name="description" placeholder='Write content here' id=""></textarea>
      </div>
      <div className="product-info-csp">
        <div className="product-info">
          <p>Product category</p>
         <select value={productDetails.category} onChange={changeHandler} name="category">
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
         </select>
       </div>
       <div className="product-info">
          <p>Sub category</p>
         <select value={productDetails.subCategory} onChange={changeHandler} name="subcategory">
          <option value="topwear">Topwear</option>
          <option value="bottomwear">Bottomwear</option>
          <option value="winterwear">Winterwear</option>
         </select>
       </div>
       <div className="product-info">
        <p>Product Price</p>
        <input value={productDetails.price} onChange={changeHandler} className='price' type="number" name='price' />
       </div>
      </div>
      <div className='product-info'>
          <p>Product Sizes</p>
          <div className="size">
            <button type='button' className='btn-size' value={'S'}>S</button>
            <button type='button' className='btn-size' value={'S'}>M</button>
            <button type='button' className='btn-size' value={'S'}>L</button>
            <button type='button' className='btn-size' value={'S'}>XL</button>
            <button type='button' className='btn-size' value={'S'}>XXL</button>
          </div>
      </div>
      <div className="product-bstSell">
        <input className='checkbox' type="checkbox" value={true} />
        <p>add to bestseller</p>
      </div>
      <button  onClick={()=>{Add_Product()}} className='btn-add'>ADD</button>
    </div>
  )
}

export default AddProduct
