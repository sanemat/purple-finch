const moment = require('moment');
const buildAllDateValue = require('./build-all-date-value');

module.exports = (transactions) => {
  const first = transactions[0].updated_at;
  const last = transactions[transactions.length - 1].updated_at;
  const range = buildAllDateValue(first, last);
  transactions.forEach((transaction) => {
    const key = moment.tz(transaction.updated_at, moment.ISO_8601, 'Asia/Tokyo').format('YYYY-MM-DD');
    if (range.has(key)) {
      const target = range.get(key);
      target.value += transaction.amount * transaction.jpyrate;
      range.set(key, target);
    }
  });
  return range;
};
