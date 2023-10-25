import { useState } from 'react'
import './Navbar.css';
function Navbar() {
    const [count, setCount] = useState(0)
  
    return (
        <nav className='Navbar'></nav>
    )
  }
  
  export default Navbar