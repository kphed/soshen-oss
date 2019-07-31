const {
  get,
  post,
} = require('axios');
const endpoints = require('../api');
const { mapRequestPropsToImporterProps } = require('../util/prop-types');
const sendError = require('../../util/send-error');
const throwError = require('../../util/throw-error');

const getHandler = (path) => {
  try {
    return get(path);
  } catch (err) {
    return throwError(err);
  }
};

const postHandler = (path, props) => {
  try {
    return post(path, props);
  } catch (err) {
    return throwError(err);
  }
};

module.exports = async (req, res) => {
  try {
    const {
      locals: {
        apiEndpoint,
        requestProps,
      },
    } = res;

    const apiEndpointDetails = endpoints[apiEndpoint];
    const importerProps = apiEndpointDetails.importerProps
      ? mapRequestPropsToImporterProps(requestProps, apiEndpointDetails.importerProps)
      : requestProps;

    const { importerUrl } = apiEndpointDetails;
    const importerPath = `${importerUrl}${apiEndpointDetails.importerPath}`;

    const { data } = apiEndpointDetails.method === 'GET'
      ? await getHandler(importerPath)
      : await postHandler(importerPath, importerProps);

    return res.json(data);
  } catch (err) {
    sendError(res, 400, err.message);

    return throwError(err);
  }
};
