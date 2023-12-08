import './Navbutton.css';
import { ContentContext } from './App'
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
                        ArticleContent.ContentState.ContentTitle = 'BetterMediaKeys';
                        ArticleContent.ContentState.Content = <p className='Article'>{BetterMediaKeysDescription}</p>;
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
                        ArticleContent.ContentState.ContentTitle = 'GenericInput';
                        ArticleContent.ContentState.Content = <p className='Article'>{GenericInputDescription}</p>;
                        break;
                    }
                default:
                    {
                        window.document.title = 'TWeb | Dev';
                        ArticleContent.ContentState.ContentTitle = 'About';
                        ArticleContent.ContentState.Content = <p className='Article'>{SiteDescription}</p>;
                        document.body.style.setProperty('--main-article-margin', '25%');
                        document.body.style.setProperty('--main-article-text-alignment', 'center');
                        break;
                    }
            }
            ArticleContent.setContent({Content: ArticleContent.Content, ContentTitle: ArticleContent.ContentState.ContentTitle, 'theme': ArticleContent.ContentState.theme, 'UpdateImgLightArray': ArticleContent.ContentState.UpdateImgLightArray});
        }} >{props.name}</a>);
}

export default Navbutton;