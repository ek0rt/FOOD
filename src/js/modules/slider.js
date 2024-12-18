function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

let slideIndex = 1;
let offset = 0;

const slides = document.querySelectorAll(slide)
const prev = document.querySelector(prevArrow)
const slider = document.querySelector(container)
const next = document.querySelector(nextArrow)
const current = document.querySelector(currentCounter)
const total = document.querySelector(totalCounter)
const slidesWrapper = document.querySelector(wrapper)
const slidesInner = document.querySelector(field)
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

next.addEventListener('click', () => {

  if(offset == +width.slice(0, 3) * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += +width.slice(0, 3) ;
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
   offset = +width.slice(0, 3) * (slides.length - 1)
  } else {
    offset -= +width.slice(0, 3);
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

    offset = +width.slice(0, 3) * (slideIndex - 1)
    slidesInner.style.transform = `translateX(-${offset}px)`;
  
    showSlideIndex();

    dotsArray.forEach(item => {
      item.style.opacity = 0.5;
    })

    dotsArray[slideIndex - 1].style.opacity = 1;
  
  })
})
}

export default slider;