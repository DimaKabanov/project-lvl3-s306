/* eslint no-param-reassign: ["error", { "props": false }] */

import validator from 'validator';

export const initState = () => (
  {
    feedFormState: {},
    formElements: {},
    allFeeds: [],
    listUrl: [],
  }
);

export const updateFeedsList = (state, newFeed) => {
  state.allFeeds = [...state.allFeeds, newFeed];
};

export const replaceFeedsList = (state, updatedFeedList) => {
  state.allFeeds = updatedFeedList;
};

export const replaceFormState = (state, newFormState) => {
  state.feedFormState = newFormState;
};

export const replaceFormElements = (state, elements) => {
  state.formElements = elements;
};

export const updateListUrl = (state, url) => {
  state.listUrl = [...state.listUrl, url];
};

export const isDoubleUrl = ({ listUrl }, url) => listUrl.includes(url);
export const isValidUrl = url => validator.isURL(url);

export const getAllFeeds = ({ allFeeds }) => allFeeds;
export const getFormState = ({ feedFormState }) => feedFormState;
export const getFormElements = ({ formElements }) => formElements;
export const getListUrl = ({ listUrl }) => listUrl;
