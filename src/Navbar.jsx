import LightButton from './LightButton'
import Navbutton from './Navbutton'
import Homebutton from './Homebutton';
import GameButton from './Gamebutton'
import './Navbar.css';
function Navbar() {
  const NavData = [
    new Homebutton(' Troy\'s Domain', '0'),
    new Navbutton('GenericInput', '1'),
    new Navbutton('BetterMediaKeys', '2'),
    new GameButton('TPONG', '3'),
    new LightButton('Lightswitch', '4')
  ]; 
    return (
       <nav className='Navbar'>
       {NavData}
       </nav>
    )
  }
  
  export default Navbar