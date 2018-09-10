import { watch } from 'melanke-watchjs';
import { assign } from 'lodash';
import $ from 'jquery';

import setViewInput from './view/inputView';
import setViewRequestStatus from './view/requestStatusView';
import setViewFeeds from './view/feedsView';
import setViewModal from './view/modalView';

import listenInput from './listener/inputListener';
import listenForm from './listener/formListener';
import listenModal from './listener/modalListener';

export default () => {
  const state = {
    input: '',
    modal: {},
    requestStatus: { status: '', message: '' },
    feeds: [],
    links: [],
  };

  const updateState = newState => assign(state, newState);

  const feedForm = document.getElementById('feed-form');
  const feedInput = document.getElementById('feed-input');

  feedInput.addEventListener('input', evt => listenInput(evt, state, updateState));
  feedForm.addEventListener('submit', evt => listenForm(evt, state, updateState));
  $('#feed-item-modal').on('show.bs.modal', evt => listenModal(evt, state, updateState));

  watch(state, 'input', (prop, action, newInput) => setViewInput(newInput));
  watch(state, 'requestStatus', (prop, action, newStatus) => setViewRequestStatus(newStatus));
  watch(state, 'feeds', (prop, action, newFeeds) => setViewFeeds(newFeeds));
  watch(state, 'modal', (prop, action, newModal) => setViewModal(newModal));
};
