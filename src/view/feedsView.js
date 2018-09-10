const createFeedItem = (feedItemData) => {
  const { title, link, id } = feedItemData;
  const feedItemTemplate = document.getElementById('feed-item-template');
  const feedItemWrapper = feedItemTemplate.content.getElementById('feed-item-wrapper');
  const feedItem = feedItemWrapper.cloneNode(true);

  feedItem.querySelector('#feed-item-link').textContent = title;
  feedItem.querySelector('#feed-item-link').setAttribute('href', link);
  feedItem.querySelector('#feed-item-btn').setAttribute('data-news-id', id);

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

export default (feeds) => {
  const feedContainer = document.getElementById('feed-container');
  feedContainer.innerHTML = '';
  feeds.forEach(feed => feedContainer.appendChild(createFeed(feed)));
};
