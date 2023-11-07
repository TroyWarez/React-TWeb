import { useState } from 'react'
import LightButton from './LightButton'
import Navbutton from './Navbutton'
import './Navbar.css';
function Navbar() {
  const NavData = [
    new Navbutton('GenericInput', '0'),
    new Navbutton('BetterMediaKeys', '1'),
    new Navbutton('TPONG', '2'),
    new LightButton('Lightswitch', '3')
  ]; 
    return (
       <nav className='Navbar'>
       {NavData}
       </nav>
    )
  }
  
  export default Navbar