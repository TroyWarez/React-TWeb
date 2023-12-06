import  { ContentContext } from './App'
import './Footer.css';
import propTypes from 'prop-types';
import gitHubLightIcon from '/github-mark.svg'
import gitHubDarkIcon from '/github-mark-white.svg'
import { useContext } from 'react';
function Footer(props){
    const LightContent = useContext(ContentContext);
    let gitHubIconSrc = '';
    switch (LightContent.ContentState.theme)
    {
        case 'dark':
        {
            gitHubIconSrc = gitHubDarkIcon;
            break;
        }
        case 'light':
        {
            gitHubIconSrc = gitHubLightIcon;
            break;
        }
        default:
        {
            gitHubIconSrc = '';
            break;
        }
    }
    if(LightContent.ContentState.UpdateImgLightArray.findIndex((e) => (e.ElementName === 'githubIcon')) === -1)
    {
        LightContent.ContentState.UpdateImgLightArray.push({'ElementName' : 'githubIcon', 'LightSvgPath' : gitHubLightIcon, 'DarkSvgPath' : gitHubDarkIcon});
    }
    return (<footer className='Footer'><a href="https://www.github.com/TroyWarez"><img className='githubIcon' src={gitHubIconSrc} width='48' height='48' alt='GitHub'/></a><p>{props.children}</p> <a></a><p>Copyleft © {new Date().getFullYear()}</p></footer>);
}
Footer.propTypes = {
    children: propTypes.string
  };
export default Footer;