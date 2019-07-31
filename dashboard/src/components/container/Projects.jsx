import React, {
  PureComponent,
  Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchProjects,
  selectProject,
  selectProjectMode,
  createProject,
  updateProject,
  deleteProject,
  showNotification,
} from '../../data/actions';
import {
  projectModes,
  notificationTypes,
  errorCodes,
} from '../../util/constants';
import Projects from '../presentational/Projects';
import ProjectDialog from './projects/ProjectDialog';

const {
  CREATE,
  READ,
  UPDATE,
  DELETE,
} = projectModes;

class ProjectsContainer extends PureComponent {
  static propTypes = {
    projects: PropTypes.shape({
      mode: PropTypes.oneOf(Object.values(projectModes)).isRequired,
      byId: PropTypes.shape({}).isRequired,
      allIds: PropTypes.arrayOf(PropTypes.string).isRequired,
      selectedId: PropTypes.string.isRequired,
      inProgress: PropTypes.bool.isRequired,
      errorCode: PropTypes.number.isRequired,
      errorMessage: PropTypes.string.isRequired,
    }).isRequired,
    fetchProjects: PropTypes.func.isRequired,
    selectProject: PropTypes.func.isRequired,
    selectProjectMode: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    if (!props.projects.allIds.length) {
      props.fetchProjects();
    }
  }

  componentDidUpdate = (prevProps) => {
    const { projects } = this.props;
    const { mode } = prevProps.projects;

    if (prevProps.projects.inProgress && !projects.inProgress) {
      if (projects.errorCode !== errorCodes.NONE) {
        this.props.showNotification({
          notificationText: projects.errorMessage,
          notificationType: notificationTypes.ERROR,
        });
      } else if (mode !== READ) {
        let notificationText = '';

        switch (mode) {
          case CREATE:
            notificationText = 'Project created';
            break;
          case UPDATE:
            notificationText = 'Project updated';
            break;
          case DELETE:
            notificationText = 'Project deleted';
            break;
          default:
        }

        this.props.showNotification({
          notificationText,
          notificationType: notificationTypes.INFORMATION,
        });
      }
    }
  }

  setCreateMode = () => this.props.selectProjectMode(CREATE);

  setReadMode = () => this.props.selectProjectMode(READ);

  setUpdateMode = () => this.props.selectProjectMode(UPDATE);

  setDeleteMode = () => this.props.selectProjectMode(DELETE);

  createProject = ({ name, blockchain }) => {
    const projectInput = {
      name,
      blockchain,
    };

    return this.props.createProject(projectInput);
  }

  updateProject = ({ name, blockchain }) => {
    const {
      projects: {
        byId,
        selectedId,
      },
    } = this.props;

    const project = byId[selectedId];
    const oldName = project.name;
    const oldBlockchain = project.blockchain;

    const projectInput = {
      name: oldName,
      ...name !== oldName && { newName: name },
      ...blockchain !== oldBlockchain && { newBlockchain: blockchain },
    };

    return this.props.updateProject(projectInput);
  }

  deleteProject = () => this.props.deleteProject({
    name: this.props.projects.selectedId,
  })

  selectProject = ({ target: { value } }) => this.props.selectProject(value)

  render = () => {
    const { projects } = this.props;
    const {
      mode,
      byId,
      allIds,
      selectedId,
      inProgress,
    } = projects;
    const project = selectedId ? byId[selectedId] : {};

    return (
      <Fragment>
        <Projects
          mode={mode}
          project={project}
          allIds={allIds}
          selectedId={selectedId}
          selectProject={this.selectProject}
          setCreateMode={this.setCreateMode}
          setUpdateMode={this.setUpdateMode}
          setDeleteMode={this.setDeleteMode}
          inProgress={inProgress}
        />
        { mode !== READ && (
          <ProjectDialog
            mode={mode}
            cancel={this.setReadMode}
            {...{
              confirm: this[`${mode.toLowerCase()}Project`],
              name: mode !== CREATE ? project.name : '',
              blockchain: mode === UPDATE ? project.blockchain : undefined,
            }}
          />
        ) }
      </Fragment>
    );
  };
}

const mapStateToProps = ({ projects }) => ({ projects });

export default withRouter(connect(mapStateToProps, {
  fetchProjects,
  selectProject,
  selectProjectMode,
  createProject,
  updateProject,
  deleteProject,
  showNotification,
})(ProjectsContainer));
