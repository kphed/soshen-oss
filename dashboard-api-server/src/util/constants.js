module.exports = {
  routeErrorMessages: {
    FETCH_PROJECT_STATS_FAILED: 'Failed to fetch project stats',
    FETCH_API_STATS_FAILED: 'Failed to fetch api stats',
    FETCH_PROJECTS_FAILED: 'Failed to fetch user projects',
    CREATE_PROJECT_FAILED: 'Failed to create project',
    UPDATE_PROJECT_FAILED: 'Failed to update project',
    DELETE_PROJECT_FAILED: 'Failed to delete project',
  },
  apiErrorCodes: {
    NONE: 'NONE',
    ERROR: 'ERROR',
    DB_ERROR: 'DB_ERROR',
    INPUT_ERROR: 'INPUT_ERROR',
  },
  regexPatterns: {
    ALPHANUMERIC: /^[A-Za-z0-9]+$/,
    XSS_BLACKLIST: /^[^%<>^$]+$/,
    PROJECT_NAME: /^[A-Za-z0-9\-_]+$/,
  },
};
