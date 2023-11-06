import { useState } from 'react'
import LightButton from './LightButton'
import Navbutton from './Navbutton'
import './Navbar.css';
const NavData = [
  new Navbutton('GenericInput'),
  new Navbutton('BetterMediaKeys'),
  new Navbutton('TPONG')
]; 
function Navbar() {
  let testNav  = new Navbutton;
  testNav = NavData[0];
    return (
       <nav className='Navbar'>
       {NavData[0]}
       <LightButton/>
       </nav>
    )
  }
  
  export default Navbar