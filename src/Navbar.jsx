import { useState } from 'react'
import LightButton from './LightButton'
import Navbutton from './Navbutton'
import './Navbar.css';
const NavData = [
  new Navbutton('GenericInput', '0'),
  new Navbutton('BetterMediaKeys', '1'),
  new Navbutton('TPONG', '2')
]; 
function Navbar() {
    return (
       <nav className='Navbar'>
       {NavData}
       <LightButton/>
       </nav>
    )
  }
  
  export default Navbar