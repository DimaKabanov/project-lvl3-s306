import validator from 'validator';

const state = {
  feedFormState: {},
  formElements: {},
  allFeeds: [],
  listUrl: [],
};

export const updateFeedsList = (newFeed) => {
  state.allFeeds = [...state.allFeeds, newFeed];
};

export const replaceFeedsList = (updatedFeedList) => {
  state.allFeeds = updatedFeedList;
};

export const replaceFormState = (newState) => {
  state.feedFormState = newState;
};

export const replaceFormElements = (elements) => {
  state.formElements = elements;
};

export const updateListUrl = (url) => {
  state.listUrl = [...state.listUrl, url];
};

export const isDoubleUrl = url => state.listUrl.includes(url);
export const isValidUrl = url => validator.isURL(url);

export const getAllFeeds = () => state.allFeeds;
export const getFormState = () => state.feedFormState;
export const getFormElements = () => state.formElements;
export const getListUrl = () => state.listUrl;
export const getState = () => state;
