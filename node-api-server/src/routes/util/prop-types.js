const { map } = require('lodash');

module.exports = {
  propTypes: {
    addresses: 'array',
    transactionHashes: 'array',
    startingFrom: 'string',
    transactionHash: 'string',
    before: 'string',
    after: 'string',
    limit: 'number',
    page: 'number',
    blockNumber: 'number',
  },
  mapRequestPropsToImporterProps: (requestProps, importerProps) => {
    const mappedProps = {};

    map(requestProps, (val, key) => {
      const mappedPropKey = importerProps[key] || key;

      mappedProps[mappedPropKey] = val;
    });

    return mappedProps;
  },
};
