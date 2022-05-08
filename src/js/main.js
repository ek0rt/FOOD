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
    btn.addEventListener('click', openModal
    )
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





  

 
getElements('2022-05-11T00:43:06');
hideContent()
showContent()

});



