import {EndGame, GameStart} from './TPONG';
export function setArticle(ArticleContent, ArticleTitleContent)
{
    let Article = document.getElementsByClassName('Article')[0];
    if(typeof Article  === 'undefined')
    {
        Article = document.getElementById('mainGameboard');
    }
    let ArticleTitle = document.getElementsByClassName('ArticleTitle')[0];
    if( (typeof Article !== 'undefined') && (Article !== null) && (typeof ArticleTitle !== 'undefined'))
    {
        let TPONG = document.getElementById('mainGameboard');
        let newArticle = null;
        if(TPONG !== null)
        {
            EndGame();
        }
        if(ArticleContent instanceof HTMLCanvasElement)
        {
            ArticleTitle.innerHTML = ArticleTitleContent;
            document.body.style.setProperty('--main-gameControl-visibility', 'visible');
            if (import.meta.env.DEV){
                Article.replaceWith(GameStart(0, true).props.children[0].props.child); 
            }
            else
            {
                Article.replaceWith(GameStart(0, false).props.children[0].props.child); 
            }
        }
        else
        {
            ArticleTitle.innerHTML = ArticleTitleContent;
            document.body.style.setProperty('--main-gameControl-visibility', 'hidden');
            newArticle = document.createElement('p');
            newArticle.className = 'Article';
            newArticle.textContent = ArticleContent;
        }
        Article.replaceWith(newArticle);
    }

}
export default setArticle;