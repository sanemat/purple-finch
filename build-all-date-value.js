const moment = require('moment-timezone');

module.exports = (oldestDate, latestDate) => {
  const oldestMoment = moment.tz(oldestDate, moment.ISO_8601, "Asia/Tokyo");
  const latestMoment = moment.tz(latestDate, moment.ISO_8601, "Asia/Tokyo");
  const result = [];
  for (let targetMoment = oldestMoment; targetMoment.isSameOrBefore(latestMoment, 'day'); targetMoment.add(1, 'days')) {
    result.push({ date: targetMoment.format('YYYY-MM-DD'), value: 0 });
  }
  return result;
};
