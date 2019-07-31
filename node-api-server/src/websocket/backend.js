const WebSocket = require('ws');
const ReconnectingWebSocket = require('reconnecting-websocket');
const { broadcastMessage } = require('./frontend');
const { CARDANO_BLOCKCHAIN_API_URL } = require('../config');

const setUpBackendConnection = () => {
  try {
    const backendWs = new ReconnectingWebSocket(CARDANO_BLOCKCHAIN_API_URL, [], {
      WebSocket,
      connectionTimeout: 3000,
      debug: true,
    });

    backendWs.addEventListener('open', () => {
      console.log('Connected to Backend WebSocket');
    });

    backendWs.addEventListener('close', () => {
      console.log('Disconnected from Backend WebSocket');
    });

    backendWs.addEventListener('error', ({ err }) => {
      throw err;
    });

    backendWs.addEventListener('message', ({ data: message }) => {
      const {
        channel,
        data,
      } = JSON.parse(message);

      // Broadcast the received data to all connected clients
      broadcastMessage(channel, data);
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { setUpBackendConnection };
