
import getXml from '../utils/request';
import parseXml from '../utils/parser';
import getInputState from '../utils/inputState';
import {
  getDiffBetweenFeedNews,
  updateOldFeeds,
  getFeedDataByUrl,
  updateFeedByUrl,
} from '../utils/feedUtils';

const updateRenderedFeeds = (url, appState, updateState) => {
  const { feeds } = appState;
  const updatedFeedXml = getXml(url);

  updatedFeedXml.then((xml) => {
    const newFeedData = parseXml(xml);
    const { link } = newFeedData;
    const oldFeedData = getFeedDataByUrl(feeds, link);
    const diff = getDiffBetweenFeedNews(newFeedData, oldFeedData);
    const updatedFeed = updateOldFeeds(diff, oldFeedData);
    const updatedFeeds = updateFeedByUrl(feeds, updatedFeed, link);

    updateState({ ...appState, feeds: updatedFeeds });
  })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => setTimeout(updateRenderedFeeds, 5000, url, appState, updateState));
};

export default (evt, appState, updateState) => {
  evt.preventDefault();
  const { feeds, links } = appState;
  const feedInput = document.getElementById('feed-input');
  const urlToFeed = feedInput.value;
  updateState({ ...appState, requestStatus: 'load' });
  const currentFeedXml = getXml(urlToFeed);

  currentFeedXml.then((xml) => {
    const parsedXml = parseXml(xml);

    updateState({
      requestStatus: 'successfully',
      feeds: [...feeds, parsedXml],
      links: [...links, urlToFeed],
    });

    updateRenderedFeeds(urlToFeed, appState, updateState);
  }).catch(() => updateState({ ...appState, requestStatus: 'failed' }));
};
