const renderAlert = (type, message) => {
  const renderedAlert = document.getElementById('alert-wrapper');

  if (renderedAlert) {
    renderedAlert.remove();
  }

  const headerContainer = document.getElementById('header-container');
  const alertTemplate = document.getElementById('alert-template');
  const alertWrapper = alertTemplate.content.getElementById('alert-wrapper');
  const alert = alertWrapper.cloneNode(true);

  alert.querySelector('#alert').classList.add(`alert-${type}`);
  alert.querySelector('#alert').textContent = message;

  headerContainer.appendChild(alert);
};

export default (status) => {
  const feedBtn = document.getElementById('feed-btn');
  const feedInput = document.getElementById('feed-input');

  switch (status) {
    case 'load':
      renderAlert('primary', 'Download RSS');
      feedBtn.disabled = true;
      feedInput.disabled = true;
      break;
    case 'successfully':
      renderAlert('success', 'The RSS download was successful');
      feedInput.disabled = false;
      feedInput.focus();
      feedInput.value = '';
      break;
    case 'failed':
      renderAlert('danger', 'RSS download failed');
      feedInput.disabled = false;
      feedInput.focus();
      feedBtn.disabled = false;
      break;
    default:
      throw new Error(`Incorrect status '${status}'`);
  }
};
