import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchProjects,
  fetchStats,
  selectProject,
  selectStatsDateRange,
  selectStatsTimeframe,
} from '../../data/actions';
import {
  statsDateRanges,
  statsTimeframes,
} from '../../util/constants';
import Stats from '../presentational/Stats';

const {
  HOURLY,
  DAILY,
} = statsTimeframes;

class StatsContainer extends PureComponent {
  static propTypes = {
    projects: PropTypes.shape({
      byId: PropTypes.shape({}),
      allIds: PropTypes.arrayOf(PropTypes.string),
      selectedId: PropTypes.string,
      inProgress: PropTypes.bool.isRequired,
    }).isRequired,
    stats: PropTypes.shape({
      dateRange: PropTypes.oneOf(Object.values(statsDateRanges)).isRequired,
      inProgress: PropTypes.bool.isRequired,
    }).isRequired,
    fetchProjects: PropTypes.func.isRequired,
    fetchStats: PropTypes.func.isRequired,
    selectProject: PropTypes.func.isRequired,
    selectStatsDateRange: PropTypes.func.isRequired,
    selectStatsTimeframe: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {
      projects: { allIds },
    } = this.props;

    if (!allIds.length) {
      return this.props.fetchProjects();
    }

    return this.fetchStats();
  }

  componentDidUpdate(prevProps) {
    const {
      projects: prevProjects,
      stats: prevStats,
    } = prevProps;
    const {
      projects: { selectedId },
      stats,
    } = this.props;

    const statsDateRangeChanged = prevStats.dateRange !== stats.dateRange;
    const projectChanged = prevProjects.selectedId && (prevProjects.selectedId !== selectedId);

    if (statsDateRangeChanged || projectChanged) {
      this.fetchStats();
    }
  }

  fetchStats = () => {
    const {
      projects: { byId, selectedId },
      stats: { dateRange },
    } = this.props;
    const { id } = byId[selectedId];

    return this.props.fetchStats({
      projectId: id,
      dateRange,
    });
  }

  selectProject = ({ target: { value } }) => this.props.selectProject(value)

  selectStatsDateRange = ({ target: { value } }) => this.props.selectStatsDateRange(value)

  setHourlyTimeframe = () => this.props.selectStatsTimeframe(HOURLY)

  setDailyTimeframe = () => this.props.selectStatsTimeframe(DAILY)

  render = () => {
    const {
      projects: {
        selectedId,
        allIds,
        inProgress: projectsInProgress,
      },
      stats: {
        dateRange,
        inProgress: statsInProgress,
      },
    } = this.props;

    return (
      <Stats
        fetchStats={this.fetchStats}
        selectedProjectId={selectedId}
        allProjectIds={allIds}
        statsDateRange={dateRange}
        inProgress={statsInProgress || projectsInProgress}
        selectProject={this.selectProject}
        selectStatsDateRange={this.selectStatsDateRange}
        setHourlyTimeframe={this.setHourlyTimeframe}
        setDailyTimeframe={this.setDailyTimeframe}
      />
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  stats: state.stats,
});

export default connect(mapStateToProps, {
  fetchProjects,
  fetchStats,
  selectProject,
  selectStatsDateRange,
  selectStatsTimeframe,
})(StatsContainer);
