import lightModeIcon from '/light_mode.svg'
import darkModeIcon from '/dark_mode.svg'
import './LightButton.css'
function LightButton()
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
function switchLightMode(event)
{
      switch (getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
      {
          case '#131313':
              {
                document.body.style.setProperty('--main-bg-color', '#ffffff');
                document.body.style.setProperty('--main-bg-hovercolor', '#e2e2e2');
                localStorage.setItem('lightSwitchState', 'light');
                event.target.src = darkModeIcon;
                document.body.style.setProperty('--main-scheme', 'light');
                document.body.style.setProperty('--main-textColor', '#131313');
                break;
              }
          case '#ffffff':
              {
                document.body.style.setProperty('--main-bg-color', '#131313');
                document.body.style.setProperty('--main-bg-hovercolor', '#393939');
                localStorage.setItem('lightSwitchState', 'dark');
                event.target.src = lightModeIcon;
                document.body.style.setProperty('--main-scheme', 'dark');
                document.body.style.setProperty('--main-textColor', '#ffffff');
                break;
              }
                  
      }
}
export default LightButton