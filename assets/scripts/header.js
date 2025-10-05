const burgerIcon = document.querySelector('.header__burger-icon');
const burgerMenu = document.querySelector('.header__burger-menu');

burgerMenu.setAttribute('is-opened', false)

burgerIcon.addEventListener('click', () => {
  const isOpened = burgerMenu.getAttribute('is-opened') === 'true' ?? false;

  burgerMenu.setAttribute('is-opened', !isOpened)
  burgerIcon.setAttribute('is-opened', !isOpened)
});