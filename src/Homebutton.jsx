import terminalDarkIcon from '/terminal_dark.svg'
import terminalLightIcon from '/terminal_light.svg'
import './Homebutton.css'
function Homebutton(name, key)
{
    let terminalIconSrc = '';
    switch (getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
    {
        case '#131313':
        {
            terminalIconSrc = terminalDarkIcon;
            break;
        }
        case '#ffffff':
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
    return (<a href={window.location.origin} className='WebsiteTitle' key={key}><h1><img src={terminalIconSrc} className='terminalIcon' alt='Terminal Icon' value={name}></img>{name}</h1></a>);
}
export default Homebutton;