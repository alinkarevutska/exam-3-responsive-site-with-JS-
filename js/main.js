'use strict';
// ------smooth scroll to sections------

let linksHeader = document.querySelectorAll('.header__link');

linksHeader.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const sectionId = event.target.getAttribute('href').substr(1);
  
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  })
})

let buttonsShop = document.querySelectorAll('.shop__button');
let shop__section = document.querySelector('#products');

buttonsShop.forEach(button => {
  button.addEventListener('click', () => {
    shop__section.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  })
})

// ------- header burger ------ 
$(document).ready(function() {
  $('.header__burger').click(function() {
    $('.header__burger, .header__menu').toggleClass('open');
    $('body').addClass('fixed-page');
  });
  $('.header__link').click(function(){
    $('.header__burger, .header__menu').removeClass('open');
    $('body').removeClass('fixed-page');
  });
});


// ------- welcome slider --------
$(document).ready(function(){
    $('.welcome__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: false,
    infinite: true,
    focusOnSelect: true
    });
  });

// ---------- who-we-are-more button ----------- 
let aboutUsButton = document.querySelector('.about__us__button');
let aboutUsText = document.querySelector('.about__us__more__text');

aboutUsButton.addEventListener('click', () => {
  aboutUsButton.classList.toggle('about__us__button__active');
  aboutUsText.classList.toggle('hidden');
});


// ---------products tabs ------------

let tabsButtons = document.querySelectorAll('[data-tabs-handler]');
let productsLists = document.querySelectorAll('[data-tabs-field]');

for (let btn of tabsButtons) {
  btn.addEventListener('click', () => {
    tabsButtons.forEach(item => {
      item.classList.remove('products__tabs__button__active');
      btn.classList.add('products__tabs__button__active');

      productsLists.forEach(prod => {
        if(prod.dataset.tabsField === btn.dataset.tabsHandler) {
          prod.classList.remove('hidden');
        } else {
          prod.classList.add('hidden');
        }
      });
    })
  })
};


// -----------testimonials slider-----------

$(document).ready(function(){
  $('.testimonials__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        },
      }
    ]
  });
});

// ----- why-us accordeon --------
let whyUsBtns = document.querySelectorAll('.why__us__accordeon__header');
let whyUsLists = document.querySelectorAll('.why__us__accordeon__body');

whyUsBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    whyUsLists[index].classList.toggle('hidden');
  }) 
});

// --------blog slider --------

$(document).ready(function(){
  $('.blog__slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
});