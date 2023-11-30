import { GameStart, EndGame } from './TPONG';
import { setManifestAndIcons } from './manifestSet'
function Gamebutton(name, key)
{
    return (<a href={name} className='Navbutton' type='button' onClick={GamebuttonOnClick} value={name} key={key}>{name}</a>);
}
function GamebuttonOnClick(event)
{
    event.preventDefault();
    switch (event.target.text)
    {
        case 'TPONG':
            {
                let gameBoardElement = document.getElementById('mainGameboard');
                if(gameBoardElement === null)
                {
                    EndGame();
                }
                let ArticleTitle = document.getElementsByClassName('ArticleTitle')[0];
                let Article = document.getElementsByClassName('Article')[0];
                if( (typeof Article  !== 'undefined') && (typeof ArticleTitle !== 'undefined') )
                {
                    if(window.location.pathname !== '/TPONG')
                    {
                        window.history.pushState('TPONG', '', '/TPONG');
                        window.document.title = 'TWeb | TPONG';
                        setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/icons/TPONG/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/icons/TPONG/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/icons/TPONG/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/icons/TPONG/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/icons/TPONG/safari-pinned-tab.svg?v=2'}}, {'manifest-apple-touch-icon-logo192' : {'href' : window.location.origin + '/icons/TPONG/logo192.png?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/TPONG-manifest.json?v=2'} }));
                    }
                    window.document.title = 'TWeb | TPONG';
                    ArticleTitle.innerHTML = 'TPONG';
                    document.body.style.setProperty('--main-gameControl-visibility', 'visible');
                    if (import.meta.env.DEV){
                        Article.replaceWith(GameStart(0, true).props.children[1].props.child); 
                    }
                    else
                    {
                        Article.replaceWith(GameStart(0, true).props.children[1].props.child); 
                    }
                }
                break;
            }
    }
}
export default Gamebutton;