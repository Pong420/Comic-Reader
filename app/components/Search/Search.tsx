import React, { useState } from 'react';
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import { SearchHeader } from './SearchHeader';
import {
  RootState,
  SearchResultsState,
  SearchActions,
  SearchActionCreators
} from '../../store';

function mapStateToProps({ search }: RootState, ownProps: any) {
  return { ...search, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(SearchActionCreators, dispatch);
}

function SearchComponent({
  page,
  cachedKeyword,
  searchResults,
  noMoreSearchResults,
  getSearchResults,
  cleanSearchResults,
  cancelGetSearchResults,
  saveSearchKeyword
}: SearchResultsState & ActionCreatorsMapObject<SearchActions>) {
  const [keyword, setKeyword] = useState(cachedKeyword);

  function request(pageNo: number = page) {
    if (keyword.trim()) {
      getSearchResults({
        keyword,
        page: pageNo
      });
    }
  }

  function onSearch() {
    cleanSearchResults();
    cancelGetSearchResults();
    saveSearchKeyword(keyword);
    request(1);
  }

  return (
    <Layout className="search">
      <SearchHeader
        value={keyword}
        onSearch={onSearch}
        onInputChange={(keyword: string) => setKeyword(keyword)}
      />
      <div className="search-results">
        <AutoSizer>
          {({ width, height }) => (
            <GridContainer
              width={width}
              height={height}
              list={searchResults}
              onGridRender={props => <Grid {...props} />}
              loadMore={() => !noMoreSearchResults && request()}
              noContentRenderer={() =>
                noMoreSearchResults && <div className="wrapper">搵唔到</div>
              }
            />
          )}
        </AutoSizer>
      </div>
    </Layout>
  );
}

export const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
