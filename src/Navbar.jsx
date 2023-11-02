import { useState } from 'react'
import LightButton from './LightButton'
import './Navbar.css';
const NavData = ['GenericInput', 'BetterMediaKeys', 'Games' ];
function Navbar() {
    const [item, setItem] = useState(NavData[0])
  
    return (
       <nav className='Navbar'>
         
       <LightButton/>
       <b>{NavData[0]}</b>
       </nav>
    )
  }
  
  export default Navbar