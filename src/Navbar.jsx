import { useState } from 'react'
import './Navbar.css';
const NavData = ['GenericInput', 'BetterMediaKeys', 'Games' ];
function Navbar() {
    const [item, setItem] = useState(NavData[0])
  
    return (
        <nav className='Navbar'> Item is { item }</nav>
    )
  }
  
  export default Navbar