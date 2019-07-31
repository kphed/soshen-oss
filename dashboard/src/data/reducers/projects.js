import {
  SELECT_PROJECT_ID,
  SELECT_PROJECT_MODE,
  FETCH_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from '../actions/types';
import {
  updateById,
  filterOldId,
  evalStatusCases,
  initialStateDecorator,
} from '../lib/reducers';
import {
  normalizeProject,
  normalizeProjectList,
} from '../lib/projects';
import { projectModes } from '../../util/constants';

const { READ } = projectModes;

const projectState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: '',
  mode: READ,
});

const fetchProjects = (state, response) => {
  if (response.length) {
    const {
      entities: { projects },
      result,
    } = normalizeProjectList(response);

    return {
      byId: updateById(state.byId, projects),
      allIds: [
        ...state.allIds,
        ...result,
      ],
      selectedId: result[0],
    };
  }

  return state;
};

const createProject = (state, response) => {
  const {
    entities: { projects },
    result,
  } = normalizeProject(response);

  return {
    byId: updateById(state.byId, projects),
    allIds: [
      ...state.allIds,
      result,
    ],
    selectedId: result,
  };
};

const updateProject = (state, { original, updated }) => {
  const {
    entities: { projects },
    result,
  } = normalizeProject(updated);

  if (original.newName) {
    const byIdCopy = { ...state.byId };

    delete byIdCopy[original.name];

    return {
      byId: updateById(byIdCopy, projects),
      allIds: [
        ...filterOldId(state.allIds, original.name),
        result,
      ],
      selectedId: result,
    };
  }

  return {
    byId: {
      ...state.byId,
      ...projects,
    },
  };
};

const deleteProject = (state, { name }) => {
  const byIdCopy = { ...state.byId };
  const updatedAllIds = [...filterOldId(state.allIds, name)];

  delete byIdCopy[name];

  return {
    byId: byIdCopy,
    allIds: updatedAllIds,
    selectedId: updatedAllIds.length ? updatedAllIds[0] : '',
  };
};

const typeReducer = (state, action) => {
  let updatedState = {};
  const {
    type,
    response,
    error,
  } = action;

  if (response) {
    switch (type) {
      case SELECT_PROJECT_ID:
        updatedState.selectedId = state.allIds.includes(response) ? response : state.selectedId;
        break;
      case SELECT_PROJECT_MODE:
        updatedState.mode = response;
        break;
      case FETCH_PROJECTS:
        updatedState = fetchProjects(state, response);
        break;
      case CREATE_PROJECT:
        updatedState = createProject(state, response);
        updatedState.mode = READ;
        break;
      case UPDATE_PROJECT:
        updatedState = updateProject(state, response);
        updatedState.mode = READ;
        break;
      case DELETE_PROJECT:
        updatedState = deleteProject(state, response);
        updatedState.mode = READ;
        break;
      default:
        return state;
    }
  } else if (error) {
    updatedState = { ...error };
  }

  return evalStatusCases(state, action, updatedState);
};

export default (state = projectState, action) => {
  const { type } = action;

  switch (type) {
    case SELECT_PROJECT_ID:
    case SELECT_PROJECT_MODE:
    case FETCH_PROJECTS:
    case CREATE_PROJECT:
    case UPDATE_PROJECT:
    case DELETE_PROJECT:
      return typeReducer(state, action);
    default:
      return state;
  }
};
