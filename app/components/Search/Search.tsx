import React, { useRef, useCallback } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer, GridHandler } from '../GridContainer';
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
  const gridHandler = useRef<GridHandler>(null);

  const request = useCallback(
    (keyword: string, pageNo: number = page) => {
      if (keyword) {
        getSearchResults({
          keyword,
          page: pageNo
        });
      }
    },
    [getSearchResults, page]
  );

  const onSearch = useCallback(
    (keyword: string) => {
      if (keyword !== cachedKeyword) {
        gridHandler.current!.getGridRef()!.scrollToPosition({
          scrollTop: 0,
          scrollLeft: 0
        });

        cleanSearchResults();
        cancelGetSearchResults();
        request(keyword, 1);
      }
    },
    [cachedKeyword, cancelGetSearchResults, cleanSearchResults, request]
  );

  return (
    <Layout className="search">
      <SearchHeader initialValue={cachedKeyword} onSearch={onSearch} />
      <div className="search-results">
        <AutoSizer>
          {({ width, height }) => (
            <GridContainer
              width={width}
              height={height}
              list={searchResults}
              onGridRender={props => <Grid {...props} />}
              loadMore={() => !noMoreSearchResults && request(cachedKeyword)}
              noContentRenderer={() =>
                noMoreSearchResults && <div className="wrapper">搵唔到</div>
              }
              handler={gridHandler}
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
