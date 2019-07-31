const WebSocket = require('ws');
const expressWs = require('express-ws');
const { some } = require('lodash');
const getProjectDetail = require('../util/get-project-detail');
const updateStats = require('../util/update-project-stats');

// Map the user WS command to our internal event names
const commandsToChannels = {
  transactioncreated: 'txCreated',
};

const channelsToCommands = {
  txCreated: 'transactionCreated',
};

const clientConnections = {};
const clientSubscriptions = {};
const projectUpdateTasks = [];

const isClientActive = client => client.readyState === WebSocket.OPEN;

const isSubscribed = (clientId, channel) => {
  const subscription = clientSubscriptions[clientId] || [];

  return subscription.indexOf(channel) > -1;
};

const handleUserMessage = (client, message) => {
  const { id: clientId } = client;

  const subscribeUser = (channel) => {
    const subscription = clientSubscriptions[clientId] || [];

    if (!isSubscribed(clientId, channel)) {
      subscription.push(channel);
      clientSubscriptions[clientId] = subscription;
    }
  };

  const unsubscribeUser = (channel) => {
    const subscription = clientSubscriptions[clientId] || [];

    if (isSubscribed(clientId, channel)) {
      const idx = subscription.indexOf(channel);
      subscription.splice(idx, 1);
      clientSubscriptions[clientId] = subscription;
    }
  };

  const acknowledgeUserMessage = (success = false, type = '', channel = '') => {
    if (!isClientActive(client)) {
      return;
    }

    const validActions = ['sub', 'unsub'];
    const messageChannel = channelsToCommands[channel];
    const eventResponse = type === 'sub' ? 'subscribed' : 'unsubscribed';
    const actionResponse = some(validActions, action => action === type) || `${type} is not a valid action, must be sub or unsub`;
    const channelResponse = messageChannel || `${channel} is not a valid message channel`;

    try {
      client.send(JSON.stringify({
        event: success ? eventResponse : 'error',
        data: {
          action: actionResponse,
          channel: channelResponse,
        },
      }));
    } catch (err) {
      throw err;
    }
  };

  try {
    const [type, command] = message.toLowerCase().split(' ');

    if (type && type.length && command && command.length) {
      const channel = commandsToChannels[command];

      if (channel) {
        switch (type) {
          case 'sub':
            subscribeUser(clientId, channel);

            // Inform the user for the successful operation
            acknowledgeUserMessage(true, type, channel);
            break;
          case 'unsub':
            unsubscribeUser(clientId, channel);

            // Inform the user for the successful operation
            acknowledgeUserMessage(true, type, channel);
            break;
          default:
            // Inform the user about the invalid operation type
            acknowledgeUserMessage(false, type, channel);
        }
      } else {
        // Inform the user for the invalid channel
        acknowledgeUserMessage(false, type, command);
      }
    } else {
      acknowledgeUserMessage(false);
    }
  } catch (err) {
    acknowledgeUserMessage(false);

    throw err;
  }
};

// Broadcast received message from backend to connected clients
const broadcastMessage = (channel, data) => {
  const dequeueProjectUpdateTask = async () => {
    if (projectUpdateTasks.length > 0) {
      const {
        projectName,
        apiId,
        blockchain,
      } = projectUpdateTasks.shift();

      try {
        const apiEndpoint = `/ws/${channel}`;
        const { projectId } = await getProjectDetail(projectName, apiId, blockchain);

        await updateStats(projectId, apiEndpoint);
      } catch (err) {
        throw err;
      }

      // Immediately process the next task when available
      if (projectUpdateTasks.length) {
        dequeueProjectUpdateTask();
      }
    }
  };

  // Process all clients from each project credentials
  Object.keys(clientConnections).forEach((credentials) => {
    const clients = clientConnections[credentials];
    let hasActiveClient = false;

    clients.forEach((client) => {
      try {
        // Only send if the client is available and subscribed to the channel
        if (isClientActive(client) && isSubscribed(client.id, channel)) {
          hasActiveClient = true;

          client.send(JSON.stringify({
            event: channelsToCommands[channel],
            data,
          }));
        }
      } catch (err) {
        throw err;
      }
    });

    if (hasActiveClient) {
      projectUpdateTasks.push({
        ...JSON.parse(credentials),
        channel: channelsToCommands[channel],
      });

      if (projectUpdateTasks.length === 1) {
        dequeueProjectUpdateTask();
      }
    }
  });
};

const setUpFrontendConnection = (app) => {
  expressWs(app, null, {
    wsOptions: {
      verifyClient: async (info, callback) => {
        const { req } = info;
        const { url } = req;
        const [, projectName, apiId, blockchain] = url.split('/');
        const apiEndpoint = '/ws/open';

        try {
          const projectDetail = await getProjectDetail(projectName, apiId, blockchain);

          await updateStats(projectDetail.projectId, apiEndpoint);

          req.projectCredentials = JSON.stringify({ projectName, apiId, blockchain });

          return callback(true);
        } catch (err) {
          callback(false, 401);

          throw err;
        }
      },
    },
  });

  app.ws('*', (con, req) => {
    const { projectCredentials } = req;
    const ws = con;

    ws.projectCredentials = projectCredentials;

    if (!clientConnections[projectCredentials]) {
      clientConnections[projectCredentials] = [];
    }

    clientConnections[projectCredentials].push(ws);

    console.log(`Client connected: ${ws.projectCredentials}`, projectCredentials);

    ws.on('message', msg => handleUserMessage(ws, msg));

    ws.on('error', (error) => {
      throw error;
    });
  });
};

module.exports = {
  setUpFrontendConnection,
  broadcastMessage,
};
