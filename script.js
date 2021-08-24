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
  orderList = document.querySelector('.order-list'),
  checkForPrice = document.querySelector('.check-for-price'),
  pdfBtn = document.querySelector('.pdf-btn'),
  price = document.querySelector('.price'),
  guestNum = document.querySelector('#number'),
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
contactLinkMenus.addEventListener('click', goToContactMenus);

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
  if (parseInt(document.querySelector('#number').value) > 0) {
    total.innerHTML = `Tot: ${totPrice} €`;
  } else {
    message.innerHTML = 'Please enter the number from 4 to 12';
    message.classList.add('show');
    setTimeout(removeClass, 3000);
  }

  checkForPrice.appendChild(total);
}

// --------------BEFORE SUBMIT THE MENU--------------
const textarea = document.querySelector('#order-list');
const message = document.querySelector('.message');
function createListToMail() {
  textarea.value = orderList.innerText;
}

function validateForm() {
  const checked = document.querySelectorAll('.checked');
  if (
    checked.length === courses.length &&
    parseInt(document.querySelector('#number').value) > 0
  ) {
    createListToMail();
    return true;
  } else if (checked.length !== courses.length) {
    message.innerHTML = 'Please check one meal from all the courses';
    message.classList.add('show');
    setTimeout(removeClass, 3000);
    return false;
  } else if (isNaN(parseInt(document.querySelector('#number').value))) {
    message.innerHTML = 'Please type the number of guests';
    message.classList.add('show');
    setTimeout(removeClass, 3000);
    return false;
  } else return false;
}
function removeClass() {
  message.classList.remove('show');
}
// ----------PDF GENERATOR------------

function generatePdf() {
  formOrderList.classList.add('print');
  var opt = {
    filename: 'SoulfulGourmet_menu.pdf',
    margin: [0, 5, 0, 5],
    html2canvas: { scale: 5 },
    jsPDF: { unit: 'mm', format: 'A4', orientation: 'portrait' },
  };

  html2pdf().set(opt).from(formOrderList).save();
  formOrderList.classList.remove('print');
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
