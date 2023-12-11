import  { ContentContext } from './App'
import lightModeIcon from '/light_mode.svg'
import darkModeIcon from '/dark_mode.svg'
import terminalDarkIcon from '/terminal_dark.svg'
import terminalLightIcon from '/terminal_light.svg'
import { DarkShade, DarkHoverShade, DarkTextHoverShade, LightShade, LightHoverShade, LightTextHoverShade } from './Shades'
import './LightButton.css'
import { useState, useContext} from 'react'
function LightButton()
{
    let lightType = '';
    const LightContent = useContext(ContentContext);
    const [lightState, setLightState] = useState({ 'blocalStorage' : (typeof(Storage) !== 'undefined') ? true : false, 'Iconsrc' : null, 'lightSwitchState': null});
    switch (getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
    {
        case DarkShade:
        {
            lightType = 'dark';
            break;
        }
        case LightShade:
        {
            lightType = 'light';
            break;
        }
        default:
        {
            lightType = 'dark';
            if (import.meta.env.DEV){
            console.warn('Warning: \'--main-bg-color\' unknown css color data: ' + getComputedStyle(document.body).getPropertyValue('--main-bg-color'));
            }
            break;
        }
    }
    if (lightState.blocalStorage === true) {
        let savedlightType = localStorage.getItem('lightSwitchState');
        if(savedlightType !== 'dark' && savedlightType !== 'light' ) {
            localStorage.setItem('lightSwitchState', lightType);
            savedlightType = lightType;
        }
        lightType = savedlightType;
    }
        switch (lightType)
            {
                case 'dark':
                {
                    document.body.style.setProperty('--main-bg-color', DarkShade);
                    lightState.Iconsrc = lightModeIcon;
                    LightContent.ContentState.theme = 'dark';
                    document.body.style.setProperty('--main-bg-hovercolor', DarkHoverShade);
                    document.body.style.setProperty('--main-hovertextColor', DarkTextHoverShade);
                    document.body.style.setProperty('--main-scheme', 'dark');
                    document.body.style.setProperty('--main-textColor', LightShade);
                    break;
                }
                case 'light':
                {
                    document.body.style.setProperty('--main-bg-color', LightShade);
                    lightState.Iconsrc = darkModeIcon;
                    LightContent.ContentState.theme = 'light';
                    document.body.style.setProperty('--main-bg-hovercolor', LightHoverShade);
                    document.body.style.setProperty('--main-hovertextColor', LightTextHoverShade);
                    document.body.style.setProperty('--main-scheme', 'light');
                    document.body.style.setProperty('--main-textColor', DarkShade);
                    break;
                }
            }
            return (<input className='lightSwitch' id='lightSwitch' type='image' value={{lightState, setLightState}} src={lightState.Iconsrc} onClick={(event, optionalBgColor) =>
                {
                let bgColor = getComputedStyle(document.body).getPropertyValue('--main-bg-color');
                let targetElement = event.target;
                
                if(bgColor === '')
                {
                    bgColor = DarkShade;
                }
                
                if(typeof optionalBgColor !== 'undefined' && optionalBgColor !== '')
                { 
                    bgColor = optionalBgColor;
                }
                
                switch (bgColor)
                {
                    case DarkShade:
                        {
                          document.body.style.setProperty('--main-bg-color', LightShade);
                          document.body.style.setProperty('--main-bg-hovercolor', LightHoverShade);
                          document.body.style.setProperty('--main-hovertextColor', LightTextHoverShade);
                          if(lightState.blocalStorage === true)
                          {
                              localStorage.setItem('lightSwitchState', 'light');
                          }
                          LightContent.ContentState.UpdateImgLightArray.forEach((ImgElementData) => {
                            let ImgElements = document.getElementsByClassName(ImgElementData.ElementName);
                            if(typeof ImgElements[0] !== 'undefined')
                            {
                                Array.from(ImgElements).forEach((lightElement) => {
                                    lightElement.src = ImgElementData.LightSvgPath;
                                });
                            }
                            else
                            {
                                let ImgElement = document.getElementById(ImgElementData.ElementName);
                                if(ImgElement !== null)
                                {
                                    ImgElement.src = ImgElementData.LightSvgPath;
                                }
                            }
                          });
                          targetElement.alt = 'Light';
                          targetElement.src = darkModeIcon;
                          document.body.style.setProperty('--main-scheme', 'light');
                          document.body.style.setProperty('--main-textColor', DarkShade);
                          lightState.Iconsrc = terminalLightIcon;
                          break;
                        }
                    case LightShade:
                        {
                          document.body.style.setProperty('--main-bg-color', DarkShade);
                          document.body.style.setProperty('--main-bg-hovercolor', DarkHoverShade);
                          document.body.style.setProperty('--main-bg-hovertextColor', LightTextHoverShade);
                          LightContent.ContentState.UpdateImgLightArray.forEach((ImgElementData) => {
                            let ImgElements = document.getElementsByClassName(ImgElementData.ElementName);
                            if(typeof ImgElements[0] !== 'undefined')
                            {
                                Array.from(ImgElements).forEach((lightElement) => {
                                    lightElement.src = ImgElementData.DarkSvgPath;
                                });
                            }
                            else
                            {
                                let ImgElement = document.getElementById(ImgElementData.ElementName);
                                if(ImgElement !== null)
                                {
                                    ImgElement.src = ImgElementData.DarkSvgPath;
                                }
                            }
                          });
                          if(lightState.blocalStorage === true)
                          {
                              localStorage.setItem('lightSwitchState', 'dark');
                          }
                          targetElement.alt = 'Dark';
                          targetElement.src = lightModeIcon;
                          document.body.style.setProperty('--main-scheme', 'dark');
                          document.body.style.setProperty('--main-textColor', LightShade);
                          lightState.Iconsrc = terminalDarkIcon;
                          break;
                        }
                }   
                }} alt='LightSwitch'/>);
}
export default LightButton