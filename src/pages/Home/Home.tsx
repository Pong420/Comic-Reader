import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRxAsync } from 'use-rx-hooks';
import { concatMap } from 'rxjs/operators';
import { GridContainer } from '../../components/GridContainer';
import { Grid } from '../../components/Grid';
import { getComicList } from '../../service';
import { useComicActions, comicPaginationSelector } from '../../store';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';

export function Home() {
  const { paginateComics, setPageComics } = useComicActions();

  const { ids, pageNo, pageSize, total, defer } = useSelector(
    comicPaginationSelector
  );

  const { run } = useRxAsync(getComicList, {
    defer: true,
    mapOperator: concatMap,
    onSuccess: paginateComics
  });

  const onSectionRendered = useCallback(
    ({ rowStopIndex, columnStopIndex }: OnSectionRenderedParams) => {
      const nextPage = pageNo + 1;
      const hasNext = nextPage * pageSize < total;
      if (
        hasNext &&
        rowStopIndex * (columnStopIndex + 1) > (pageNo - 2) * pageSize
      ) {
        setPageComics(nextPage);
      }
    },
    [setPageComics, pageNo, pageSize, total]
  );

  useEffect(() => {
    !defer && run({ page: pageNo });
  }, [defer, run, pageNo]);

  return (
    <div className="home">
      <GridContainer
        items={ids}
        overscanRowCount={2}
        onSectionRendered={onSectionRendered}
        onGridRender={id => <Grid id={id} />}
      />
    </div>
  );
}
