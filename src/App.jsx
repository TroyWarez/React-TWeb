import Navbar from './Navbar'
import Article from './Article'
import './App.css';
import terminalDarkIcon from '/terminal_dark.svg'
import terminalLightIcon from '/terminal_light.svg'
function App() {
  let terminalIconSrc = '';
  switch (getComputedStyle(document.body).getPropertyValue('--main-bg-color'))
  {
      case '#131313':
          {
            if (typeof(Storage) !== "undefined") {
              let lightSwitchState = localStorage.getItem('lightSwitchState');
              if(lightSwitchState === 'dark')
              {
                terminalIconSrc = terminalDarkIcon;
              }
              else
              {
               terminalIconSrc = terminalLightIcon;
              }
              break;
           }
            terminalIconSrc = terminalDarkIcon;
            break;
          }
      case '#ffffff':
          {
            if (typeof(Storage) !== "undefined") {
              let lightSwitchState = localStorage.getItem('lightSwitchState');
              if(lightSwitchState === 'dark')
              {
                terminalIconSrc = terminalLightIcon;
              }
              else
              {
               terminalIconSrc = terminalDarkIcon;
              }
              break;
           }
            terminalIconSrc = terminalDarkIcon;
            break;
          }
              
  }

  return (
    <>
    <a href={window.location.origin} className='WebsiteTitle'><h1>Troy's Domain</h1></a>
    <a href={window.location.origin}><img src={terminalIconSrc} className='terminalIcon' alt='Terminal Icon'></img></a>
    <Navbar></Navbar>
    <Article></Article>
    </>
  )
}

export default App
