import LightButton from './LightButton'
import Navbutton from './Navbutton'
import Homebutton from './Homebutton';
import GameButton from './Gamebutton'
import './Navbar.css';
function Navbar() {
  let lightButton = new LightButton('Lightswitch');
    return (
       <nav className='Navbar'>
       <Homebutton name={" Troy's Domain"}/>
       <Navbutton name={'GenericInput'}/>
       <Navbutton name={'BetterMediaKeys'}/>
       <GameButton name={'TPONG'}/>
       {lightButton}
       </nav>
    )
  }
  
  export default Navbar