import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import {
  FolderSpecialSharp,
  BubbleChartSharp,
} from '@material-ui/icons';
import {
  projectModes,
  projectBlockchains,
} from '../../../util/constants';
import Dialog from '../../presentational/reusable/Dialog';
import InputField from '../../presentational/reusable/InputField';
import Select from '../../presentational/reusable/Select';

const blockchainValues = Object.values(projectBlockchains);
const [defaultBlockchain] = blockchainValues;
const {
  CREATE,
  UPDATE,
  DELETE,
} = projectModes;

class ProjectDialogContainer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    blockchain: PropTypes.oneOf(Object.values(projectBlockchains)),
    mode: PropTypes.oneOf(Object.values(projectModes)).isRequired,
    cancel: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
  }

  static defaultProps = {
    blockchain: defaultBlockchain,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      blockchain: props.blockchain,
    };
  }

  updateName = ({ target }) => this.setState({ name: target.value })

  updateBlockchain = ({ target }) => this.setState({ blockchain: target.value })

  confirm = () => {
    const {
      mode,
      confirm,
    } = this.props;
    const {
      name,
      blockchain,
    } = this.state;

    return confirm(mode !== DELETE && { name, blockchain });
  }

  render = () => {
    const { mode } = this.props;
    const {
      name,
      blockchain,
    } = this.state;
    const confirmButtonTestId = ((mode === CREATE || mode === UPDATE)
      ? 'confirmCreateProject' : 'confirmDeleteProject'
    );

    return (
      <Dialog>
        <Dialog.Title>{`${mode} PROJECT`}</Dialog.Title>
        {
          (mode === CREATE || mode === UPDATE) ? (
            <Dialog.Content>
              <InputField
                id="project-name"
                label="Project Name"
                dataTestId="projectNameInput"
                value={name}
                onChange={this.updateName}
                startAdornmentIcon={<FolderSpecialSharp />}
              />
              <Select
                id="project-blockchain"
                label="Project Blockchain"
                dataTestId="projectBlockchainInput"
                value={blockchain}
                options={blockchainValues}
                onChange={this.updateBlockchain}
                startAdornmentIcon={<BubbleChartSharp />}
              />
            </Dialog.Content>
          ) : (
            <Dialog.Content>
              <Typography>
                { `Are you sure you want to delete ${name}?` }
              </Typography>
            </Dialog.Content>
          )
        }
        <Dialog.Actions>
          <Dialog.CancelAction text="Cancel" onClick={this.props.cancel} />
          <Dialog.ConfirmAction text={mode} dataTestId={confirmButtonTestId} onClick={this.confirm} />
        </Dialog.Actions>
      </Dialog>
    );
  };
}

export default ProjectDialogContainer;
