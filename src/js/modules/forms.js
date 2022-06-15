import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  
  const message = {
      loading: 'img/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
  };
  
  forms.forEach(item => {
    bindPostData(item);
  });

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
  
    openModal('.modal', modalTimerId);
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
      closeModal('.modal');
      
    }, 3000);
  
  }
  
}

export default forms;