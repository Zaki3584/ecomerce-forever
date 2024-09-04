import React from 'react'
import {assets} from '../../assets/assets'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={assets.logo} className='nav-logo' alt="" />
      <button className='btn-out'>logout</button>
    </div>
  )
}

export default Navbar

