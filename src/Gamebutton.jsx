import './Gamebutton.css';
import GameStart from './TPONG';
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
                let Article = document.getElementsByClassName('Article')[0];
                let ArticleTitle = document.getElementsByClassName('ArticleTitle')[0];
                if( (typeof Article  !== undefined) && (typeof ArticleTitle !== undefined) )
                {
                    ArticleTitle.innerHTML = 'A fun ping pong game.';
                    Article.replaceWith(GameStart()); 
                }
                break;
            }
    }
}
export default Gamebutton;