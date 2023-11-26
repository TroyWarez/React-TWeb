import './Navbutton.css';
import { setArticle } from './ArticleSetter.js';
import  { BetterMediaKeysDescription, GenericInputDescription} from './Articles.js'
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
                }
                window.document.title = 'TWeb | GenericInput';
                ArticleTitleContent = 'GenericInput';
                ArticleContent = GenericInputDescription;
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
                break;        
            }
        case 'GenericInput':
            {
                window.document.title = 'TWeb | GenericInput';
                ArticleContent = GenericInputDescription;
                ArticleTitleContent = 'GenericInput';
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