import React, { useState, useRef } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer, CustomGridRef } from '../GridContainer';
import { Grid } from '../Grid';
import { SearchHeader } from './SearchHeader';
import {
  RootState,
  SearchResultsState,
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
  cancelGetSearchResults
}: SearchResultsState & typeof SearchActionCreators) {
  const [keyword, setKeyword] = useState(cachedKeyword);
  const rvGridRef = useRef<CustomGridRef>(null);

  function request(pageNo: number = page) {
    if (keyword) {
      getSearchResults({
        keyword,
        page: pageNo
      });
    }
  }

  function onSearch() {
    if (keyword !== cachedKeyword) {
      rvGridRef.current!.getGridRef()!.scrollToPosition({
        scrollTop: 0,
        scrollLeft: 0
      });

      cleanSearchResults();
      cancelGetSearchResults();
      request(1);
    }
  }

  return (
    <Layout className="search">
      <SearchHeader
        value={keyword}
        onSearch={onSearch}
        onInputChange={(keyword: string) => setKeyword(keyword.trim())}
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
              ref={rvGridRef}
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
