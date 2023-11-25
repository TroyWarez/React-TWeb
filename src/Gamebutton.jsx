import './Gamebutton.css';
import { GameStart, EndGame } from './TPONG';
function Gamebutton(name, key)
{
    return ( <input className='Navbutton' type='button' onClick={GamebuttonOnClick} value={name} key={key}></input>);
}
function GamebuttonOnClick(event)
{
    switch (event.target.defaultValue)
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
                    }
                    window.document.title = 'TWeb | TPONG';
                    ArticleTitle.innerHTML = 'TPONG';
                    Article.replaceWith(GameStart(0, true).props.child); 
                }
                break;
            }
    }
}
export default Gamebutton;