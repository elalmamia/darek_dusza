const burgerOpen = document.querySelector('.burger-icon'),
  burgerClose = document.querySelector('.burger-icon-close'),
  burger = document.querySelector('.burger'),
  navList = document.querySelector('.nav-list'),
  menuBtn = document.querySelectorAll('.btn-menu'),
  subTitle = document.querySelector('.h2'),
  menuIndex = document.querySelector('.menu-index'),
  logo = document.querySelector('.logo'),
  navSticky = document.querySelector('.nav-list-dektop-wrapper'),
  header = document.querySelector('header'),
  navBackground = document.querySelector('.nav-list-dektop-wrapper::before'),
  ourMenusSection = document.querySelector('.text3'),
  aboutMeSection = document.querySelector('.meet_chef'),
  contactSection = document.querySelector('.contact_wrapper'),
  contactSectionMenus = document.querySelector('.contact_wrapper_menus'),
  menusLink = document.querySelectorAll('.menus'),
  aboutLink = document.querySelectorAll('.about'),
  contactLink = document.querySelectorAll('.contact'),
  contactLinkMenus = document.querySelector('.contact-menus'),
  galleryPic = document.querySelectorAll('.gallery_pic'),
  sliderBtnLeft = document.querySelector('.btn_slider_left'),
  checkBoxApetizers = document.querySelectorAll('.check-apetizers'),
  checkBoxEntradas = document.querySelectorAll('.check-entradas'),
  checkBoxPrincipal = document.querySelectorAll('.check-principal'),
  checkBoxDessert = document.querySelectorAll('.check-dessert'),
  courses = document.querySelectorAll('details'),
  splide = document.querySelector('.splide'),
  orderList = document.querySelector('#order-list'),
  checkForPrice = document.querySelector('.check-for-price'),
  price = document.querySelector('.price'),
  guestNum = document.querySelector('#guest-num'),
  text = document.querySelectorAll('.text'),
  formOrderList = document.querySelector('.order-list-wrapper');

// sliderBtnLeft.addEventListener('click', slidesToLeft);
text.forEach(function (item) {
  item.classList.add('show-on-scroll');
});

const sectionOneOptions = {
  rootMargin: '-600px 0px 0px 0px',
};
const sectionTwoOptions = {
  rootMargin: '-100px 0px 0px 0px',
};

// -----STICKU NAV-----

const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navSticky.classList.add('sticky');

      if (window.matchMedia('(min-width: 1000px)').matches) {
        logo.style.transform = 'scale(0.6)';
      }
    } else {
      navSticky.classList.remove('sticky');
      logo.style.transform = 'scale(1)';
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(header);

// -----------SHOW ON SCROLL--------
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
});

const targets = document.querySelectorAll('.show-on-scroll');
targets.forEach(function (target) {
  observer.observe(target);
});

// ----------------EVENT LISTENERS-----------------
if (burger) {
  burger.addEventListener('click', toggleMobileMenu);
}
menuBtn.forEach(item => item.addEventListener('click', toggleMenu));
menusLink.forEach(item => item.addEventListener('click', goToMenus));
aboutLink.forEach(item => item.addEventListener('click', goToAbout));
contactLink.forEach(item => item.addEventListener('click', goToContact));
if (contactLinkMenus) {
  contactLinkMenus.addEventListener('click', goToContactMenus);
}
// ----------------FUNCTIONS-----------------

function toggleMobileMenu() {
  burgerClose.classList.toggle('show');
  burgerOpen.classList.toggle('show');
  navList.classList.toggle('show');
  subTitle.classList.toggle('show');
}
function goToMenus() {
  ourMenusSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function goToAbout() {
  aboutMeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function goToContact() {
  contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function goToContactMenus() {
  contactSectionMenus.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function toggleMenu(e) {
  if (window.matchMedia('(max-width: 800px)').matches) {
    e.target.parentElement.nextElementSibling.classList.toggle('show');
  } else {
    ourMenusSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// -----------CREATE YOUR MENU-----------
const pdfBtn = document.querySelector('#pdf-btn'),
  preSendBtn = document.querySelector('#pre-mail-btn'),
  message1 = document.querySelector('#message1'),
  preSendForm = document.querySelector('.pre-send-form');

if (formOrderList) {
  formOrderList.addEventListener('submit', function (e) {
    e.preventDefault;
  });
}

checkBoxApetizers.forEach(item => item.addEventListener('change', handleCheck));
checkBoxEntradas.forEach(item => item.addEventListener('change', handleCheck));
checkBoxPrincipal.forEach(item => item.addEventListener('change', handleCheck));
checkBoxDessert.forEach(item => item.addEventListener('change', handleCheck));

if (guestNum) {
  guestNum.addEventListener('keyup', seePrice);
}
if (pdfBtn) {
  pdfBtn.addEventListener('click', generatePdf);
}
if (preSendBtn) {
  preSendBtn.addEventListener('click', validateForm);
}

const selectPrior = function (name) {
  return document.querySelector(`label.checked input[name=${name}]`);
};

function handleCheck(e) {
  let text;
  let description;
  let prior = selectPrior(e.target.name);
  if (prior) {
    prior.parentElement.classList.remove('checked');
  }
  e.target.parentElement.classList.add('checked');

  text = e.target.nextElementSibling.innerHTML;

  description =
    e.target.parentElement.parentElement.nextElementSibling.innerHTML;

  makeList(text, e.target.name, description);
  text = '';
}

function makeList(text, name, desc) {
  const li = document.createElement('li');
  li.classList.add(name);
  li.classList.add('order-list-item');

  if (!document.querySelector(`li.${name}`)) {
    orderList.appendChild(
      document.createTextNode(`${capitalizeFirstLetter(name)}:`)
    );
    li.innerHTML = `<h3>${text}</h3><p>${desc}</p>`;
  } else {
    document.querySelector(
      `li.${name}`
    ).innerHTML = `<h3>${text}</h3><p>${desc}</p>`;
  }
  orderList.appendChild(li);
}
// function showList() {
//   const orderListCopy = document.querySelector('#order-list-copy');
//   const li = document.createElement('li');
//   li.innerHTML = 'Your Menu:';
//   orderListCopy.appendChild(li);
//   const orderListItems = document.querySelectorAll('.order-list-item');
//   orderListItems.forEach(item => {
//     const meal = document.createElement('li');
//     meal.appendChild(item.firstElementChild);
//     orderListCopy.appendChild(meal);
//   });
//   // const x = orderList.innerHTML;
//   // orderListCopy.innerHTML = x;
// }
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function seePrice(e) {
  e.preventDefault();
  let totPrice = parseInt(price.innerHTML) * parseInt(guestNum.value);

  const total = document.createElement('div');
  total.classList.add('total-price');
  if (document.querySelector('.total-price')) {
    document.querySelector('.total-price').remove();
  }
  if (parseInt(document.querySelector('#guest-num').value) > 0) {
    total.innerHTML = `Total: ${totPrice} €* <p class='details' style='font-size: 1rem'>*Price payed after the dinner</p>`;
  } else {
    message1.innerHTML = 'Please enter the number from 4 to 12';
    message1.classList.add('show');
    setTimeout(removeClass, 3000);
  }

  checkForPrice.appendChild(total);
}

// --------------BEFORE SUBMIT THE MENU put the created menu into the text area input to mail it --------------
const textarea = document.querySelector('#mail-order-list');

function createListToMail() {
  textarea.value = orderList.innerText;
}

function validateForm() {
  const checked = document.querySelectorAll('.checked');
  const background = document.querySelector('.container'),
    backgroundStyle = document.createElement('style');
  backgroundStyle.innerHTML = `
  .container::after{
    display: block;
    position: fixed;
    content: '';
    background-color: var(--black-transparent);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }`;

  if (
    checked.length === courses.length &&
    parseInt(document.querySelector('#guest-num').value) > 0
  ) {
    createListToMail();
    // showList();
    preSendForm.classList.add('show');
    document.head.appendChild(backgroundStyle);

    window.addEventListener('mouseup', function (event) {
      if (event.target === background) {
        backgroundStyle.innerHTML = '';
        preSendForm.classList.remove('show');
      }
    });
    return true;
  } else if (checked.length !== courses.length) {
    message1.innerHTML = 'Please check one meal from all the courses';
    message1.classList.add('show');
    setTimeout(removeClass, 3000);
    return false;
  } else if (isNaN(parseInt(document.querySelector('#guest-num').value))) {
    message1.innerHTML = 'Please type the number of guests';
    message1.classList.add('show');
    setTimeout(removeClass, 3000);
    return false;
  } else return false;
}
function removeClass() {
  message1.classList.remove('show');
  message2.classList.remove('show');
}

function finalValidate() {
  const email = document.querySelector('#email').value,
    message2 = document.querySelector('#message2');
  if (validateEmail(email)) {
    return true;
  } else {
    message2.innerHTML = 'Please enter a valid email';
    message2.classList.add('show');
    setTimeout(removeClass, 3000);
    return false;
  }
}
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
// ----------PDF GENERATOR------------

function generatePdf() {
  var opt = {
    filename: 'SoulfulGourmet_menu.pdf',
    margin: [0, 5, 0, 5],
    html2canvas: { scale: 5 },
    jsPDF: { unit: 'mm', format: 'A4', orientation: 'portrait' },
  };

  html2pdf().set(opt).from(formOrderList).save();
}

// --------------SLIDER----------------
if (splide) {
  new Splide('.splide', {
    type: 'loop',
    perPage: 3,
    focus: 'center',
    autoWidth: true,
    arrowPath: '',
  }).mount();
}
