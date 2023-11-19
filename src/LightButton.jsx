import lightModeIcon from '/light_mode.svg'
import darkModeIcon from '/dark_mode.svg'
import terminalDarkIcon from '/terminal_dark.svg'
import terminalLightIcon from '/terminal_light.svg'
import './LightButton.css'

// localStorage is where we store the users perfrences and we
class LightModeHandler
{
    constructor(name, key)
    {
        this.blocalStorage = false;
        this.Iconsrc = null;
        let lightSwitchState = null;
        switch (getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
        {
            case '#131313':
            {
                lightSwitchState = 'dark';
                break;
            }
            case '#ffffff':
            {
                lightSwitchState = 'light';
                break;
            }
            default:
            {
                lightSwitchState = 'dark';
                console.warn('Warning: \'--main-bg-color\' was not set correctly in localStorage');
                break;
            }
        }
        if (typeof(Storage) !== "undefined") {
        this.blocalStorage = true;
        lightSwitchState = localStorage.getItem('lightSwitchState');
        if(lightSwitchState === null)
           {
                localStorage.setItem('lightSwitchState', lightSwitchState);
           }
        }
    
        switch (lightSwitchState)
            {
                case 'dark':
                {
                    document.body.style.setProperty('--main-bg-color', '#131313');
                    this.Iconsrc = lightModeIcon;
                    document.body.style.setProperty('--main-bg-hovercolor', '#393939');
                    document.body.style.setProperty('--main-hovertextColor', '#d3d3d3');
                    document.body.style.setProperty('--main-scheme', 'dark');
                    document.body.style.setProperty('--main-textColor', '#ffffff');
                    break;
                }
                case 'light':
                {
                    document.body.style.setProperty('--main-bg-color', '#ffffff');
                    this.Iconsrc = darkModeIcon;
                    document.body.style.setProperty('--main-bg-hovercolor', '#e2e2e2');
                    document.body.style.setProperty('--main-hovertextColor', '#c5c5c5');
                    document.body.style.setProperty('--main-scheme', 'light');
                    document.body.style.setProperty('--main-textColor', '#131313');
                    break;
                }
            }
            this.lightButton = <input className='lightSwitch' id='lightSwitch' type='image' src={this.Iconsrc} onClick={this.switchLightMode.bind(this)} alt={lightSwitchState} value={name} key={key}/>
    }
    getLightButton()
    {
        return this.lightButton;
    }
    switchLightMode(event)
    {
    switch (getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
      {
          case '#131313':
              {
                document.body.style.setProperty('--main-bg-color', '#ffffff');
                document.body.style.setProperty('--main-bg-hovercolor', '#e2e2e2');
                document.body.style.setProperty('--main-hovertextColor', '#c5c5c5');
                if(this.blocalStorage === true)
                {
                    localStorage.setItem('lightSwitchState', 'light');
                }
                event.target.src = darkModeIcon;
                event.target.alt = 'Light';
                document.body.style.setProperty('--main-scheme', 'light');
                document.body.style.setProperty('--main-textColor', '#131313');
                this.lightButton = terminalLightIcon;
                break;
              }
          case '#ffffff':
              {
                document.body.style.setProperty('--main-bg-color', '#131313');
                document.body.style.setProperty('--main-bg-hovercolor', '#393939');
                document.body.style.setProperty('--main-bg-hovertextColor', '#c5c5c5');
                if(this.blocalStorage === true)
                {
                    localStorage.setItem('lightSwitchState', 'dark');
                }
                event.target.alt = 'Dark';
                event.target.src = lightModeIcon;
                document.body.style.setProperty('--main-scheme', 'dark');
                document.body.style.setProperty('--main-textColor', '#ffffff');
                this.lightButton = terminalDarkIcon;
                break;
              }
                  
      }
    }
}
let __LightButton = null;
function LightButton(name, key)
{
    if(__LightButton === null)
    {
        __LightButton = new LightModeHandler(name, key); 
    }
    return __LightButton.getLightButton();
}

export default LightButton