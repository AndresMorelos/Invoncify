// Libs
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const _withDraggable = ComposedComponent => function (props) {
  const { item, index } = props
  const { id } = item
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        // Patched onMouseDown, make inputs selectable
        const onMouseDown = event => {
          if (event.target.nodeName === 'INPUT') {
            return;
          }
          if (provided.dragHandleProps.onMouseDown) {
            provided.dragHandleProps.onMouseDown(event);
          }

        };
        // Patched onKeyDown handler, make typing in inputs
        // work as expected. For example, spacebar can be used
        // as normal characters instead of a shortcut.
        const onKeyDown = event => {
          if (event.target.nodeName === 'INPUT') {
            return;
          }
          if (provided.dragHandleProps.onKeyDown) {
            provided.dragHandleProps.onKeyDown(event);
          }
        };
        // patching drag handle props
        const patched = {
          ...provided.dragHandleProps,
          onMouseDown,
          onKeyDown,
        };
        // Draggable Style
        const draggableStyle = {
          ...provided.draggableStyle,
          margin: '0 0 14px 0',
        };
        return (
          <div>
            <div
              ref={provided.innerRef}
              style={draggableStyle}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              {...patched}
            >
              <ComposedComponent {...props} />
            </div>
            {provided.placeholder}
          </div>
        );
      }}
    </Draggable>
  )
};

export default _withDraggable;
