/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ ((module) => {

function calc() {

  // Calc


  let result = document.querySelector('.calculating__result span')
    
  let weight, height, sex = 'female', ratio = 1.375, age;

  if(localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    localStorage.setItem('sex', 'female');
  }

  if(localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('data-ratio');
  } else {
    localStorage.setItem('ratio', 1.375);
  }

  function setLocalInfo(selector, activeClass) {
    let elements = document.querySelectorAll(selector);

    elements.forEach(item => {
      item.classList.remove(activeClass);
      if(item.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
        item.classList.add(activeClass)
      }
      if(item.getAttribute('id') == localStorage.getItem('sex')) {
        item.classList.add(activeClass)
      }
    })
  }

  setLocalInfo('.calculating__choose_big div', 'calculating__choose-item_active');
  setLocalInfo('#gender div', 'calculating__choose-item_active');

  function calcTotal() {

    if(!weight || !height || !sex || !ratio || !age) {
      result.textContent = '_______';
      return;
    }

    if(sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
    }
  }

  function calrSystalicInfo(selector, activeClass) {
    let elements = document.querySelectorAll(selector);

    elements.forEach(item => {
      item.addEventListener('click', (e) => {
        if(e.target.getAttribute('data-ratio')) {
          ratio = e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));

        }

        elements.forEach(item => {
          item.classList.remove(activeClass)
        })

        e.target.classList.add(activeClass);
        calcTotal()
      })


    })
  }

  function calcDymanicInfo(selector) {
    let input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if(input.value.match(/\D/g)) {
        input.style.border = '2px solid red';
      } else {
        input.style.border = 'none';

      }
      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break
        case 'age':
          age = +input.value;
          break
      }
      calcTotal()
    })

    input.addEventListener('click', () => {
      console.log(weight, height, age)
    })
  }

  calcDymanicInfo('#age')
  calcDymanicInfo('#height')
  calcDymanicInfo('#weight')

calrSystalicInfo('.calculating__choose_big div', 'calculating__choose-item_active');
calrSystalicInfo('#gender div', 'calculating__choose-item_active');
}

module.exports = calc;

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((module) => {

function cards() {
  // Используем классы для карточек


  class getCards {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.transfer = 27;
      this.parent = document.querySelector(parentSelector);
      this.changeCurrency()
    }
    changeCurrency() {
      this.price = +this.transfer * this.price;
    }
    render() {
      const element = document.createElement('div');
      if(this.classes.length === 0) {
        element.classList.add('menu__item');
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  async function getInfo(url) {
    const res = await fetch(url)

    if(!res.ok) {
      throw new Error(`Error: ${res.status}`)
    }

    return await res.json();
  } 

  axios.get('http://localhost:3000/menu')
  .then(data => {
    data.data.forEach(({img, altimg, title, descr, price}) => {
      new getCards(img, altimg, title, descr, price, '.menu .container').render();
    })
  })
};

module.exports = cards;

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((module) => {

function forms() {

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
  bindPostData(item);
});

async function postData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json; charset=utf-8'},
      body: data,
    })
    return await res.json();
  }

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
          display: block;
          margin: auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);
    
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()))

     
        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success)
            statusMessage.remove();
        }).catch(() => {
              showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        })
    });
}

function showThanksModal(message) {
  let prevModalDialog = document.querySelector('.modal__dialog');
  prevModalDialog.classList.add('hide');

  openModal();
  let thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
    <div class="modal__content">
    <div data-close class="modal__close">×</div>
    <div data-modal="" class="modal__title">${message}</div>
    </div>
  `;

  document.querySelector('.modal').append(thanksModal);

  setTimeout(() => {
    thanksModal.remove();
    thanksModal.classList.remove('show');
    prevModalDialog.classList.remove('hide');
    prevModalDialog.classList.add('show');
    closeModal();
    
  }, 3000);

}
}

module.exports = forms;

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((module) => {

function modal() {

//   // Modal

const modalTrigger = document.querySelectorAll('[data-modal');
const modal = document.querySelector('.modal');

modalTrigger.forEach(btn => {
  btn.addEventListener('click', openModal);
}
);

function openModal() {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  // clearInterval(modalTimerId);
}

// const modalTimerId = setTimeout(openModal, 3000);

function closeModal() {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}


document.addEventListener('keydown', (e) => {
  if(e.code == 'Escape') {
    closeModal();
  }
});

document.addEventListener('click', (e) => {
  if(modal == e.target || e.target.getAttribute('data-close') =='' ) {
    closeModal();
  }
});

function showModalByScroll() {
  if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
  } 
}

window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((module) => {

function slider() {


// Slider 

let slideIndex = 1;
let offset = 0;

const slides = document.querySelectorAll('.offer__slide')
const prev = document.querySelector('.offer__slider-prev')
const slider = document.querySelector('.offer__slider')
const next = document.querySelector('.offer__slider-next')
const current = document.querySelector('#current')
const total = document.querySelector('#total')
const slidesWrapper = document.querySelector('.offer__slider-wrapper')
const slidesInner = document.querySelector('.offer__slider-inner')
const width = getComputedStyle(slidesInner).width

let dotsArray = [];

slider.style.position = 'relative';

let dots = document.createElement('ol');

dots.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`
slider.append(dots);

for(let i = 0; i < slides.length; i++) {
  let dot = document.createElement('li');
  dot.setAttribute('data-dot-point', i + 1);
  dot.style.cssText = `
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 6px;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: .5;
  transition: opacity .6s ease;
  `;
  dots.append(dot);
  if(i == 0) {
    dot.style.opacity = 1;
  };
  dotsArray.push(dot);
};



if ( slideIndex < 10) {
  current.textContent =  `0${slideIndex}`;
} else {
  current.textContent =  slideIndex;
}

if ( slides.length < 10) {
  total.textContent =  `0${slides.length}`;
} else {
  total.textContent =  slides.length;
}


slidesInner.style.width = 100 * slides.length + '%'

slides.forEach(item => {
  item.style.width = width;
});

slidesInner.style.display = 'flex';
slidesInner.style.transition = '0.5s all';
slidesWrapper.style.overflow = 'hidden';

function slidesPlus() {
  if (slideIndex == slides.length) {
    slideIndex = 1;
  } else {
    slideIndex++;
  }
  
  if (slideIndex < 10) {
    current.textContent =  `0${slideIndex}`;
  } else {
    current.textContent =  slideIndex;
  }
}

function slidesMinus() {
  if (slideIndex == 1) {
    slideIndex = slides.length;
} else {
    slideIndex--;
}

  if (slideIndex < 10) {
    current.textContent =  `0${slideIndex}`;
} else {
    current.textContent =  slideIndex;
}
}

function showSlideIndex() {
  if (slideIndex < 10) {
    current.textContent =  `0${slideIndex}`;
} else {
    current.textContent =  slideIndex;
}
}

function deletNotDigits(str) {
  return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => {

  if(offset == deletNotDigits(width) * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += deletNotDigits(width) ;
  }

  slidesInner.style.transform = `translateX(-${offset}px)`;

  slidesPlus();


  dotsArray.forEach(item => {
    item.style.opacity = 0.5;
  })

  dotsArray[slideIndex - 1].style.opacity = 1;


})

prev.addEventListener('click', () => {

  if(offset == 0) {
   offset = deletNotDigits(width) * (slides.length - 1)
  } else {
    offset -= deletNotDigits(width);
  }

  slidesInner.style.transform = `translateX(-${offset}px)`;

  slidesMinus();

  dotsArray.forEach(item => {
    item.style.opacity = 0.5;
  })

  dotsArray[slideIndex - 1].style.opacity = 1;

})

dotsArray.forEach(item => {
  item.addEventListener('click', (e) => {
    dotAtr = e.target.getAttribute('data-dot-point');

    slideIndex = dotAtr;

    offset = deletNotDigits(width) * (slideIndex - 1)
    slidesInner.style.transform = `translateX(-${offset}px)`;
  
    showSlideIndex();

    dotsArray.forEach(item => {
      item.style.opacity = 0.5;
    })

    dotsArray[slideIndex - 1].style.opacity = 1;
  
  })
})
}

module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((module) => {

function tabs() {
    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((module) => {

function timer() {
    // Timer

const deadline = '2022-05-05T00:43:40';

function getDifference(endtime) {
  let days, hours, minutes, seconds;
  const difference = Date.parse(endtime) - Date.parse(new Date());

  if(difference <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  } else {
     days = Math.floor( difference / (1000 * 60 * 60 * 24));
     hours = Math.floor( difference / (1000 * 60 * 60) % 24);
     minutes = Math.floor( difference / (1000 * 60) % 60);
     seconds = Math.floor( (difference / 1000) % 60);
  }

  return {
    total: difference,
    days,
    hours,
    minutes,
    seconds,
  }
}
  function getElements(endtime) {
    const days = document.querySelector('#days');
    const hours = document.querySelector('#hours');
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');
    const counter = setInterval(startTimer, 1000);

    function getZero(num) {
      if(num > 0 && num < 10) {
        return `0${num}`
      } else { return num }
    } ;

    startTimer() 
    function startTimer() {

      const difference = getDifference(endtime);

      days.textContent = getZero(difference.days);
      hours.textContent = getZero(difference.hours);
      minutes.textContent = getZero(difference.minutes);
      seconds.textContent = getZero(difference.seconds);

      if(difference.total <= 0) {
        clearInterval(counter);
      }
    }

    const box = document.querySelector('.tabcontainer');
    
  }
  getElements('2022-06-11T00:43:06');
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
window.addEventListener('DOMContentLoaded', () => {

const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
const calculator = __webpack_require__(/*! ./modules/calculator */ "./src/js/modules/calculator.js");
const cards = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
const forms = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
const modal = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
const slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
const timer = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");

tabs()
calculator()
cards()
forms()
modal()
slider()
timer()

});




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map