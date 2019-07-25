import React, { useCallback, DragEvent } from 'react';
import { IncompleteGrid, IncompleteGridProps } from './IncompleteGrid';
import { classes } from '../../utils/classes';

interface Props extends IncompleteGridProps {
  selected: boolean;
  toggleSelect(comicID: string): void;
}

export const SelectableGrid = ({
  selected,
  toggleSelect,
  className,
  ...props
}: Props) => {
  const toggle = useCallback(() => toggleSelect(props.comicID), [
    props.comicID,
    toggleSelect
  ]);

  const onDragStart = useCallback(
    (evt: DragEvent<HTMLDivElement>) => {
      toggle();
      evt.preventDefault();
    },
    [toggle]
  );

  return (
    <IncompleteGrid {...props} className={classes({ selected })}>
      <div
        draggable
        className="grid-layer selection-layer"
        onClick={toggle}
        onDragStart={onDragStart}
      />
    </IncompleteGrid>
  );
};

// export function useDraggable() {
//   const [dragging, setDragging] = useState(false);

//   useEffect(() => {
//     if (dragging) {
//       const callback = () => setDragging(false);
//       window.addEventListener('mouseup', callback);
//       return () => {
//         window.removeEventListener('mouseup', callback);
//         window.removeEventListener('mouseleave', callback);
//       };
//     }
//   }, [dragging]);

//   return { dragging, setDragging };
// }
