import { TPONG } from './TPONG';
import  { ContentContext } from './App'
import './Article.css';
import  { SiteDescription, BetterMediaKeysDescription, GenericInputDescription } from './Articles.js'
import { setManifestAndIcons } from './manifestSet.jsx'
import { useContext, useEffect } from 'react';
export default function Article() {
    const ArticleContent = useContext(ContentContext);
    switch(window.location.pathname)
    {
        case '/BetterMediaKeys':
            {
                window.document.title = 'TWeb | BetterMediaKeys';
                ArticleContent.ContentState.ContentTitle = 'BetterMediaKeys';
                ArticleContent.ContentState.Content = <p className='Article'>{BetterMediaKeysDescription}</p>;
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;
            }
        case '/GenericInput':
            {
                window.document.title = 'TWeb | GenericInput';
                ArticleContent.ContentState.ContentTitle = 'GenericInput';
                ArticleContent.ContentState.Content = <p className='Article'>{GenericInputDescription}</p>;
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;
            }
        case '/TPONG':
            {
                window.document.title = 'TWeb | TPONG';
                ArticleContent.ContentState.ContentTitle = 'TPONG';
                if (import.meta.env.DEV){
                    ArticleContent.ContentState.Content = <TPONG/>;
                }
                else
                {
                    ArticleContent.ContentState.Content = <TPONG/>;
                }
                document.body.style.setProperty('--main-gameControl-display', 'block');
                document.body.style.setProperty('--main-article-margin', '3%');
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/icons/TPONG/favicon.ico?v=2?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/icons/TPONG/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/icons/TPONG/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/icons/TPONG/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/icons/TPONG/safari-pinned-tab.svg?v=2'}}, {'manifest-apple-touch-icon-logo192' : {'href' : window.location.origin + '/icons/TPONG/logo192.png?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/TPONG-manifest.json?v=2'} }));
                break;
            }
        default:
            {
                window.document.title = 'TWeb | Dev';
                ArticleContent.ContentState.ContentTitle = 'About';
                ArticleContent.ContentState.Content = <p className='Article'>{SiteDescription}</p>;
                setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                break;
            }
    }
    useEffect(() => {
        window.addEventListener("popstate", function(){
            switch(window.location.pathname)
            {
                case '/BetterMediaKeys':
                    {
                        window.document.title = 'TWeb | BetterMediaKeys';
                        ArticleContent.ContentState.ContentTitle = 'BetterMediaKeys';
                        ArticleContent.ContentState.Content = <p className='Article'>{BetterMediaKeysDescription}</p>;
                        setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                        break;
                    }
                case '/GenericInput':
                    {
                        window.document.title = 'TWeb | GenericInput';
                        ArticleContent.ContentState.ContentTitle = 'GenericInput';
                        ArticleContent.ContentState.Content = <p className='Article'>{GenericInputDescription}</p>;
                        setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                        break;
                    }
                case '/TPONG':
                    {
                        window.document.title = 'TWeb | TPONG';
                        ArticleContent.ContentState.ContentTitle = 'TPONG';
                        document.body.style.setProperty('--main-article-margin', '3%');
                        if (import.meta.env.DEV){
                            ArticleContent.ContentState.Content = <TPONG gameSetup={null} bDebug={true}/>;
                        }
                        else
                        {
                            ArticleContent.ContentState.Content = <TPONG gameSetup={null} bDebug={false}/>
                        }
                        document.body.style.setProperty('--main-gameControl-display', 'block');
                        document.body.style.setProperty('--main-article-margin', '3%');
                        setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/icons/TPONG/favicon.ico?v=2?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/icons/TPONG/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/icons/TPONG/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/icons/TPONG/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/icons/TPONG/safari-pinned-tab.svg?v=2'}}, {'manifest-apple-touch-icon-logo192' : {'href' : window.location.origin + '/icons/TPONG/logo192.png?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/TPONG-manifest.json?v=2'} }));
                        break;
                    }
                default:
                    {
                        window.document.title = 'TWeb | Dev';
                        ArticleContent.ContentState.ContentTitle = 'About';
                        ArticleContent.ContentState.Content = <p className='Article'>{SiteDescription}</p>;
                        setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/safari-pinned-tab.svg?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/main-manifest.json?v=2'} }));
                        break;
                    }
            }
            ArticleContent.setContent({Content: ArticleContent.Content, ContentTitle: ArticleContent.ContentState.ContentTitle, 'theme': ArticleContent.ContentState.theme, 'UpdateImgLightArray': ArticleContent.ContentState.UpdateImgLightArray});
        });
    })
    return (
        <article className='Article'>
        <h2 className='ArticleTitle'>{ArticleContent.ContentState.ContentTitle}</h2>
        {ArticleContent.ContentState.Content}
       </article>
    )
}