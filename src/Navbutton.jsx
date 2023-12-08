import './Navbutton.css';
import { ContentContext } from './App'
import controllerDarkIcon from '/Controller_dark.svg'
import controllerLightIcon from '/Controller_light.svg'
import { setManifestAndIcons } from './manifestSet'
import  { SiteDescription, BetterMediaKeysDescription, GenericInputDescription} from './Articles.js'
import { useContext } from 'react';
import propTypes from 'prop-types';
Navbutton.propTypes = {
    name : propTypes.string
};
function Navbutton(props)
{
    let ArticleContent = useContext(ContentContext);

    return (<a href={props.name} className='Navbutton' type='button' onClick={(event) =>
        {
            event.preventDefault(); //This prevents reloading the page.
            switch (event.target.text)
            {
                case 'BetterMediaKeys':
                    {
                        if(window.location.pathname !== '/BetterMediaKeys')
                        {
                            window.history.pushState('BetterMediaKeys', '', '/BetterMediaKeys');
                            setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                            document.body.style.setProperty('--main-article-margin', '25%');
                            document.body.style.setProperty('--main-article-text-alignment', 'center');
                        }
                        window.document.title = 'TWeb | BetterMediaKeys';
                        document.body.style.setProperty('--main-article-text-alignment', 'center');
                        ArticleContent.ContentState.Content = <article className='Article'>{BetterMediaKeysDescription}</article>;
                        ArticleContent.ContentState.ContentTitle = 
                        (<>
                        <a href='https://github.com/TroyWarez/BetterMediaKeys'></a><img alt='BetterMediaKeysIcon' className='ArticleTitle' src='/BetterMediaKeysLogo.svg' width='128px' height='64px'/>
                        <b className='ArticleTitle'>{'BetterMediaKeys'}</b>
                        </>);
                        break;
                    }
                case 'GenericInput':
                    {
                        if(window.location.pathname !== '/GenericInput')
                        {
                            window.history.pushState('GenericInput', '', '/GenericInput');
                            setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                            document.body.style.setProperty('--main-article-margin', '25%');
                            document.body.style.setProperty('--main-article-text-alignment', 'center');
                        }
                        window.document.title = 'TWeb | GenericInput';
                        document.body.style.setProperty('--main-article-text-alignment', 'center');
                        if(ArticleContent.ContentState.UpdateImgLightArray.findIndex((e) => (e.ElementName == 'controllerIcon')) === -1)
                        {
                            ArticleContent.ContentState.UpdateImgLightArray.push({'ElementName' : 'controllerIcon', 'LightSvgPath' : controllerLightIcon, 'DarkSvgPath' : controllerDarkIcon});
                        }
                        let ControllerIconPath = '';
                        switch (ArticleContent.ContentState.theme) {
                            case 'dark':
                                {
                                    ControllerIconPath = controllerDarkIcon;
                                    break;
                                }
                            case 'light':
                                {
                                    ControllerIconPath = controllerLightIcon;
                                    break;
                                }
                            default:
                                {
                                    ControllerIconPath = controllerDarkIcon;
                                    break;
                                }
                        }
                        ArticleContent.ContentState.ContentTitle = 
                        (<>
                        <a href='https://github.com/TroyWarez/GenericInput'><img alt='ControllerIcon' className='ArticleTitle' id='controllerIcon' src={ControllerIconPath} width='128px' height='64px'/></a>
                        <b className='ArticleTitle'>{'GenericInput'}</b>
                        </>);
                        ArticleContent.ContentState.Content = <article className='Article'>{GenericInputDescription}</article>;
                        break;
                    }
                default:
                    {
                        window.document.title = 'TWeb | Dev';
                        ArticleContent.ContentState.ContentTitle = <b className='ArticleTitle'>{'About'}</b>;
                        ArticleContent.ContentState.Content = <article className='Article'>{SiteDescription}</article>;
                        document.body.style.setProperty('--main-article-margin', '25%');
                        document.body.style.setProperty('--main-article-text-alignment', 'center');
                        break;
                    }
            }
            ArticleContent.setContent({Content: ArticleContent.Content, ContentTitle: ArticleContent.ContentState.ContentTitle, 'theme': ArticleContent.ContentState.theme, 'UpdateImgLightArray': ArticleContent.ContentState.UpdateImgLightArray});
        }} >{props.name}</a>);
}

export default Navbutton;