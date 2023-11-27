import terminalDarkIcon from '/terminal_dark.svg'
import terminalLightIcon from '/terminal_light.svg'
import { getLightState, addLightImgElement } from './LightHandler'
import { setArticle } from './ArticleSetter.js';
import { setManifestAndIcons } from './manifestSet'
import './Homebutton.css'
import  { SiteDescription } from './Articles.js'
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
            window.history.pushState(window.location.origin, '', '/');
            setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
        }
        window.document.title = 'TWeb | Dev';
        setArticle(SiteDescription, 'About');// Add something here.
      }}className='WebsiteTitle' key={key}><h1><img src={terminalIconSrc} className='terminalIcon' alt='Terminal Icon' value={name}></img>{name}</h1></a>);
}
export default Homebutton;