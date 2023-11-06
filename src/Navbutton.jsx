import React from 'react';
import './Navbutton.css'
function Navbutton(name)
{
    return ( <><p>{name}</p><input type='button' onClick={NavButtonOnClick}></input></>);
}
function NavButtonOnClick(event)
{

}
export default Navbutton;