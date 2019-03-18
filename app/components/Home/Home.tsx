import React, { useLayoutEffect, useRef, useCallback } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer, GridHandler } from '../GridContainer';
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
  getComicList
}: ComicListState & typeof ComicListActionCreators) {
  const gridHandler = useRef<GridHandler>(null);
  const request = useCallback(() => {
    getComicList({
      page,
      filter
    });
  }, [filter, getComicList, page]);

  useLayoutEffect(() => {
    if (!comicList.length) {
      gridHandler.current!.scrollTop(0);

      request();
    }
  }, [comicList.length, request]);

  return (
    <Layout className="home" error={error}>
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={comicList}
            loadMore={() => !noMoreComicResults && request()}
            onGridRender={props => <Grid {...props} />}
            handler={gridHandler}
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
