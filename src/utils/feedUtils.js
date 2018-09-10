import { find, differenceWith } from 'lodash';

const getTotalNewsList = feedList => (
  feedList.reduce((newsList, feed) => [...newsList, ...feed.items], [])
);

export const updateOldFeeds = (diff, oldFeed) => (
  { ...oldFeed, items: [...diff, ...oldFeed.items] }
);

export const getDiffBetweenFeedNews = (newFeed, oldFeed) => (
  differenceWith(newFeed.items, oldFeed.items, (n, o) => n.pubDate === o.pubDate)
);

export const getFeedsItemById = (appState, id) => {
  const { feeds } = appState;
  const totalNewsList = getTotalNewsList(feeds);
  return find(totalNewsList, news => news.id === id);
};

export const getFeedDataByUrl = (feeds, url) => find(feeds, ({ link }) => link === url);

export const updateFeedByUrl = (feeds, updatedFeed, url) => (
  feeds.map(feed => (feed.link === url ? updatedFeed : feed))
);
