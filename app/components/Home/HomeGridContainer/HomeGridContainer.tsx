import React, { ReactNode, useRef, useLayoutEffect, useState } from 'react';
// import React, { ReactNode } from 'react';
// import { useAsync } from 'react-async';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  MasonryCellProps
} from 'react-virtualized';
import debounce from 'lodash/debounce';

export interface HomeGridContainerProps {
  list: any[];
  render: (props: any) => ReactNode;
  onLoadMore?: () => Promise<any>;
  hidden?: boolean;
}

const spacer = 15;

export function HomeGridContainer({ list, render }: HomeGridContainerProps) {
  const masonryRef = useRef(null);
  const gridSizerRef = useRef(null);
  const [cache, setCache] = useState(null);
  const [cellPositioner, setCellPositioner] = useState(null);

  const calcCellPositioner = () => {
    const width = window.innerWidth - 80 + spacer;
    const tempcolumnWidth = gridSizerRef.current.offsetWidth; // offsetWith not return decimal
    const columnCount = Math.floor(width / tempcolumnWidth);
    const columnWidth = (width - spacer * columnCount) / columnCount;

    return {
      columnWidth,
      columnCount,
      spacer
    };
  };

  useLayoutEffect(() => {
    const { columnWidth, columnCount } = calcCellPositioner();

    const cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultWidth: columnWidth,
      defaultHeight: columnWidth / 0.75
    });

    const cellPositioner = createMasonryCellPositioner({
      cellMeasurerCache: cache,
      columnCount,
      columnWidth,
      spacer
    });

    setCache(cache);
    setCellPositioner(() => () => cellPositioner);

    const loadMoreHandler = debounce(evt => {
      cellPositioner.reset(calcCellPositioner());
      masonryRef.current.clearCellPositions();
    }, 150);

    // scrollerRef.current.addEventListener('scroll', loadMoreHandler);
    window.addEventListener('resize', loadMoreHandler);

    return () => {
      // scrollerRef.current.removeEventListener('scroll', loadMoreHandler);
      window.removeEventListener('resize', loadMoreHandler);
    };
  }, []);

  function cellRenderer({ index, key, parent, style }: MasonryCellProps) {
    const data = list[index];

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>{render(data)}</div>
      </CellMeasurer>
    );
  }

  return (
    <>
      {cellPositioner && cache && (
        <AutoSizer>
          {({ height, width }) => (
            <Masonry
              className="home-grid-container"
              cellCount={list.length}
              cellMeasurerCache={cache}
              cellPositioner={cellPositioner()}
              cellRenderer={cellRenderer}
              height={height}
              width={width}
              autoHeight={false}
              ref={masonryRef}
            />
          )}
        </AutoSizer>
      )}
      <div className="home-grid-sizer-container">
        <div ref={gridSizerRef} />
      </div>
    </>
  );
}
