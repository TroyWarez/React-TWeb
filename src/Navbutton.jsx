import './Navbutton.css';
import { ContentContext } from './App'
import { setManifestAndIcons } from './manifestSet'
import  { SiteDescription, BetterMediaKeysDescription, GenericInputDescription} from './Articles.js'
import { useContext } from 'react';
let ArticleContent = null;
function Navbutton(name, key)
{
    ArticleContent = useContext(ContentContext);
    return (<a className='Navbutton' type='button' onClick={NavButtonOnClick} value={name} href={name} key={key}>{name}</a>);
}
function NavButtonOnClick(event)
{
    let ArticleContent = '';
    let ArticleTitleContent = '';
    event.preventDefault(); //This prevents reloading the page.
    switch (event.target.text)
    {
        case 'BetterMediaKeys':
            {
                if(window.location.pathname !== '/BetterMediaKeys')
                {
                    window.history.pushState('BetterMediaKeys', '', '/BetterMediaKeys');
                    setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                }
                window.document.title = 'TWeb | BetterMediaKeys';
                ArticleTitleContent = 'BetterMediaKeys';                ArticleContent.ContentTitle = 'BetterMediaKeys';
                ArticleContent.Content = <p className='Article'>{BetterMediaKeysDescription}</p>;
                ArticleContent = BetterMediaKeysDescription;
                break;
            }
        case 'GenericInput':
            {
                if(window.location.pathname !== '/GenericInput')
                {
                    window.history.pushState('GenericInput', '', '/GenericInput');
                    setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                }
                window.document.title = 'TWeb | GenericInput';
                ArticleTitleContent = 'GenericInput';
                ArticleContent = GenericInputDescription;
                break;
            }
            default:
                {
                    window.document.title = 'TWeb | Dev';
                    ArticleContent = SiteDescription;
                    ArticleTitleContent = '';
                    break;
                }
    }
}
export default Navbutton;