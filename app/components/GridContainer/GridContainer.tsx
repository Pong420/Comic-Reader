import React, { ReactNode, useLayoutEffect, useState, useRef } from 'react';
import { Grid, GridCellProps, OnScrollParams } from 'react-virtualized';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';

export interface GridContainerProps<T> {
  width: number;
  height: number;
  list: T[];
  loadMore?: () => Promise<void>;
  onGridRender: (props: T) => ReactNode;
}

// TODO:
// - Update scrollTopRef

const spacer = 15;
const SCROLL_POSITION = 'SCROLL_POSITION';

export function GridContainer<T>({
  width,
  height,
  list,
  loadMore,
  onGridRender
}: GridContainerProps<T>) {
  const gridSizerRef = useRef(null);
  const scrollTopRef = useRef(Number(localStorage.getItem(SCROLL_POSITION)));
  const [{ columnCount, columnWidth }, setColumnData] = useState({
    columnCount: 0,
    columnWidth: 0
  });

  const rowCount = Math.ceil(list.length / columnCount);

  function getColumnData() {
    const innerWidth = width - spacer * 2;

    // offsetWith not return decimal, so do not count this value
    const tempcolumnWidth = gridSizerRef.current
      ? gridSizerRef.current.offsetWidth
      : 0;

    const columnCount = Math.floor(width / tempcolumnWidth);
    const columnWidth = (innerWidth - spacer * columnCount) / columnCount;

    return {
      columnCount,
      columnWidth
    };
  }

  function resizeHandler() {
    setColumnData(getColumnData());
  }

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

  function onScroll({ scrollTop }: OnScrollParams) {
    scrollTopRef.current = scrollTop;
  }

  useLayoutEffect(() => resizeHandler(), [width, height]);

  useLayoutEffect(() => {
    return () => {
      localStorage.setItem(SCROLL_POSITION, String(scrollTopRef.current));
    };
  }, []);

  return (
    <>
      {columnCount && columnWidth && (
        <Grid
          className="grid-container"
          columnCount={columnCount}
          columnWidth={columnWidth + spacer}
          rowCount={rowCount}
          rowHeight={columnWidth / 0.75 + spacer}
          height={height}
          width={width}
          cellRenderer={cellRenderer}
          style={{ padding: `${spacer}px`, outline: 0 }}
          onScroll={onScroll}
          overscanRowCount={1}
          onSectionRendered={({ rowStopIndex }: OnSectionRenderedParams) => {
            if (rowStopIndex - rowCount >= -1) {
              loadMore && loadMore();
            }
          }}
        />
      )}
      <div className="grid-sizer-container" style={{ gridGap: `${spacer}px` }}>
        <div ref={gridSizerRef} />
      </div>
    </>
  );
}
