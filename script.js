const burgerOpen = document.querySelector('.burger-icon'),
  burgerClose = document.querySelector('.burger-icon-close'),
  burger = document.querySelector('.burger'),
  navList = document.querySelector('.nav-list'),
  menuBtn = document.querySelectorAll('.btn-menu'),
  menuIndex = document.querySelector('.menu-index');

burger.addEventListener('click', toggleMobileMenu);
menuBtn.forEach(item => item.addEventListener('click', toggleMenu));
// menuBtn.addEventListener('click', toggleMenu);
function toggleMobileMenu() {
  burgerClose.classList.toggle('show');
  burgerOpen.classList.toggle('show');
  navList.classList.toggle('show');
}
function toggleMenu(e) {
  e.target.parentElement.nextElementSibling.classList.toggle('show');
}
