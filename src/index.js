import './sass/main.scss';
var debounce = require('lodash.debounce');
import templateCountryCard from './templates/country-card.hbs';
import templateCountryList from './templates/country-drop-list.hbs';
import getRefs from './js/get-refs';
import API from './js/fetchCountries';

import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/mobile/dist/PNotifyMobile.css';


const refs = getRefs();

refs.searchQuery.addEventListener('input', debounce(onInput, 500));
function onInput(e) {
    const searchQueryValue = e.target.value;  //;form.elements.query.value
    console.log(searchQueryValue);
    refs.countryContainer.innerHTML = ''; //clear the markup
    API.fetchCountries(searchQueryValue)
        .then(data => {

            if (data.status === 404) {
                pNotyfyMassage('Nothing was found for your query!')
            }
            else if (data.length > 10) {
                pNotyfyMassage('Too many matches found. Please enter more specific query!');
            }
            else if (data.length === 1) {
              console.log('data1:', data);
                const countryMarkup = createCardMarkup(data);
                refs.countryContainer.insertAdjacentHTML('beforeend', countryMarkup);
                refs.searchQuery.value = '';
            }
            else if (1 < data.length < 10) {
              console.log('data10:', data);
                const contryDropListMarkup = createCountryDropList(data);
                refs.countryContainer.insertAdjacentHTML('beforeend', contryDropListMarkup);

            }
        }).catch(onError)
        .finally(() => refs.searchQuery = '');
};

function createCountryDropList(data) {
  return templateCountryList(data);  
};


function createCardMarkup(data) {
    return templateCountryCard(data);
}


function onError(error) {
    pNotyfyMassage(error);
    //console.log(error);
};

function pNotyfyMassage(message) {
    error ({
            title: `${message}`,
            delay: 2000,
        });
}
