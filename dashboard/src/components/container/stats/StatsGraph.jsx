import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduce } from 'lodash';
import moment from 'moment';
import {
  statsTimeframes,
  colorPalette,
} from '../../../util/constants';
import StatsGraph from '../../presentational/stats/StatsGraph';
import StatsNotFound from '../../presentational/stats/StatsNotFound';

const {
  HOURLY,
  DAILY,
} = statsTimeframes;

const timeframeHints = {
  [HOURLY]: 'Hour',
  [DAILY]: 'Date',
};

class StatsGraphContainer extends PureComponent {
  static propTypes = {
    stats: PropTypes.shape({
      byId: PropTypes.shape({}).isRequired,
      allIds: PropTypes.shape({}).isRequired,
      dateRange: PropTypes.number.isRequired,
      timeframe: PropTypes.oneOf(Object.values(statsTimeframes)).isRequired,
      inProgress: PropTypes.bool.isRequired,
    }).isRequired,
  };

  state = {
    windowWidth: 0,
    graphData: {
      [HOURLY]: [],
      [DAILY]: [],
    },
  };

  componentDidMount() {
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      allIds,
      dateRange,
      timeframe,
    } = this.props.stats;
    const hasIds = !!allIds[dateRange].length;

    if (hasIds) {
      if (
        !prevState.graphData[timeframe].length
        || (prevProps.stats.dateRange !== dateRange)
      ) {
        this.getGraphData();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => this.setState({ windowWidth: window.innerWidth })

  getLegendItems = () => {
    const {
      allIds,
      dateRange,
    } = this.props.stats;

    return allIds[dateRange].map((val, key) => ({
      title: val,
      color: colorPalette[key],
    }));
  }

  getGraphData = () => {
    const {
      byId,
      allIds,
      dateRange,
    } = this.props.stats;

    const graphData = {
      tempHourly: {},
      [HOURLY]: [],
      [DAILY]: [],
    };

    const legendTitles = Object.values(allIds[dateRange]);

    for (let i = 0; i < legendTitles.length; i += 1) {
      const stats = byId[dateRange][legendTitles[i]];
      const tempDailyStats = [];
      const tempHourlyStats = [];

      for (let day = (dateRange - 1); day >= 0; day -= 1) {
        const date = moment.utc().subtract(day, 'day').format('MM-DD-YY');
        const xValue = moment.utc(date, 'MM-DD-YY').local().format('MM/DD');
        const statsOnDate = stats[date];

        if (!statsOnDate) {
          tempDailyStats.push({
            x: xValue,
            y: 0,
          });
        } else {
          tempDailyStats.push({
            x: xValue,
            y: statsOnDate.daily,
          });

          const { daily, ...hourly } = statsOnDate;

          graphData.tempHourly = reduce(hourly, (acc, requestsForHour, hour) => {
            const localHour = moment.utc(hour, 'HH').local().format('HH');

            return {
              ...acc,
              ...{ [localHour]: requestsForHour + (acc[localHour] || 0) },
            };
          }, { ...graphData.tempHourly });
        }
      }

      for (let hour = 0; hour < 24; hour += 1) {
        const momentHour = moment(hour, 'H').format('HH');

        if (!graphData.tempHourly[momentHour]) {
          tempHourlyStats.push({
            x: `${momentHour}:00`,
            y: 0,
          });
        } else {
          tempHourlyStats.push({
            x: `${momentHour}:00`,
            y: graphData.tempHourly[momentHour],
          });
        }
      }

      delete graphData.tempHourly;

      graphData[DAILY].push(tempDailyStats);
      graphData[HOURLY].push(tempHourlyStats);
    }

    this.setState({
      graphData,
    });
  }

  render = () => {
    const { graphData } = this.state;
    const { timeframe } = this.props.stats;
    const legendItems = this.getLegendItems();

    return (
      graphData[timeframe].length && legendItems.length
        ? (
          <StatsGraph
            legendItems={legendItems}
            windowWidth={this.state.windowWidth}
            graphData={graphData[timeframe]}
            timeframeHint={timeframeHints[timeframe]}
          />
        )
        : <StatsNotFound />
    );
  };
}

const mapStateToProps = ({ stats }) => ({ stats });

export default connect(mapStateToProps)(StatsGraphContainer);
