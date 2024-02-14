let phone = document.querySelector('[type=tel]');

const initPhoneMask = () => {
  if (!phone) {
    return;
  }

  phone.addEventListener('keypress', (evt) => {
    if (evt.keyCode < 47 || evt.keyCode > 57) {
      evt.preventDefault();
    }
    if (phone.value.length === 0) {
      phone.value = '+7 (';
      phone.selectionStart = phone.value.length;
    }
    if (phone.value.length === 7) {
      phone.value += ') ';
    }
  });

  phone.addEventListener('click', (evt) => {
    if (phone.selectionStart < 4) {
      phone.selectionStart = phone.value.length;
    }
    if (evt.key === 'Backspace' && phone.value.length <= 4) {
      evt.preventDefault();
    }
  });

  phone.addEventListener('blur', () => {
    if (phone.value === '+7(') {
      phone.value = '';
    }
  });

  phone.addEventListener('keydown', (evt) => {
    if (evt.key === 'Backspace' && phone.value.length <= 4) {
      evt.preventDefault();
    }
    if (evt.key === 'ArrowLeft' && phone.value.length <= 4) {
      evt.preventDefault();
    }
  });
};

export {initPhoneMask};
