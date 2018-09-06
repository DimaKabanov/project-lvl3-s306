import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import WatchJS from 'melanke-watchjs';
import validator from 'validator';
import getFeedData from './request';
import parseXml from './parser';
import renderFeed from './render';

const urlProxy = 'https://thingproxy.freeboard.io/fetch/';
const { watch } = WatchJS;

const state = {
  feedFormState: {},
  formElements: {},
  allFeeds: [],
  listUrl: new Set(),
};

const feedFormStates = [
  {
    type: 'emptyField',
    check: ({ feedInput }) => feedInput.value === '',
  },
  {
    type: 'submittedUrl',
    check: ({ url }) => state.listUrl.has(url),
    errorMessage: 'This URL is already in the list',
  },
  {
    type: 'validUrl',
    check: ({ url }) => validator.isURL(url),
  },
  {
    type: 'invalidUrl',
    check: ({ url }) => !validator.isURL(url),
    errorMessage: 'Invalid URL',
  },
];

const getFeedFormState = (url, feedInput) => (
  _.find(feedFormStates, ({ check }) => check({ url, feedInput }))
);

document.addEventListener('DOMContentLoaded', () => {
  const feedForm = document.getElementById('feed-form');
  const feedInput = document.getElementById('feed-input');
  const feedError = document.getElementById('feed-error');
  const feedBtn = document.getElementById('feed-btn');

  state.formElements = { feedInput, feedError, feedBtn };

  feedForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const urlToFeed = feedInput.value;
    const currentFeed = getFeedData(urlProxy, urlToFeed);
    state.listUrl.add(urlToFeed);
    feedInput.value = '';

    currentFeed.then((data) => {
      const carrentFeedData = parseXml(data);
      state.allFeeds = [...state.allFeeds, carrentFeedData];
    });
  });

  feedInput.addEventListener('input', ({ target }) => {
    const { value } = target;
    state.feedFormState = getFeedFormState(value, feedInput);
  });
});

watch(state, 'feedFormState', () => {
  const { type, errorMessage } = state.feedFormState;
  const { feedInput, feedError, feedBtn } = state.formElements;

  switch (type) {
    case 'validUrl':
      feedInput.classList.remove('is-invalid');
      feedError.textContent = '';
      feedBtn.disabled = false;
      break;
    case 'emptyField':
      feedInput.classList.remove('is-invalid');
      feedError.textContent = '';
      feedBtn.disabled = true;
      break;
    case 'invalidUrl':
    case 'submittedUrl':
      feedInput.classList.add('is-invalid');
      feedError.textContent = errorMessage;
      feedBtn.disabled = true;
      break;
    default:
      break;
  }
});

watch(state, 'allFeeds', () => {
  const feedContainer = document.getElementById('feed-container');
  feedContainer.innerHTML = '';
  state.allFeeds.forEach(feed => renderFeed(feed, feedContainer));
});
