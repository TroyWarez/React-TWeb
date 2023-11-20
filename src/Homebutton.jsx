import terminalDarkIcon from '/terminal_dark.svg'
import terminalLightIcon from '/terminal_light.svg'
import { getLightState, addLightImgElement } from './LightButton'
import './Homebutton.css'
function Homebutton(name, key)
{
    let terminalIconSrc = '';
    switch (getLightState())
    {
        case 'dark':
        {
            terminalIconSrc = terminalDarkIcon;
            break;
        }
        case 'light':
        {
            terminalIconSrc = terminalLightIcon;
            break;
        }
        default:
        {
            terminalIconSrc = '';
            break;
        }
    }
    addLightImgElement('terminalIcon', terminalLightIcon, terminalDarkIcon);
    
    return (<a href={window.location.origin} className='WebsiteTitle' key={key}><h1><img src={terminalIconSrc} className='terminalIcon' alt='Terminal Icon' value={name}></img>{name}</h1></a>);
}
export default Homebutton;