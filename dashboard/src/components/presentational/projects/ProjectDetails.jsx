import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import {
  FileCopySharp,
  FingerprintSharp,
  DescriptionSharp,
  CloudCircleSharp,
} from '@material-ui/icons';
import { NODE_API_SERVER_URL } from '../../../config';
import InputField from '../reusable/InputField';
import IconButton from '../reusable/IconButton';
import { gridContainer } from '../../../styles/js/project-details';

const outputCopyButton = value => (
  <IconButton
    title="Copy"
    icon={<FileCopySharp color="inherit" fontSize="small" />}
    onClick={() => navigator.clipboard.writeText(value)}
  />
);

const ProjectDetails = ({ project }) => (
  <Grid container item xs={11} sm={11} md={10} lg={9} alignContent="space-around" style={gridContainer}>
    <InputField
      label="Project Name"
      value={project.name}
      startAdornmentIcon={<DescriptionSharp />}
      endAdornmentIcon={outputCopyButton(project.name)}
    />
    <InputField
      label="Project API ID"
      value={project.apiId}
      dataTestId="projectApiIdInput"
      startAdornmentIcon={<FingerprintSharp />}
      endAdornmentIcon={outputCopyButton(project.apiId)}
    />
    <InputField
      label="API Endpoint"
      value={`${NODE_API_SERVER_URL}/${project.name}/${project.apiId}/${project.blockchain.toLowerCase()}`}
      startAdornmentIcon={<CloudCircleSharp />}
      endAdornmentIcon={outputCopyButton(`${NODE_API_SERVER_URL}/${project.name}/${project.apiId}/${project.blockchain.toLowerCase()}`)}
    />
  </Grid>
);

ProjectDetails.propTypes = {
  project: PropTypes.shape({
    apiId: PropTypes.string,
    name: PropTypes.string,
    blockchain: PropTypes.string,
  }).isRequired,
};

export default ProjectDetails;
