module.exports = req => (req.headers['x-forwarded-for'] || '').split(',')[0]
  || req.connection.remoteAddress
  || req.socket.remoteAddress
  || (req.connection.socket ? req.connection.socket.remoteAddress : null);
