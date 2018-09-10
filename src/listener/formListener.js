
import getXml from '../utils/request';
import parseXml from '../utils/parser';
import getInputState from '../utils/inputState';
import { getDiffBetweenFeedNews, updateOldFeeds } from '../utils/feedUtils';

let timeoutID;

const updateRenderedFeeds = (appState, updateState) => {
  const { feeds, links } = appState;
  const promises = links.map(link => getXml(link));

  Promise.all(promises)
    .then((responses) => {
      const newFeedsData = responses.map(response => parseXml(response));
      const oldFeedsData = feeds;
      const diff = getDiffBetweenFeedNews(newFeedsData, oldFeedsData);
      const updatedFeeds = updateOldFeeds(diff, oldFeedsData);
      updateState({ ...appState, feeds: updatedFeeds });
    })
    .then(() => {
      timeoutID = setTimeout(updateRenderedFeeds, 5000, appState, updateState);
    })
    .catch((error) => {
      console.log(error);
      timeoutID = setTimeout(updateRenderedFeeds, 5000, appState, updateState);
    });
};

export default (evt, appState, updateState) => {
  evt.preventDefault();
  const { feeds, links } = appState;
  const feedInput = document.getElementById('feed-input');
  const urlToFeed = feedInput.value;
  feedInput.value = '';
  const { type } = getInputState(feedInput.value, appState);
  updateState({ ...appState, input: type, requestStatus: 'load' });
  const currentFeedXml = getXml(urlToFeed);

  currentFeedXml.then((xml) => {
    const parsedXml = parseXml(xml);

    updateState({
      requestStatus: 'successfully',
      feeds: [...feeds, parsedXml],
      links: [...links, urlToFeed],
    });

    clearTimeout(timeoutID);
    updateRenderedFeeds(appState, updateState);
  }).catch(() => updateState({ ...appState, requestStatus: 'failed' }));
};
