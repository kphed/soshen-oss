import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
} from '@material-ui/core';
import {
  InsertChartSharp,
  EditSharp,
  DeleteSharp,
} from '@material-ui/icons';
import Content from './layout/Content';
import Select from './reusable/Select';
import IconButton from './reusable/IconButton';
import Link from './reusable/Link';
import ProgressSpinner from './reusable/ProgressSpinner';
import ProjectDetails from './projects/ProjectDetails';
import ProjectDetailsNotFound from './projects/ProjectDetailsNotFound';
import { select } from '../../styles/js/projects';

const Projects = React.memo(({
  project,
  allIds,
  selectedId,
  selectProject,
  setCreateMode,
  setUpdateMode,
  setDeleteMode,
  inProgress,
}) => (
  <Content>
    <Content.Top>
      <Content.Left>
        <Typography variant="h5" data-testid="projectTitle">PROJECTS</Typography>
      </Content.Left>
      <Content.Right>
        <Button
          variant="contained"
          color="primary"
          size="large"
          data-testid="createProjectButton"
          onClick={setCreateMode}
          disabled={inProgress}
        >
          CREATE
        </Button>
      </Content.Right>
    </Content.Top>
    { inProgress ? (
      <Content.Center>
        <ProgressSpinner />
      </Content.Center>
    ) : (
      <Fragment>
        { selectedId ? (
          <Fragment>
            <Content.Center>
              <Content.Left>
                <Select
                  label="Projects"
                  dataTestId="projectSelect"
                  value={selectedId}
                  options={allIds}
                  onChange={selectProject}
                  style={select}
                />
              </Content.Left>
              <Content.Right>
                <Link to="/stats">
                  <IconButton title="Stats" icon={<InsertChartSharp />} />
                </Link>
                <IconButton title="Edit" onClick={setUpdateMode} dataTestId="editProjectButton" icon={<EditSharp />} />
                <IconButton
                  title="Delete"
                  onClick={setDeleteMode}
                  dataTestId="deleteProjectButton"
                  icon={<DeleteSharp />}
                />
              </Content.Right>
            </Content.Center>
            <Content.Bottom>
              <ProjectDetails project={project} />
            </Content.Bottom>
          </Fragment>
        ) : (
          <Content.Center>
            <ProjectDetailsNotFound />
          </Content.Center>
        ) }
      </Fragment>
    ) }
  </Content>
));

Projects.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    apiId: PropTypes.string,
    blockchain: PropTypes.string,
  }).isRequired,
  selectedId: PropTypes.string.isRequired,
  allIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectProject: PropTypes.func.isRequired,
  setCreateMode: PropTypes.func.isRequired,
  setUpdateMode: PropTypes.func.isRequired,
  setDeleteMode: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired,
};

export default Projects;
