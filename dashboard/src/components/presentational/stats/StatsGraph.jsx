import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
import Box from '../reusable/Box';

const boxDisplayConfig = {
  xs: {
    xs: 'block',
    sm: 'none',
  },
  sm: {
    xs: 'none',
    sm: 'block',
  },
  md: {
    xs: 'none',
    sm: 'none',
    md: 'block',
  },
};

class StatsGraph extends PureComponent {
  static propTypes = {
    legendItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    windowWidth: PropTypes.number.isRequired,
    graphData: PropTypes.arrayOf(PropTypes.array).isRequired,
    timeframeHint: PropTypes.string.isRequired,
  }

  render = () => {
    const {
      legendItems,
      windowWidth,
      graphData,
      timeframeHint,
    } = this.props;
    const datasets = [];

    for (let i = 0; i < graphData.length; i += 1) {
      datasets.push({
        label: legendItems[i].title,
        backgroundColor: legendItems[i].color,
        borderColor: legendItems[i].color,
        borderWidth: 2,
        hoverBackgroundColor: '#80FFFFFF',
        hoverBorderColor: legendItems[i].color,
        pointBackgroundColor: '#FFFFFF',
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 4,
        data: [{
          x: '', y: 0,
        }, ...graphData[i]],
        lineTension: 0.5,
        fill: false,
      });
    }

    const chartData = {
      labels: [
        '',
        ...(graphData[0].map(row => row.x)),
      ],
      datasets,
    };

    let breakpoint = 'xs';

    if (windowWidth >= 1060) {
      breakpoint = 'md';
    } else if (windowWidth >= 600) {
      breakpoint = 'sm';
    }

    const xsWidth = windowWidth * 0.9;
    const smMdWidth = windowWidth * 0.65;
    const graphDimensions = ({
      xs: {
        width: xsWidth,
        height: xsWidth * 0.75,
      },
      sm: {
        width: smMdWidth,
        height: smMdWidth * 0.75,
      },
      md: {
        width: smMdWidth,
        height: (windowWidth * 0.4) * 0.75,
      },
    })[breakpoint];

    return (
      <Box display={boxDisplayConfig[breakpoint]}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item xs={12}>
            <Line
              {...graphDimensions}
              ref={(c) => { this.chart = c; }}
              data={chartData}
              options={{
                maintainAspectRatio: false,
                tooltips: {
                  displayColors: false,
                  callbacks: {
                    title: (tooltipItem, dataSource) => `${timeframeHint}: ${dataSource.labels[tooltipItem[0].index]}`,
                    label: (tooltipItem, dataSource) => `${dataSource.datasets[tooltipItem.datasetIndex].label}: ${tooltipItem.yLabel}`,
                  },
                },
                scales: {
                  xAxes: [{
                    gridLines: { display: false },
                    ticks: { minRotation: 90 },
                  }],
                  yAxes: [{
                    gridLines: { display: false },
                    stacked: true,
                    ticks: {
                      suggestedMin: -1,
                      callback: value => (value < 0 ? '' : value),
                    },
                  }],
                },
                layout: {
                  padding: {
                    top: 20,
                    left: 20,
                    right: 15,
                  },
                },
              }}
              legend={{
                onClick: (e, legendItem) => {
                  const index = legendItem.datasetIndex;
                  const ci = this.chart.chartInstance;
                  const { datasets: chartDatasets } = ci.data;

                  let canToggle = false;

                  for (let i = 0; i < chartDatasets.length; i += 1) {
                    const meta = ci.getDatasetMeta(i);

                    if (i !== index && !meta.hidden) {
                      canToggle = true;
                      break;
                    }
                  }

                  if (canToggle) {
                    ci.getDatasetMeta(index).hidden = !ci.getDatasetMeta(index).hidden;
                    ci.update();
                  }
                },
              }}
              plugins={[{
                beforeInit: (chart) => {
                  const { legend } = chart;
                  legend.afterFit = () => {
                    legend.height += 20;
                  };
                },
              }]}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default StatsGraph;
