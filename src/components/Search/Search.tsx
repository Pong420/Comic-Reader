import React, { useCallback, useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'connected-react-router';
import { AutoSizer } from 'react-virtualized';
import { GridContainer } from '../GridContainer';
import { SearchResultGrid } from './SearchResultGrid';
import { SearchInput } from './SearchInput';
import { RootState, getSearchResults } from '../../store';
import { PATHS } from '../../constants';

const SAERCH_KEY = 'query';

const mapStateToProps = ({ searchResults }: RootState) => ({
  searchResults: searchResults.ids,
  keyword: searchResults.keyword
});

function SearchComponent({
  dispatch,
  keyword,
  searchResults,
  location
}: RouteComponentProps & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const searchParam = new URLSearchParams(location.search);
  const query = searchParam.get(SAERCH_KEY);

  const onSearch = useCallback(
    (query: string) => dispatch(push(PATHS.SEARCH + `?${SAERCH_KEY}=${query}`)),
    [dispatch]
  );

  useEffect(() => {
    query && dispatch(getSearchResults(query));
  }, [dispatch, query]);

  return (
    <div className="search">
      <SearchInput defaultValue={query} onSearch={onSearch} />
      <div className="search-results">
        <AutoSizer>
          {dimen => (
            <GridContainer
              {...dimen}
              items={searchResults}
              scrollPostionKey={keyword}
              onGridRender={comicID => <SearchResultGrid comicID={comicID} />}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export const Search = connect(mapStateToProps)(SearchComponent);
