//This should have new a path with matching id value pair: manifest-favicon.src = '\newIconPath.png'
export function setManifestAndIcons(newIconStrings)
{
    let IconManifestStrings = new Array('manifest-favicon', 'manifest-apple-touch', 'manifest-favicon-32x32', 'manifest-favicon-16x16', 'manifest-jsafari-pinned-tab', 'manifest-apple-touch-icon-logo192', 'manifest-main');
    IconManifestStrings.forEach(element => {
        let currentElement = document.getElementById(element);
        if(currentElement !== null)
            {
                let newIcon = newIconStrings.find(e => Object.keys(e)[0] === element);
                if(newIcon !== null)
                {
                    currentElement.href = newIcon[element].href
                }
            }
        });
 }