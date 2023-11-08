import './Navbutton.css';
import React from 'react';
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
                }
                break;
            }
        case 'GenericInput':
            {
                if(window.location.pathname !== '/GenericInput')
                {
                    window.history.pushState('GenericInput', '', '/GenericInput');
                }
                break;
            }
        case 'TPONG':
            {
                if(window.location.pathname !== '/TPONG')
                {
                    window.history.pushState('TPONG', '', '/TPONG');
                }
                break;
            }
    }
}
export default Navbutton;