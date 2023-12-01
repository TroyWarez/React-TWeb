import { __LightButton } from "./LightButton";
export function getLightState()
{
    if(__LightButton !== null)
    {
        return __LightButton.getLightState();
    }
    if (import.meta.env.DEV){
    console.warn('The light mode handler is not ready');
    }
    return null;
}
// This adds an icon to a list of image element that should be updated when the light button is clicked.
// LightSvgPath can be an img and also the light path should be a dark image and dark path should be a light image.
export function addLightImgElement(ElementName, LightImgSvgPath, DarkImgSvgPath)
{
    if(__LightButton !== null)
    {
        return __LightButton.addLightImgElement(ElementName, LightImgSvgPath, DarkImgSvgPath);
    }
    if (import.meta.env.DEV){
    console.warn('The light mode handler is not ready');
    }
    return null;
}