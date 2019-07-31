import { post } from 'axios';
import {
  FETCH_STATS,
  SELECT_STATS_DATE_RANGE,
  SELECT_STATS_TIMEFRAME,
} from './types';
import {
  errorCodes,
  errorMessages,
} from '../../util/constants';
import {
  actionWrapper,
  parseActionError,
} from '../lib/actions';
import { statsRoutes } from '../../util/api-routes';

const {
  fetchStatsRoute,
} = statsRoutes;

const fetchStatsAction = actionWrapper({ type: FETCH_STATS });
const selectStatsDateRangeAction = response => (
  actionWrapper({ type: SELECT_STATS_DATE_RANGE })({ response })
);
const selectStatsTimeframeAction = response => (
  actionWrapper({ type: SELECT_STATS_TIMEFRAME })({ response })
);

export default () => ({
  fetchStats: statsInput => (
    async (dispatch) => {
      dispatch(fetchStatsAction());

      console.log('statsInput', statsInput);

      try {
        const { data } = await post(fetchStatsRoute, statsInput);

        return dispatch(fetchStatsAction({ response: data }));
      } catch (error) {
        return dispatch(fetchStatsAction({
          error: {
            error,
            errorCode: errorCodes.USER_NOT_AUTHENTICATED,
            errorMessage: parseActionError(error, errorMessages.USER_NOT_AUTHENTICATED),
          },
        }));
      }
    }
  ),
  selectStatsDateRange: dateRange => (
    dispatch => dispatch(selectStatsDateRangeAction(dateRange))
  ),
  selectStatsTimeframe: timeframe => (
    dispatch => dispatch(selectStatsTimeframeAction(timeframe))
  ),
});
