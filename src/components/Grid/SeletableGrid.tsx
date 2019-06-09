import React from 'react';
import { IncompleteGrid, IncompleteGridProps } from './IncompleteGrid';
import { classes } from '../../utils/classes';

interface Props extends IncompleteGridProps {
  selected: boolean;
  seletable: boolean;
  toggleSelect(comicID: string): void;
}

export function SeletableGrid({
  selected,
  seletable,
  toggleSelect,
  className,
  ...props
}: Props) {
  return (
    <IncompleteGrid {...props} className={classes({ selected, seletable })}>
      {seletable && (
        <div
          className="grid-layer selection-layer"
          onClick={() => toggleSelect(props.comicID)}
        />
      )}
    </IncompleteGrid>
  );
}
