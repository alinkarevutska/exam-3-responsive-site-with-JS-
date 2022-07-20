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

// --------- products tabs render------------

const file = `../js/products.json`;
const tabsWrapper = document.querySelector('.products__tabs');

const controller = async (path, method=`GET`) => {
  let options = {
    method: method,
    headers: {
      "Content-type" : "application/json"
    }
  }

  let request = await fetch(path, options);
  if (request.ok) return request.json()
  else throw Error (request.status)
}

const getProductsInfo = async () => controller(file);

const getCategories = async () => {
  let productsInfo = await getProductsInfo();
  let categories = productsInfo.map(item => item.tab)
  let uniqueCategories = categories.filter((item, index, array) => array.indexOf(item) === index)
  // console.log(uniqueCategories); //  ['fresh', 'sweet', 'berry']
  return uniqueCategories;
}

const renderTabBtns = async () => {
  let uniqueTabsNames = await getCategories();
  uniqueTabsNames.forEach((elem, index) => {
    let tabBtn = document.createElement('button');
    tabBtn.className = 'products__tabs__button';
    !index && tabBtn.classList.add('products__tabs__button__active');
    tabBtn.innerHTML = elem;
    tabBtn.dataset.category = elem;
    tabsWrapper.prepend(tabBtn);

    tabBtn.addEventListener(`click`, ()=> {
      
      let tabsButtons = document.querySelectorAll('.products__tabs__button'),
          productsCats = document.querySelectorAll('ul[data-category]');

      for (let btn of tabsButtons) {
        btn.addEventListener('click', () => {
          tabsButtons.forEach(button => {
            button.classList.remove('products__tabs__button__active');
            btn.classList.add('products__tabs__button__active');

            productsCats.forEach(category => {
              if(category.dataset.category === btn.dataset.category) {
                category.classList.remove('hidden');
              } else {
                category.classList.add('hidden');
              }});
          })
        })
      }
    })
  })
}
renderTabBtns();

let productsWrapper = document.createElement('div');
productsWrapper.className = 'products__tabs__list';
tabsWrapper.append(productsWrapper);

const renderCategories = async () => {
  let categories = await getCategories();
 // console.log(`in render cats`, categories) // ['fresh', 'sweet', 'berry']

  categories.forEach((category, index) => {
    let productList = document.createElement('ul');
    productList.classList = ['products__list', 'hidden'].join(' ');
    productList.dataset.category = category;
    !index && productList.classList.remove('hidden');
    productsWrapper.append(productList);
  })
}

renderCategories();

const renderProductCards = async () => {
  const products = await getProductsInfo();

  products.forEach(product => {
    let productCard = document.createElement('li');
    productCard.className = 'products__list__item';
    productCard.innerHTML = `
    <img src="./img/products/${product.img}.png" alt="${product.img}">
    <h3 class="products__list__title">${product.name}</h3>
    <span class="products__list__price">$${product.price.toFixed(2)}</span>
    `
    let basketBtn = document.createElement('button');
    basketBtn.className = 'products__options';
    basketBtn.innerHTML = `<i class="fas fa-cart-plus"></i>`;
    basketBtn.dataset.favourite = false;

    productCard.append(basketBtn);

    let tab = document.querySelector(`ul[data-category="${product.tab}"]`);
    tab.append(productCard);
  })
}

renderProductCards();

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