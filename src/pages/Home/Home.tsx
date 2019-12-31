import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useRxAsync } from 'use-rx-hooks';
import { concatMap } from 'rxjs/operators';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';
import { GridContainer } from '../../components/GridContainer';
import { HomeGrid } from './HomeGrid';
import { getComicList } from '../../service';
import { useComicActions, comicPaginationSelector } from '../../store';
import { PATHS } from '../../constants';

export function Home({ location }: RouteComponentProps) {
  const { paginateComics } = useComicActions();

  const { ids, pageNo, pageSize, filter, total, hasData } = useSelector(
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
    !hasData && run({ page: pageNo, filter });
  }, [hasData, run, pageNo, filter]);

  return (
    <div className="home">
      <GridContainer
        items={!loading && !total ? [] : ids}
        overscanRowCount={2}
        scrollPostionKey={location.pathname} // TODO: reset after filter
        onSectionRendered={onSectionRendered}
        onGridRender={id => <HomeGrid comicID={id} />}
        noContentRenderer={() => (
          <div className="no-results">
            暫時沒有此類別組合的漫畫。您可以縮小類別組合進行篩選。或
            <Link to={PATHS.FILTER}>重新篩選</Link>。
          </div>
        )}
      />
    </div>
  );
}
