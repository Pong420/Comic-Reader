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

interface ColumnState {
  columnCount: number;
  columnWidth: number;
}

interface GridSizerProps<T> extends GridContainerProps<T> {}

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

function getColumnData(width: number, el: HTMLDivElement | null): ColumnState {
  const containerInnerWidth = width - containerPadding;
  const columnWidth = el ? el.offsetWidth : 1;
  const columnCount = el ? Math.floor(containerInnerWidth / columnWidth) : 1;

  return {
    columnCount,
    columnWidth: containerInnerWidth / columnCount
  };
}

function GridSizer<T extends {}>(props: GridSizerProps<T> & Size) {
  const { width } = props;
  const gridSizerRef = useRef<HTMLDivElement>(null);
  const [columnState, setColumnState] = useState(
    getColumnData(width, gridSizerRef.current)
  );

  useEffect(() => {
    setColumnState(getColumnData(width, gridSizerRef.current));
  }, [width]);

  return (
    <>
      {gridSizerRef.current && (
        <GridContainerComponent {...columnState} {...props} />
      )}
      <div className="grid-sizer-container" style={gridSizerContainerStyle}>
        <div ref={gridSizerRef} />
      </div>
    </>
  );
}

function GridContainerComponent<T extends {}>({
  width,
  height,
  columnCount,
  columnWidth,
  items,
  onGridRender,
  loadMore,
  onSectionRendered,
  overscanRowCount = 1,
  noContentRenderer,
  scrollPostionKey = ''
}: GridContainerProps<T> & Size & ColumnState) {
  const gridRef = useRef<Grid>(null);
  const gridSizerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState<number | undefined>(
    (scrollPostionKey && scrollPosition.get(scrollPostionKey)) || 0
  );

  const rowCount = useMemo(() => Math.ceil(items.length / columnCount), [
    items.length,
    columnCount
  ]);

  const onScroll = useCallback(
    ({ scrollTop }: OnScrollParams) => {
      scrollPosition.set(scrollPostionKey, scrollTop);
    },
    [scrollPostionKey]
  );

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
    typeof scrollTop === 'number' && setScrollTop(undefined);
  }, [scrollTop]);

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
        scrollTop={scrollTop}
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
        !!width && <GridSizer {...props} width={width} height={height} />
      }
    </AutoSizer>
  );
}
