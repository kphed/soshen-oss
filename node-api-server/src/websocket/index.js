const { setUpBackendConnection } = require('./backend');
const { setUpFrontendConnection } = require('./frontend');

const setUpWebSocket = (app) => {
  setUpBackendConnection();
  setUpFrontendConnection(app);
};

module.exports = setUpWebSocket;
