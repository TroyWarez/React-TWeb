import './Navbutton.css';
import  { BetterMediaKeysDescription, GenericInputDescription, TPONGDesciption } from './Articles.js'
function Navbutton(name, key)
{
    return ( <input className='Navbutton' type='button' onClick={NavButtonOnClick} value={name} key={key}></input>);
}
function NavButtonOnClick(event)
{
    let ArticleContent = '';
    let ArticleTitleContent = '';
    switch (event.target.defaultValue)
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
        case 'TPONG':
            {
                if(window.location.pathname !== '/TPONG')
                {
                    window.history.pushState('TPONG', '', '/TPONG');
                }
                window.document.title = 'TWeb | TPONG';
                ArticleTitleContent = 'TPONG';
                ArticleContent = TPONGDesciption;
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
        case 'TPONG':
            {
                window.document.title = 'TWeb | TPONG';
                ArticleContent = TPONGDesciption;
                ArticleTitleContent = 'TPONG';
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
function setArticle(ArticleContent, ArticleTitleContent)
{
    let Article = document.getElementsByClassName('Article')[0];
    let ArticleTitle = document.getElementsByClassName('ArticleTitle')[0];
    if( (typeof Article  !== undefined) && (typeof ArticleTitle !== undefined) )
    {
        ArticleTitle.innerHTML = ArticleTitleContent;
        let newArticle = document.createElement('p');
        newArticle.className = 'Article';
        newArticle.textContent = ArticleContent;
        Article.replaceWith(newArticle);
    }

}
export default Navbutton;