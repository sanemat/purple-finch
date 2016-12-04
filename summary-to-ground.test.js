import test from 'ava'; // eslint-disable-line import/no-extraneous-dependencies

const summaryToGround = require('./summary-to-ground');

const example = new Map([
  ['2016-10-28', { value: -3100 }],
  ['2016-10-29', { value: -2100 }],
  ['2016-10-30', { value: 0 }],
  ['2016-10-31', { value: 0 }],
  ['2016-11-01', { value: 0 }],
  ['2016-11-02', { value: -1200 }],
]);

test('converts summary to ground', (t) => {
  const expected = [-3, -31, -2, -21, -1, 0, 0, 0, 1, 0, 2, -12];
  t.deepEqual(summaryToGround(example), expected);
});
