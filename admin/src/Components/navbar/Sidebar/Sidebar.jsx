import React from 'react'
import './Sidebar.css'
import { Link } from  'react-router-dom'
import { assets } from '../../../assets/assets'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration :"none"}}>
        <div className='sidebar-item'>
            <img src={assets.add_icon} alt="" />
            <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration :"none"}}>
        <div className='sidebar-item'>
            <img src={assets.order_icon } alt="" />
            <p>Product List</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
