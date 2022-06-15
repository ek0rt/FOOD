import tabs from './modules/tabs';
import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    // const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 100);



tabs()
calculator()
cards()
forms()
modal('[data-modal]', '.modal')
slider()
timer()

});



