// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveCalendar } from '@nivo/calendar';

// Component
class CalendarChart extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveCalendar
        data={data}
        from={new Date(new Date().getFullYear(), 0, 1)}
        to={new Date(new Date().getFullYear(), 12, 0)}
        granularity="month"
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
          },
        ]}
      />
    );
  }
}

CalendarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CalendarChart;
