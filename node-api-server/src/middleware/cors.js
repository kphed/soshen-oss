const cors = require('cors');

module.exports = cors({
  origin: '*',
  methods: 'GET, HEAD, POST',
  allowedHeaders: ['Content-Type'],
});
