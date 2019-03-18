import React, {
  ReactNode,
  RefObject,
  useMemo,
  useRef,
  useImperativeHandle,
  useEffect
} from 'react';
import { Grid, GridCellProps, OnScrollParams } from 'react-virtualized';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';
import { withRouter, RouteComponentProps } from 'react-router';

export interface GridContainerProps<T> {
  width: number;
  height: number;
  list: T[];
  loadMore?: () => void;
  onGridRender: (props: T) => ReactNode;
  noContentRenderer?: () => ReactNode;
  handler?: RefObject<GridHandler>;
}

export interface GridHandler {
  getGridRef(): Grid | null;
  scrollTop(val?: number): void;
}

const spacer = 15;
const scrollPosition = new Map<string, number>();

export function BaseComponent<T extends any>({
  width,
  height,
  list,
  loadMore,
  onGridRender,
  noContentRenderer,
  handler,
  location
}: GridContainerProps<T> & RouteComponentProps) {
  const key = location.pathname;
  const gridRef = useRef<Grid>(null);
  const gridSizerRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<number>(scrollPosition.get(key) || 0);
  const { columnCount, columnWidth } = useMemo(
    () => getColumnData(width, gridSizerRef.current),
    [width]
  );
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
        <div style={{ padding: `${spacer / 2}px` }}>{onGridRender(data)}</div>
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
        columnWidth={columnWidth + spacer}
        rowCount={rowCount}
        rowHeight={columnWidth / 0.75 + spacer}
        height={height}
        width={width}
        style={{ padding: `${spacer}px`, outline: 0 }}
        cellRenderer={cellRenderer}
        noContentRenderer={noContentRenderer}
        overscanRowCount={1}
        onScroll={onScroll}
        onSectionRendered={({ rowStopIndex }: OnSectionRenderedParams) => {
          if (rowStopIndex - rowCount >= -1) {
            loadMore && loadMore();
          }
        }}
        ref={gridRef}
      />
      <div className="grid-sizer-container" style={{ gridGap: `${spacer}px` }}>
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
