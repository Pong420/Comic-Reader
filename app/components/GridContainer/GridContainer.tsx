import React, { ReactNode, useLayoutEffect, useState, useRef } from 'react';
import { Grid, GridCellProps, OnScrollParams } from 'react-virtualized';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';

export interface GridContainerProps {
  width: number;
  height: number;
  list: any[];
  loadMore?: () => Promise<any>;
  onGridRender: (props: any) => ReactNode;
}

const spacer = 15;

export function GridContainer({
  width,
  height,
  list,
  loadMore,
  onGridRender
}: GridContainerProps) {
  const gridSizerRef = useRef(null);
  const scrollTopRef = useRef(Number(localStorage.getItem('scrollTop')));
  const [{ columnCount, columnWidth }, setColumnData] = useState({
    columnCount: 0,
    columnWidth: 0
  });

  const rowCount = Math.ceil(list.length / columnCount);

  const calcColumnData = () => {
    const width_ = width - spacer * 2;

    // offsetWith not return decimal, so do not count this value
    const tempcolumnWidth = gridSizerRef.current
      ? gridSizerRef.current.offsetWidth
      : 0;

    const columnCount = Math.floor(width / tempcolumnWidth);
    const columnWidth = (width_ - spacer * columnCount) / columnCount;

    return {
      columnCount,
      columnWidth
    };
  };

  const onResizeHandler = () => {
    setColumnData(calcColumnData());
  };

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

  useLayoutEffect(() => onResizeHandler(), [width, height]);

  useLayoutEffect(() => {
    return () => {
      localStorage.setItem('scrollTop', String(scrollTopRef.current));
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
