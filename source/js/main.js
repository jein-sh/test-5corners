import {initPhoneMask} from './modules/init-phone-mask';
import {initMap} from './modules/init-map';
import {initForm} from './modules/init-form';
const body = document.querySelector('body');
const formatNumber = (number) => new Intl.NumberFormat('ru-RU').format(number);

const initMenu = () => {
  const menu = document.querySelector('.nav');

  if (!menu) {
    return;
  }

  if (menu.classList.contains('is-open')) {
    menu.classList.remove('is-open');
    body.classList.remove('scroll-lock');
  } else {
    menu.classList.add('is-open');
    body.classList.add('scroll-lock');
  }
};

const initTitle = () => {
  const title = document.querySelector('[data-title]');
  const products = document.querySelectorAll('.card:not(.is-deleted)');

  let amount = 0;
  let count = 0;
  let countTitle = '';

  products.forEach((el) => {
    amount += Number(el.querySelector('[data-result]').textContent.replace(/\s/g, ''));
    count += Number(el.querySelector('[data-amount]').value);

    if (count % 10 === 1) {
      countTitle = `${count} товар`;
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
      countTitle = `${count} товара`;
    } else {
      countTitle = `${count} товаров`;
    }
  });

  title.textContent = `${countTitle} на сумму ${formatNumber(amount)}`;
};

const initPrice = (block) => {
  const price = block.querySelector('[data-price]');
  const priceOld = block.querySelector('[data-price-old');
  const amount = block.querySelector('[data-amount]');

  block.querySelector('[data-result]').textContent = formatNumber(Number(price.textContent.replace(/\s/g, '')) * Number(amount.value));


  if (priceOld) {
    block.querySelector('[data-result-old]').textContent = formatNumber(Number(priceOld.textContent.replace(/\s/g, '')) * Number(amount.value));
  }
};

const initQuantity = (evt) => {
  const priceBlock = evt.target.closest('[data-price-block]');
  const amount = priceBlock.querySelector('[data-amount]');

  if (evt.target.closest('[data-plus]') && amount.value < amount.max) {
    amount.value = Number(amount.value) + 1;
    initPrice(priceBlock);
  }

  if (evt.target.closest('[data-minus]') && amount.value > amount.min) {
    amount.value = Number(amount.value) - 1;
    initPrice(priceBlock);
  }
};

const deleteCard = (evt) => {
  const card = evt.target.closest('.card');

  card.classList.add('is-deleted');
};

const restoreCard = (evt) => {
  const card = evt.target.closest('.card');

  card.classList.remove('is-deleted');
  initTitle();
};

const deleteItem = (evt) => {
  const item = evt.target.closest('.order__item');

  item.remove();
};

const initComment = () => {
  const comment = document.querySelector('[data-comment');
  const textarea = comment.querySelector('textarea');
  const message = comment.querySelector('.textarea__message');

  message.textContent = `Использовано ${textarea.value.length}/${textarea.maxLength} символов`;
};

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initTitle();
  initComment();
  initPhoneMask();
  initForm();

  document.addEventListener('click', (evt) => {
    if (evt.target.closest('[data-burger')) {
      initMenu();
    }

    if (evt.target.closest('[data-plus]') || evt.target.closest('[data-minus]')) {
      initQuantity(evt);
      initTitle();
    }

    if (evt.target.closest('[data-delete-card]')) {
      deleteCard(evt);
      initTitle();
    }

    if (evt.target.closest('[data-restore-card]')) {
      restoreCard(evt);
    }

    if (evt.target.closest('[data-close]')) {
      deleteItem(evt);
    }
  });

  document.addEventListener('input', (evt) => {
    if (evt.target.closest('#comment')) {
      initComment();
    }
  });
});
