// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import { Section } from '../shared/Section';
import CreatedAtPicker from './CreatedAtPicker';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
export class CreatedAt extends Component {
  constructor(props) {
    super(props);
    this.state = { created_at: this.props.created_at };
    this.updateCustomDate = this.updateCustomDate.bind(this);
    this.updateCreateAt = this.updateCreateAt.bind(this);
  }

  // Handle Clear Form
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { created_at } = nextProps.created_at;
    if (created_at === null) {
      this.setState(nextProps.created_at);
    }
  }

  updateCustomDate(created_at) {
    this.setState({ created_at }, () => {
      this.updateCreateAt(this.state);
    });
  }

  updateCreateAt({ created_at }) {
    this.props.updateFieldData('created_at', created_at);
  }

  render() {
    const { t } = this.props;
    const { created_at } = this.state;
    return (
      <Section>
        <label className="itemLabel">
          {t('form:fields:createAtDate:name')}
        </label>
        <CreatedAtPicker
          t={t}
          created_at={created_at}
          updateCustomDate={this.updateCustomDate}
        />
      </Section>
    );
  }
}

CreatedAt.propTypes = {
  created_at: PropTypes.number,
  t: PropTypes.func.isRequired,
  updateFieldData: PropTypes.func.isRequired,
};

// Export
export default _withFadeInAnimation(CreatedAt);
