import { find } from 'lodash';
import validator from 'validator';

const state = {
  feedFormState: {},
  formElements: {},
  allFeeds: [],
  listUrl: new Set(),
};

export const updateFeedsList = (newFeed) => {
  state.allFeeds = [...state.allFeeds, newFeed];
};

export const updateFormState = (newState) => {
  state.feedFormState = newState;
};

export const updateFormElements = (elements) => {
  state.formElements = elements;
};

export const updateListUrl = (url) => {
  state.listUrl.add(url);
};

export const isDoubleUrl = url => state.listUrl.has(url);
export const isValidUrl = url => validator.isURL(url);
export const getState = () => state;
export const getAllFeeds = () => state.allFeeds;
export const getFormState = () => state.feedFormState;
export const getFormElements = () => state.formElements;

export const getFeedsItemById = (id) => {
  const allNews = state.allFeeds.reduce((news, feed) => [...news, ...feed.items], []);
  return find(allNews, news => news.id === id);
};
