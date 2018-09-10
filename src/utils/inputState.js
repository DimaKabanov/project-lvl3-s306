import validator from 'validator';
import { find } from 'lodash';

export default (value, appState) => {
  const { links } = appState;

  const inputStates = [
    {
      type: 'emptyField',
      check: url => url === '',
    },
    {
      type: 'submittedUrl',
      check: url => links.includes(url),
    },
    {
      type: 'validUrl',
      check: url => validator.isURL(url),
    },
    {
      type: 'invalidUrl',
      check: url => !validator.isURL(url),
    },
  ];

  return find(inputStates, ({ check }) => check(value));
};
