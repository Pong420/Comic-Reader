import React, { ReactNode, RefObject, useMemo, useRef, useImperativeHandle, useEffect } from 'react';
import { Grid, GridCellProps, OnScrollParams } from 'react-virtualized';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface GridContainerProps<T> {
  width: number;
  height: number;
  list: T[];
  loadMore?: () => void;
  onGridRender: (props: T) => ReactNode;
  noContentRenderer?: () => ReactNode;
  handler?: RefObject<GridHandler>;
  overscanRowCount?: number;
}

export interface GridHandler {
  getGridRef(): Grid | null;
  scrollTop(val?: number): void;
}

const gridGap = 20;
const ratio = 360 / 480; // width / height
const containerPadding = gridGap;
const scrollPosition = new Map<string, number>();

function BaseComponent<T extends any>({
  width,
  height,
  list,
  loadMore,
  onGridRender,
  noContentRenderer,
  handler,
  location,
  overscanRowCount = 1
}: GridContainerProps<T> & RouteComponentProps) {
  const key = location.pathname;
  const gridRef = useRef<Grid>(null);
  const gridSizerRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<number>(0);
  const { columnCount, columnWidth } = useMemo(() => getColumnData(width, gridSizerRef.current), [width]);
  const rowCount = Math.ceil(list.length / columnCount);

  function onScroll({ scrollTop }: OnScrollParams) {
    if (scrollTop) {
      scrollTopRef.current = scrollTop;
    }
  }

  function cellRenderer({ key, style, rowIndex, columnIndex }: GridCellProps) {
    const index = rowIndex * columnCount + columnIndex;
    const data = list[index];

    if (!data) {
      return null;
    }

    return (
      <div style={style} key={key}>
        <div style={{ padding: `${gridGap / 2}px`, height: '100%' }}>{onGridRender(data)}</div>{' '}
      </div>
    );
  }

  useImperativeHandle(handler, () => ({
    getGridRef() {
      return gridRef.current;
    },
    scrollTop(val: number) {
      if (typeof val !== 'undefined') {
        scrollTopRef.current = val;
        scrollPosition.set(key, val);
      } else {
        return scrollTopRef.current;
      }
    }
  }));

  useEffect(() => {
    scrollTopRef.current = scrollPosition.get(key) || 0;

    gridRef.current!.scrollToPosition({
      scrollTop: scrollTopRef.current,
      scrollLeft: 0
    });

    return () => {
      scrollPosition.set(key, scrollTopRef.current);
    };
  }, [key]);

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
        style={{ padding: containerPadding - gridGap / 2, outline: 0 }}
        cellRenderer={cellRenderer}
        noContentRenderer={noContentRenderer}
        overscanRowCount={overscanRowCount}
        onScroll={onScroll}
        onSectionRendered={({ rowStopIndex }: OnSectionRenderedParams) => {
          if (rowStopIndex - rowCount >= -1) {
            loadMore && loadMore();
          }
        }}
        ref={gridRef}
      />
      <div className="grid-sizer-container" style={{ gridGap, padding: containerPadding }}>
        <div ref={gridSizerRef} />
      </div>
    </>
  );
}

const RoutedComponent = withRouter(BaseComponent);

export function GridContainer<T>(props: GridContainerProps<T>) {
  return <RoutedComponent {...props} />;
}

function getColumnData(width: number, el: HTMLDivElement | null) {
  const columnWidth = el ? el.offsetWidth : 0;
  const columnCount = Math.floor(width / columnWidth);

  return {
    columnCount,
    columnWidth
  };
}
