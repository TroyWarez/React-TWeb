import './Navbutton.css';
import React from 'react';
function Navbutton(name, key)
{
    return ( <input className='Navbutton' type='button' onClick={NavButtonOnClick} value={name} key={key}></input>);
}
function NavButtonOnClick(event)
{

}
export default Navbutton;