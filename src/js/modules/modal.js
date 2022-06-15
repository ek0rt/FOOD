
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    }

    function openModal(modalSelector, modalTimerId) {
        const modal = document.querySelector(modalSelector);

        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        console.log(modalTimerId);

        if(modalTimerId) {
            clearInterval(modalTimerId);
        }
    }


function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
  
    modalTrigger.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    }
    );
  
    document.addEventListener('keydown', (e) => {
      if(e.code == 'Escape') {
        closeModal(modalSelector, modalTimerId);
      }
    });
  
    document.addEventListener('click', (e) => {
      if(modal == e.target || e.target.getAttribute('data-close') =='' ) {
        closeModal(modalSelector, modalTimerId);
      }
    });
  
    function showModalByScroll() {
      if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
      } 
    }
  
    window.addEventListener('scroll', showModalByScroll);
}



export default modal;
export  {openModal};
export  {closeModal};
