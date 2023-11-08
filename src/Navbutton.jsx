import './Navbutton.css';
import  { BetterMediaKeysDescription, GenericInputDescription, TPONGDesciption } from './Articles.js'
function Navbutton(name, key)
{
    return ( <input className='Navbutton' type='button' onClick={NavButtonOnClick} value={name} key={key}></input>);
}
function NavButtonOnClick(event)
{
    let ArticleContent = '';
    switch (event.target.defaultValue)
    {
        case 'BetterMediaKeys':
            {
                if(window.location.pathname !== '/BetterMediaKeys')
                {
                    window.history.pushState('BetterMediaKeys', '', '/BetterMediaKeys');
                }
                window.document.title = 'TWeb | BetterMediaKeys';
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
                ArticleContent = GenericInputDescription;
                break;
            }
        case 'TPONG':
            {
                if(window.location.pathname !== '/TPONG')
                {
                    window.history.pushState('TPONG', '', '/TPONG');
                }
                window.document.title = 'TWeb | TPONG';
                ArticleContent = TPONGDesciption;
                break;
            }
            default:
                {
                    window.document.title = 'TWeb | Dev';
                    ArticleContent = '';
                    break;
                }
    }
    
    setArticle(ArticleContent);
}
window.onpopstate = function(e){
    let ArticleContent = '';
    switch (e.state)
    {
        case 'BetterMediaKeys':
            {
                window.document.title = 'TWeb | BetterMediaKeys';
                ArticleContent = BetterMediaKeysDescription;
                break;        
            }
        case 'GenericInput':
            {
                window.document.title = 'TWeb | GenericInput';
                ArticleContent = GenericInputDescription;
                break;        
            }
        case 'TPONG':
            {
                window.document.title = 'TWeb | TPONG';
                ArticleContent = TPONGDesciption;
                break;        
            }
        default:
            {
                window.document.title = 'TWeb | Dev';
                ArticleContent = '';
                break;
            }
    }
    
    setArticle(ArticleContent);
};
function setArticle(ArticleContent)
{
    let Article = document.getElementsByClassName('Article')[0];
    if( Article )
    {
        Article.innerHTML = ArticleContent;
    }

}
export default Navbutton;