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