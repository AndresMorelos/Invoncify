// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import CustomSymbol from './CustomSymbol';

const commonProperties = {
  margin: { top: 50, right: 20, bottom: 60, left: 80 },
  animate: true,
  enableSlices: 'x',
};

// Component
class TimeLineChart extends PureComponent {
  render() {
    const { data, yLegend, xLegend } = this.props;
    return (
      <ResponsiveLine
        {...commonProperties}
        data={data}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          useUTC: false,
          precision: 'day',
        }}
        xFormat="time:%Y/%m/%d"
        yScale={{
          type: 'linear',
          stacked: false,
        }}
        yFormat=" >-$.2f"
        axisLeft={{
          legend: yLegend,
          legendOffset: -60,
          legendPosition: 'middle',
        }}
        axisBottom={{
          format: '%b %d',
          tickValues: 'every 2 days',
          legend: xLegend,
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        curve="monotoneX"
        enablePointLabel
        pointSymbol={CustomSymbol}
        pointSize={16}
        pointLabelYOffset={-12}
        pointBorderWidth={1}
        pointBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.3]],
        }}
        useMesh
        colors={{ scheme: 'category10' }}
        enableSlices={false}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateX: 0,
            translateY: 60,
            itemsSpacing: 15,
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  }
}

TimeLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  yLegend: PropTypes.string.isRequired,
  xLegend: PropTypes.string.isRequired,
};

export default TimeLineChart;
