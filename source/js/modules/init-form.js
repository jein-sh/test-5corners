const form = document.querySelector('form');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');

const initModal = () => {
  if (!modal) {
    return;
  }

  const closeModal = () => {
    modal.classList.remove('is-active');
    body.classList.remove('scroll-lock');
  };

  modal.classList.add('is-active');
  body.classList.add('scroll-lock');

  document.addEventListener('click', (evt) => {
    if (evt.target.closest('.modal__close')) {
      closeModal();
    }

    if (evt.target.closest('.modal') && !evt.target.closest('.modal__content')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closeModal();
    }
  });
};

const initForm = () => {
  if (!form) {
    return;
  }

  const btnSubmit = form.querySelector('[type=submit]');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    fetch('https://echo.htmlacademy.ru', {
      method: 'POST',
      body: new FormData(form),
    }).then((response) => {
      if (response.ok) {
        initModal();
        form.reset();
        btnSubmit.blur();
      }
    });
  });
};

export {initForm};
