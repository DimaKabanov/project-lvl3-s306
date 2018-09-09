import { find, differenceWith } from 'lodash';
import { getAllFeeds } from './state';

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

export const getFeedsItemById = (id) => {
  const totalNewsList = getTotalNewsList(getAllFeeds());
  return find(totalNewsList, news => news.id === id);
};
