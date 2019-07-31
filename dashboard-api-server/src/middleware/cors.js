const cors = require('cors');
const { DASHBOARD_URL } = require('../config');

module.exports = cors({
  origin: DASHBOARD_URL,
  methods: 'GET, HEAD, POST',
  allowedHeaders: ['Content-Type'],
});
