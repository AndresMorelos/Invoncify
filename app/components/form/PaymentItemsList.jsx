// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

// Redux
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TransitionList from '@components/shared/TransitionList';
import styled from 'styled-components';
import * as Actions from '../../actions/form.jsx';
import { getPaymentRows } from '../../reducers/FormReducer';

// DragNDrop
import _withDragNDrop from './hoc/_withDragNDrop';

// Custom Component
import Button from '../shared/Button.jsx';
import { Section } from '../shared/Section';
import PaymentItemRow from './PaymentItemRow.jsx';

// Styled Components

const PaymentItemsListWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  -webkit-app-region: no-drag;
`;

const PaymentItemsListHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
`;

const PaymentItemsListActionsBtn = styled(Button)`
  &:focus {
    outline: none !important;
    box-shadow: none !important;
    color: white;
  }
  &:active {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

const PaymentItemsListDiv = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

// Component
export class PaymentItemsList extends PureComponent {

  render() {
    const { boundActionCreators } = this.props
    // Bound Actions
    const { addPaymentItem, removePaymentItem, updatePaymentItem } = boundActionCreators;
    // Item Rows
    const { t, paymentRows = [] } = this.props;
    const paymentRowsComponent = paymentRows.map((item, index) => (
      <PaymentItemRow
        key={item.id}
        item={item}
        index={index}
        t={t}
        hasHandler={paymentRows.length > 1}
        actions={index !== 0}
        updateRow={updatePaymentItem}
        removeRow={removePaymentItem}
        addItem={addPaymentItem}
      />
    ));

    // Render
    return (
      <Section>
        <PaymentItemsListWrapper>
          <PaymentItemsListHeader>
            <label className="itemLabel">{t('form:fields:paymentItems:name')}</label>
          </PaymentItemsListHeader>
          <PaymentItemsListDiv>
            <TransitionList componentHeight={50}>
              {paymentRowsComponent}
            </TransitionList>
          </PaymentItemsListDiv>
          <div className="PaymentitemsListActions">
            <PaymentItemsListActionsBtn primary onClick={addPaymentItem}>
              {t('form:fields:paymentItems:add')}
            </PaymentItemsListActionsBtn>
          </div>
        </PaymentItemsListWrapper>
      </Section>
    );
  }
}

PaymentItemsList.propTypes = {
  boundActionCreators: PropTypes.object.isRequired,
  paymentRows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  formState: state.form, // Make drag & drop works
  paymentRows: getPaymentRows(state),
});

const mapDispatchToProps = dispatch => ({
  boundActionCreators: bindActionCreators(Actions, dispatch),
});

// Export
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  _withDragNDrop
)(PaymentItemsList);
