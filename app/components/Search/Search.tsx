import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import { SearchHeader } from './SearchHeader';
import SearchResultActions, {
  AddSearchResultsPayload
} from '../../actions/searchResult';
import { SearchResults, SearchParam } from '../../../typing';
import { search } from '../../api';

export interface SearchProps {
  page: number;
  keyword: string;
  searchResults: SearchResults;
  setKeyword: (keyword: string) => void;
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
 *  - No Search Result
 *  - Loading
 *  - Fix navigate back to result page
 *  - User keep scrolling down
 */

export const Search = connect(
  mapStateToProps,
  mapActionToProps
)(
  ({
    page,
    keyword,
    searchResults,
    setKeyword,
    setSearchResults,
    addSearchResults
  }: SearchProps) => {
    const [loadMore, setLoadMore] = useState(true);

    function searchRequest(params: SearchParam) {
      return search(params).then(data => {
        if (data.length < 20) {
          setLoadMore(false);
        }

        return data;
      });
    }

    function onSearch() {
      searchRequest({
        keyword
      }).then(data => setSearchResults(data));
    }

    function loadMoreResult() {
      if (loadMore) {
        const nextPage = page + 1;
        const from = searchResults.length;
        const to = searchResults.length + placeholders.length;

        addSearchResults({
          searchResults: placeholders.slice(0),
          page: nextPage
        });

        return searchRequest({ keyword, page: nextPage }).then(
          searchResults => {
            addSearchResults({
              searchResults,
              page: nextPage,
              from,
              to
            });
          }
        );
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
          <AutoSizer>
            {({ width, height }) => (
              <GridContainer
                width={width}
                height={height}
                list={searchResults}
                onGridRender={props => <Grid {...props} />}
                loadMore={loadMoreResult}
              />
            )}
          </AutoSizer>
        </div>
      </Layout>
    );
  }
);
