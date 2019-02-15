import React, { ReactNode, useLayoutEffect, useState } from 'react';
// import { useAsync } from 'react-async';
import { Grid, GridCellProps } from 'react-virtualized';
import debounce from 'lodash/debounce';

export interface HomeGridContainerProps {
  width: number;
  height: number;
  gridEl: HTMLElement | null;
  list: any[];
  hidden?: boolean;
  loadMore?: () => Promise<any>;
  onGridRender: (props: any) => ReactNode;
}

const spacer = 15;

export function HomeGridContainer({
  width,
  height,
  gridEl,
  list,
  hidden,
  onGridRender
}: HomeGridContainerProps) {
  const [{ columnCount, columnWidth }, setColumnData] = useState({
    columnCount: 0,
    columnWidth: 0
  });

  const calcColumnData = () => {
    const width_ = width - spacer * 2;
    const tempcolumnWidth = gridEl ? gridEl.offsetWidth : 0; // offsetWith not return decimal, so we not count this value
    const columnCount = Math.floor(width / tempcolumnWidth);
    const columnWidth = (width_ - spacer * columnCount) / columnCount;

    return {
      columnWidth,
      columnCount
    };
  };

  const loadMoreHandler = debounce(() => {
    setColumnData(calcColumnData());
  }, 100);

  useLayoutEffect(() => {
    loadMoreHandler();
  }, [width, height]);

  function cellRenderer({ key, style, rowIndex, columnIndex }: GridCellProps) {
    const index = rowIndex * columnCount + columnIndex;
    return (
      <div style={style} key={key}>
        <div style={{ padding: `${spacer / 2}px` }}>
          {onGridRender(list[index])}
        </div>
      </div>
    );
  }

  return (
    <>
      {!hidden && columnCount && columnWidth && (
        <Grid
          className="home-grid-container"
          columnCount={columnCount}
          columnWidth={columnWidth + spacer}
          rowCount={list.length / columnCount}
          rowHeight={columnWidth / 0.75 + spacer}
          height={height}
          width={width}
          cellRenderer={cellRenderer}
          style={{ padding: `${spacer}px` }}
        />
      )}
    </>
  );
}
