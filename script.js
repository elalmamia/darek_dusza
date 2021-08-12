const burgerOpen = document.querySelector('.burger-icon'),
  burgerClose = document.querySelector('.burger-icon-close'),
  burger = document.querySelector('.burger'),
  navList = document.querySelector('.nav-list'),
  menuBtn = document.querySelectorAll('.btn-menu'),
  menuIndex = document.querySelector('.menu-index'),
  logo = document.querySelector('.logo'),
  navSticky = document.querySelector('.nav-list-dektop-wrapper'),
  header = document.querySelector('header'),
  navBackground = document.querySelector('.nav-list-dektop-wrapper::before'),
  ourMenusSection = document.querySelector('.text3'),
  aboutMeSection = document.querySelector('.meet_chef'),
  contactSection = document.querySelector('.contact_wrapper'),
  menusLink = document.querySelectorAll('.menus'),
  aboutLink = document.querySelectorAll('.about'),
  contactLink = document.querySelectorAll('.contact'),
  galleryPic = document.querySelectorAll('.gallery_pic'),
  sliderBtnLeft = document.querySelector('.btn_slider_left');

// sliderBtnLeft.addEventListener('click', slidesToLeft);

const sectionOneOptions = {
  rootMargin: '-600px 0px 0px 0px',
};
const sectionTwoOptions = {
  rootMargin: '-100px 0px 0px 0px',
};

const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navSticky.classList.add('sticky');

      if (window.matchMedia('(min-width: 1200px)').matches) {
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

burger.addEventListener('click', toggleMobileMenu);
menuBtn.forEach(item => item.addEventListener('click', toggleMenu));
menusLink.forEach(item => item.addEventListener('click', goToMenus));
aboutLink.forEach(item => item.addEventListener('click', goToAbout));
contactLink.forEach(item => item.addEventListener('click', goToContact));
// menuBtn.addEventListener('click', toggleMenu);
function toggleMobileMenu() {
  burgerClose.classList.toggle('show');
  burgerOpen.classList.toggle('show');
  navList.classList.toggle('show');
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
function toggleMenu(e) {
  if (window.matchMedia('(max-width: 800px)').matches) {
    e.target.parentElement.nextElementSibling.classList.toggle('show');
  } else {
    ourMenusSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

new Splide('.splide', {
  type: 'loop',
  perPage: 3,
  focus: 'center',
  autoWidth: true,
  arrowPath: '',
}).mount();
