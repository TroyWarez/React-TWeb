import lightModeIcon from '/light_mode.svg'
import darkModeIcon from '/dark_mode.svg'
import terminalDarkIcon from '/terminal_dark.svg'
import terminalLightIcon from '/terminal_light.svg'
import { DarkShade, DarkHoverShade, DarkTextHoverShade, LightShade, LightHoverShade, LightTextHoverShade } from './Shades'
import './LightButton.css'
class LightModeHandler
{
    constructor(name, key)
    {
        this.blocalStorage = false;
        this.Iconsrc = null;
        this.lightSwitchState = null;
        this.UpdateList = new Array;
        if (typeof(Storage) !== 'undefined') {
            this.blocalStorage = true;
        }
        switch (this.getLightState())
            {
                case 'dark':
                {
                    document.body.style.setProperty('--main-bg-color', DarkShade);
                    this.Iconsrc = lightModeIcon;
                    document.body.style.setProperty('--main-bg-hovercolor', DarkHoverShade);
                    document.body.style.setProperty('--main-hovertextColor', DarkTextHoverShade);
                    document.body.style.setProperty('--main-scheme', 'dark');
                    document.body.style.setProperty('--main-textColor', LightShade);
                    break;
                }
                case 'light':
                {
                    document.body.style.setProperty('--main-bg-color', LightShade);
                    this.Iconsrc = darkModeIcon;
                    document.body.style.setProperty('--main-bg-hovercolor', LightHoverShade);
                    document.body.style.setProperty('--main-hovertextColor', LightTextHoverShade);
                    document.body.style.setProperty('--main-scheme', 'light');
                    document.body.style.setProperty('--main-textColor', DarkShade);
                    break;
                }
            }
            this.lightButton = <input className='lightSwitch' id='lightSwitch' type='image' src={this.Iconsrc} onClick={this.switchLightMode.bind(this)} alt={this.lightSwitchState} value={name} key={key}/>
    }
    getLightButton()
    {
        return this.lightButton;
    }
    getLightState()
    {
        switch (getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
        {
            case DarkShade:
            {
                this.lightSwitchState = 'dark';
                break;
            }
            case LightShade:
            {
                this.lightSwitchState = 'light';
                break;
            }
            default:
            {
                this.lightSwitchState = 'dark';
                console.warn('Warning: \'--main-bg-color\' unknown css color data: ' + getComputedStyle(document.body).getPropertyValue('--main-bg-color'));
                break;
            }
        }
        if (this.blocalStorage === true) {
            this.lightSwitchState = localStorage.getItem('lightSwitchState');
            if(this.lightSwitchState === null) {
                localStorage.setItem('lightSwitchState', this.lightSwitchState);
            }
        }
        return this.lightSwitchState;
    }
    switchLightMode(event, optionalBgColor)
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
        targetElement = this.lightButton;
    }

    switch (bgColor)
    {
        case DarkShade:
            {
              document.body.style.setProperty('--main-bg-color', LightShade);
              document.body.style.setProperty('--main-bg-hovercolor', LightHoverShade);
              document.body.style.setProperty('--main-hovertextColor', LightTextHoverShade);
              if(this.blocalStorage === true)
              {
                  localStorage.setItem('lightSwitchState', 'light');
              }
            this.UpdateList.forEach((ImgElementData) => {
                let ImgElement = document.getElementsByClassName(ImgElementData.className)[0];
                if(typeof ImgElement !== 'undefined')
                {
                    ImgElement.src = ImgElementData.LightSvgPath;
                }
              });
              targetElement.alt = 'Light';
              targetElement.src = darkModeIcon;
              document.body.style.setProperty('--main-scheme', 'light');
              document.body.style.setProperty('--main-textColor', DarkShade);
              this.lightButton = terminalLightIcon;
              break;
            }
        case LightShade:
            {
              document.body.style.setProperty('--main-bg-color', DarkShade);
              document.body.style.setProperty('--main-bg-hovercolor', DarkHoverShade);
              document.body.style.setProperty('--main-bg-hovertextColor', LightTextHoverShade);
            this.UpdateList.forEach((ImgElementData) => {
                let ImgElement = document.getElementsByClassName(ImgElementData.className)[0];
                if(typeof ImgElement !== 'undefined')
                {
                    ImgElement.src = ImgElementData.DarkSvgPath;
                }
              });
              if(this.blocalStorage === true)
              {
                  localStorage.setItem('lightSwitchState', 'dark');
              }
              targetElement.alt = 'Dark';
              targetElement.src = lightModeIcon;
              document.body.style.setProperty('--main-scheme', 'dark');
              document.body.style.setProperty('--main-textColor', LightShade);
              this.lightButton = terminalDarkIcon;
              break;
            }
    }   
    }
    addLightImgElement(className, LightSvgPath, DarkSvgPath)
    {
        let ImgElementData = {className : className, LightSvgPath : LightSvgPath, DarkSvgPath : DarkSvgPath,};
        if(typeof className !== 'undefined' && className !== '' && (this.UpdateList.some(item => (item.className === className) && (item.LightSvgPath === LightSvgPath) && (item.DarkSvgPath === DarkSvgPath)) === false))
        {
            this.UpdateList.push(ImgElementData);
            return this.UpdateList.length;
        }
        return null;
    }
}
export let __LightButton = null;
function LightButton(name, key)
{
    if(__LightButton === null)
    {
        __LightButton = new LightModeHandler(name, key); 
    }
    return __LightButton.getLightButton();
}
export default LightButton