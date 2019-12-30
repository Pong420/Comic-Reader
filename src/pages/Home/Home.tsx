import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { useRxAsync } from 'use-rx-hooks';
import { concatMap } from 'rxjs/operators';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';
import { GridContainer } from '../../components/GridContainer';
import { HomeGrid } from './HomeGrid';
import { getComicList } from '../../service';
import { useComicActions, comicPaginationSelector } from '../../store';

export function Home({ location }: RouteComponentProps) {
  const { paginateComics } = useComicActions();

  const { ids, pageNo, pageSize, total, hasData } = useSelector(
    comicPaginationSelector
  );

  const { run, loading } = useRxAsync(getComicList, {
    defer: true,
    mapOperator: concatMap,
    onSuccess: paginateComics
  });

  const onSectionRendered = useCallback(
    ({ rowStopIndex, columnStopIndex }: OnSectionRenderedParams) => {
      const nextPage = pageNo + 1;
      const hasNext = Math.ceil(total / pageSize) >= nextPage;
      if (
        !loading &&
        hasNext &&
        rowStopIndex * (columnStopIndex + 1) > (pageNo - 2) * pageSize
      ) {
        run({ page: nextPage });
      }
    },
    [loading, run, pageNo, pageSize, total]
  );

  useEffect(() => {
    !hasData && run({ page: pageNo });
  }, [hasData, run, pageNo]);

  return (
    <div className="home">
      <GridContainer
        items={ids}
        overscanRowCount={2}
        scrollPostionKey={location.pathname}
        onSectionRendered={onSectionRendered}
        onGridRender={id => <HomeGrid comicID={id} />}
      />
    </div>
  );
}
