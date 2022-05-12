// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class DragNDrop extends PureComponent {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const { paymentRows = undefined } = this.props;
    const { moveRow, movePaymentRow } = this.props.boundActionCreators;
    
    if (paymentRows) {
      movePaymentRow(result.source.index, result.destination.index);
    } else {
      moveRow(result.source.index, result.destination.index);
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppableList">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {this.props.children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

// PropTypes Validation
DragNDrop.propTypes = {
  boundActionCreators: PropTypes.object.isRequired,
};

// Real HOC
const _withDragNDrop = ComposedComponent => function (props) {
  return <DragNDrop {...props}>
    <ComposedComponent {...props} />
  </DragNDrop>
};

// Export the HOC
export default _withDragNDrop;
