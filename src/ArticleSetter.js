import {EndGame} from './TPONG';
export function setArticle(ArticleContent, ArticleTitleContent)
{
    let Article = document.getElementsByClassName('Article')[0];
    if(typeof Article  === 'undefined')
    {
        Article = document.getElementById('mainGameboard');
    }
    let ArticleTitle = document.getElementsByClassName('ArticleTitle')[0];
    if( (typeof Article !== 'undefined') && (Article !== null) && (typeof ArticleTitle !== 'undefined') )
    {
        let TPONG = document.getElementById('mainGameboard');
        if(TPONG !== null)
        {
            EndGame();
        }
        ArticleTitle.innerHTML = ArticleTitleContent;
        let newArticle = document.createElement('p');
        newArticle.className = 'Article';
        newArticle.textContent = ArticleContent;
        Article.replaceWith(newArticle);
    }

}
export default setArticle;