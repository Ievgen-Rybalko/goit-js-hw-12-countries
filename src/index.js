import './sass/main.scss';
var debounce = require('lodash.debounce');
import templateCountryCard from './templates/country-card.hbs';
import templateCountryList from './templates/country-drop-list.hbs';
import getRefs from './js/get-refs';
import API from './js/fetchCountries';

import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';


const refs = getRefs();

refs.searchQuery.addEventListener('input', debounce(onInput, 500));
function onInput(evt) {
    //console.log('evt',evt);
    //console.log('evt.target.value', evt.target.value);
    const searchQueryValue = evt.target.value;  //;form.elements.query.value
    
    refs.countryContainer.innerHTML = ''; //clear the markup
    
    if (inputIsValid(searchQueryValue)) {
        API.fetchCountries(searchQueryValue)
        .then(data => {
                
                console.log("data", data);
                console.log('data.length === 1', data.length === 1);
                if (data.length === 1) {
                    
                    const countryMarkup = createCardMarkup(data);
                    refs.countryContainer.insertAdjacentHTML('beforeend', countryMarkup);
                    refs.searchQuery.value = '';
                    return;
                }

                else if ((1 < data.length) && (data.length < 10)) {
                    
                    const contryDropListMarkup = createCountryDropList(data);
                    refs.countryContainer.insertAdjacentHTML('beforeend', contryDropListMarkup);
                    return;
                }

                else if (data.length > 10) {
                    error({
                        title: 'Too many matches found. Please enter more specific query!',
                        delay: 1500,
                    });
                }
                
        }).catch(onError);    
        
    };  
}

function createCountryDropList(data) {
  return templateCountryList(data);  
};


function createCardMarkup(data) {
  return templateCountryCard(data);
}


function onError(err) {
    error ({
        title: `${err}`,
        delay: 1500,
        });
}


//чтобы совсем очевидный непотреб не уходил на сервер:
function inputIsValid(input) {
    if (input === '') {
        return false;
    }
    //только буквы
    for (let j = 0; j < input.length; j += 1) {
        const i = input.charCodeAt(j);
        
        if ((i < 65)
            || ((i > 91) && (i < 97))
            || (i > 122)) {
            error({
                title: `Bad input:"${input}". Use letters only`,
                delay: 1500,
            })
            return false;
        }
    }
    return true; 
}