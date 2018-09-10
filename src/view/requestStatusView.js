const removeAlert = () => {
  const renderedAlert = document.getElementById('alert-wrapper');

  if (renderedAlert) {
    renderedAlert.remove();
  }
};

const renderAlert = (type, message) => {
  removeAlert();
  const headerContainer = document.getElementById('header-container');
  const alertTemplate = document.getElementById('alert-template');
  const alertWrapper = alertTemplate.content.getElementById('alert-wrapper');
  const alert = alertWrapper.cloneNode(true);

  alert.querySelector('#alert').classList.add(`alert-${type}`);
  alert.querySelector('#alert').textContent = message;

  headerContainer.appendChild(alert);
};

export default ({ status, message }) => {
  const feedBtn = document.getElementById('feed-btn');
  const feedInput = document.getElementById('feed-input');

  switch (status) {
    case 'load':
      renderAlert('primary', 'Download RSS');
      feedBtn.disabled = true;
      feedInput.disabled = true;
      break;
    case 'successfully':
      renderAlert('success', `Load RSS by URL ${message} was successful`);
      feedInput.disabled = false;
      feedInput.focus();
      feedInput.value = '';
      setTimeout(removeAlert, 5000);
      break;
    case 'failed':
      renderAlert('danger', `RSS download failed - ${message}`);
      feedInput.disabled = false;
      feedInput.focus();
      feedBtn.disabled = false;
      setTimeout(removeAlert, 5000);
      break;
    default:
      throw new Error(`Incorrect status '${status}'`);
  }
};
