import { find, differenceWith } from 'lodash';

const getNewsList = feedList => feedList.reduce((newsList, feed) => [...newsList, feed.items], []);

const getTotalNewsList = feedList => (
  feedList.reduce((newsList, feed) => [...newsList, ...feed.items], [])
);

export const updateOldFeeds = (diff, oldFeeds) => (
  oldFeeds.map((feed, index) => ({ ...feed, items: [...feed.items, ...diff[index]] }))
);

export const getDiffBetweenFeedNews = (newFeeds, oldFeeds) => {
  const newNews = getNewsList(newFeeds);
  const oldNews = getNewsList(oldFeeds);

  return newNews.map((news, index) => (
    differenceWith(news, oldNews[index], (n, o) => n.pubDate === o.pubDate)));
};

export const getFeedsItemById = (appState, id) => {
  const { feeds } = appState;
  const totalNewsList = getTotalNewsList(feeds);
  return find(totalNewsList, news => news.id === id);
};
