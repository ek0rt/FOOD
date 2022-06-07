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