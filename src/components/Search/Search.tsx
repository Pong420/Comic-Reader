import React, { useEffect, useCallback, useRef } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { SearchField } from './SearchField';
import { GridContainer, GridHandler } from '../GridContainer';
import { Grid } from '../Grid';
import {
  RootState,
  SearchResultsState,
  SearchActionCreators
} from '../../store';

const mapStateToProps = ({ search }: RootState, ownProps: any) => ({
  ...search,
  ...ownProps
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(SearchActionCreators, dispatch);

function SearchComponent({
  page,
  cachedKeyword,
  searchResults,
  noMoreSearchResults,
  getSearchResults,
  getMoreSearchResults,
  cancelGetSearchResults
}: SearchResultsState & typeof SearchActionCreators) {
  const gridHandler = useRef<GridHandler>(null);

  const onSearch = useCallback(
    keyword => {
      if (keyword && keyword !== cachedKeyword) {
        gridHandler.current!.getGridRef()!.scrollToPosition({
          scrollTop: 0,
          scrollLeft: 0
        });

        getSearchResults({ keyword, page: 1 });
      }
    },
    [cachedKeyword, getSearchResults]
  );

  const loadMore = useCallback(() => {
    if (!noMoreSearchResults) {
      getMoreSearchResults({ keyword: cachedKeyword, page });
    }
  }, [cachedKeyword, getMoreSearchResults, noMoreSearchResults, page]);

  useEffect(() => {
    return () => {
      cancelGetSearchResults();
    };
  }, [cancelGetSearchResults]);

  return (
    <Layout className="search">
      <SearchField value={cachedKeyword} onSearch={onSearch} />
      <div className="search-results">
        <AutoSizer>
          {({ width, height }) => (
            <GridContainer
              width={width}
              height={height}
              list={searchResults}
              loadMore={loadMore}
              handler={gridHandler}
              onGridRender={props => <Grid {...props} />}
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
