import React, { DragEvent } from 'react';
import { GridPorps, Grid } from './Grid';

export interface SelectableGridProps extends Omit<GridPorps, 'onSelect'> {
  selected: boolean;
  selectable: boolean;
  dragging?: boolean;
  onSelect: (comicID: string) => void;
}

export function SelectableGrid({
  selected,
  selectable,
  onSelect,
  dragging,
  onDragStart,
  ...props
}: SelectableGridProps) {
  const toggle = () => onSelect(props.comicID!);

  const onDragStartCallback = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    onDragStart && onDragStart(evt);
    toggle();
  };

  const onMouseEnter = () => dragging && toggle();

  return (
    <Grid
      {...props}
      className={`selectable-grid ${selected ? 'selected' : ''}`}
      onMouseEnter={onMouseEnter}
    >
      {selectable && (
        <div
          draggable
          className="grid-layer selection-layer"
          onClick={toggle}
          onDragStart={onDragStartCallback}
        />
      )}
    </Grid>
  );
}
