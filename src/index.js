import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { find } from 'lodash';
import { watch } from 'melanke-watchjs';
import getFeedData from './request';
import parseXml from './parser';
import { renderFeed, renderModal } from './render';
import * as state from './state';

const urlProxy = 'https://thingproxy.freeboard.io/fetch/';

const feedFormStates = [
  {
    type: 'emptyField',
    check: ({ feedInput }) => feedInput.value === '',
  },
  {
    type: 'submittedUrl',
    check: ({ url }) => state.isDoubleUrl(url),
    errorMessage: 'This URL is already in the list',
  },
  {
    type: 'validUrl',
    check: ({ url }) => state.isValidUrl(url),
  },
  {
    type: 'invalidUrl',
    check: ({ url }) => !state.isValidUrl(url),
    errorMessage: 'Invalid URL',
  },
];

const getFeedFormState = (url, feedInput) => (
  find(feedFormStates, ({ check }) => check({ url, feedInput }))
);

document.addEventListener('DOMContentLoaded', () => {
  const feedForm = document.getElementById('feed-form');
  const feedInput = document.getElementById('feed-input');
  const feedError = document.getElementById('feed-error');
  const feedBtn = document.getElementById('feed-btn');

  state.updateFormElements({ feedInput, feedError, feedBtn });

  feedForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const urlToFeed = feedInput.value;
    const currentFeed = getFeedData(urlProxy, urlToFeed);
    state.updateListUrl(urlToFeed);
    feedInput.value = '';

    currentFeed.then((data) => {
      const carrentFeedData = parseXml(data);
      state.updateFeedsList(carrentFeedData);
    });
  });

  feedInput.addEventListener('input', ({ target }) => {
    const { value } = target;
    state.updateFormState(getFeedFormState(value, feedInput));
  });
});

$('#feed-item-modal').on('show.bs.modal', (evt) => {
  const newsId = $(evt.relatedTarget).attr('data-news-id');
  renderModal(state.getFeedsItemById(newsId), evt.target);
});

watch(state.getState(), 'feedFormState', () => {
  const { type, errorMessage } = state.getFormState();
  const { feedInput, feedError, feedBtn } = state.getFormElements();

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

watch(state.getState(), 'allFeeds', () => {
  const feedContainer = document.getElementById('feed-container');
  feedContainer.innerHTML = '';
  state.getAllFeeds().forEach(feed => renderFeed(feed, feedContainer));
});
