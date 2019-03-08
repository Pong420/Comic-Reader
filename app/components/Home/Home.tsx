import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import {
  RootState,
  ComicListState,
  ComicListActions,
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
  filter,
  comicList,
  noMoreComicResults,
  getComicList,
  cancelGetComicList
}: ComicListState & ActionCreatorsMapObject<ComicListActions>) {
  const request = () => {
    getComicList({
      page,
      filter
    });
  };

  useEffect(() => {
    request();

    return () => {
      cancelGetComicList();
    };
  }, []);

  return (
    <Layout className="home">
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={comicList}
            loadMore={() => !noMoreComicResults && request()}
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
