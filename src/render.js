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

export const renderFeed = (feedData, feedContainer) => {
  const feed = createFeed(feedData);
  feedContainer.appendChild(feed);
};

export const renderModal = (modalData, modal) => {
  const { title, description } = modalData;
  const modalTitle = modal.querySelector('#feed-item-modal-label');
  const modalBody = modal.querySelector('#feed-item-modal-body');

  modalTitle.textContent = title;
  modalBody.textContent = description;
};
