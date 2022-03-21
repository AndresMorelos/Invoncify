// Libraries
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// React Dates
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates';

// Styles
import styled from 'styled-components';
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';
const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

// Component
export class CreatedAtPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { focused: false };
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.clearDate = this.clearDate.bind(this);
  }

  onFocusChange() {
    this.setState({ focused: !this.state.focused });
  }

  onDateChange(date) {
    const created_at = date === null ? null : new Date(date).getTime();
    this.props.updateCustomDate(created_at);
  }

  clearDate() {
    this.onDateChange(null);
  }

  render() {
    const { t, created_at } = this.props;
    const createdAt = created_at === null ? null : moment(created_at);
    return (
      <Container>
        <SingleDatePicker
          id="invoice-createdAt"
          placeholder={t('form:fields:createAtDate:placeHolder')}
          firstDayOfWeek={1}
          withFullScreenPortal
          displayFormat="DD/MM/YYYY"
          hideKeyboardShortcutsPanel
          date={createdAt}
          isOutsideRange={() => false}
          focused={this.state.focused}
          onFocusChange={this.onFocusChange}
          onDateChange={newDate => this.onDateChange(newDate)}
        />
        {created_at !== null && (
          <a className="clearDateBtn active" href="#" onClick={this.clearDate}>
            <i className="ion-close-circled" />
          </a>
        )}
      </Container>
    );
  }
}

CreatedAtPicker.propTypes = {
  created_at: PropTypes.number,
  t: PropTypes.func.isRequired,
  updateCustomDate: PropTypes.func.isRequired,
};

CreatedAtPicker.defaultProps = {
  created_at: null,
};

// Export
export default _withFadeInAnimation(CreatedAtPicker);
