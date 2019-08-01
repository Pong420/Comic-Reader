import React, { useCallback, DragEvent } from 'react';
import { IncompleteGrid, IncompleteGridProps } from './IncompleteGrid';
import { classes } from '../../utils/classes';

export interface SelectableGridProps extends IncompleteGridProps {
  selected: boolean;
  dragging?: boolean;
  toggleSelect(comicID: string): void;
}

export const SelectableGrid = ({
  className,
  dragging,
  selected,
  toggleSelect,
  onDragStart,
  ...props
}: SelectableGridProps) => {
  const toggle = useCallback(() => toggleSelect(props.comicID), [
    props.comicID,
    toggleSelect
  ]);

  const onDragStartCallback = useCallback(
    (evt: DragEvent<HTMLDivElement>) => {
      evt.preventDefault();
      toggle();
      onDragStart && onDragStart(evt);
    },
    [toggle, onDragStart]
  );

  const onMouseEnter = useCallback(() => dragging && toggle(), [
    dragging,
    toggle
  ]);

  return (
    <IncompleteGrid
      {...props}
      className={classes({ selected })}
      onMouseEnter={onMouseEnter}
    >
      <div
        draggable
        className="grid-layer selection-layer"
        onClick={toggle}
        onDragStart={onDragStartCallback}
      />
    </IncompleteGrid>
  );
};
