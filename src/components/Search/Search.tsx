import React, { useCallback } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { GridContainer } from '../GridContainer';
import { SearchResultGrid } from './SearchResultGrid';
import { SearchInput } from './SearchInput';
import { RootState, getSearchResults, getMoreSearchResults } from '../../store';

const mapStateToProps = ({ searchResults }: RootState) => ({
  searchResults: searchResults.ids,
  keyword: searchResults.keyword,
  noMoreResults: searchResults.noMore
});

function SearchComponent({
  dispatch,
  keyword,
  searchResults,
  noMoreResults
}: RouteComponentProps & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const onSearch = useCallback(
    (query: string) => dispatch(getSearchResults(query)),
    [dispatch]
  );

  const loadMore = useCallback(() => {
    !noMoreResults && dispatch(getMoreSearchResults());
  }, [dispatch, noMoreResults]);

  return (
    <div className="search">
      <SearchInput defaultValue={keyword} onSearch={onSearch} />
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
