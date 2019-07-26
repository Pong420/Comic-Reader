import React, { useCallback, useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'connected-react-router';
import { GridContainer } from '../GridContainer';
import { SearchResultGrid } from './SearchResultGrid';
import { SearchInput } from './SearchInput';
import { RootState, getSearchResults, getMoreSearchResults } from '../../store';
import { PATHS } from '../../constants';

const SAERCH_KEY = 'query';

const mapStateToProps = ({ searchResults }: RootState) => ({
  searchResults: searchResults.ids,
  keyword: searchResults.keyword,
  noMoreResults: searchResults.noMore
});

function SearchComponent({
  dispatch,
  keyword,
  searchResults,
  noMoreResults,
  location
}: RouteComponentProps & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const searchParam = new URLSearchParams(location.search);
  const query = searchParam.get(SAERCH_KEY);

  const onSearch = useCallback(
    (query: string) => dispatch(push(PATHS.SEARCH + `?${SAERCH_KEY}=${query}`)),
    [dispatch]
  );

  const loadMore = useCallback(() => {
    !noMoreResults && dispatch(getMoreSearchResults());
  }, [dispatch, noMoreResults]);

  useEffect(() => {
    query && dispatch(getSearchResults(query));
  }, [dispatch, query]);

  return (
    <div className="search">
      <SearchInput defaultValue={query} onSearch={onSearch} />
      <div className="search-results">
        <GridContainer
          items={searchResults}
          loadMore={loadMore}
          scrollPostionKey={keyword}
          noContentRenderer={() =>
            noMoreResults && (
              <div className="no-search-result">沒有相關結果</div>
            )
          }
          onGridRender={comicID => <SearchResultGrid comicID={comicID} />}
        />
      </div>
    </div>
  );
}

export const Search = connect(mapStateToProps)(SearchComponent);
