import { getFeedsItemById } from '../utils/feedUtils';

export default (evt, appState, updateState) => {
  const { newsId } = evt.relatedTarget.dataset;
  const modalData = getFeedsItemById(appState, newsId);
  updateState({ ...appState, modal: modalData });
};
