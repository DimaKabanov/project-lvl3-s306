import getInputState from '../utils/inputState';

export default (evt, appState, updateState) => {
  const { value } = evt.target;
  const { type } = getInputState(value, appState);
  updateState({ ...appState, input: type });
};
