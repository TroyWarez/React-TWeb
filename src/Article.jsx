import React, { useState } from 'react';
import './Article.css';
let currentArticle = '';
import  { BetterMediaKeysDescription, GenericInputDescription, TPONGDesciption } from './Articles.js'
function Article() {
    switch(window.location.pathname)
    {
        case '/BetterMediaKeys':
            {
                currentArticle = BetterMediaKeysDescription;
                break;
            }
        case '/GenericInput':
            {
                currentArticle = GenericInputDescription;
                break;
            }
        case '/TPONG':
            {
                currentArticle = TPONGDesciption;
                break;
            }
        default:
            {
                currentArticle = '';
                break;
            }
    }
    return (
       <p className='Article'>
       {currentArticle}
       </p>
    )
}
  export default Article