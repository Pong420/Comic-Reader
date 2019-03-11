import React, { ReactNode, useMemo, useRef, Ref, forwardRef } from 'react';
import { Grid, GridCellProps } from 'react-virtualized';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';
import { GridWithScrollRestoration } from './GridWithScrollRestoration';

export interface GridContainerProps<T> {
  width: number;
  height: number;
  list: T[];
  loadMore?: () => void;
  onGridRender: (props: T) => ReactNode;
  noContentRenderer?: () => ReactNode;
}

const spacer = 15;

// FIXME: typing
export function GridContainerComponent<T extends any>(
  {
    width,
    height,
    list,
    loadMore,
    onGridRender,
    noContentRenderer
  }: GridContainerProps<T>,
  ref: Ref<Grid>
) {
  const gridSizerRef = useRef<HTMLDivElement>(null);
  const { columnCount, columnWidth } = useMemo(
    () => getColumnData(width, gridSizerRef.current),
    [width, height]
  );
  const rowCount = Math.ceil(list.length / columnCount);

  function cellRenderer({ key, style, rowIndex, columnIndex }: GridCellProps) {
    const index = rowIndex * columnCount + columnIndex;
    const data = list[index];

    if (!data) {
      return null;
    }

    return (
      <div style={style} key={key}>
        <div style={{ padding: `${spacer / 2}px` }}>{onGridRender(data)}</div>
      </div>
    );
  }

  return (
    <>
      {columnCount && columnWidth && (
        <GridWithScrollRestoration
          className="grid-container"
          columnCount={columnCount}
          columnWidth={columnWidth + spacer}
          rowCount={rowCount}
          rowHeight={columnWidth / 0.75 + spacer}
          height={height}
          width={width}
          cellRenderer={cellRenderer}
          style={{ padding: `${spacer}px`, outline: 0 }}
          overscanRowCount={1}
          noContentRenderer={noContentRenderer}
          scrollToAlignment="center"
          onSectionRendered={({ rowStopIndex }: OnSectionRenderedParams) => {
            if (rowStopIndex - rowCount >= -1) {
              loadMore && loadMore();
            }
          }}
          ref={ref}
        />
      )}
      <div className="grid-sizer-container" style={{ gridGap: `${spacer}px` }}>
        <div ref={gridSizerRef} />
      </div>
    </>
  );
}

export const GridContainer = forwardRef(GridContainerComponent);

function getColumnData(width: number, el: HTMLDivElement | null) {
  const columnWidth = el ? el.offsetWidth : 0;
  const columnCount = Math.floor(width / columnWidth);

  return {
    columnCount,
    columnWidth
  };
}
