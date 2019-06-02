import React, { ReactNode, useMemo, useRef, useCallback } from 'react';
import { Grid, GridCellProps, OnScrollParams } from 'react-virtualized';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';

export interface GridContainerProps<T> {
  width: number;
  height: number;
  items: T[];
  loadMore?: () => void;
  onGridRender: (props: T) => ReactNode;
  noContentRenderer?: () => ReactNode;
  overscanRowCount?: number;
}

const gridGap = 20;
const ratio = 360 / 480; // width / height
const containerPadding = gridGap;
// const scrollPosition = new Map<string, number>();

const gridContainerStyle = {
  padding: containerPadding - gridGap / 2,
  outline: 0
};

const gridSizerContainerStyle = {
  gridGap,
  padding: containerPadding
};

function getColumnData(width: number, el: HTMLDivElement | null) {
  const columnWidth = el ? el.offsetWidth : 0;
  const columnCount = Math.floor(width / columnWidth);

  return {
    columnCount,
    columnWidth
  };
}

export function GridContainer<T extends {}>({
  width,
  height,
  items,
  onGridRender,
  loadMore,
  overscanRowCount = 10
}: GridContainerProps<T>) {
  const gridSizerRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<number>(0);
  const { columnCount, columnWidth } = useMemo(
    () => getColumnData(width, gridSizerRef.current),
    [width]
  );
  const rowCount = useMemo(() => Math.ceil(items.length / columnCount), [
    items.length,
    columnCount
  ]);

  const onScroll = useCallback(({ scrollTop }: OnScrollParams) => {
    scrollTopRef.current = scrollTop;
  }, []);

  const cellRenderer = useCallback(
    ({ key, style, rowIndex, columnIndex }: GridCellProps) => {
      const index = rowIndex * columnCount + columnIndex;
      const data = items[index];

      if (!data) {
        return null;
      }

      return (
        <div style={style} key={key}>
          <div style={{ padding: `${gridGap / 2}px`, height: '100%' }}>
            {onGridRender(data)}
          </div>
        </div>
      );
    },
    [columnCount, items, onGridRender]
  );

  const onSectionRendered = useCallback(
    ({ rowStopIndex }: OnSectionRenderedParams) => {
      if (rowStopIndex - rowCount >= -1 && loadMore) {
        loadMore();
      }
    },
    [rowCount, loadMore]
  );

  return (
    <>
      <Grid
        className="grid-container"
        columnCount={columnCount}
        columnWidth={columnWidth + gridGap}
        rowCount={rowCount}
        rowHeight={columnWidth / ratio + gridGap}
        height={height}
        width={width}
        style={gridContainerStyle}
        cellRenderer={cellRenderer}
        // noContentRenderer={noContentRenderer}
        overscanRowCount={overscanRowCount}
        onScroll={onScroll}
        onSectionRendered={onSectionRendered}
      />
      <div className="grid-sizer-container" style={gridSizerContainerStyle}>
        <div ref={gridSizerRef} />
      </div>
    </>
  );
}
