import React, { useState } from 'react';
import './Article.css';
let currentArticle = '';
import  { BetterMediaKeysDescription, GenericInputDescription, TPONGDesciption } from './Articles.js'
function Article() {
    let title = '';
    switch(window.location.pathname)
    {
        case '/BetterMediaKeys':
            {
                title = 'BetterMediaKeys';
                currentArticle = BetterMediaKeysDescription;
                break;
            }
        case '/GenericInput':
            {
                title = 'GenericInput';
                currentArticle = GenericInputDescription;
                break;
            }
        case '/TPONG':
            {
                title = 'TPONG';
                currentArticle = TPONGDesciption;
                break;
            }
        default:
            {
                title = '';
                currentArticle = '';
                break;
            }
    }
    return (
        <article>
        <h2 className='ArticleTitle'>{title}</h2>
       <p className='Article'>
       {currentArticle}
       </p>
       </article>
    )
}
  export default Article