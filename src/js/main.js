import tabs from './modules/tabs';
import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal, { openModal } from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
    
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);


    console.log(modalTimerId)


tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')
calculator()
cards()
forms('form', modalTimerId)
modal('[data-modal]', '.modal', modalTimerId)
slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
})
timer('.timer', '2022-07-11T00:43:06')

});

