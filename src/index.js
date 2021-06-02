import './sass/main.scss';
import dishesMenu from './templates/menu.json';
import templateMenu from './templates/menu-card.hbs';


function createMenuMarkup(dishes) {
    return dishes.map(templateMenu).join('');
}

const markupGeneration = createMenuMarkup(dishesMenu);


// console.log(markupGeneration);

// console.log(dishesMenu);

const menuElements = document.querySelector('.js-menu');
menuElements.insertAdjacentHTML('beforeend', markupGeneration);


const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

// finding toggle and writing its state to localStorage
const toggleElem = document.querySelector('.theme-switch__toggle');
toggleElem.addEventListener('change', onToggleChange);

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    document.body.classList.add(savedTheme);
    if (savedTheme === Theme.DARK) {
    toggleElem.checked = true;
    }
    
} else {
  document.body.classList.add(Theme.LIGHT);
}


function onToggleChange() {
    if (toggleElem.checked) {
        document.body.classList.replace(Theme.LIGHT, Theme.DARK);
    localStorage.setItem('theme', Theme.DARK);
  }
  if (!toggleElem.checked) {
    document.body.classList.replace(Theme.DARK, Theme.LIGHT);
    localStorage.setItem('theme', Theme.LIGHT);
  }
}
