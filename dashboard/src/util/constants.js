module.exports = {
  notificationTypes: {
    INFORMATION: 'information',
    WARNING: 'warning',
    ERROR: 'error',
  },
  errorCodes: {
    UNKNOWN: -1,
    NONE: 0,
    FETCH_PROJECTS_FAILED: 1,
    CREATE_PROJECT_FAILED: 2,
    UPDATE_PROJECT_FAILED: 3,
    DELETE_PROJECT_FAILED: 4,
    REQUEST_FAILED: 400,
  },
  errorMessages: {
    UNKNOWN: 'Unknown error occured',
    NONE: '',
    FETCH_PROJECTS_FAILED: 'Failed to fetch project records',
    CREATE_PROJECT_FAILED: 'Unable to create project',
    UPDATE_PROJECT_FAILED: 'Unable to update project',
    DELETE_PROJECT_FAILED: 'Unable to delete project',
    REQUEST_FAILED: 'Request failed',
  },
  projectBlockchains: {
    CARDANO: 'CARDANO',
  },
  projectModes: {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
  },
  statsDateRanges: {
    DAY: 1,
    WEEK: 7,
    MONTH: 30,
  },
  statsTimeframes: {
    HOURLY: 1,
    DAILY: 2,
  },
  colorPalette: [
    '#FF4D7D',
    '#009EF2',
    '#FFD030',
    '#00C4C3',
    '#A745FF',
    '#C9CBCF',
    '#4CAD00',
    '#00D6D9',
    '#FF7800',
    '#B3E943',
    '#C0B7DC',
    '#FFF254',
    '#FF0000',
    '#B39000',
    '#A0F200',
    '#D3005B',
    '#FF7667',
    '#F7CCE5',
    '#984EA2',
    '#A4922E',
  ],
};