import { TPONG } from './TPONG';
import  { ContentContext } from './App'
import controllerDarkIcon from '/Controller_dark.svg'
import controllerLightIcon from '/Controller_light.svg'
import './Article.css';
import  { SiteDescription, BetterMediaKeysDescription, GenericInputDescription } from './Articles.js'
import { setManifestAndIcons } from './manifestSet.jsx'
import { useContext, useLayoutEffect } from 'react';
export default function Article() {
    const ArticleContent = useContext(ContentContext);
    switch(window.location.pathname)
    {
        case '/BetterMediaKeys':
            {
                window.document.title = 'TWeb | BetterMediaKeys';
                document.body.style.setProperty('--main-article-text-alignment', 'center');
                ArticleContent.ContentState.Content = <article className='Article'>{BetterMediaKeysDescription}</article>;
                ArticleContent.ContentState.ContentTitle = 
                (<>
                <a href='https://github.com/TroyWarez/BetterMediaKeys'><img alt='BetterMediaKeysIcon' className='ArticleTitle' src='/BetterMediaKeysLogo.svg' width='128px' height='64px'/></a>
                <b className='ArticleTitle'>{'BetterMediaKeys'}</b>
                </>);
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;
            }
        case '/GenericInput':
            {
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
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;
            }
        case '/TPONG':
            {
                window.document.title = 'TWeb | TPONG';
                ArticleContent.ContentState.ContentTitle = <b className='ArticleTitle'>{'TPONG'}</b>;
                if (import.meta.env.DEV){
                    ArticleContent.ContentState.Content = <TPONG gameSetup={null} bDebug={true}/>;
                }
                else
                {
                    ArticleContent.ContentState.Content = <TPONG gameSetup={null} bDebug={true}/>;
                }
                document.body.style.setProperty('--main-gameControl-display', 'block');
                document.body.style.setProperty('--main-gameControl-display-alt', 'block');
                document.body.style.setProperty('--main-article-margin', '3%');
                document.body.style.setProperty('--main-article-text-alignment', 'justify');
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/icons/TPONG/favicon.ico?v=2?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/icons/TPONG/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/icons/TPONG/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/icons/TPONG/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/icons/TPONG/safari-pinned-tab.svg?v=2'}}, {'manifest-apple-touch-icon-logo192' : {'href' : window.location.origin + '/icons/TPONG/logo192.png?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/TPONG-manifest.json?v=2'} }));
                break;
            }
        default:
            {
                window.document.title = 'TWeb | Dev';
                ArticleContent.ContentState.ContentTitle = <b className='ArticleTitle'>{'About'}</b>;
                ArticleContent.ContentState.Content = <article className='Article'>{SiteDescription}</article>;
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;
            }
    }
    useLayoutEffect(() => {
        window.addEventListener("popstate", function(){
            switch(window.location.pathname)
            {
                case '/BetterMediaKeys':
                    {
                        window.document.title = 'TWeb | BetterMediaKeys';
                        document.body.style.setProperty('--main-article-text-alignment', 'center');
                        ArticleContent.ContentState.Content = <article className='Article'>{BetterMediaKeysDescription}</article>;
                        ArticleContent.ContentState.ContentTitle = 
                        (<>
                        <a href='https://github.com/TroyWarez/BetterMediaKeys'><img alt='BetterMediaKeysIcon' className='ArticleTitle' src='/BetterMediaKeysLogo.svg' width='128px' height='64px'/></a>
                        <b className='ArticleTitle'>{'BetterMediaKeys'}</b>
                        </>);
                        setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                        break;
                    }
                case '/GenericInput':
                    {
                        window.document.title = 'TWeb | GenericInput';
                        document.body.style.setProperty('--main-article-text-alignment', 'center');
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
                        setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                        break;
                    }
                case '/TPONG':
                    {
                        window.document.title = 'TWeb | TPONG';
                        ArticleContent.ContentState.ContentTitle = <b className='ArticleTitle'>TPONG</b>;
                        if (import.meta.env.DEV){
                            ArticleContent.ContentState.Content = <TPONG/>;
                        }
                        else
                        {
                            ArticleContent.ContentState.Content = <TPONG/>;
                        }
                        document.body.style.setProperty('--main-gameControl-display', 'block');
                        document.body.style.setProperty('--main-gameControl-display-alt', 'block');
                        document.body.style.setProperty('--main-article-margin', '3%');
                        document.body.style.setProperty('--main-article-text-alignment', 'justify');
                        setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/icons/TPONG/favicon.ico?v=2?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/icons/TPONG/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/icons/TPONG/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/icons/TPONG/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/icons/TPONG/safari-pinned-tab.svg?v=2'}}, {'manifest-apple-touch-icon-logo192' : {'href' : window.location.origin + '/icons/TPONG/logo192.png?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/TPONG-manifest.json?v=2'} }));
                        break;
                    }
                default:
                    {
                        window.document.title = 'TWeb | Dev';
                        ArticleContent.ContentState.ContentTitle = <b className='ArticleTitle'>{'About'}</b>;
                        ArticleContent.ContentState.Content = <article className='Article'>{SiteDescription}</article>;
                        document.body.style.setProperty('--main-article-text-alignment', 'center');
                        setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                        break;
                    }
            }
            ArticleContent.setContent({Content: ArticleContent.Content, ContentTitle: ArticleContent.ContentState.ContentTitle, 'theme': ArticleContent.ContentState.theme, 'UpdateImgLightArray': ArticleContent.ContentState.UpdateImgLightArray});
        });
    })
    return (
        <article className='Article'>
        {ArticleContent.ContentState.ContentTitle}
        {ArticleContent.ContentState.Content}
       </article>
    )
}