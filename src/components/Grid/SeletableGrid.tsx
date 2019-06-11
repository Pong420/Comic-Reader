import React, { useEffect, useState } from 'react';
import { IncompleteGrid, IncompleteGridProps } from './IncompleteGrid';
import { classes } from '../../utils/classes';

interface Props extends IncompleteGridProps {
  selected: boolean;
  seletable: boolean;
  dragging?: boolean;
  setDragging?(flag: boolean): void;
  toggleSelect(comicID: string): void;
}

export function SeletableGrid({
  selected,
  seletable,
  toggleSelect,
  dragging,
  setDragging,
  className,
  ...props
}: Props) {
  const toggle = () => toggleSelect(props.comicID);
  const onMouseEnter = () => seletable && dragging && toggle();

  return (
    <IncompleteGrid {...props} className={classes({ selected, seletable })}>
      {seletable && (
        <div
          draggable
          className="grid-layer selection-layer"
          onClick={toggle}
          onMouseEnter={onMouseEnter}
          onDragStart={evt => {
            toggle();
            setDragging && setDragging(true);
            evt.preventDefault();
          }}
        />
      )}
    </IncompleteGrid>
  );
}

export function useDraggable() {
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (dragging) {
      const callback = () => setDragging(false);
      window.addEventListener('mouseup', callback);
      return () => {
        window.removeEventListener('mouseup', callback);
        window.removeEventListener('mouseleave', callback);
      };
    }
  }, [dragging]);

  return { dragging, setDragging };
}
