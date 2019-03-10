import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import {
  RootState,
  ComicListState,
  ComicListActionCreators
} from '../../store';

function mapStateToProps({ comicList }: RootState, ownProps: any) {
  return { ...comicList, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ComicListActionCreators, dispatch);
}

function HomeComponent({
  page,
  error,
  filter,
  comicList,
  noMoreComicResults,
  getComicList,
  cancelGetComicList
}: ComicListState & typeof ComicListActionCreators) {
  const request = () => {
    if (!noMoreComicResults) {
      getComicList({
        page,
        filter
      });
    }
  };

  useEffect(() => {
    request();

    return () => {
      cancelGetComicList();
    };
  }, []);

  return (
    <Layout className="home" error={error}>
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={comicList}
            loadMore={request}
            onGridRender={props => <Grid {...props} />}
          />
        )}
      </AutoSizer>
    </Layout>
  );
}

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
