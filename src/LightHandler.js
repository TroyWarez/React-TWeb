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
//This adds an icon to a list of image element that should be updated when the light button is clicked.
export function addLightImgElement(className, LightSvgPath, DarkSvgPath)
{
    if(__LightButton !== null)
    {
        return __LightButton.addLightImgElement(className, LightSvgPath, DarkSvgPath);
    }
    if (import.meta.env.DEV){
    console.warn('The light mode handler is not ready');
    }
    return null;
}