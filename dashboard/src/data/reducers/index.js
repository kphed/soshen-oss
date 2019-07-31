import { combineReducers } from 'redux';
import projects from './projects';
import stats from './stats';
import notification from './notification';

const rootReducer = combineReducers({
  projects,
  stats,
  notification,
});

export default rootReducer;
