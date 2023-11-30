import './Footer.css';
import propTypes from 'prop-types';
import gitHubDarkIcon from '/github-mark.svg'
import gitHubLightIcon from '/github-mark-white.svg'
import { getLightState, addLightImgElement } from './LightHandler'
function Footer(props){

    let gitHubIconSrc = '';
    switch (getLightState())
    {
        case 'dark':
        {
            gitHubIconSrc = gitHubLightIcon;
            break;
        }
        case 'light':
        {
            gitHubIconSrc = gitHubDarkIcon;
            break;
        }
        default:
        {
            gitHubIconSrc = '';
            break;
        }
    }
    addLightImgElement('githubIcon', gitHubDarkIcon, gitHubLightIcon);

    let currentDate = new Date;
    return (<footer className='Footer'><a href="https://www.github.com/TroyWarez"><img className='githubIcon' src={gitHubIconSrc} width='48' height='48' alt='GitHub'/></a><p>{props.children}</p> <a></a><p>Copyleft © {new Date().getFullYear()}</p></footer>);
}
Footer.propTypes = {
    children: propTypes.string
  };
export default Footer;