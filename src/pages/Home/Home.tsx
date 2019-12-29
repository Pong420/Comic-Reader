import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRxAsync } from 'use-rx-hooks';
import { concatMap } from 'rxjs/operators';
import { GridContainer } from '../../components/GridContainer';
import { Grid } from '../../components/Grid';
import { getComicList } from '../../service';
import { useComicActions, comicPaginationSelector } from '../../store';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';
import { RouteComponentProps } from 'react-router-dom';

export function Home({ location }: RouteComponentProps) {
  const { paginateComics } = useComicActions();

  const { ids, pageNo, pageSize, total, defer } = useSelector(
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
      const hasNext = nextPage * pageSize <= total;
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
    !defer && run({ page: pageNo });
  }, [defer, run, pageNo]);

  return (
    <div className="home">
      <GridContainer
        items={ids}
        overscanRowCount={2}
        scrollPostionKey={location.pathname}
        onSectionRendered={onSectionRendered}
        onGridRender={id => <Grid id={id} />}
      />
    </div>
  );
}
