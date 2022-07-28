// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

// HOCs
import styled from 'styled-components';
import _withDraggable from './hoc/_withDraggable';

// Custom Components
import SubItemsRow from './SubItemsRow';
import { Section } from '../shared/Section';

// Styles

const ItemsListDiv = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const ItemDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;

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

const ItemActions = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 40px;
  margin: 0 !important;
  margin-left: 10px;
`;

const ItemRemoveBtn = styled.a`
  > i {
    color: #ec476e;
  }
`;

const ItemAddSubiTemBtn = styled.a`
  > i {
    color: #00a8ff;
    margin-right: 10px;
  }
`;

// Component
export class ItemRow extends Component {
  constructor(props) {
    super(props);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateSubtotal = this.updateSubtotal.bind(this);
    this.uploadRowState = this.uploadRowState.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.addSubItem = this.addSubItem.bind(this);
    this.removeSubItem = this.removeSubItem.bind(this);
    this.updateSubItem = this.updateSubItem.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { subItems, item, index } = this.props;
    const { id, description, quantity, price, subtotal } = item;
    this.setState({
      id,
      index,
      description: description || '',
      price: price || '',
      quantity: quantity || '',
      subtotal: subtotal || '',
      subitems: subItems || [],
    });
  }

  handleKeyDown(e) {
    if (e.which === 13) {
      this.props.addItem();
    }
  }

  handleTextInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.uploadRowState();
    });
  }

  handleNumberInputChange(event) {
    const name = event.target.name;
    const eValue = event.target.value;
    const value = eValue === '' ? '' : parseFloat(eValue);
    this.setState({ [name]: value }, () => {
      this.updateSubtotal();
    });
  }

  updateSubtotal() {
    const currentPrice =
      this.state.price === '' ? 0 : parseFloat(this.state.price);
    const currentQuantity =
      this.state.quantity === '' ? 0 : parseFloat(this.state.quantity);
    let currentSubtotal;
    if (this.state.price === '' || this.state.quantity === '') {
      currentSubtotal = '';
    } else {
      currentSubtotal = currentPrice * currentQuantity;
    }
    this.setState({ subtotal: currentSubtotal }, () => {
      this.uploadRowState();
    });
  }

  uploadRowState() {
    const { updateRow, subItems } = this.props;
    const { subitems: stateSubItems } = this.state;

    const subitemsToAdd = subItems.reduce((acc, item) => {
      const subitem = stateSubItems.find((subitem) => subitem.id === item.id);
      if (!subitem) {
        acc.push(item);
      }

      if (subitem) {
        const itemUpdated = Object.assign(subitem, item);
        acc.push(itemUpdated);
      }

      return acc;
    }, []);

    updateRow({
      ...this.state,
      subitems: subitemsToAdd,
    });
  }

  removeRow() {
    this.props.removeRow(this.state.id);
  }

  addSubItem() {
    this.props.addSubItem(this.state.id);
  }

  removeSubItem(itemId) {
    this.props.removeSubItem(this.state.id, itemId);
  }

  updateSubItem(item) {
    this.props.updateSubItem(this.state.id, item);
  }

  render() {
    const { t, actions, hasHandler, subitemActions, subItems } = this.props;

    const SubItemsRowsComponent = subItems.map((subItem, index) => (
      <SubItemsRow
        key={subItem.id}
        item={subItem}
        index={index}
        t={t}
        removeSubItem={this.removeSubItem}
        updateSubItem={this.updateSubItem}
      />
    ));

    return (
      <>
        <ItemDiv>
          {hasHandler && (
            <div className="dragHandler">
              <i className="ion-grid" />
            </div>
          )}
          <div className="flex3">
            <ItemDivInput
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleTextInputChange}
              onKeyDown={this.handleKeyDown}
              placeholder={t('form:fields:items:description')}
            />
          </div>

          <div className="flex1">
            <ItemDivInput
              name="price"
              type="number"
              step="0.01"
              value={this.state.price}
              onChange={this.handleNumberInputChange}
              onKeyDown={this.handleKeyDown}
              placeholder={t('form:fields:items:price')}
            />
          </div>

          <div className="flex1">
            <ItemDivInput
              name="quantity"
              type="number"
              step="0.01"
              value={this.state.quantity}
              onChange={this.handleNumberInputChange}
              onKeyDown={this.handleKeyDown}
              placeholder={t('form:fields:items:quantity')}
            />
          </div>

          {(actions || hasHandler || subitemActions) && (
            <ItemActions>
              {subitemActions && (
                <ItemAddSubiTemBtn href="#" onClick={this.addSubItem}>
                  <i className="ion-plus-circled" />
                </ItemAddSubiTemBtn>
              )}
              {actions && (
                <ItemRemoveBtn href="#" onClick={this.removeRow}>
                  <i className="ion-close-circled" />
                </ItemRemoveBtn>
              )}
            </ItemActions>
          )}
        </ItemDiv>
        <Section>
          <ItemsListDiv>{SubItemsRowsComponent}</ItemsListDiv>
        </Section>
      </>
    );
  }
}

ItemRow.propTypes = {
  actions: PropTypes.bool.isRequired,
  subitemActions: PropTypes.bool.isRequired,
  addItem: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  hasHandler: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  subItems: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  removeRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  addSubItem: PropTypes.func.isRequired,
  removeSubItem: PropTypes.func.isRequired,
  updateSubItem: PropTypes.func.isRequired,
};

export default compose(_withDraggable)(ItemRow);
