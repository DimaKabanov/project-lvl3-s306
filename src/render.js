const createFeedItem = (feedItemData) => {
  const { title, description, link } = feedItemData;
  const feedItemTemplate = document.getElementById('feed-item-template');
  const feedItemLink = feedItemTemplate.content.getElementById('feed-item-link');
  const feedItem = feedItemLink.cloneNode(true);

  feedItem.setAttribute('href', link);
  feedItem.querySelector('#feed-item-title').textContent = title;
  feedItem.querySelector('#feed-item-desc').textContent = description;

  return feedItem;
};

const createFeed = (feedData) => {
  const { title, description, items } = feedData;
  const feedTemplate = document.getElementById('feed-template');
  const feedWrapper = feedTemplate.content.getElementById('feed-wrapper');
  const feed = feedWrapper.cloneNode(true);

  feed.querySelector('#feed-title').textContent = title;
  feed.querySelector('#feed-desc').textContent = description;
  const feedList = feed.querySelector('#feed-list');

  items.forEach((feedItemData) => {
    const feedItem = createFeedItem(feedItemData);
    feedList.appendChild(feedItem);
  });

  return feed;
};

const renderFeed = (feedData, feedContainer) => {
  const feed = createFeed(feedData);
  feedContainer.appendChild(feed);
};

export default renderFeed;
