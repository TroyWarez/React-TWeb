import terminalDarkIcon from '/terminal_dark.svg'
import terminalLightIcon from '/terminal_light.svg'
import { setManifestAndIcons } from './manifestSet'
import './Homebutton.css'
import  { SiteDescription } from './Articles.js'
import { useContext } from 'react'
import propTypes from 'prop-types';
import { ContentContext } from './App'
Homebutton.propTypes = {
    name : propTypes.string
};
function Homebutton(props)
{
    const ArticleContent = useContext(ContentContext);
    if(ArticleContent.ContentState.UpdateImgLightArray.findIndex((e) => (e.ElementName == 'terminalIcon')) === -1)
    {
        ArticleContent.ContentState.UpdateImgLightArray.push({'ElementName' : 'terminalIcon', 'LightSvgPath' : terminalLightIcon, 'DarkSvgPath' : terminalDarkIcon});
    }

    let terminalIconSrc = '';
    switch (ArticleContent.ContentState.theme)
    {
        case 'dark':
        {
            terminalIconSrc = terminalDarkIcon;
            break;
        }
        case 'light':
        {
            terminalIconSrc = terminalLightIcon;
            break;
        }
        default:
        {
            terminalIconSrc = '';
            break;
        }
    }
    return (<a href={window.location.origin}   onClick={(e) => {
        e.preventDefault();
        if(window.location.pathname !== '/')
        {
            window.history.pushState(window.location.origin, '', '/');
            document.body.style.setProperty('--main-article-text-alignment', 'center');
            setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
        }
        window.document.title = 'TWeb | Dev';
        ArticleContent.ContentState.ContentTitle = 'About';
        ArticleContent.ContentState.Content = <p className='Article'>{SiteDescription}</p>;
        ArticleContent.setContent({Content: ArticleContent.Content, ContentTitle: ArticleContent.ContentState.ContentTitle, 'theme': ArticleContent.ContentState.theme, 'UpdateImgLightArray': ArticleContent.ContentState.UpdateImgLightArray});
      }} className='WebsiteTitle'><h1><img className='terminalIcon' src={terminalIconSrc} alt='Terminal Icon' ></img>{props.name}</h1></a>);
}
export default Homebutton;