import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AutoSizer } from 'react-virtualized';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import { SearchInput } from './SearchInput';
import { RootState, SearchActionCreators } from '../../store';

const mapStateToProps = ({ search }: RootState) => ({
  ...search
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(SearchActionCreators, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export function SearchComponent({
  keyword,
  searchResults,
  noMoreSearchResult,
  getSearchResult,
  getMoreSearchResult,
  cancelGetSearchResult
}: Props) {
  const loadMore = () => !noMoreSearchResult && getMoreSearchResult();

  useEffect(() => {
    return () => {
      cancelGetSearchResult();
    };
  }, []);

  return (
    <div className="search">
      <SearchInput defaultValue={keyword} onSearch={getSearchResult} />
      <div className="search-results">
        <AutoSizer>
          {dimen => (
            <GridContainer
              {...dimen}
              items={searchResults}
              loadMore={loadMore}
              onGridRender={props => <Grid {...props} />}
              scrollPostionKey={keyword}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
