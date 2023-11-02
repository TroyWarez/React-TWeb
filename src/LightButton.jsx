import React from 'react';
import lightModeIcon from '/light_mode.svg'
import darkModeIcon from '/dark_mode.svg'
import './LightButton.css'
function LightButton()
{
    let Iconsrc = null;
    let lightSwitchState = null;
    if (typeof(Storage) !== "undefined") {
       lightSwitchState = localStorage.getItem('lightSwitchState');
       if(lightSwitchState === null)
       {
            localStorage.setItem('lightSwitchState', 'dark');
            lightSwitchState = 'dark';
       }
        switch (lightSwitchState)
        {
            case 'dark':
            {
                document.body.style.setProperty('--main-bg-color', '#131313');
                Iconsrc = lightModeIcon;
                document.body.style.setProperty('--main-bg-hovercolor', '#393939');
                document.body.style.setProperty('--main-scheme', 'dark');
                document.body.style.setProperty('--main-textColor', '#ffffff');
                break;
            }
            case 'light':
            {
                document.body.style.setProperty('--main-bg-color', '#ffffff');
                Iconsrc = darkModeIcon;
                document.body.style.setProperty('--main-bg-hovercolor', '#e2e2e2');
                document.body.style.setProperty('--main-scheme', 'light');
                document.body.style.setProperty('--main-textColor', '#131313');
                break;
            }
        }
        return (<input className='lightSwitch' type='image' src={Iconsrc} onClick={switchLightMode}/>);
    }
        switch (getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
        {
            case '#131313':
            {
                document.body.style.setProperty('--main-bg-color', '#131313');
                Iconsrc = lightModeIcon;
                document.body.style.setProperty('--main-bg-hovercolor', '#393939');
                document.body.style.setProperty('--main-scheme', 'light');
                document.body.style.setProperty('--main-textColor', '#ffffff');
                break;
            }
            case '#ffffff':
            {
                document.body.style.setProperty('--main-bg-color', '#ffffff');
                Iconsrc = darkModeIcon;
                document.body.style.setProperty('--main-bg-hovercolor', '#e2e2e2');
                document.body.style.setProperty('--main-scheme', 'dark');
                document.body.style.setProperty('--main-textColor', '#131313');
                break;
            }    
        }
    return (<input className='lightSwitch' type='image' src={Iconsrc} onClick={switchLightMode}/>);
}
function switchLightMode(event)
{
      let Icon = null;
      let InputElement = document.getElementsByClassName('lightSwitch')[0];
      switch(getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
      {
          case '#131313':
              {
                document.body.style.setProperty('--main-bg-color', '#ffffff');
                document.body.style.setProperty('--main-bg-hovercolor', '#e2e2e2');
                localStorage.setItem('lightSwitchState', 'light');
                InputElement.src = darkModeIcon;
                document.body.style.setProperty('--main-scheme', 'light');
                document.body.style.setProperty('--main-textColor', '#131313');
                break;
              }
          case '#ffffff':
              {
                document.body.style.setProperty('--main-bg-color', '#131313');
                document.body.style.setProperty('--main-bg-hovercolor', '#393939');
                localStorage.setItem('lightSwitchState', 'dark');
                InputElement.src = lightModeIcon;
                document.body.style.setProperty('--main-scheme', 'dark');
                document.body.style.setProperty('--main-textColor', '#ffffff');
                break;
              }
                  
      }
}
export default LightButton