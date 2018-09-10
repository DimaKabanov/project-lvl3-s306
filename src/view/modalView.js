export default (modalData) => {
  const { title, description } = modalData;
  const modal = document.getElementById('feed-item-modal');
  const modalTitle = modal.querySelector('#feed-item-modal-label');
  const modalBody = modal.querySelector('#feed-item-modal-body');

  modalTitle.textContent = title;
  modalBody.textContent = description;
};
