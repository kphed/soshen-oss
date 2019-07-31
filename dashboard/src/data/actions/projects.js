import { post } from 'axios';
import {
  SELECT_PROJECT_ID,
  SELECT_PROJECT_MODE,
  FETCH_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from './types';
import {
  errorCodes,
  errorMessages,
} from '../../util/constants';
import {
  actionWrapper,
  parseActionError,
} from '../lib/actions';
import { projectRoutes } from '../../util/api-routes';

const {
  fetchProjectsRoute,
  createProjectRoute,
  deleteProjectRoute,
  updateProjectRoute,
} = projectRoutes;

const selectProjectIdAction = response => actionWrapper({ type: SELECT_PROJECT_ID })({ response });
const selectProjectModeAction = response => actionWrapper({ type: SELECT_PROJECT_MODE })({ response });
const fetchProjectsAction = actionWrapper({ type: FETCH_PROJECTS });
const createProjectAction = actionWrapper({ type: CREATE_PROJECT });
const updateProjectAction = actionWrapper({ type: UPDATE_PROJECT });
const deleteProjectAction = actionWrapper({ type: DELETE_PROJECT });

export default () => ({
  selectProject: projectKey => dispatch => dispatch(selectProjectIdAction(projectKey)),
  selectProjectMode: mode => dispatch => dispatch(selectProjectModeAction(mode)),
  fetchProjects: () => (
    async (dispatch) => {
      dispatch(fetchProjectsAction());

      try {
        const { data } = await post(fetchProjectsRoute);

        return dispatch(fetchProjectsAction({ response: data }));
      } catch (error) {
        return dispatch(fetchProjectsAction({
          error: {
            error,
            errorCode: errorCodes.FETCH_PROJECTS_FAILED,
            errorMessage: parseActionError(error, errorMessages.FETCH_PROJECTS_FAILED),
          },
        }));
      }
    }
  ),
  createProject: projectInput => (
    async (dispatch) => {
      dispatch(createProjectAction());

      try {
        const { data } = await post(createProjectRoute, projectInput);

        return dispatch(createProjectAction({ response: data }));
      } catch (error) {
        return dispatch(createProjectAction({
          error: {
            error,
            errorCode: errorCodes.CREATE_PROJECT_FAILED,
            errorMessage: parseActionError(error, errorMessages.CREATE_PROJECT_FAILED),
          },
        }));
      }
    }
  ),
  updateProject: projectInput => (
    async (dispatch) => {
      dispatch(updateProjectAction());

      try {
        const { data } = await post(updateProjectRoute, projectInput);

        return dispatch(updateProjectAction({
          response: {
            original: projectInput,
            updated: data,
          },
        }));
      } catch (error) {
        return dispatch(updateProjectAction({
          error: {
            error,
            errorCode: errorCodes.UPDATE_PROJECT_FAILED,
            errorMessage: parseActionError(error, errorMessages.UPDATE_PROJECT_FAILED),
          },
        }));
      }
    }
  ),
  deleteProject: projectInput => (
    async (dispatch) => {
      dispatch(deleteProjectAction());

      try {
        await post(deleteProjectRoute, projectInput);

        return dispatch(deleteProjectAction({ response: projectInput }));
      } catch (error) {
        return dispatch(deleteProjectAction({
          error: {
            error,
            errorCode: errorCodes.DELETE_PROJECT_FAILED,
            errorMessage: parseActionError(error, errorMessages.DELETE_PROJECT_FAILED),
          },
        }));
      }
    }
  ),
});
