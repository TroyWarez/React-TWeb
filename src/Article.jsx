import { GameStart } from './TPONG';
import './Article.css';
import  { SiteDescription, BetterMediaKeysDescription, GenericInputDescription } from './Articles.js'
import { setManifestAndIcons } from './manifestSet.jsx'
function Article() {
    let title = '';
    let ArticleContent = <p className='Article'></p>;
    switch(window.location.pathname)
    {
        case '/BetterMediaKeys':
            {
                window.document.title = 'TWeb | BetterMediaKeys';
                title = 'BetterMediaKeys';
                ArticleContent = <p className='Article'>{BetterMediaKeysDescription}</p>;
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;
            }
        case '/GenericInput':
            {
                window.document.title = 'TWeb | GenericInput';
                title = 'GenericInput';
                ArticleContent = <p className='Article'>{GenericInputDescription}</p>;
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;
            }
        case '/TPONG':
            {
                window.document.title = 'TWeb | TPONG';
                title = 'TPONG';
                if (import.meta.env.DEV){
                    ArticleContent = GameStart(0, true);
                }
                else
                {
                    ArticleContent = GameStart(0, true);
                }
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/icons/TPONG/favicon.ico?v=2?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/icons/TPONG/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/icons/TPONG/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/icons/TPONG/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/icons/TPONG/safari-pinned-tab.svg?v=2'}}, {'manifest-apple-touch-icon-logo192' : {'href' : window.location.origin + '/icons/TPONG/logo192.png?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/TPONG-manifest.json?v=2'} }));
                break;
            }
        default:
            {
                window.document.title = 'TWeb | Dev';
                title = 'About';
                ArticleContent = <p className='Article'>{SiteDescription}</p>;
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;
            }
    }
    return (
        <article>
        <h2 className='ArticleTitle'>{title}</h2>
        {ArticleContent}
       </article>
    )
}
export default Article