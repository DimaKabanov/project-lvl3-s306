import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { find } from 'lodash';
import { watch } from 'melanke-watchjs';
import getFeedData from './request';
import parseXml from './parser';
import { renderFeed, renderModal } from './render';
import { getDiffBetweenFeedNews, getFeedsItemById, updateOldFeeds } from './feedUtils';
import * as state from './state';

const urlProxy = 'https://thingproxy.freeboard.io/fetch/';
const newState = state.initState();

const updateRenderedFeeds = () => {
  setInterval(() => {
    const promises = state.getListUrl(newState).map(urlToFeed => getFeedData(urlProxy, urlToFeed));

    Promise.all(promises)
      .then((responses) => {
        const newFeedsData = responses.map(response => parseXml(response));
        const oldFeedsData = state.getAllFeeds(newState);
        const diff = getDiffBetweenFeedNews(newFeedsData, oldFeedsData);
        const updatedFeeds = updateOldFeeds(diff, oldFeedsData);
        state.replaceFeedsList(newState, updatedFeeds);
      });
  }, 5000);
};

const feedFormStates = [
  {
    type: 'emptyField',
    check: ({ feedInput }) => feedInput.value === '',
  },
  {
    type: 'submittedUrl',
    check: ({ url }) => state.isDoubleUrl(newState, url),
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

  state.replaceFormElements(newState, { feedInput, feedError, feedBtn });

  feedForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const urlToFeed = feedInput.value;
    const currentFeed = getFeedData(urlProxy, urlToFeed);
    state.updateListUrl(newState, urlToFeed);
    feedInput.value = '';

    currentFeed.then((data) => {
      const currentFeedData = parseXml(data);
      state.updateFeedsList(newState, currentFeedData);
    });
  });

  feedInput.addEventListener('input', ({ target }) => {
    const { value } = target;
    state.replaceFormState(newState, getFeedFormState(value, feedInput));
  });

  updateRenderedFeeds();
});

$('#feed-item-modal').on('show.bs.modal', (evt) => {
  const newsId = $(evt.relatedTarget).attr('data-news-id');
  renderModal(getFeedsItemById(state.getAllFeeds(newState), newsId), evt.target);
});

watch(newState, 'feedFormState', () => {
  const { type, errorMessage } = state.getFormState(newState);
  const { feedInput, feedError, feedBtn } = state.getFormElements(newState);

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

watch(newState, 'allFeeds', () => {
  const feedContainer = document.getElementById('feed-container');
  feedContainer.innerHTML = '';
  state.getAllFeeds(newState).forEach(feed => renderFeed(feed, feedContainer));
});
