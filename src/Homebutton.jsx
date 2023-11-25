import terminalDarkIcon from '/terminal_dark.svg'
import terminalLightIcon from '/terminal_light.svg'
import { getLightState, addLightImgElement } from './LightHandler'
import { setArticle } from './ArticleSetter.js';
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
    
    return (<a href={window.location.origin}   onClick={(e) => {
        e.preventDefault();
        if(window.location.pathname !== '/')
        {
            window.history.pushState(window.location.origin, '', window.location.origin);
        }
        setArticle('', '');// Add something here.
      }}className='WebsiteTitle' key={key}><h1><img src={terminalIconSrc} className='terminalIcon' alt='Terminal Icon' value={name}></img>{name}</h1></a>);
}
export default Homebutton;