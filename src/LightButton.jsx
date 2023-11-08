import lightModeIcon from '/light_mode.svg'
import darkModeIcon from '/dark_mode.svg'
import terminalDarkIcon from '/terminal_dark.svg'
import terminalLightIcon from '/terminal_light.svg'
import './LightButton.css'
function LightButton(name, key)
{
    let Iconsrc = null;
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
                Iconsrc = lightModeIcon;
                document.body.style.setProperty('--main-bg-hovercolor', '#393939');
                document.body.style.setProperty('--main-hovertextColor', '#d3d3d3');
                document.body.style.setProperty('--main-scheme', 'dark');
                document.body.style.setProperty('--main-textColor', '#ffffff');
                break;
            }
            case 'light':
            {
                document.body.style.setProperty('--main-bg-color', '#ffffff');
                Iconsrc = darkModeIcon;
                document.body.style.setProperty('--main-bg-hovercolor', '#e2e2e2');
                document.body.style.setProperty('--main-hovertextColor', '#c5c5c5');
                document.body.style.setProperty('--main-scheme', 'light');
                document.body.style.setProperty('--main-textColor', '#131313');
                break;
            }
        }
    return (<input className='lightSwitch' type='image' src={Iconsrc} onClick={switchLightMode} alt={lightSwitchState} value={name} key={key}/>);
}
function switchLightMode(event)
{
    let terminalIcon = document.getElementsByClassName('terminalIcon')[0];
    switch (getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
      {
          case '#131313':
              {
                document.body.style.setProperty('--main-bg-color', '#ffffff');
                document.body.style.setProperty('--main-bg-hovercolor', '#e2e2e2');
                document.body.style.setProperty('--main-hovertextColor', '#c5c5c5');
                localStorage.setItem('lightSwitchState', 'light');
                event.target.src = darkModeIcon;
                event.target.alt = 'light';
                document.body.style.setProperty('--main-scheme', 'light');
                document.body.style.setProperty('--main-textColor', '#131313');
                if( (typeof terminalIcon  !== undefined) )
                {
                    terminalIcon.src = terminalLightIcon;
                }
                break;
              }
          case '#ffffff':
              {
                document.body.style.setProperty('--main-bg-color', '#131313');
                document.body.style.setProperty('--main-bg-hovercolor', '#393939');
                document.body.style.setProperty('--main-bg-hovertextColor', '#c5c5c5');
                localStorage.setItem('lightSwitchState', 'dark');
                event.target.alt = 'dark';
                event.target.src = lightModeIcon;
                document.body.style.setProperty('--main-scheme', 'dark');
                document.body.style.setProperty('--main-textColor', '#ffffff');
                if( (typeof terminalIcon  !== undefined) )
                {
                    terminalIcon.src = terminalDarkIcon;
                }
                break;
              }
                  
      }
}
export default LightButton