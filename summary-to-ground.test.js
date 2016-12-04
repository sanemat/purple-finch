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
  const expected = [-200, 1.0333333333333334, -150, 0.7, -100, 0, -50, 0, 0, 0, 50, 0.4];
  t.deepEqual(summaryToGround(example), expected);
});
