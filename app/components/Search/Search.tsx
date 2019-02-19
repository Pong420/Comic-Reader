import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { useAsync } from 'react-async';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { SearchHeader } from './SearchHeader';
import SearchResultActions, {
  AddSearchResultsPayload
} from '../../actions/searchResult';
import { SearchResults, SearchParam } from '../../../typing';
import { search } from '../../api';

export interface SearchProps {
  page: number;
  keyword: string;
  noMoreResult: boolean;
  searchResults: SearchResults;
  setKeyword: (keyword: string) => void;
  setNoMoreResult: (noMoreResult: boolean) => void;
  setSearchResults: (searchResults: SearchResults) => void;
  addSearchResults: (args: AddSearchResultsPayload) => void;
}

function mapStateToProps({ searchResult }, ownProps) {
  return {
    ...searchResult,
    ...ownProps
  };
}

function mapActionToProps(dispatch) {
  return bindActionCreators(SearchResultActions, dispatch);
}

const placeholders = new Array(20).fill({}) as SearchResults;

/**
 *  TODO:
 *  - Search Fail
 */

export const Search = connect(
  mapStateToProps,
  mapActionToProps
)(
  ({
    page,
    keyword,
    searchResults,
    noMoreResult,
    setKeyword,
    setNoMoreResult,
    setSearchResults,
    addSearchResults
  }: SearchProps) => {
    const { isLoading, run } = useAsync({
      deferFn: ([params]: [SearchParam]) => search(params),
      onResolve(data) {
        if (data.length < 20) {
          setNoMoreResult(true);
        }
      }
    });

    function onSearch() {
      if (keyword.trim()) {
        setNoMoreResult(false);

        run({
          keyword
        }).then(data => setSearchResults(data));
      }
    }

    function loadMoreResult() {
      if (!noMoreResult) {
        const nextPage = page + 1;
        const from = searchResults.length;
        const to = searchResults.length + placeholders.length;

        addSearchResults({
          searchResults: placeholders.slice(0),
          page: nextPage
        });

        return run({ keyword, page: nextPage }).then(searchResults => {
          addSearchResults({
            searchResults,
            page: nextPage,
            from,
            to
          });
        });
      }
    }

    return (
      <Layout className="search">
        <SearchHeader
          value={keyword}
          onSearch={onSearch}
          onInputChange={(keyword: string) => setKeyword(keyword)}
        />
        <div className="search-results">
          {isLoading ? (
            <div className="wrapper">
              <LoadingSpinner />
            </div>
          ) : (
            <AutoSizer>
              {({ width, height }) => (
                <GridContainer
                  width={width}
                  height={height}
                  list={searchResults}
                  onGridRender={props => <Grid {...props} />}
                  loadMore={loadMoreResult}
                  noContentRenderer={() =>
                    noMoreResult && <div className="wrapper">搵唔到</div>
                  }
                />
              )}
            </AutoSizer>
          )}
        </div>
      </Layout>
    );
  }
);
