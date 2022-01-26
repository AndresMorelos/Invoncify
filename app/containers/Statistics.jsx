// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

// Styles
import styled from 'styled-components';

// Components
import Message from '@components/shared/Message';
import _withFadeInAnimation from '@components/shared/hoc/_withFadeInAnimation';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from '@components/shared/Layout';

// Charts
import TimeLineChart from '@components/statistics/TimeLineChart';
import PieChart from '../components/statistics/PieChart';
import CalendarChart from '../components/statistics/CalendarChart';

// Helpers
import {
  processData,
  processCalendarData,
  formatDate,
  processPieData,
} from '../helpers/statistics';

// Selectors
import { getInvoices } from '../reducers/InvoicesReducer';
const ipc = require('electron').ipcRenderer;
const openDialog = require('../renderers/dialog.js');

const ContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1em 0px;
  grid-template-areas:
    'BigChart BigChart'
    'Chart1 Chart2';
`;

const BigChart = styled.div`
  grid-area: BigChart;
`;
const Chart1 = styled.div`
  grid-area: Chart1;
`;
const Chart2 = styled.div`
  grid-area: Chart2;
`;

// Component
class Statistics extends PureComponent {
  render() {
    const { t, invoices } = this.props;

    const paidInvoices = invoices.filter(
      (invoice) => invoice.status === 'paid'
    );

    const pendingInvoices = invoices.filter(
      (invoice) => invoice.status === 'pending'
    );

    const cancelledInvoices = invoices.filter(
      (invoice) => invoice.status === 'cancelled'
    );

    const refundedInvoices = invoices.filter(
      (invoice) => invoice.status === 'refunded'
    );

    const paidStatisticsData = processData(
      t('invoices:status:paid'),
      paidInvoices
    );

    const pendingStatisticsData = processData(
      t('invoices:status:pending'),
      pendingInvoices
    );
    const refundedStatisticsData = processData(
      t('invoices:status:refunded'),
      refundedInvoices
    );
    const cancelledStatisticsData = processData(
      t('invoices:status:cancelled'),
      cancelledInvoices
    );

    const calendarDataInvoices = invoices.map((invoice) => {
      if(invoice.updated_at) {
        return {
          ...invoice,
          updated_at: formatDate(new Date(invoice.updated_at)),
        }
      }
      return {
        ...invoice,
        updated_at: formatDate(new Date(invoice.created_at)),
      }
    });

    const calendarData = processCalendarData(
      'updated_at',
      calendarDataInvoices
    );

    const pieDataInvoices = invoices.map((invoice) => ({
      ...invoice,
      status: t(`invoices:status:${invoice.status}`),
    }));

    const pieData = processPieData('status', pieDataInvoices);

    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>{t('statistics:header')}</PageHeaderTitle>
        </PageHeader>
        <PageContent>
          {invoices.length === 0 ? (
            <Message info text={t('messages:noInvoice')} />
          ) : (
            <ContainerDiv>
              <BigChart style={{ height: 400 }}>
                <TimeLineChart
                  yLegend={t('statistics:legends:value')}
                  xLegend={t('statistics:legends:date')}
                  data={[
                    paidStatisticsData,
                    pendingStatisticsData,
                    cancelledStatisticsData,
                    refundedStatisticsData,
                  ]}
                />
              </BigChart>
              <Chart1 style={{ height: 400 }}>
                <PieChart data={pieData} />
              </Chart1>
              <Chart2 style={{ height: 400 }}>
                <CalendarChart data={calendarData} />
              </Chart2>
            </ContainerDiv>
          )}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes
Statistics.propTypes = {
  invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Map state to props & Export
const mapStateToProps = (state) => ({
  invoices: getInvoices(state),
});

export default compose(
  connect(mapStateToProps),
  withTranslation(),
  _withFadeInAnimation
)(Statistics);
