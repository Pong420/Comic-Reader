import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  ReactNode,
  CSSProperties
} from 'react';
import {
  Grid,
  GridCellProps,
  OnScrollParams,
  AutoSizer,
  Size
} from 'react-virtualized';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';

export interface GridContainerProps<T> {
  items: T[];
  loadMore?: () => void;
  onSectionRendered?: (params: OnSectionRenderedParams) => void;
  onGridRender: (props: T) => ReactNode;
  noContentRenderer?: () => ReactNode;
  overscanRowCount?: number;
  scrollPostionKey?: string;
}

const gridGap = 20;
const ratio = 360 / 480; // width / height
const containerPadding = gridGap;
const scrollPosition = new Map<string, number>();

const gridContainerStyle: CSSProperties = {
  outline: 0,
  padding: containerPadding - gridGap / 2
};

const gridSizerContainerStyle: CSSProperties = {
  gridGap,
  padding: `0 ${containerPadding}px`
};

const gridStyle = { padding: gridGap / 2, height: '100%' };

function getColumnData(width: number, el: HTMLDivElement | null) {
  const containerInnerWidth = width - containerPadding;
  const columnWidth = el ? el.offsetWidth : 1;
  const columnCount = Math.floor(containerInnerWidth / columnWidth);

  return {
    columnCount,
    columnWidth: containerInnerWidth / columnCount
  };
}

function GridContainerComponent<T extends {}>({
  width,
  height,
  items,
  onGridRender,
  loadMore,
  onSectionRendered,
  overscanRowCount = 1,
  noContentRenderer,
  scrollPostionKey
}: GridContainerProps<T> & Size) {
  const gridRef = useRef<Grid>(null);
  const gridSizerRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef(0);
  const [{ columnCount, columnWidth }, setColumnState] = useState(
    getColumnData.bind(null, width, gridSizerRef.current)
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

      return (
        <div style={style} key={key}>
          <div style={gridStyle}>{onGridRender(data)}</div>
        </div>
      );
    },
    [columnCount, items, onGridRender]
  );

  const handleLoadMore = useCallback(
    ({ rowStopIndex }: OnSectionRenderedParams) => {
      // Check `mounted` prevent unexpected load more event
      const mounted = !!gridRef.current;
      if (rowStopIndex - rowCount >= -2 && loadMore && mounted) {
        loadMore();
      }
    },
    [rowCount, loadMore]
  );

  useEffect(() => {
    setColumnState(getColumnData(width, gridSizerRef.current));
  }, [width]);

  useEffect(() => {
    scrollTopRef.current =
      (scrollPostionKey && scrollPosition.get(scrollPostionKey)) || 0;

    gridRef.current!.scrollToPosition({
      scrollTop: scrollTopRef.current,
      scrollLeft: 0
    });

    return () => {
      scrollPostionKey &&
        scrollPosition.set(scrollPostionKey, scrollTopRef.current);
    };
  }, [scrollPostionKey]);

  return (
    <>
      <Grid
        className="grid-container"
        columnCount={columnCount}
        columnWidth={columnWidth}
        rowCount={rowCount}
        rowHeight={columnWidth / ratio + gridStyle.padding}
        height={height}
        width={width}
        style={gridContainerStyle}
        cellRenderer={cellRenderer}
        noContentRenderer={noContentRenderer}
        overscanRowCount={overscanRowCount}
        onScroll={onScroll}
        onSectionRendered={onSectionRendered || handleLoadMore}
        ref={gridRef}
      />
      <div className="grid-sizer-container" style={gridSizerContainerStyle}>
        <div ref={gridSizerRef} />
      </div>
    </>
  );
}

export function GridContainer<T>(props: GridContainerProps<T>) {
  return (
    <AutoSizer>
      {({ width, height }) =>
        !!width && (
          <GridContainerComponent {...props} width={width} height={height} />
        )
      }
    </AutoSizer>
  );
}
