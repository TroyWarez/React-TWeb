import './Navbutton.css';
import { setArticle } from './ArticleSetter.js';
import { setManifestAndIcons } from './manifestSet'
import  { SiteDescription, BetterMediaKeysDescription, GenericInputDescription} from './Articles.js'
import { GameStart } from './TPONG';
function Navbutton(name, key)
{
    return (<a className='Navbutton' type='button' onClick={NavButtonOnClick} value={name} href={name} key={key}>{name}</a>);
}
function NavButtonOnClick(event)
{
    let ArticleContent = '';
    let ArticleTitleContent = '';
    event.preventDefault();
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
                ArticleTitleContent = 'BetterMediaKeys';
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
    
    setArticle(ArticleContent, ArticleTitleContent);
}
window.onpopstate = function(e){
    let ArticleContent = '';
    let ArticleTitleContent = '';
    switch (e.state)
    {
        case 'BetterMediaKeys':
            {
                window.document.title = 'TWeb | BetterMediaKeys';
                ArticleContent = BetterMediaKeysDescription;
                ArticleTitleContent = 'BetterMediaKeys';
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;        
            }
        case 'GenericInput':
            {
                window.document.title = 'TWeb | GenericInput';
                ArticleContent = GenericInputDescription;
                ArticleTitleContent = 'GenericInput';
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;        
            }
        case 'TPONG':
                {
                    window.document.title = 'TWeb | TPONG';
                    if (import.meta.env.DEV){
                        ArticleContent = GameStart(0, true).props.children[0].props.child
                    }
                    else
                    {
                        ArticleContent = GameStart(0, true).props.children[0].props.child
                    }
                    ArticleTitleContent = 'TPONG';
                    setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/icons/TPONG/favicon.ico?v=2?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/icons/TPONG/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/icons/TPONG/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/icons/TPONG/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/icons/TPONG/safari-pinned-tab.svg?v=2'}}, {'manifest-apple-touch-icon-logo192' : {'href' : window.location.origin + '/icons/TPONG/logo192.png?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/TPONG-manifest.json?v=2'} }));
                    break;
                }
        default:
            {
                window.document.title = 'TWeb | Dev';
                ArticleContent = '';
                ArticleTitleContent = '';
                break;
            }
    }
    
    setArticle(ArticleContent, ArticleTitleContent);
};
export default Navbutton;