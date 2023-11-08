import './Navbutton.css';
import  { BetterMediaKeysDescription, GenericInputDescription, TPONGDesciption } from './Articles.js'
function Navbutton(name, key)
{
    return ( <input className='Navbutton' type='button' onClick={NavButtonOnClick} value={name} key={key}></input>);
}
function NavButtonOnClick(event)
{
    switch (event.target.defaultValue)
    {
        case 'BetterMediaKeys':
            {
                if(window.location.pathname !== '/BetterMediaKeys')
                {
                    window.history.pushState('BetterMediaKeys', '', '/BetterMediaKeys');
                    let Article = document.getElementsByClassName('Article')[0];
                    if( Article )
                    {
                        Article.innerHTML = BetterMediaKeysDescription;
                    }
                }
                break;
            }
        case 'GenericInput':
            {
                if(window.location.pathname !== '/GenericInput')
                {
                    window.history.pushState('GenericInput', '', '/GenericInput');
                    let Article = document.getElementsByClassName('Article')[0];
                    if( Article )
                    {
                        Article.innerHTML = GenericInputDescription;
                    }
                }
                break;
            }
        case 'TPONG':
            {
                if(window.location.pathname !== '/TPONG')
                {
                    window.history.pushState('TPONG', '', '/TPONG');
                    let Article = document.getElementsByClassName('Article')[0];
                    if( Article )
                    {
                        Article.innerHTML = TPONGDesciption;
                    }
                }
                break;
            }
    }
}
export default Navbutton;