// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// HOCs
import styled from 'styled-components';

// Styles

const ItemDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  margin-top: 10px;

  & > div {
    display: flex;
    flex-direction: row;
    margin-right: 10px;
    &:last-child {
      margin-right: 0px;
    }
  }
`;

const ItemDivInput = styled.input`
  min-height: 36px;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 16px;
  display: block;
  width: 100%;
  border: 1px solid #f2f3f4;
  color: #3a3e42;
  font-size: 14px;
`;

const ItemRemoveBtn = styled.a`
  > i {
    color: #ec476e;
  }
`;

// Component
export class SubItemsRow extends Component {
  constructor(props) {
    super(props);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.removeSubItem = this.removeSubItem.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { id, description } = this.props.item;

    this.setState({
      id,
      description: description || '',
    });
  }

  handleTextInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.uploadRowState();
    });
  }

  uploadRowState() {
    const { updateSubItem } = this.props;
    updateSubItem(this.state);
  }

  removeSubItem() {
    this.props.removeSubItem(this.state.id);
  }

  render() {
    const { t } = this.props;
    return (
      <ItemDiv>
        <div className="flex5">
          <ItemDivInput
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleTextInputChange}
            placeholder={t('form:fields:items:description')}
          />
        </div>

        <ItemRemoveBtn href="#" onClick={this.removeSubItem}>
          <i className="ion-close-circled" />
        </ItemRemoveBtn>
      </ItemDiv>
    );
  }
}

SubItemsRow.propTypes = {
  t: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  removeSubItem: PropTypes.func.isRequired,
  updateSubItem: PropTypes.func.isRequired,
};

export default SubItemsRow;
