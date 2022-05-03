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

hideContent()
showContent()



