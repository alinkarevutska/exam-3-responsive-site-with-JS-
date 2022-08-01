const PRODUCTS = [
  {
      "id": "01",
      "tab": "fresh",
      "img": "april-showers",
      "name": "April Showers",
      "price": 10.00,
      "quantityAvailable": 10
  },
  {
      "id": "02",
      "tab": "sweet",
      "img": "butter-cream",
      "name": "Butter Cream",
      "price": 23.00,
      "quantityAvailable": 5
  },
  {
      "id": "03",
      "tab": "berry",
      "img": "strawberries",
      "name": "Strawberry Dance",
      "price": 15.00,
      "quantityAvailable": 12
  },
  {
      "id": "04",
      "tab": "fresh",
      "img": "fresh-roses",
      "name": "Fresh Roses",
      "price": 13.00,
      "quantityAvailable": 7
  },
  {
      "id": "05",
      "tab": "fresh",
      "img": "lavander",
      "name": "Lavander cream",
      "price": 17.00,
      "quantityAvailable": 11
  },
  {
      "id": "06",
      "tab": "sweet",
      "img": "chocolate",
      "name": "Chocolate cake",
      "price": 14.00,
      "quantityAvailable": 25
  },
  {
      "id": "07",
      "tab": "sweet",
      "img": "salted-caramel",
      "name": "Salted Caramel",
      "price": 22.00,
      "quantityAvailable": 23
  },
  {
      "id": "08",
      "tab": "berry",
      "img": "april-showers",
      "name": "Raspberry Cream",
      "price": 12.00,
      "quantityAvailable": 18
  },
  {
      "id": "09",
      "tab": "berry",
      "img": "blueberry-scone",
      "name": "Blueberry Scone",
      "price": 11.00,
      "quantityAvailable": 14
  }
];

const basketButton = document.querySelector('#headerBasketBtn'),
      headerBasketPopup = document.querySelector('#headerBasketPopup'),
      headerBasketProducts = document.querySelector('#headerBasketProducts'),
      basketCloseButton = document.querySelector('#headerBasketClose');

const tabsWrapper = document.querySelector('.products__tabs');

// ------ products in storage  ------

const getStorageProducts = () => {
  const storageProducts = localStorage.getItem(`products`) ? JSON.parse(localStorage.getItem(`products`)) : [];
  return storageProducts;
}
const storageProducts = getStorageProducts();

const getProductQuantity = () => {
  let productQuantity = document.querySelector('.header__basket__count');
  productQuantity.innerHTML = storageProducts.length;
}

getProductQuantity();

// --------- products tabs render------------

const getUniqueCategories = () => {
  let categories = PRODUCTS.map(item => item.tab)
  let uniqueCategories = categories.filter((item, index, array) => array.indexOf(item) === index)
  // console.log(uniqueCategories); //  ['fresh', 'sweet', 'berry']
  return uniqueCategories;
}

getUniqueCategories();

const renderTabBtns = uniqueCategories => {
  let uniqueTabsNames = uniqueCategories;
  uniqueTabsNames.forEach((elem, index) => {
    let tabBtn = document.createElement('button');
    tabBtn.className = 'products__tabs__button';
    !index && tabBtn.classList.add('products__tabs__button__active');
    tabBtn.innerHTML = elem;
    tabBtn.dataset.category = elem;
    tabsWrapper.prepend(tabBtn);

    tabBtn.addEventListener(`click`, ()=> {
      let tabBtnActive = document.querySelector('.products__tabs__button__active'),
          productsCats = document.querySelectorAll('ul[data-category]');
            
          tabBtnActive.classList.remove('products__tabs__button__active');
          tabBtn.classList.add('products__tabs__button__active');

            productsCats.forEach(category => {
              if(category.dataset.category === tabBtn.dataset.category) {
                category.classList.remove('hidden');
              } else {
                category.classList.add('hidden');
              }});
    })
  })
}

renderTabBtns(getUniqueCategories());

let productsWrapper = document.createElement('div');
productsWrapper.className = 'products__tabs__list';
tabsWrapper.append(productsWrapper);

const renderCategories = uniqueCategories => {
 uniqueCategories.forEach((category, index) => {
    let productList = document.createElement('ul');
    productList.classList = ['products__list', 'hidden'].join(' ');
    productList.dataset.category = category;
    !index && productList.classList.remove('hidden');
    productsWrapper.append(productList);
  })
}

renderCategories(getUniqueCategories());

// --------- total sum count and render------------

let totalSumAmount = 0;
let totalSum = document.querySelector('#totalSum');

const countTotalSum = (productPrice, productQuantity) => {
  totalSumAmount += productPrice * productQuantity;
  totalSum.innerHTML = `$${totalSumAmount.toFixed(2)}`
}

// --------- products in basket render------------

const renderProductsInBasket = product => {
  let productInBasket = document.createElement('div');
  productInBasket.className = 'basket__product';
  productInBasket.dataset.id = product.id;
  productInBasket.innerHTML = `
      <h3 class="basket__product__title">${product.name}</h3>
      <img class="basket__product__img" src="./img/products/${product.img}.png" alt="${product.img}">
      <span class="basket__product__price">$${product.price.toFixed(2)}</span>
      <div class="change__number">
      <input type="number" class="change__number__input" name="" value="${product.quantityChosen ? product.quantityChosen : product.quantityChosen = 1}" data-price="${product.price.toFixed(2)}" readonly>
      </div>
  `;

  headerBasketProducts.append(productInBasket);

  const changeProductQuantity = productInBasket.querySelector('.change__number'),
        productQuantity = changeProductQuantity.querySelector('input[type="number"]');

  let decrement = document.createElement('button');
  decrement.className = 'change__number decrease';
  decrement.dataset.id = product.id;
  decrement.innerHTML = `−`;
  decrement.addEventListener(`click`, ()=>{
    if(product.quantityChosen > 1) {
      productQuantity.value--;
      product.quantityChosen--;
      countTotalSum(product.price, -1);

      let indexOfProduct = storageProducts.findIndex(product => product.id === decrement.dataset.id);
      storageProducts[indexOfProduct].quantityChosen = product.quantityChosen;
      localStorage.setItem(`products`, JSON.stringify(storageProducts));
      
      console.log(`in decrement,`, storageProducts)
    } else {
      decrement.setAttribute('disabled', 'disabled')
    }
  })
  changeProductQuantity.prepend(decrement);

  let increment = document.createElement('button');
  increment.className = 'change__number increase';
  increment.dataset.id = product.id;
  increment.innerHTML = `+`;

  increment.addEventListener(`click`, ()=>{
        if(product.quantityChosen < product.quantityAvailable) {
          productQuantity.value++;
          product.quantityChosen++;
          countTotalSum(product.price, 1);

          let indexOfProduct = storageProducts.findIndex(product => product.id === increment.dataset.id);
          storageProducts[indexOfProduct].quantityChosen = product.quantityChosen;
          localStorage.setItem(`products`, JSON.stringify(storageProducts));
        } else {
          alert(`Oops! 😕 \n We don't have '${product.name}' anymore!`);
          increment.setAttribute('disabled', 'disabled')
        }
  })
  
  changeProductQuantity.append(increment);

  let removeFromBasketBtn = document.createElement('button');
  removeFromBasketBtn.className = 'basket__product__remove';
  removeFromBasketBtn.innerHTML = `<i class="fas fa-trash"></i>`;

  removeFromBasketBtn.addEventListener(`click`, () => {
    let indexOfProduct = storageProducts.findIndex(product => product.id === productInBasket.dataset.id)
    storageProducts.splice(indexOfProduct, 1);
    localStorage.setItem(`products`, JSON.stringify(storageProducts));
    getProductQuantity();
    productInBasket.remove();
    countTotalSum(product.price, -product.quantityChosen);
    console.log(`in remove from basket,`, storageProducts);
  })

  productInBasket.append(removeFromBasketBtn);
}

// --------- open and close button ------------

basketButton.addEventListener(`click`, () => {
  headerBasketPopup.classList.add('open');
  headerBasketProducts.classList.contains('hidden') && headerBasketProducts.classList.remove('hidden');
  document.body.style.overflow = "hidden";
});

basketCloseButton.addEventListener(`click`, ()=> {
  headerBasketPopup.classList.remove('open');
  document.body.style.overflow = "auto";
});

// --------- confirm order button ------------

const confirmOrderButton = document.querySelector('.header__basket__confirm'),
      confirmedOrderPopup = document.querySelector('#headerBasketConfirmed');

confirmOrderButton.addEventListener(`click`, () =>{
  headerBasketProducts.classList.add('hidden');
  confirmedOrderPopup.classList.add('open');
});

const date = new Date();
let orderNumber = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}-${date.getHours()}${date.getMinutes()}`

let productsList = storageProducts.map(product => {
  return `${product.name}, quantity: ${product.quantityChosen}`
}).join('</li><li>');

confirmedOrderPopup.innerHTML = `
  <h2>Thank you for your order!</h2>
  <h3>Your order №${orderNumber}:</h3>
  <ul>
  <li>
  ${productsList}
  </li>
  </ul>
`;

// --------- close confirm popup button ------------

const closeConfirmBtn = document.createElement('button');
closeConfirmBtn.className = 'header__basket__confirmed__close';
closeConfirmBtn.id = 'headerBasketConfirmedClose';
closeConfirmBtn.innerHTML = `Close`;

closeConfirmBtn.addEventListener(`click`, () => {
  confirmedOrderPopup.classList.remove('open');
  headerBasketPopup.classList.remove('open');
  document.body.style.overflow = "auto";
});

confirmedOrderPopup.append(closeConfirmBtn);

// --------- render products and sum from storage ------------

storageProducts.forEach(product => renderProductsInBasket(product));

storageProducts.forEach(product => countTotalSum(product.price, product.quantityChosen));

// --------- products cards render------------

const renderProductCards = () => {
  PRODUCTS.forEach(product => {
    let productCard = document.createElement('li');
    productCard.className = 'products__list__item';
    productCard.dataset.id = product.id;
    productCard.innerHTML = `
    <img src="./img/products/${product.img}.png" alt="${product.img}">
    <h3 class="products__list__title">${product.name}</h3>
    <span class="products__list__price">$${product.price.toFixed(2)}</span>
    `
    let basketBtn = document.createElement('button');
    basketBtn.className = 'products__options';
    basketBtn.innerHTML = `<i class="fas fa-cart-plus"></i>`;
    basketBtn.dataset.id = product.id;

    basketBtn.addEventListener(`click`, ()=> {
      let productAddedIndex = storageProducts.find(product => product.id === productCard.dataset.id);
         
      if(!productAddedIndex) {
        console.log(product);
        storageProducts.push(product);
        getProductQuantity();
        localStorage.setItem(`products`, JSON.stringify(storageProducts))
        renderProductsInBasket(product);
        countTotalSum(product.price, 1);
      } else {
        alert(`Product '${product.name}' has already been added to your basket!`)
        return;
      }
    })

    productCard.append(basketBtn);

    let tab = document.querySelector(`ul[data-category="${product.tab}"]`);
    tab.append(productCard);
  })
}

renderProductCards();

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

let buttonsShop = document.querySelectorAll('.welcome__slider__shop__button');
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
    $('body').toggleClass('fixed-page');
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
          arrows: false,
          dots: true,
          slidesToShow: 3,
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