import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WatchJS from 'melanke-watchjs';
import validator from 'validator';
import getFeedData from './request';

const feedField = document.getElementById('link-to-feed');
const addFeedBtn = document.getElementById('add-feed-btn');

const urlProxy = 'https://cors-anywhere.herokuapp.com/';
const { watch } = WatchJS;

const state = {
  emptyField: true,
  validUrl: true,
};

const addFormErrorState = (errorText) => {
  feedField.classList.add('is-invalid');
  const divEl = document.createElement('div');
  divEl.classList.add('invalid-feedback');
  divEl.textContent = errorText;
  feedField.after(divEl);
};

const removeFormErrorState = () => {
  const errorText = document.querySelector('.invalid-feedback');
  feedField.classList.remove('is-invalid');

  if (errorText) {
    errorText.remove();
  }
};

const blockBtn = () => {
  addFeedBtn.setAttribute('disabled', '');
};

const unlockkBtn = () => {
  addFeedBtn.removeAttribute('disabled');
};

const clearField = () => {
  feedField.value = '';
};

feedField.addEventListener('input', ({ target }) => {
  const { value } = target;

  if (value.length === 0) {
    state.emptyField = true;
    state.validUrl = true;
  } else {
    state.emptyField = false;
    state.validUrl = validator.isURL(value);
  }
});

addFeedBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  const urlToFeed = feedField.value;
  const currentFeed = getFeedData(urlProxy, urlToFeed);
  blockBtn();

  currentFeed.then((data) => {
    console.log(data);
    clearField();
  });
});

watch(state, 'emptyField', () => {
  const { emptyField } = state;

  if (emptyField) {
    blockBtn();
    removeFormErrorState();
  } else {
    unlockkBtn();
  }
});

watch(state, 'validUrl', () => {
  const { emptyField, validUrl } = state;

  if (validUrl && !emptyField) {
    unlockkBtn();
    removeFormErrorState();
  } else if (emptyField) {
    blockBtn();
  } else {
    blockBtn();
    addFormErrorState('Invalid URL');
  }
});
