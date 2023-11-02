import React from 'react';
import lightModeIcon from '/light_mode.svg'
import darkModeIcon from '/dark_mode.svg'
import './LightButton.css'
function LightButton()
{
    let Icon = null;
    switch(getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
    {
        case '#131313':
            {
                Icon = lightModeIcon;
                document.body.style.setProperty('--main-bg-hovercolor', '#393939');
                break;
            }
        case '#ffffff':
            {
                Icon = darkModeIcon;
                document.body.style.setProperty('--main-bg-hovercolor', '#e2e2e2');
                break;
            }
                
    }
    return (<input className='lightSwitch' type='image' src={Icon} onClick={switchLightMode}/>);
}
function switchLightMode(event)
{
    const handleClick = (event) => {
        event.preventDefault();
      }
      let Icon = null;
      let InputElement = document.getElementsByClassName('lightSwitch')[0];
      switch(getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
      {
          case '#131313':
              {
                document.body.style.setProperty('--main-bg-color', '#ffffff');
                document.body.style.setProperty('--main-bg-hovercolor', '#e2e2e2');
                InputElement.src = darkModeIcon;
                break;
              }
          case '#ffffff':
              {
                document.body.style.setProperty('--main-bg-color', '#131313');
                document.body.style.setProperty('--main-bg-hovercolor', '#393939');
                InputElement.src = lightModeIcon;
                break;
              }
                  
      }
}
export default LightButton