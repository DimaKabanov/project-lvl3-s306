export default (type) => {
  const feedInput = document.getElementById('feed-input');
  const feedError = document.getElementById('feed-error');
  const feedBtn = document.getElementById('feed-btn');

  switch (type) {
    case 'validUrl':
      feedInput.classList.remove('is-invalid');
      feedError.textContent = '';
      feedBtn.disabled = false;
      break;
    case 'emptyField':
      feedInput.classList.remove('is-invalid');
      feedError.textContent = '';
      feedBtn.disabled = true;
      feedInput.value = '';
      break;
    case 'invalidUrl':
      feedInput.classList.add('is-invalid');
      feedError.textContent = 'Invalid URL';
      feedBtn.disabled = true;
      break;
    case 'submittedUrl':
      feedInput.classList.add('is-invalid');
      feedError.textContent = 'This URL is already in the list';
      feedBtn.disabled = true;
      break;
    default:
      throw new Error(`Incorrect type '${type}'`);
  }
};
