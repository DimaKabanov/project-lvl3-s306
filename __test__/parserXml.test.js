import fs from 'fs';
import parseXml from '../src/parser';

test('Check parsing XML', () => {
  const feedStr = fs.readFileSync('./__fixtures__/feed', 'utf8');
  const actual = parseXml(feedStr);
  const expected = {};
  expect(actual).toBe(expected);
});
