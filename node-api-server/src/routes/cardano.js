const { post } = require('axios');
const { forEach } = require('lodash');
const sendError = require('../util/send-error');
const throwError = require('../util/throw-error');
const { mapRequestPropsToImporterProps } = require('./util/prop-types');
const handleRoute = require('./middleware/handle-route');
const {
  prefixRoute,
  endpoints,
} = require('./api/cardano-api');

const sendTransaction = async (res, signedTx, signedTxEndpoint) => {
  await post(signedTxEndpoint, { signedTx });
  return res.status(200).end();
};

const handleCustomRoute = async (req, res) => {
  try {
    const {
      locals: {
        apiEndpoint,
        requestProps,
      },
    } = res;

    const apiEndpointDetails = endpoints[apiEndpoint];
    const { importerUrl } = apiEndpointDetails;
    const signedTxEndpoint = `${importerUrl}${apiEndpointDetails.importerPath}`;

    const { signedTx } = mapRequestPropsToImporterProps(requestProps, apiEndpointDetails.importerProps);

    return sendTransaction(res, signedTx, signedTxEndpoint);
  } catch (err) {
    sendError(res, 400, err.message);

    return throwError(err);
  }
};

module.exports = server => (
  forEach(endpoints, ({ path }) => {
    if (path === prefixRoute('transactions/sendTransaction')) {
      server.route(`*${path}`).post(handleCustomRoute);
    } else {
      server.route(`*${path}`).get(handleRoute).post(handleRoute);
    }
  })
);
