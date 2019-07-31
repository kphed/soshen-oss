const moment = require('moment');

module.exports = {
  timestampToDateTime: timestamp => moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss'),
  dateTimeToTimestamp: dateTime => `${moment(dateTime).unix()}`,
  currentDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
};
