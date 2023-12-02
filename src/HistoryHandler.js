import { setArticle } from './ArticleSetter.js';
import { setManifestAndIcons } from './manifestSet'
import  { SiteDescription, BetterMediaKeysDescription, GenericInputDescription} from './Articles.js'
import { GameStart } from './TPONG';
window.onpopstate = function(){
    let ArticleContent = '';
    let ArticleTitleContent = '';
    switch(window.location.pathname)
    {
        case '/BetterMediaKeys':
            {
                window.document.title = 'TWeb | BetterMediaKeys';
                ArticleContent = BetterMediaKeysDescription;
                ArticleTitleContent = 'BetterMediaKeys';
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;        
            }
        case '/GenericInput':
            {
                window.document.title = 'TWeb | GenericInput';
                ArticleContent = GenericInputDescription;
                ArticleTitleContent = 'GenericInput';
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;        
            }
        case '/TPONG':
                {
                    document.body.style.setProperty('--main-gameControl-display', 'block');
                    document.body.style.setProperty('--main-gameControl-display', 'block');
                    window.document.title = 'TWeb | TPONG';
                    if (import.meta.env.DEV){
                        ArticleContent = GameStart(0, true).props.children[1].props.child;
                    }
                    else
                    {
                        ArticleContent = GameStart(0, true).props.children[1].props.child;
                    }
                    ArticleTitleContent = 'TPONG';
                    setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/icons/TPONG/favicon.ico?v=2?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/icons/TPONG/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/icons/TPONG/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/icons/TPONG/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/icons/TPONG/safari-pinned-tab.svg?v=2'}}, {'manifest-apple-touch-icon-logo192' : {'href' : window.location.origin + '/icons/TPONG/logo192.png?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/TPONG-manifest.json?v=2'} }));
                    break;
                }
        default:
            {
                window.document.title = 'TWeb | Dev';
                ArticleContent = SiteDescription;
                ArticleTitleContent = 'About';
                break;
            }
    }
    setArticle(ArticleContent, ArticleTitleContent);
};