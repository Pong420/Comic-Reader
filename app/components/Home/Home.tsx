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
  getComicList,
  cancelGetComicList
}: ComicListState & typeof ComicListActionCreators) {
  const gridHandler = useRef<GridHandler>(null);
  const initialized = comicList.length;
  const request = useCallback(() => {
    getComicList({
      page,
      filter
    });
  }, [getComicList, filter, page]);

  useLayoutEffect(() => {
    if (!initialized) {
      gridHandler.current!.scrollTop(0);
      request();
    }
  }, [initialized, request]);

  useLayoutEffect(() => {
    return () => {
      cancelGetComicList();
    };
  }, [cancelGetComicList]);

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
