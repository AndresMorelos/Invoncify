// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { writeToClipboard } from '../../helpers/clipboard';

// Custom Components
import { TR, TD } from '../shared/Table';
import Button from '../shared/Button';

// Component
class Contact extends PureComponent {
  constructor(props) {
    super(props);
    this.deleteContact = this.deleteContact.bind(this);
    this.newInvoice = this.newInvoice.bind(this);
    this.handleTooltipClick = this.handleTooltipClick.bind(this);
  }

  newInvoice() {
    const { newInvoice, contact } = this.props;
    newInvoice(contact);
  }

  deleteContact() {
    const { contact, deleteContact } = this.props;
    deleteContact(contact._id);
  }

  handleTooltipClick(event, text) {
    const { t } = this.props;
    event.target.childNodes[1].innerText = t('dialog:events:copied');
    writeToClipboard(text);
    setTimeout(() => {
      event.target.childNodes[1].innerText = t('dialog:events:clickToCopy');
    }, 2000);
  }

  render() {
    const { contact, t } = this.props;
    return (
      <TR>
        <TD bold>
          <span
            className="tooltips"
            onClick={(event) =>
              this.handleTooltipClick(event, contact.fullname)
            }
            aria-hidden="true"
          >
            {contact.fullname}
            <span className="tooltiptext">
              {' '}
              {t('dialog:events:clickToCopy')}
            </span>
          </span>
        </TD>
        <TD>
          <span
            className="tooltips"
            onClick={(event) => this.handleTooltipClick(event, contact.email)}
            aria-hidden="true"
          >
            {contact.email}
            <span className="tooltiptext">
              {' '}
              {t('dialog:events:clickToCopy')}
            </span>
          </span>
        </TD>
        <TD>
          <span
            className="tooltips"
            onClick={(event) => this.handleTooltipClick(event, contact.phone)}
            aria-hidden="true"
          >
            {contact.phone}
            <span className="tooltiptext">
              {' '}
              {t('dialog:events:clickToCopy')}
            </span>
          </span>
        </TD>
        <TD actions>
          <Button link primary onClick={this.newInvoice}>
            <i className="ion-plus-round" />
          </Button>
          <Button link danger onClick={this.deleteContact}>
            <i className="ion-close-circled" />
          </Button>
        </TD>
      </TR>
    );
  }
}

Contact.propTypes = {
  t: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
  newInvoice: PropTypes.func.isRequired,
};

export default Contact;
