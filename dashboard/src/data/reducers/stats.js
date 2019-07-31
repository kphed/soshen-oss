import {
  FETCH_STATS,
  SELECT_STATS_DATE_RANGE,
  SELECT_STATS_TIMEFRAME,
} from '../actions/types';
import {
  statsDateRanges,
  statsTimeframes,
} from '../../util/constants';
import {
  initialStateDecorator,
  evalStatusCases,
} from '../lib/reducers';
import { fetchStats } from '../lib/stats';

const statsState = initialStateDecorator({
  byId: {
    ...Object.values(statsDateRanges).reduce((acc, val) => ({ ...acc, [val]: {} }), {}),
  },
  allIds: {
    ...Object.values(statsDateRanges).reduce((acc, val) => ({ ...acc, [val]: [] }), {}),
  },
  dateRange: statsDateRanges.WEEK,
  timeframe: statsTimeframes.HOURLY,
});

const typeReducer = (state, action) => {
  let updatedState = {};
  const {
    type,
    response,
    error,
  } = action;

  if (response) {
    switch (type) {
      case FETCH_STATS:
        updatedState = fetchStats(state, action);
        break;
      case SELECT_STATS_DATE_RANGE:
        updatedState = { dateRange: parseInt(action.response, 10) };
        break;
      case SELECT_STATS_TIMEFRAME:
        updatedState = { timeframe: response };
        break;
      default:
        return state;
    }
  } else if (error) {
    updatedState = { ...error };
  }

  return evalStatusCases(state, action, updatedState);
};

export default (state = statsState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_STATS:
    case SELECT_STATS_DATE_RANGE:
    case SELECT_STATS_TIMEFRAME:
      return typeReducer(state, action);
    default:
      return state;
  }
};
