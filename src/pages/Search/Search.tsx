import React, { useEffect, useCallback, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { useRxAsync } from 'use-rx-hooks';
import { concatMap } from 'rxjs/operators';
import { Button, InputGroup } from '@blueprintjs/core';
import { OnSectionRenderedParams } from 'react-virtualized/dist/es/ArrowKeyStepper';
import { SearchResultGrid } from './SearchResultGrid';
import { GridContainer } from '../../components/GridContainer';
import { MuiIcon } from '../../components/MuiIcon';
import { getSearchResults } from '../../service';
import {
  searchResultsPaginationSelector,
  useSearchResultActions
} from '../../store';
import { useSearchParam } from '../../hooks/useSearchParam';
import { ReactComponent as SearchIcon } from '../../assets/search-24px.svg';
import { Params$SearchResult } from '../../typings';

const name: keyof Params$SearchResult = 'keyword';

export function Search({ location }: RouteComponentProps) {
  const { paginateSearchResults } = useSearchResultActions();

  const {
    ids,
    pageNo,
    pageSize,
    total,
    params: { [name]: keyword },
    hasData
  } = useSelector(searchResultsPaginationSelector);

  const { run, loading } = useRxAsync(getSearchResults, {
    defer: true,
    mapOperator: concatMap,
    onSuccess: paginateSearchResults
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
        run({ keyword, page: nextPage });
      }
    },
    [loading, run, pageNo, pageSize, keyword, total]
  );

  const { setSearchParam } = useSearchParam();

  const onSearch = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      const data = new FormData(event.currentTarget);

      event.preventDefault();
      setSearchParam({ [name]: data.get(name) });
    },
    [setSearchParam]
  );

  useEffect(() => {
    keyword && !hasData && run({ keyword, page: pageNo });
  }, [hasData, run, pageNo, keyword]);

  return (
    <div className="search">
      <form className="search-input" onSubmit={onSearch}>
        <InputGroup
          large
          name={name}
          defaultValue={keyword}
          rightElement={
            <Button minimal>
              <MuiIcon icon={SearchIcon} />
            </Button>
          }
          placeholder="輸入書名 / 作者名稱"
        />
      </form>
      <div className="search-content">
        <GridContainer
          items={ids}
          overscanRowCount={2}
          scrollPostionKey={location.pathname}
          onSectionRendered={onSectionRendered}
          onGridRender={id => <SearchResultGrid comicID={id} />}
          noContentRenderer={() =>
            keyword &&
            (loading ? (
              <div className="loading">LOADING ...</div>
            ) : (
              !total && <div className="no-search-result">沒有相關結果</div>
            ))
          }
        />
      </div>
    </div>
  );
}
