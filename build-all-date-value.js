const moment = require('moment');

module.exports = (oldestDate, latestDate) => {
  const oldestMoment = moment(oldestDate, moment.ISO_8601);
  const latestMoment = moment(latestDate, moment.ISO_8601);
  const result = [];
  for (let targetMoment = oldestMoment; targetMoment.isSameOrBefore(latestMoment, 'day'); targetMoment.add(1, 'days')) {
    result.push({ date: targetMoment.format('YYYY-MM-DD'), value: 0 });
  }
  return result;
};
