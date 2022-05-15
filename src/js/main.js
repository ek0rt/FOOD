window.addEventListener('DOMContentLoaded', () => {

// Tabs
let tabcontent = document.querySelectorAll('.tabcontent');
let tabItems = document.querySelectorAll('.tabheader__item');
let tabParent = document.querySelector('.tabheader__items');

function hideContent() {
    tabcontent.forEach(item => {
        item.classList.add('hide')
        item.classList.remove('show',  'fade')
    })

    tabItems.forEach(item => {
        item.classList.remove('tabheader__item_active');
    })

};

function showContent(i = 0) {
    tabcontent[i].classList.add('show', 'fade')
    tabcontent[i].classList.remove('hide')
    tabItems[i].classList.add('tabheader__item_active')

};

tabParent.addEventListener('click', (e) => {
    const target = e.target;

    if(target.classList.contains('tabheader__item')) {
        tabItems.forEach((item, i) => {
            if(target == item) {
                hideContent()
                showContent(i)
            }
        })
    }

})

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

  // Modal

  const modalTrigger = document.querySelectorAll('[data-modal');
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('[data-close');

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
 
  modalClose.addEventListener('click',  closeModal);

  document.addEventListener('keydown', (e) => {
    if(e.code == 'Escape') {
      closeModal();
    }
  });

  document.addEventListener('click', (e) => {
    if(modal == e.target) {
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

  new getCards(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
   9,
    '.menu .container',
 

  ).render();

  new getCards(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container",
    'menu__item',
).render();

new getCards(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container",
    'menu__item',
).render();

// Forms

const forms = document.querySelectorAll('form');
const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.appendChild(statusMessage);
    
        const request = new XMLHttpRequest();
        request.open('POST', '../server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    });
}






 
getElements('2022-05-11T00:43:06');
hideContent()
showContent()

});



