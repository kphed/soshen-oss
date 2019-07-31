const blockchain = 'cardano';
const prefixRoute = route => `/${blockchain}/${route}`;

const { CARDANO_BLOCKCHAIN_API_URL } = require('../../config');

const cardanoImporterUrl = CARDANO_BLOCKCHAIN_API_URL || 'https://iohk-mainnet.yoroiwallet.com';

module.exports = {
  blockchain,
  prefixRoute,
  endpoints: {
    [prefixRoute('healthcheck')]: {
      path: prefixRoute('healthcheck'),
      method: 'GET',
      importerPath: '/api/healthcheck',
      importerUrl: cardanoImporterUrl,
    },
    [prefixRoute('addresses/removeUnusedAddresses')]: {
      path: prefixRoute('addresses/removeUnusedAddresses'),
      importerPath: '/api/addresses/filterUsed',
      requiredProps: ['addresses'],
      importerUrl: cardanoImporterUrl,
    },
    [prefixRoute('addresses/listAddressUtxos')]: {
      path: prefixRoute('addresses/listAddressUtxos'),
      importerPath: '/api/txs/utxoForAddresses',
      requiredProps: ['addresses'],
      importerUrl: cardanoImporterUrl,
    },
    [prefixRoute('addresses/fetchAddressUtxoSum')]: {
      path: prefixRoute('addresses/fetchAddressUtxoSum'),
      importerPath: '/api/txs/utxoSumForAddresses',
      requiredProps: ['addresses'],
      importerUrl: cardanoImporterUrl,
    },
    [prefixRoute('addresses/listAddressTransactions')]: {
      path: prefixRoute('addresses/listAddressTransactions'),
      importerPath: '/api/txs/history',
      requiredProps: ['addresses', 'startingFrom'],
      importerProps: {
        startingFrom: 'dateFrom',
      },
      importerUrl: cardanoImporterUrl,
    },
    [prefixRoute('transactions/listTransactionBodies')]: {
      path: prefixRoute('transactions/listTransactionBodies'),
      importerPath: '/api/txs/txBodies',
      requiredProps: ['transactionHashes'],
      importerProps: {
        transactionHashes: 'txsHashes',
      },
      importerUrl: cardanoImporterUrl,
    },
    [prefixRoute('transactions/sendTransaction')]: {
      path: prefixRoute('transactions/sendTransaction'),
      importerPath: '/api/txs/signed',
      requiredProps: ['transactionHash'],
      importerProps: {
        transactionHash: 'signedTx',
      },
      importerUrl: cardanoImporterUrl,
    },
    [prefixRoute('blocks/fetchBestBlockNumber')]: {
      path: prefixRoute('blocks/fetchBestBlockNumber'),
      method: 'GET',
      importerPath: '/api/bestblock',
      importerUrl: cardanoImporterUrl,
    },
  },
};
