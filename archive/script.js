const cover = document.querySelector('.cover');
const openContent = document.querySelector('.open-content');
const closedContent = document.querySelector('.closed-content');
const checkbox = document.querySelector('#checkbox-cover');

openContent.style.display = 'none';

cover.addEventListener('transitionend', (event) => {
  if (event.propertyName === 'transform') {
    if (checkbox.checked) {
      openContent.style.display = 'flex';
    } else {
      openContent.style.display = 'none';
      closedContent.style.visibility = 'visible';
    }
  }
});

checkbox.addEventListener('change', () => {
  checkbox.setAttribute('aria-checked', checkbox.checked.toString());
  if (checkbox.checked) {
    closedContent.style.visibility = 'hidden';
    openContent.style.display = 'none';
  } else {
    openContent.style.display = 'none';
  }
});
