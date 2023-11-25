import { GameStart } from './TPONG';
import './Article.css';
import  { BetterMediaKeysDescription, GenericInputDescription } from './Articles.js'
function Article() {
    let title = '';
    let ArticleContent = <p className='Article'></p>;
    switch(window.location.pathname)
    {
        case '/BetterMediaKeys':
            {
                title = 'BetterMediaKeys';
                ArticleContent = <p className='Article'>{BetterMediaKeysDescription}</p>;
                break;
            }
        case '/GenericInput':
            {
                title = 'GenericInput';
                ArticleContent = <p className='Article'>{GenericInputDescription}</p>;
                break;
            }
        case '/TPONG':
            {
                title = 'TPONG';
                ArticleContent = GameStart(0, true);
                break;
            }
        default:
            {
                title = '';
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