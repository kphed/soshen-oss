import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import {
  QueryBuilderSharp,
  CalendarTodaySharp,
} from '@material-ui/icons';
import Content from './layout/Content';
import Select from './reusable/Select';
import IconButton from './reusable/IconButton';
import { statsDateRanges } from '../../util/constants';
import {
  projectSelect,
  dateRangeSelect,
  contentBottomGridContainer,
} from '../../styles/js/stats';
import StatsGraph from '../container/stats/StatsGraph';
import ProgressSpinner from './reusable/ProgressSpinner';

const dateRanges = Object.values(statsDateRanges).map(dateRange => `${dateRange}D`);

const Stats = ({
  fetchStats,
  selectedProjectId,
  allProjectIds,
  statsDateRange,
  inProgress,
  selectProject,
  selectStatsDateRange,
  setHourlyTimeframe,
  setDailyTimeframe,
}) => (
  <Content>
    <Content.Top>
      <Content.Left>
        <Typography variant="h5">STATS</Typography>
      </Content.Left>
      <Content.Right>
        <Button variant="contained" color="primary" size="large" onClick={fetchStats}>
          REFRESH
        </Button>
      </Content.Right>
    </Content.Top>
    <Content.Center>
      <Content.Left>
        <Select
          label="Projects"
          value={selectedProjectId}
          options={allProjectIds}
          onChange={selectProject}
          style={projectSelect}
        />
        <Select
          label="Date Range"
          value={`${statsDateRange}D`}
          options={dateRanges}
          onChange={selectStatsDateRange}
          style={dateRangeSelect}
        />
      </Content.Left>
      <Content.Right>
        <IconButton title="Hourly" onClick={setHourlyTimeframe} icon={<QueryBuilderSharp />} />
        <IconButton title="Daily" onClick={setDailyTimeframe} icon={<CalendarTodaySharp />} />
      </Content.Right>
    </Content.Center>
    <Content.Bottom>
      <Grid container style={contentBottomGridContainer}>
        { inProgress ? <ProgressSpinner /> : <StatsGraph /> }
      </Grid>
    </Content.Bottom>
  </Content>
);

Stats.propTypes = {
  fetchStats: PropTypes.func.isRequired,
  selectedProjectId: PropTypes.string.isRequired,
  allProjectIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  statsDateRange: PropTypes.number.isRequired,
  selectProject: PropTypes.func.isRequired,
  selectStatsDateRange: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired,
  setHourlyTimeframe: PropTypes.func.isRequired,
  setDailyTimeframe: PropTypes.func.isRequired,
};

export default Stats;
