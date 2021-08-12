const contactSectionMenus = document.querySelector('.contact_wrapper_menus'),
  contactLinkMenus = document.querySelector('.contact-menus');

contactLinkMenus.addEventListener('click', goToContactMenus);

function goToContactMenus() {
  contactSectionMenus.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
