import { useState } from 'react'
import LightButton from './LightButton'
import Navbutton from './Navbutton'
import './Navbar.css';
const NavData = ['GenericInput', 'BetterMediaKeys', 'TPONG' ];
function Navbar() {
    const [item, setItem] = useState(NavData[0])
  
    return (
       <nav className='Navbar'>
       <p>TPONG</p>
       <Navbutton></Navbutton>
       <LightButton/>
       </nav>
    )
  }
  
  export default Navbar