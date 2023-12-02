import { GameStart, EndGame } from './TPONG';
import { setManifestAndIcons } from './manifestSet'
import { ContentContext } from './App'
import { useContext } from 'react';
import propTypes from 'prop-types';
Gamebutton.propTypes = {
    name : propTypes.string
};
function Gamebutton(props)
{
    let GameContent = useContext(ContentContext);
    return (<a href={name} className='Navbutton' type='button' onClick={(event) =>
    {   
        event.preventDefault();
        switch (event.target.text)
        {
            case 'TPONG':
                {
                    if(window.location.pathname !== '/TPONG')
                    {
                        window.history.pushState('TPONG', '', '/TPONG');
                        window.document.title = 'TWeb | TPONG';
                        setManifestAndIcons(new Array({ 'manifest-favicon': {'href' : window.location.origin + '/icons/TPONG/favicon.ico?v=2'}}, {'manifest-apple-touch' : {'href' : window.location.origin + '/icons/TPONG/apple-touch-icon.png?v=2'}}, {'manifest-favicon-32x32': {'href' : window.location.origin + '/icons/TPONG/favicon-32x32.png?v=2'}}, {'manifest-favicon-16x16' : {'href' : window.location.origin + '/icons/TPONG/favicon-16x16.png?v=2'}}, {'manifest-jsafari-pinned-tab' : {'href' : window.location.origin + '/icons/TPONG/safari-pinned-tab.svg?v=2'}}, {'manifest-apple-touch-icon-logo192' : {'href' : window.location.origin + '/icons/TPONG/logo192.png?v=2'}}, {'manifest-main' : {'href' : window.location.origin + '/TPONG-manifest.json?v=2'} }));
                    }
                    EndGame();
                    if (import.meta.env.DEV){
                        GameContent.setContent({Content: GameStart(0, true), ContentTitle: GameContent.ContentState.ContentTitle, 'theme': GameContent.ContentState.theme, 'UpdateImgLightArray': GameContent.ContentState.UpdateImgLightArray});
                    }
                    else
                    {
                        GameContent.setContent({Content: GameStart(0, false), ContentTitle: GameContent.ContentState.ContentTitle, 'theme': GameContent.ContentState.theme, 'UpdateImgLightArray': GameContent.ContentState.UpdateImgLightArray});
                    }
                    GameContent.setContent({Content: GameStart(0, true), ContentTitle: GameContent.ContentState.ContentTitle, 'theme': GameContent.ContentState.theme, 'UpdateImgLightArray': GameContent.ContentState.UpdateImgLightArray});
                    break;
                }
        }}}>{props.name}</a>);
}
export default Gamebutton;