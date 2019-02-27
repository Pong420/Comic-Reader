import React, {
  ReactNode,
  useMemo,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import {
  Grid,
  GridCellProps,
  OnScrollParams,
  GridProps
} from 'react-virtualized';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';

export interface GridContainerProps<T> {
  width: number;
  height: number;
  list: T[];
  loadMore?: () => Promise<any>;
  onGridRender: (props: T) => ReactNode;
  noContentRenderer?: () => ReactNode;
}

const spacer = 15;
const scrollPosition = new Map<string, number>();

const GridWithScrollHandler = withRouter(
  ({ location, ...props }: GridProps & RouteComponentProps) => {
    const [mounted, setMounted] = useState(false);
    const gridRef = useRef<Grid>(null);
    const key = location.pathname;
    const scrollRef = useRef<number>(scrollPosition.get(key) || 0);

    function onScroll({ scrollTop }: OnScrollParams) {
      if (mounted) {
        scrollRef.current = scrollTop;
      }
    }

    useLayoutEffect(() => {
      gridRef.current!.scrollToPosition({
        scrollTop: scrollRef.current,
        scrollLeft: 0
      });

      setMounted(true);

      return () => {
        scrollPosition.set(key, scrollRef.current);
      };
    }, []);

    return <Grid {...props} ref={gridRef} onScroll={onScroll} />;
  }
);

export function GridContainer<T>({
  width,
  height,
  list,
  loadMore,
  onGridRender,
  noContentRenderer
}: GridContainerProps<T>) {
  const gridSizerRef = useRef(null);
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
        <GridWithScrollHandler
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
        />
      )}
      <div className="grid-sizer-container" style={{ gridGap: `${spacer}px` }}>
        <div ref={gridSizerRef} />
      </div>
    </>
  );
}

function getColumnData(width: number, el: HTMLDivElement | null) {
  const columnWidth = el ? el.offsetWidth : 0;
  const columnCount = Math.floor(width / columnWidth);

  return {
    columnCount,
    columnWidth
  };
}
