import test from 'ava'; // eslint-disable-line import/no-extraneous-dependencies

const buildAllDateValue = require('./build-all-date-value');

test('builds date and value', (t) => {
  const expected = new Map([
    ['2016-11-12', { value: 0 }],
    ['2016-11-13', { value: 0 }],
    ['2016-11-14', { value: 0 }],
  ]);
  t.deepEqual(buildAllDateValue('2016-11-12T00:00:00+09:00', '2016-11-14T00:00:00+09:00'), expected);
});
